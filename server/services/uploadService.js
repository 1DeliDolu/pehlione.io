import fs from "fs";
import fsp from "fs/promises";
import multer from "multer";
import path from "path";
import sharp from "sharp";
import { publicDir, runtimeConfig } from "../config/runtime.js";

export function resolveCategoryDir(category) {
  const cat =
    category === "garten" || category === "certificates"
      ? category
      : "foto";

  return { cat, dir: path.join(publicDir, cat) };
}

function ensureUnique(dir, baseName, ext) {
  let candidate = `${baseName}${ext}`;
  let index = 1;

  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${baseName}-${index}${ext}`;
    index += 1;
  }

  return candidate;
}

async function optimizeOriginalInPlace(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (![".jpg", ".jpeg", ".png"].includes(ext)) {
    return;
  }

  const tmp = `${filePath}.tmp`;
  const pipeline = sharp(filePath)
    .rotate()
    .resize({
      width: runtimeConfig.imageMaxWidth,
      withoutEnlargement: true,
    });

  if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline
      .jpeg({
        quality: runtimeConfig.imageJpegQuality,
        mozjpeg: true,
      })
      .toFile(tmp);
  } else {
    await pipeline
      .png({
        compressionLevel: 9,
        effort: 10,
        palette: true,
        quality: runtimeConfig.imagePngQuality,
      })
      .toFile(tmp);
  }

  const [before, after] = await Promise.all([fsp.stat(filePath), fsp.stat(tmp)]);

  if (after.size < before.size) {
    await fsp.rename(tmp, filePath);
    return;
  }

  await fsp.unlink(tmp);
}

async function generateThumbWebp(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  const thumbsDir = path.join(dir, "thumbs");
  const thumbPath = path.join(thumbsDir, `${base}.webp`);

  await fsp.mkdir(thumbsDir, { recursive: true });
  await sharp(filePath)
    .rotate()
    .resize({
      width: runtimeConfig.thumbWidth,
      withoutEnlargement: true,
    })
    .webp({ quality: runtimeConfig.thumbQuality })
    .toFile(thumbPath);
}

export async function processUploadedFile(filePath, mimetype, category) {
  const isImageUpload = mimetype?.startsWith("image/");
  const isPhotoCategory = category === "foto" || category === "garten";

  if (!isImageUpload) {
    return;
  }

  await optimizeOriginalInPlace(filePath);

  if (isPhotoCategory) {
    await generateThumbWebp(filePath);
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { cat, dir } = resolveCategoryDir(req.body.category);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    console.log("Upload category:", cat, "->", dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = (req.body.name || Date.now().toString()).toString();
    const safeName =
      base.trim().replace(/[^a-zA-Z0-9-_]+/g, "-") || Date.now().toString();
    const { dir } = resolveCategoryDir(req.body.category);
    const finalName = ensureUnique(dir, safeName, ext);

    console.log("Upload filename:", finalName);
    cb(null, finalName);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    return cb(new Error("Only image uploads are allowed"));
  },
});
