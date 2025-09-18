# pehlione.io – Portfolio (React + TypeScript + Vite)

Modern, fast, and accessible personal portfolio. Built with React, TypeScript, Vite, MUI, and Tailwind. Includes an optimized photo gallery, certificate showcase, projects, GitHub repositories, and a developer profile.

## Highlights

- Optimized images with thumbnails (WebP) and lazy loading
- Photo gallery with pagination and smooth hover effects
- First-load overlay spinner and per-image loaders (configurable)
- Certificates, Projects, Repos, Developer profile, CV download
- Playwright E2E tests (Chromium, Firefox, WebKit) + GitHub Actions CI
- Deployable to GitHub Pages (supports custom `base` path)

## Tech Stack

- React 19 + TypeScript + Vite
- MUI (Material UI) + Tailwind CSS
- Playwright for E2E tests
- Sharp for thumbnail generation
- Optional upload server (Express + Multer)

## App Structure

```
public/
  certificates/           # Certificate images + CV PDF
  foto/                   # Photography originals (and thumbs/)
  garten/                 # Garden originals (and thumbs/)
src/
  components/
    OptimizedImage.tsx    # Lazy, async decode, base-path safe
    ImageWithLoader.tsx   # Per-image CircularProgress overlay
    PhotoGallery.tsx      # Grid with thumbnails + fallback
    Sections/             # CV, Hobbies, Projects, Repos, etc.
  page/Foto.tsx           # Gallery screen + first-load overlay spinner
  redux/photos.ts         # Generated from server/db.json
  constants/constants.ts  # Navigation items, sample data
  App.tsx                 # Main app + routing between sections
server/
  server.js               # Optional upload endpoint (port 3001)
scripts/
  gen-thumbs.mjs          # Generate WebP thumbnails
  generatePhotos.ts       # Build-time photos data from server/db.json
e2e/
  App.spec.tsx            # Playwright end-to-end tests
```

## Image Optimization

- Thumbnails are generated into `public/*/thumbs/*.webp` using `sharp`.
- The gallery loads thumbnails first; clicking opens the original.
- Components:
  - `OptimizedImage`: lazy + `decoding="async"` + base path handling
  - `ImageWithLoader`: wraps image with a CircularProgress overlay until `onLoad`

Generate thumbnails (runs automatically in build):

```bash
npm run thumbs
# Options (PowerShell)
$env:THUMB_WIDTH=480; $env:THUMB_QUALITY=65; $env:THUMB_CONCURRENCY=2; npm run thumbs
```

## Scripts

- `dev`: start Vite dev server
- `build`: make thumbs → generate photos → type-check → Vite build
- `preview`: preview production build
- `lint`, `lint:fix`: run ESLint
- `thumbs`: generate WebP thumbnails via `sharp`
- `test:e2e`, `test:e2e:ui`, `test:e2e:headed`: Playwright tests

## Development

Prerequisites: Node.js 18+

Install deps and run in dev mode:

```bash
npm install
npm run dev
```

The gallery tries to fetch dynamic photos from `http://localhost:4000/…`. If not available, it falls back to the static, generated `redux/photos.ts`.

Optional JSON API (recommended for dynamic photos):

```bash
npm install -g json-server
json-server --watch server/db.json --port 4000
```

Optional upload server (saves images into `public/foto` or `public/garten`):

```bash
node server/server.js   # runs on http://localhost:3001
```

## Environment

- `BASE_PATH`: Vite base path for GitHub Pages or sub-path deploys. Example: `/pehlione.io/`.

## Testing (Playwright)

Run E2E tests locally:

```bash
npx playwright install
npm run test:e2e
```

GitHub Actions: see `.github/workflows/e2e.yml` (runs Chromium/Firefox/WebKit).

## Deployment

Deploy to GitHub Pages:

```bash
npm run build
npm run deploy
```

Notes:
- `vite.config.ts` reads `BASE_PATH` for correct asset paths.
- `public/CNAME` is included for custom domain support.

## Accessibility & Performance

- All images lazy-load and decode asynchronously.
- Intrinsic sizes are set to reduce layout shifts.
- Only the first gallery load shows a page overlay spinner; per-image spinners are limited to the first page for better UX.

## Roadmap

- Lightbox with keyboard navigation & zoom
- Progressive image loading (LQIP/blur-up)
- More CI checks (lint/typecheck) and visual tests

## License

MIT

