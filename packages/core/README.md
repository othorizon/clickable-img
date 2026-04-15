# @clickable-img/core

Platform-agnostic core library: types and PNG hotspot metadata parsing.

## Install

```bash
npm install @clickable-img/core
```

## Features

- Zero dependencies
- Works in any JavaScript runtime (Browser, Node.js, etc.)
- Parse clickable hotspot metadata embedded in PNG `tEXt` chunks
- Full TypeScript support with ESM and CJS dual output

## Usage

```typescript
import { readHotspotsFromPng } from '@clickable-img/core'

const buffer = await fetch('https://example.com/image.png').then(r => r.arrayBuffer())
const data = readHotspotsFromPng(buffer)

if (data) {
  console.log(data.version)  // "1.0"
  data.hotspots.forEach(h => {
    console.log(h.label, h.payload, h.rect)
  })
}
```

## API

### `readHotspotsFromPng(buffer: ArrayBuffer): ClickableImgData | null`

Parses a PNG file buffer and extracts embedded hotspot metadata. Returns `null` if no valid hotspot data is found.

## Types

```typescript
interface HotspotRect {
  x: number  // 0~1, left offset relative to image width
  y: number  // 0~1, top offset relative to image height
  w: number  // 0~1, width relative to image width
  h: number  // 0~1, height relative to image height
}

interface Hotspot {
  id: string
  rect: HotspotRect
  label: string
  payload: string
}

interface ClickableImgData {
  version: string
  hotspots: Hotspot[]
}

interface ClickableImgOptions {
  onClick: (hotspot: Hotspot) => void
  showHints?: boolean
}
```

## License

MIT
