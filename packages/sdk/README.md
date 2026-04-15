# @clickable-img/sdk

Browser SDK for rendering clickable hotspots on images with embedded metadata. Reads hotspot data from PNG `tEXt` chunks and creates an interactive DOM overlay.

## Install

```bash
npm install @clickable-img/sdk
```

## Features

- Attach interactive hotspot overlays to any `<img>` element
- Automatic PNG metadata parsing
- Hover effects and optional hint borders
- Supports both HTTP URLs and data URLs
- Clean destroy/cleanup API
- Re-exports core types and `readHotspotsFromPng` for convenience

## Usage

```typescript
import { ClickableImg } from '@clickable-img/sdk'

const img = document.querySelector('img')

const instance = await ClickableImg.attach(img, {
  onClick(hotspot) {
    console.log(hotspot.label, hotspot.payload)
  },
  showHints: true, // show hotspot borders
})

// Cleanup when done
instance.destroy()
```

## API

### `ClickableImg.attach(img, options): Promise<ClickableImg>`

Attaches an interactive overlay to an existing `<img>` element.

- `img` - Target `HTMLImageElement`
- `options.onClick(hotspot)` - Callback when a hotspot is clicked
- `options.showHints` - Show dashed borders around hotspot zones (default: `false`)

Returns a `ClickableImg` instance. Throws if no hotspot metadata is found in the image.

### `instance.destroy()`

Removes the overlay and restores the original DOM state.

### Re-exports from `@clickable-img/core`

- `readHotspotsFromPng(buffer)`
- Types: `Hotspot`, `HotspotRect`, `ClickableImgData`, `ClickableImgOptions`

## License

MIT
