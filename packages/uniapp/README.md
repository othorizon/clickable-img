# @clickable-img/uniapp

ClickableImage component for UniApp / WeChat Mini Programs. Renders interactive hotspot overlays on images with embedded metadata.

## Install

```bash
npm install @clickable-img/uniapp
```

> This package is source-distributed (ships `.vue` and `.ts` source files). No build step is needed for the package itself — your UniApp project's build pipeline handles compilation.

## Features

- Vue 3 Composition API (`<script setup>`)
- UniApp native image and request APIs (`<image>`, `uni.request`)
- Automatic PNG hotspot metadata parsing
- Optional hint borders for hotspot zones
- Touch-friendly for mini program interactions

## Usage

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
  console.error('Failed to load hotspots:', err)
}
</script>
```

### easycom Registration

You can also register the component globally via `pages.json`:

```json
{
  "easycom": {
    "custom": {
      "ClickableImage": "@clickable-img/uniapp/components/ClickableImage.vue"
    }
  }
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | *required* | Image URL (HTTP/HTTPS) |
| `mode` | `string` | `'widthFix'` | UniApp `<image>` display mode |
| `showHints` | `boolean` | `false` | Show dashed borders around hotspot zones |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `hotspot-tap` | `Hotspot` | Emitted when a hotspot zone is tapped |
| `load-error` | `Error` | Emitted when image loading or hotspot parsing fails |

## Peer Dependencies

- `vue >= 3.0.0`

## License

MIT
