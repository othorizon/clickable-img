<p align="center">
  <img src=".github/banner.svg" alt="clickable-img" width="100%" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@clickable-img/sdk"><img src="https://img.shields.io/npm/v/@clickable-img/sdk?color=3b82f6&label=sdk" alt="npm sdk" /></a>
  <a href="https://www.npmjs.com/package/@clickable-img/core"><img src="https://img.shields.io/npm/v/@clickable-img/core?color=8b5cf6&label=core" alt="npm core" /></a>
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="license" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen" alt="PRs welcome" />
  <a href="https://clickable-img.dev.noteloom.app/"><img src="https://img.shields.io/badge/在线编辑器-clickable--img-blue?logo=google-chrome&logoColor=white" alt="在线编辑器" /></a>
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

## 编辑图片热区

使用在线编辑器为图片创建和管理热区：

**[https://clickable-img.dev.noteloom.app](https://clickable-img.dev.noteloom.app/)**

在编辑器中，你可以在任意 PNG 图片上可视化地绘制热区、为每个热区添加标签和自定义数据，然后导出带有热区元数据的图片。导出的 PNG 可直接配合 SDK 使用，无需额外的配置文件。

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

// 读取图片中嵌入的自定义附加信息
const customData = instance.getCustomData() // string | null

// 不再需要时销毁
instance.destroy()
```

### 跨平台集成

clickable-img 可在**任何基于 JavaScript 的平台**上集成。`@clickable-img/sdk` 是面向浏览器的开箱即用封装，但并非必需——你只需要 `@clickable-img/core`。

1. **读取热区数据** — 调用 core 包的 `readHotspotsFromPng` 解析 PNG，获取热区坐标和自定义数据。
2. **自行实现交互层** — 根据热区坐标，用你所在平台的方式（Canvas、原生 View、WebGL 等）在图片上叠加可点击区域。
3. **处理点击事件** — 用户点击热区时，读取 `label` 和 `payload` 执行业务逻辑。

> core 包零外部依赖、纯 JavaScript 实现，可在 Node.js、React Native、小程序、Electron 等任何 JS 运行时中使用。

### 仅使用核心包（自定义渲染）

适用于没有内置适配器的平台（React Native、Flutter、Node.js 等）：

```bash
npm install @clickable-img/core
```

```ts
import { readHotspotsFromPng, readCustomDataFromPng } from '@clickable-img/core'

const buffer = await fetch('https://example.com/image.png')
  .then(r => r.arrayBuffer())

const data = readHotspotsFromPng(buffer)

if (data) {
  data.hotspots.forEach(hotspot => {
    // hotspot.rect -> { x, y, w, h }，值域 0~1，相对于图片尺寸
    // hotspot.label, hotspot.payload, hotspot.id
  })

  // 读取图片中嵌入的自定义附加信息
  console.log(data.customData) // string | undefined
}

// 也可以直接读取附加信息，无需处理热区数据
const customData = readCustomDataFromPng(buffer) // string | null
```

## 适用场景

当你需要在图片上实现交互时，clickable-img 是最轻量的解决方案：

- **运营广告弹窗** — 弹窗广告图中的按钮、商品区域均可配置为热区，更换广告时只需替换图片，无需改动代码。
- **活动落地页** — 设计师输出的精美活动图直接用作页面，热区负责跳转链接，免去复杂的 CSS 还原。
- **导览地图** — 景区导览图、商场楼层图等，在图片上标注兴趣点，点击即可展示详情。
- **互动教学** — 在教学图片上标注知识点热区，学生点击可查看解释说明，增强互动性。

### 典型案例：广告弹窗热更新

1. **一次开发** — 在项目中开发图片弹窗组件，集成 SDK 并配置热区点击事件的处理逻辑。
2. **配置热区** — 运营人员使用在线编辑器在新的广告图上绘制交互热区。
3. **发布内容** — 将导出的图片上传到 CDN / 对象存储，替换原有图片地址即可生效。

**效果：** 全程无需修改代码、无需重新部署，实现广告内容的热更新。

### 核心优势

- **热更新** — 替换图片即可上线新内容，无需发版
- **快速交付** — 无需用代码还原复杂 UI 设计，一张图即可承载全部视觉效果
- **低开发成本** — 展示类页面只需监听点击事件，大幅减少前端工作量

## 技术原理

所有热区数据都存储在 PNG 文件内部，无需额外服务端支持。

### PNG tEXt Chunk 存储

[PNG 规范](https://www.w3.org/TR/png/#11tEXt)定义了 `tEXt` 类型的辅助数据块，用于存储文本元数据。编辑器将热区信息序列化为 JSON，以 `clickable-img` 为关键字写入 `tEXt` chunk，插入到 `IEND` 标记之前。**图片像素数据不受任何影响。**

### 归一化坐标系

热区坐标使用 0\~1 的相对值（相对于图片宽高的百分比），因此无论图片在页面中以何种尺寸渲染，热区位置始终精确对齐。

### DOM 覆盖层渲染

SDK 在运行时请求图片的二进制数据，解析 `tEXt` chunk 中的热区 JSON，然后在 `<img>` 元素外层包裹一个 `position: relative` 容器，每个热区生成一个 `position: absolute` 定位的透明 `<div>`，监听点击事件并回调。

### 数据流

```
编辑器绘制热区 → 序列化为 JSON
        ↓
JSON 写入 PNG tEXt chunk → 导出图片
        ↓
SDK 加载图片 → 解析 tEXt chunk
        ↓
根据热区坐标生成 DOM 覆盖层 → 监听交互事件
```

## 包结构

| 包名 | 说明 | 平台 |
|------|------|------|
| [`@clickable-img/core`](./packages/core) | 类型定义 + PNG 元数据解析 | 全平台 |
| [`@clickable-img/sdk`](./packages/sdk) | 浏览器运行时，DOM 覆盖层渲染 | Web |
| [`@clickable-img/editor`](./packages/editor) | 可视化热区编辑器 | Web |

## API 参考

### `@clickable-img/sdk`

#### `ClickableImg.attach(img, options)`

| 参数 | 类型 | 说明 |
|------|------|------|
| `img` | `HTMLImageElement` | 目标图片元素 |
| `options.onClick` | `(hotspot: Hotspot) => void` | 热区点击回调 |
| `options.showHints` | `boolean` | 是否显示热区边框，默认 `false` |

返回 `Promise<ClickableImg>`，实例提供：

- `.getCustomData(): string | null` — 获取图片中嵌入的自定义附加信息，无数据时返回 `null`。
- `.destroy()` — 移除覆盖层并清理资源。

### `@clickable-img/core`

#### `readHotspotsFromPng(buffer: ArrayBuffer): ClickableImgData | null`

解析 PNG 文件中的 `tEXt` chunk，返回所有嵌入数据（热区 + 附加信息）。无数据时返回 `null`。

#### `readCustomDataFromPng(buffer: ArrayBuffer): string | null`

便捷方法，直接读取 PNG 中的自定义附加信息，无需处理热区数据。

### 数据类型

```ts
interface ClickableImgData {
  version: string
  hotspots: Hotspot[]
  customData?: string   // 嵌入图片的任意自定义文本
}

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
