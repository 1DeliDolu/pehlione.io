import { Router } from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { requireAdminJwt } from "../middleware/requireAdminJwt.js";
import { upload } from "../services/uploadService.js";

const router = Router();

router.post("/", requireAdminJwt, upload.single("image"), uploadImage);

export default router;
