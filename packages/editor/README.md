# @clickable-img/editor

Visual editor for creating and testing clickable hotspot images. Built with React 19, Vite, and Tailwind CSS 4.

## Features

- Drag-to-draw hotspot creation on any uploaded image
- Edit hotspot label and payload (link, JSON, etc.)
- Export PNG with embedded hotspot metadata
- Built-in hotspot tester (preview mode)
- i18n support (English / 简体中文)
- Responsive layout (mobile + desktop)

## Development

```bash
# From monorepo root
pnpm dev

# Or run editor only
cd packages/editor
pnpm dev
```

The editor runs at `http://localhost:5173` by default (configurable via `PORT` env var).

## App Modes

The editor uses hash-based routing with three modes:

| Route | Mode | Description |
|-------|------|-------------|
| `#` | Landing | Marketing page with image uploader |
| `#editor` | Editor | Visual hotspot creation workspace |
| `#tester` | Tester | Test hotspots using `@clickable-img/sdk` |

## Build

```bash
pnpm build
```

Outputs a static SPA to `dist/`.

## License

MIT
