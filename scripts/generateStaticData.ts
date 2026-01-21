import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Cert, Project } from "../src/types/types";

type DbSchema = {
  projects?: Array<Project & { id?: string | number }>;
  certificates?: Array<Cert & { id?: string | number }>;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.resolve(__dirname, "..");
const dbPath = path.join(root, "server", "db.json");
const outPath = path.join(root, "src", "constants", "staticData.ts");

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

function toTsExport<T>(name: string, value: T, type?: string) {
  const typeSuffix = type ? `: ${type}` : "";
  return `export const ${name}${typeSuffix} = ${JSON.stringify(
    value,
    null,
    2
  )};\n`;
}

function main() {
  const data = loadDb(dbPath);

  const header =
    "// This file is auto-generated from server/db.json\n" +
    "import type { Cert, Project } from \"../types/types\";\n\n";

  const parts: string[] = [header];

  const projectsSource = Array.isArray(data.projects) ? data.projects : [];
  if (!Array.isArray(data.projects)) {
    console.warn('Warn: "projects" missing or not an array in db.json');
  }
  const projects = projectsSource.map((p, idx) => ({
    id: p.id != null ? String(p.id) : String(idx + 1),
    name: p.name,
    description: p.description,
    demoUrl: p.demoUrl,
    repoUrl: p.repoUrl,
  }));
  parts.push(
    toTsExport("staticProjects", projects, "(Project & { id: string })[]")
  );

  const certsSource = Array.isArray(data.certificates) ? data.certificates : [];
  if (!Array.isArray(data.certificates)) {
    console.warn('Warn: "certificates" missing or not an array in db.json');
  }
  const certificates = certsSource.map((c, idx) => ({
    id: c.id != null ? String(c.id) : String(idx + 1),
    name: c.name,
    issuer: c.issuer,
    img: c.img,
  }));
  parts.push(
    toTsExport(
      "staticCertificates",
      certificates,
      "(Cert & { id: string })[]"
    )
  );

  writeFileSync(outPath, parts.join(""));
  console.log("✅ src/constants/staticData.ts güncellendi");
}

main();
