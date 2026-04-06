import path from "path";
import {
  processUploadedFile,
  resolveCategoryDir,
} from "../services/uploadService.js";

export async function uploadImage(req, res) {
  if (!req.file) {
    return res.status(400).json({
      ok: false,
      error: "No file received",
    });
  }

  const { cat } = resolveCategoryDir(req.body.category);
  const filename = req.file.filename;
  const src = `/${cat}/${filename}`;

  try {
    await processUploadedFile(req.file.path, req.file.mimetype, cat);
    console.log("File uploaded and optimized:", req.file.path);
  } catch (error) {
    console.warn("Post-upload optimization failed:", error?.message || error);
  }

  return res.json({
    ok: true,
    file: req.file,
    src,
    category: cat,
    nameNormalized: path.parse(filename).name,
  });
}
