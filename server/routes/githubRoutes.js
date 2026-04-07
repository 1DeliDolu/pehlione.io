import { Router } from "express";
import { listUserRepos } from "../controllers/githubController.js";

const router = Router();

router.get("/users/:username/repos", listUserRepos);

export default router;
