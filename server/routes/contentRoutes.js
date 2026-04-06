import { Router } from "express";
import {
  createContent,
  listContent,
} from "../controllers/contentController.js";
import { requireAdminJwt } from "../middleware/requireAdminJwt.js";

const router = Router();

router.get("/:resource", listContent);
router.post("/:resource", requireAdminJwt, createContent);

export default router;
