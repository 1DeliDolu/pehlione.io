#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const roots = [
  path.resolve(projectRoot, 'public', 'garten'),
  path.resolve(projectRoot, 'public', 'foto'),
]

const exts = new Set(['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'])
const maxWidth = Number(process.env.ORIG_MAX_WIDTH || 1920)
const jpegQuality = Number(process.env.ORIG_JPEG_QUALITY || 82)
const pngQuality = Number(process.env.ORIG_PNG_QUALITY || 80)
const concurrency = Number(process.env.ORIG_CONCURRENCY || 3)

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const res = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name.toLowerCase() === 'thumbs') continue
      yield* walk(res)
      continue
    }
    yield res
  }
}

async function processOne(src) {
  const ext = path.extname(src)
  if (!exts.has(ext)) return { skipped: true, reason: 'ext' }

  const tmp = `${src}.tmp`
  const lower = ext.toLowerCase()
  const pipeline = sharp(src).rotate().resize({ width: maxWidth, withoutEnlargement: true })

  if (lower === '.jpg' || lower === '.jpeg') {
    await pipeline.jpeg({ quality: jpegQuality, mozjpeg: true }).toFile(tmp)
  } else {
    await pipeline.png({
      compressionLevel: 9,
      effort: 10,
      palette: true,
      quality: pngQuality,
    }).toFile(tmp)
  }

  const [before, after] = await Promise.all([fs.stat(src), fs.stat(tmp)])
  if (after.size >= before.size) {
    await fs.unlink(tmp)
    return { skipped: true, reason: 'not-smaller' }
  }

  await fs.rename(tmp, src)
  return { optimized: true, before: before.size, after: after.size }
}

async function run() {
  const files = []
  for (const root of roots) {
    try {
      for await (const f of walk(root)) files.push(f)
    } catch {
      // ignore missing root
    }
  }

  let idx = 0
  let optimized = 0
  let skipped = 0
  let bytesSaved = 0
  const start = Date.now()

  async function worker() {
    while (true) {
      const i = idx++
      if (i >= files.length) break
      const file = files[i]
      try {
        const res = await processOne(file)
        if (res.optimized) {
          optimized++
          bytesSaved += (res.before - res.after)
          process.stdout.write(`+ ${path.relative(projectRoot, file)} (${(res.before / 1024 / 1024).toFixed(2)}MB -> ${(res.after / 1024 / 1024).toFixed(2)}MB)\n`)
        } else {
          skipped++
        }
      } catch (e) {
        skipped++
        console.warn(`! Failed: ${file} (${e?.message || e})`)
        try { await fs.unlink(`${file}.tmp`) } catch {}
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()))
  const secs = ((Date.now() - start) / 1000).toFixed(1)
  console.log(
    `Original optimization: optimized=${optimized}, skipped=${skipped}, total=${files.length}, saved=${(bytesSaved / 1024 / 1024).toFixed(2)}MB, in ${secs}s`,
  )
}

run().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
