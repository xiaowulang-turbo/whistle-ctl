# whistle-ctl site

Official landing page for [whistle-ctl](../README.md), built with React + TypeScript + Vite + Tailwind CSS + shadcn/ui.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy

The site is built to a static `dist/` and is designed to be deployed to Vercel
(root directory: `site/`, framework preset: Vite).
