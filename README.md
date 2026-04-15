<p align="center">
  <img src=".github/banner.svg" alt="clickable-img" width="100%" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@clickable-img/sdk"><img src="https://img.shields.io/npm/v/@clickable-img/sdk?color=3b82f6&label=sdk" alt="npm sdk" /></a>
  <a href="https://www.npmjs.com/package/@clickable-img/core"><img src="https://img.shields.io/npm/v/@clickable-img/core?color=8b5cf6&label=core" alt="npm core" /></a>
  <a href="https://www.npmjs.com/package/@clickable-img/uniapp"><img src="https://img.shields.io/npm/v/@clickable-img/uniapp?color=10b981&label=uniapp" alt="npm uniapp" /></a>
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

## Packages

| Package | Description | Platform |
|---------|-------------|----------|
| [`@clickable-img/core`](./packages/core) | Type definitions & PNG metadata parser | Any JS runtime |
| [`@clickable-img/sdk`](./packages/sdk) | Browser runtime with DOM overlay | Web |
| [`@clickable-img/uniapp`](./packages/uniapp) | Vue component for mini programs | UniApp / WeChat |
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

### UniApp / WeChat Mini Program

```bash
npm install @clickable-img/uniapp
```

```vue
<template>
  <ClickableImage
    src="https://example.com/promo.png"
    show-hints
    @hotspot-tap="onTap"
    @load-error="onError"
  />
</template>

<script setup>
import { ClickableImage } from '@clickable-img/uniapp'

function onTap(hotspot) {
  uni.navigateTo({ url: `/pages/detail?id=${hotspot.payload}` })
}

function onError(err) {
  console.error(err.message)
}
</script>
```

<details>
<summary>Using easycom auto-registration</summary>

Add to `pages.json` so you can skip the manual import:

```json
{
  "easycom": {
    "custom": {
      "ClickableImage": "@clickable-img/uniapp/src/components/ClickableImage.vue"
    }
  }
}
```

Then use `<ClickableImage>` directly in any page template.

</details>

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

### `@clickable-img/uniapp`

#### `<ClickableImage>` Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | *required* | Image URL (HTTP/HTTPS) |
| `mode` | `string` | `'widthFix'` | UniApp `<image>` display mode |
| `show-hints` | `boolean` | `false` | Show hotspot borders |

#### `<ClickableImage>` Events

| Event | Payload | Description |
|-------|---------|-------------|
| `hotspot-tap` | `Hotspot` | Fired when a hotspot is tapped |
| `load-error` | `Error` | Fired on image load or parse failure |

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
