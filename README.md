"Sprachen: [Deutsch (dieses Dokument)](README.md) · [English](README.en.md)"

# pehlione.io – Portfolio (React + TypeScript + Vite)

Modernes, schnelles und barrierearmes persönliches Portfolio. Erstellt mit React, TypeScript, Vite, MUI und Tailwind. Enthält eine optimierte Foto‑Galerie, Zertifikate, Projekte, GitHub‑Repositories und ein Entwickler‑Profil.

## Highlights

- Optimierte Bilder mit Thumbnails (WebP) und Lazy Loading
- Foto‑Galerie mit Pagination und weichen Hover‑Effekten
- Overlay‑Spinner beim ersten Laden und optionale Loader pro Bild
- Zertifikate, Projekte, Repos, Entwickler‑Profil, CV‑Download
- Playwright E2E‑Tests (Chromium, Firefox, WebKit) + GitHub Actions CI
- Bereitstellbar auf GitHub Pages (unterstützt benutzerdefinierten `base`‑Pfad)

## Technologien

- React 19 + TypeScript + Vite
- MUI (Material UI) + Tailwind CSS
- Playwright für E2E‑Tests
- Sharp zur Thumbnail‑Erzeugung
- Optionaler Upload‑Server (Express + Multer)

## Projektstruktur

```
public/
  certificates/           # Zertifikatsbilder + CV‑PDF
  foto/                   # Foto‑Originale (und thumbs/)
  garten/                 # Garten‑Originale (und thumbs/)
src/
  components/
    OptimizedImage.tsx    # Lazy, async decode, base‑path‑sicher
    ImageWithLoader.tsx   # Overlay mit CircularProgress pro Bild
    PhotoGallery.tsx      # Grid mit Thumbs + Fallback auf Original
    Sections/             # CV, Hobbies, Projects, Repos, usw.
  page/Foto.tsx           # Galerie + Overlay‑Spinner beim Erstladen
  redux/photos.ts         # Generiert aus server/db.json
  constants/constants.ts  # Navigation, Beispieldaten
  App.tsx                 # Haupt‑App + Zustandsnavigation
server/
  server.js               # Optionaler Upload‑Endpunkt (Port 3001)
scripts/
  gen-thumbs.mjs          # Erzeugt WebP‑Thumbnails
  generatePhotos.ts       # Build‑Zeit‑Daten aus server/db.json
e2e/
  App.spec.tsx            # Playwright End‑to‑End‑Tests
```

## Bildoptimierung

- Thumbnails werden mit `sharp` in `public/*/thumbs/*.webp` erzeugt.
- Die Galerie lädt zuerst Thumbnails; ein Klick öffnet das Original.
- Komponenten:
  - `OptimizedImage`: Lazy + `decoding="async"` + Base‑Path‑Handling
  - `ImageWithLoader`: Zeigt bis `onLoad` einen CircularProgress an

Thumbnails erzeugen (im Build automatisch enthalten):

```bash
npm run thumbs
# Optionen (PowerShell)
$env:THUMB_WIDTH=480; $env:THUMB_QUALITY=65; $env:THUMB_CONCURRENCY=2; npm run thumbs
```

## Skripte

- `dev`: Vite‑Dev‑Server starten
- `build`: Thumbs → Fotos generieren → Typecheck → Vite‑Build
- `preview`: Produktionsbuild lokal ansehen
- `lint`, `lint:fix`: ESLint ausführen
- `thumbs`: WebP‑Thumbnails mit `sharp` erzeugen
- `test:e2e`, `test:e2e:ui`, `test:e2e:headed`: Playwright‑Tests

## Entwicklung

Voraussetzungen: Node.js 22+

Installation & Start:

```bash
npm install
npm run dev
```

Die Galerie versucht, dynamische Fotos von `http://localhost:4000/…` zu laden. Falls nicht verfügbar, wird auf die generierte, statische Datei `redux/photos.ts` zurückgefallen.

Optionale JSON‑API (empfohlen für dynamische Fotos):

```bash
npm install -g json-server
json-server --watch server/db.json --port 4000
```

Optionaler Upload‑Server (speichert Bilder in `public/foto` oder `public/garten`):

```bash
node server/server.js   # läuft auf http://localhost:3001
```

## Umgebung

- `BASE_PATH`: Vite‑Basis‑Pfad für Deployments unter Unterpfaden, z. B. `/pehlione.io/`.

## Tests (Playwright)

Lokal ausführen:

```bash
npx playwright install
npm run test:e2e
```

GitHub Actions: siehe `.github/workflows/e2e.yml` (Chromium/Firefox/WebKit).

## Deployment

Bereitstellung auf GitHub Pages:

```bash
npm run build
npm run deploy
```

Hinweise:

- `vite.config.ts` liest `BASE_PATH` für korrekte Asset‑Pfade.
- `public/CNAME` ist für die benutzerdefinierte Domain enthalten.

## Barrierefreiheit & Performance

- Alle Bilder laden lazy und werden asynchron decodiert.
- Intrinsische Größen reduzieren Layout‑Shifts.
- Nur beim ersten Galerieladen erscheint ein Seiten‑Overlay; per‑Bild‑Loader sind auf die erste Seite begrenzt.

## CMS Magement

App.tsx 

  {/* foto uploader */}

    {/*`<div id="foto-uploader">`

    `<UploadForm />`

    `</div>` */}

und constant.ts 

/*  ,

  {

    key: "foto-uploader",

    label: "Foto Uploader",

    href: "#foto-uploader",

    icon: CloudUploadIcon,

    detail: "Profil und Skills.",

  }, */

## Roadmap

- Lightbox mit Tastaturnavigation & Zoom
- Progressive Bildladung (LQIP/Blur‑Up)
- Weitere CI‑Checks (Lint/Typecheck) und visuelle Tests

## Lizenz

MIT — siehe [LICENSE](./LICENSE)
