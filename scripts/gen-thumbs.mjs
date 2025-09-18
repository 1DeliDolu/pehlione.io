#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const roots = [
  path.resolve(__dirname, '..', 'public', 'garten'),
  path.resolve(__dirname, '..', 'public', 'foto'),
]

const exts = new Set(['.png', '.jpg', '.jpeg', '.PNG', '.JPG', '.JPEG'])
const width = Number(process.env.THUMB_WIDTH || 480)
const quality = Number(process.env.THUMB_QUALITY || 65)

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const res = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name.toLowerCase() === 'thumbs') continue
      yield* walk(res)
    } else {
      yield res
    }
  }
}

function destPathFor(src) {
  const dir = path.dirname(src)
  const base = path.basename(src, path.extname(src))
  return path.join(dir, 'thumbs', `${base}.webp`)
}

async function needsUpdate(src, dest) {
  try {
    const [s, d] = await Promise.all([fs.stat(src), fs.stat(dest)])
    return s.mtimeMs > d.mtimeMs
  } catch {
    return true
  }
}

async function processOne(src) {
  const ext = path.extname(src)
  if (!exts.has(ext)) return { skipped: true }
  const dest = destPathFor(src)
  if (!(await needsUpdate(src, dest))) return { skipped: true }
  await ensureDir(path.dirname(dest))

  await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest)

  return { dest }
}

async function run() {
  const files = []
  for (const root of roots) {
    try {
      for await (const f of walk(root)) files.push(f)
    } catch {}
  }
  let made = 0
  let skipped = 0
  const start = Date.now()
  const limit = Number(process.env.THUMB_CONCURRENCY || 3)
  let idx = 0

  async function worker() {
    while (true) {
      const i = idx++
      if (i >= files.length) break
      const file = files[i]
      try {
        const res = await processOne(file)
        if (res.dest) {
          made++
          process.stdout.write(`+ ${path.relative(path.resolve(__dirname, '..'), res.dest)}\n`)
        } else {
          skipped++
        }
      } catch (e) {
        console.warn('! Failed:', file, e?.message || e)
      }
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()))
  const secs = ((Date.now() - start) / 1000).toFixed(1)
  console.log(`Thumbnails: created=${made}, skipped=${skipped}, total=${files.length}, in ${secs}s (w=${width}, q=${quality})`)
}

run().catch((e) => {
  console.error(e)
  process.exitCode = 1
})

