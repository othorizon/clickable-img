<p align="center">
  <img src=".github/banner.svg" alt="clickable-img" width="100%" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@clickable-img/sdk"><img src="https://img.shields.io/npm/v/@clickable-img/sdk?color=3b82f6&label=sdk" alt="npm sdk" /></a>
  <a href="https://www.npmjs.com/package/@clickable-img/core"><img src="https://img.shields.io/npm/v/@clickable-img/core?color=8b5cf6&label=core" alt="npm core" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs welcome" />
</p>

<p align="center">
  Embed interactive clickable hotspots into PNG images.<br/>
  Draw once with the Editor, render everywhere with the SDK.
</p>

<p align="center">
  <b>English</b> | <a href="./README.zh-CN.md">简体中文</a>
</p>

---

## How It Works

1. **Draw** hotspots on an image using the visual **Editor**
2. **Export** as a standard PNG with hotspot metadata embedded in `tEXt` chunks
3. **Render** in your app — the SDK reads the metadata and creates clickable zones automatically

No server required. All data lives inside the PNG file itself.

## Use Cases

When you need interactive regions on images, clickable-img provides the lightest solution:

- **Ad Pop-ups** — Buttons and product zones in pop-up ads are configured as hotspots. Swap the image to update content — zero code changes.
- **Campaign Landing Pages** — Use the designer's artwork directly as the page. Hotspots handle navigation, eliminating complex CSS reproduction.
- **Interactive Maps** — Scenic area guides, mall floor plans, etc. Mark points of interest on images, click to reveal details.
- **Interactive Learning** — Mark knowledge points on educational images. Students click to view explanations.

### Real-World Example: Hot-Updatable Ad Pop-ups

1. **Develop once** — Build the image pop-up component, integrate the SDK, and configure hotspot click event handlers.
2. **Configure hotspots** — Operations team uses the online editor to draw interactive hotspots on the new ad image.
3. **Deploy content** — Upload the exported image to CDN / object storage, replacing the old image URL.

**Result:** No code changes, no redeployment — ad content is hot-updated instantly.

### Key Advantages

- **Hot Update** — Replace the image to ship new content, no release needed
- **Fast Delivery** — No need to reproduce complex UI designs in code; a single image carries the entire visual
- **Low Dev Cost** — Display-oriented pages only need click event listeners, drastically reducing frontend work

## How It Works (Technical)

All hotspot data is stored inside the PNG file itself — no extra server required.

### PNG tEXt Chunk Storage

The [PNG specification](https://www.w3.org/TR/png/#11tEXt) defines `tEXt` auxiliary chunks for storing text metadata. The editor serializes hotspot data as JSON, writes it into a `tEXt` chunk with the keyword `clickable-img`, and inserts it before the `IEND` marker. **Pixel data remains completely untouched.**

### Normalized Coordinate System

Hotspot coordinates use relative values in the 0\~1 range (percentage of image width/height). This means hotspots always align precisely, regardless of the actual rendered image size on screen.

### DOM Overlay Rendering

At runtime, the SDK fetches the image binary data, parses the `tEXt` chunk to extract the hotspot JSON, wraps the `<img>` element in a `position: relative` container, and generates an `position: absolute` transparent `<div>` for each hotspot with click event listeners.

### Data Flow

```
Editor draws hotspots → serialize to JSON
        ↓
JSON written into PNG tEXt chunk → image exported
        ↓
SDK loads image → parses tEXt chunk
        ↓
DOM overlay generated from coordinates → interaction events bound
```

## Packages

| Package | Description | Platform |
|---------|-------------|----------|
| [`@clickable-img/core`](./packages/core) | Type definitions & PNG metadata parser | Any JS runtime |
| [`@clickable-img/sdk`](./packages/sdk) | Browser runtime with DOM overlay | Web |
| [`@clickable-img/editor`](./packages/editor) | Visual hotspot editor | Web |

## Quick Start

### Web Browser

```bash
npm install @clickable-img/sdk
```

```ts
import { ClickableImg } from '@clickable-img/sdk'

const img = document.querySelector('img#hero')

const instance = await ClickableImg.attach(img, {
  onClick(hotspot) {
    console.log(hotspot.label)   // "Buy Now"
    console.log(hotspot.payload) // "product-123"
  },
  showHints: true, // optional — show hotspot borders
})

// clean up when done
instance.destroy()
```

### Cross-Platform Integration

clickable-img works on **any JavaScript-based platform**. The `@clickable-img/sdk` is a ready-to-use wrapper for the browser, but it's not required — all you need is `@clickable-img/core`.

1. **Read hotspot data** — Call `readHotspotsFromPng` from the core package to parse the PNG and extract hotspot coordinates and custom data.
2. **Build your own overlay** — Use the hotspot coordinates to create clickable regions on top of the image using your platform's native approach — Canvas, native Views, WebGL, etc.
3. **Handle click events** — When a user taps a hotspot, read its `label` and `payload` to execute your business logic.

> The core package has zero external dependencies and is pure JavaScript — it runs in Node.js, React Native, Mini Programs, Electron, and any other JS runtime.

### Core Only (Custom Rendering)

For platforms without a built-in adapter (React Native, Flutter, Node.js, etc.):

```bash
npm install @clickable-img/core
```

```ts
import { readHotspotsFromPng } from '@clickable-img/core'

const buffer = await fetch('https://example.com/image.png')
  .then(r => r.arrayBuffer())

const data = readHotspotsFromPng(buffer)

if (data) {
  data.hotspots.forEach(hotspot => {
    // hotspot.rect -> { x, y, w, h } in 0~1 range (relative to image size)
    // hotspot.label, hotspot.payload, hotspot.id
  })
}
```

## API Reference

### `@clickable-img/sdk`

#### `ClickableImg.attach(img, options)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `img` | `HTMLImageElement` | Target image element |
| `options.onClick` | `(hotspot: Hotspot) => void` | Callback when a hotspot is clicked |
| `options.showHints` | `boolean` | Show hotspot borders. Default: `false` |

Returns `Promise<ClickableImg>`. Call `.destroy()` to remove the overlay.

### `@clickable-img/core`

#### `readHotspotsFromPng(buffer: ArrayBuffer): ClickableImgData | null`

Parses PNG `tEXt` chunks and returns hotspot data, or `null` if none found.

### Data Types

```ts
interface Hotspot {
  id: string
  rect: HotspotRect
  label: string
  payload: string
}

interface HotspotRect {
  x: number  // 0~1, left offset relative to image width
  y: number  // 0~1, top offset relative to image height
  w: number  // 0~1, width relative to image width
  h: number  // 0~1, height relative to image height
}
```

## Development

```bash
pnpm install   # install dependencies
pnpm dev       # start all packages in watch mode
pnpm build     # build all packages
```

## Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

## License

[MIT](./LICENSE)
