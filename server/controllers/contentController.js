import {
  createCollectionEntry,
  readCollection,
} from "../services/dbService.js";

export async function listContent(req, res) {
  try {
    const items = await readCollection(req.params.resource);

    if (!items) {
      return res.status(404).json({
        ok: false,
        error: "Unknown resource",
      });
    }

    return res.json(items);
  } catch (error) {
    console.error("DB read error:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to read data",
    });
  }
}

export async function createContent(req, res) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      ok: false,
      error: "Invalid payload",
    });
  }

  try {
    const entry = await createCollectionEntry(req.params.resource, req.body);

    if (!entry) {
      return res.status(404).json({
        ok: false,
        error: "Unknown resource",
      });
    }

    return res.status(201).json({
      ok: true,
      item: entry,
    });
  } catch (error) {
    console.error("DB write error:", error);
    return res.status(500).json({
      ok: false,
      error: "Failed to save data",
    });
  }
}
