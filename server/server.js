import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";

const app = express();

// CORS ayarı (headers kısıtlaması yok)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

// Multer storage ayarı
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const cat = req.body.category || "foto"; // fallback
    const dest = cat === "garten" ? "public/garten" : "public/foto";

    // Ensure the directory exists
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    console.log("Upload category:", cat, "→", dest);
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = req.body.name || Date.now().toString();
    console.log("Upload filename:", safeName + ext);
    cb(null, `${safeName}${ext}`);
  },
});

const upload = multer({ storage });

// Upload endpoint
app.post("/upload", upload.single("image"), (req, res) => {
  console.log("Dosya yüklendi:", req.file?.path);
  res.json({ ok: true, file: req.file });
});

app.listen(3001, () => console.log("🚀 Upload server 3001 portunda çalışıyor"));
