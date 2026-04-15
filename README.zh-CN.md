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
  将可交互的点击热区嵌入 PNG 图片。<br/>
  用编辑器画一次，用 SDK 在任意平台渲染。
</p>

<p align="center">
  <a href="./README.md">English</a> | <b>简体中文</b>
</p>

---

## 工作原理

1. **绘制** — 使用可视化 **编辑器** 在图片上框选热区
2. **导出** — 生成标准 PNG 文件，热区数据以 `tEXt` chunk 形式嵌入其中
3. **渲染** — 在应用中加载该 PNG，SDK 自动读取元数据并生成可点击区域

无需服务端，所有数据都存储在 PNG 文件本身。

## 包结构

| 包名 | 说明 | 平台 |
|------|------|------|
| [`@clickable-img/core`](./packages/core) | 类型定义 + PNG 元数据解析 | 全平台 |
| [`@clickable-img/sdk`](./packages/sdk) | 浏览器运行时，DOM 覆盖层渲染 | Web |
| [`@clickable-img/editor`](./packages/editor) | 可视化热区编辑器 | Web |

## 快速开始

### Web 浏览器

```bash
npm install @clickable-img/sdk
```

```ts
import { ClickableImg } from '@clickable-img/sdk'

const img = document.querySelector('img#hero')

const instance = await ClickableImg.attach(img, {
  onClick(hotspot) {
    console.log(hotspot.label)   // "立即购买"
    console.log(hotspot.payload) // "product-123"
  },
  showHints: true, // 可选，显示热区边框
})

// 不再需要时销毁
instance.destroy()
```

### 仅使用核心包（自定义渲染）

适用于没有内置适配器的平台（React Native、Flutter、Node.js 等）：

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
    // hotspot.rect -> { x, y, w, h }，值域 0~1，相对于图片尺寸
    // hotspot.label, hotspot.payload, hotspot.id
  })
}
```

## API 参考

### `@clickable-img/sdk`

#### `ClickableImg.attach(img, options)`

| 参数 | 类型 | 说明 |
|------|------|------|
| `img` | `HTMLImageElement` | 目标图片元素 |
| `options.onClick` | `(hotspot: Hotspot) => void` | 热区点击回调 |
| `options.showHints` | `boolean` | 是否显示热区边框，默认 `false` |

返回 `Promise<ClickableImg>`，调用 `.destroy()` 移除覆盖层。

### `@clickable-img/core`

#### `readHotspotsFromPng(buffer: ArrayBuffer): ClickableImgData | null`

解析 PNG 文件中的 `tEXt` chunk，返回热区数据。无数据时返回 `null`。

### 数据类型

```ts
interface Hotspot {
  id: string        // 唯一标识
  rect: HotspotRect // 位置和尺寸
  label: string     // 显示名称
  payload: string   // 自定义数据（JSON 字符串、URL、ID 等）
}

interface HotspotRect {
  x: number  // 0~1，相对于图片宽度的左偏移
  y: number  // 0~1，相对于图片高度的上偏移
  w: number  // 0~1，相对于图片宽度的宽
  h: number  // 0~1，相对于图片高度的高
}
```

## 本地开发

```bash
pnpm install   # 安装依赖
pnpm dev       # 启动所有包的开发模式
pnpm build     # 构建所有包
```

## 参与贡献

欢迎贡献代码！请先开一个 Issue 讨论你想要改进的内容。

## 许可证

[MIT](./LICENSE)
