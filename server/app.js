import cors from "cors";
import express from "express";
import { runtimeConfig } from "./config/runtime.js";
import authRoutes from "./routes/authRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: runtimeConfig.clientOrigin,
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization", "Content-Type"],
    })
  );

  app.use(express.json({ limit: "1mb" }));

  app.use("/auth", authRoutes);
  app.use("/api", contentRoutes);
  app.use("/upload", uploadRoutes);

  return app;
}
