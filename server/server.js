import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";
import fsp from "fs/promises";
import sharp from "sharp";
import { fileURLToPath } from "url";

const app = express();

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS config
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

// Helpers
function resolveCategoryDir(category) {
  const cat =
    category === "garten" || category === "certificates"
      ? category
      : "foto";
  return { cat, dir: path.join(path.resolve(__dirname, "..", "public"), cat) };
}

function ensureUnique(dir, baseName, ext) {
  let candidate = `${baseName}${ext}`;
  let i = 1;
  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${baseName}-${i}${ext}`;
    i += 1;
  }
  return candidate;
}

const IMAGE_MAX_WIDTH = Number(process.env.UPLOAD_IMAGE_MAX_WIDTH || 1920);
const IMAGE_JPEG_QUALITY = Number(process.env.UPLOAD_IMAGE_JPEG_QUALITY || 82);
const IMAGE_PNG_QUALITY = Number(process.env.UPLOAD_IMAGE_PNG_QUALITY || 80);
const THUMB_WIDTH = Number(process.env.UPLOAD_THUMB_WIDTH || 480);
const THUMB_QUALITY = Number(process.env.UPLOAD_THUMB_QUALITY || 65);

async function optimizeOriginalInPlace(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) return;

  const tmp = `${filePath}.tmp`;
  const pipeline = sharp(filePath)
    .rotate()
    .resize({ width: IMAGE_MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline
      .jpeg({ quality: IMAGE_JPEG_QUALITY, mozjpeg: true })
      .toFile(tmp);
  } else {
    await pipeline
      .png({ compressionLevel: 9, effort: 10, palette: true, quality: IMAGE_PNG_QUALITY })
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
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: THUMB_QUALITY })
    .toFile(thumbPath);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { cat, dir } = resolveCategoryDir(req.body.category);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    console.log("Upload category:", cat, "->", dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = (req.body.name || Date.now().toString()).toString();
    const safeName = base.trim().replace(/[^a-zA-Z0-9-_]+/g, "-") || Date.now().toString();
    const { dir } = resolveCategoryDir(req.body.category);
    const finalName = ensureUnique(dir, safeName, ext);
    console.log("Upload filename:", finalName);
    cb(null, finalName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith("image/")) return cb(null, true);
    return cb(new Error("Only image uploads are allowed"));
  },
});

// Upload endpoint
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "No file received" });
  }

  const { cat } = resolveCategoryDir(req.body.category);
  const filename = req.file.filename;
  const src = `/${cat}/${filename}`;
  const isPhotoCategory = cat === "foto" || cat === "garten";
  const isImageUpload = req.file.mimetype?.startsWith("image/");

  try {
    if (isImageUpload) {
      await optimizeOriginalInPlace(req.file.path);
      if (isPhotoCategory) {
        await generateThumbWebp(req.file.path);
      }
    }
    console.log("Dosya yüklendi ve optimize edildi:", req.file.path);
  } catch (error) {
    console.warn("Upload sonrası optimizasyon hatası:", error?.message || error);
  }

  res.json({ ok: true, file: req.file, src, category: cat, nameNormalized: path.parse(filename).name });
});

app.listen(3001, () => console.log("Upload server 3001 portunda çalışıyor"));

