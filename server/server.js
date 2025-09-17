import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";
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
  const cat = category === "garten" ? "garten" : "foto";
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
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ ok: false, error: "No file received" });
  }
  const { cat } = resolveCategoryDir(req.body.category);
  const filename = req.file.filename;
  const src = `/${cat}/${filename}`;
  console.log("Dosya yüklendi:", req.file.path);
  res.json({ ok: true, file: req.file, src, category: cat, nameNormalized: path.parse(filename).name });
});

app.listen(3001, () => console.log("Upload server 3001 portunda çalışıyor"));

