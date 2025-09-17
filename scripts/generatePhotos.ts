import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { FotoEintrag } from "../src/types";

type DbSchema = {
  gardenPhotos?: FotoEintrag[];
  fotografiePhotos?: FotoEintrag[];
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, "..");
const dbPath = path.join(root, "server", "db.json");
const outPath = path.join(root, "src", "redux", "photos.ts");

function loadDb(p: string): DbSchema {
  const raw = readFileSync(p, "utf8");
  try {
    return JSON.parse(raw) as DbSchema;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("db.json parse error:", msg);
    process.exit(1);
  }
}

function toTsExport<T>(name: string, value: T) {
  return `export const ${name}: FotoEintrag[] = ${JSON.stringify(
    value,
    null,
    2
  )};\n`;
}

function main() {
  const data = loadDb(dbPath);

  const header = `import type { FotoEintrag } from "../types";\n\n`;

  const parts: string[] = [header];

  if (Array.isArray(data.gardenPhotos)) {
    const mapped = data.gardenPhotos.map((p) => ({
      id: p.id,
      src: p.src,
      name: p.name,
      title: p.title,
      description: p.description,
      category: p.category,
      sub_category: p.sub_category,
    }));
    parts.push(toTsExport("gardenPhotos", mapped));
  } else {
    console.warn('Warn: "gardenPhotos" missing or not an array in db.json');
    parts.push(toTsExport("gardenPhotos", []));
  }

  if (Array.isArray(data.fotografiePhotos)) {
    const mapped = data.fotografiePhotos.map((p) => ({
      id: p.id,
      src: p.src,
      name: p.name,
      title: p.title,
      description: p.description,
      category: p.category,
      sub_category: p.sub_category,
    }));
    parts.push(toTsExport("fotografiePhotos", mapped));
  } else {
    console.warn('Warn: "fotografiePhotos" missing or not an array in db.json');
    parts.push(toTsExport("fotografiePhotos", []));
  }

  writeFileSync(outPath, parts.join(""));
  console.log("✅ src/redux/photos.ts güncellendi");
}

main();
