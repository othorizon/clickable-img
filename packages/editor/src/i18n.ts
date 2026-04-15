import { createContext, useContext } from 'react'

export type Locale = 'zh' | 'en'

const messages: Record<Locale, Record<string, string>> = {
  zh: {
    // Header
    'header.brand': 'Clickable Image',
    'header.editor': '编辑器',
    'header.tester': '测试热区',
    'header.home': '首页',

    // Hero
    'hero.title': '图片热区编辑器',
    'hero.subtitle': '在 PNG 图片上创建可交互的点击热区',
    'hero.description': '免费在线工具，可视化绘制热区、添加标签和自定义数据，导出后热区元数据直接嵌入图片文件。配套零依赖 SDK，轻松集成到任何网页项目。',
    'hero.startBtn': '开始创建',
    'hero.testBtn': '测试热区',

    // Features
    'features.title': '核心特性',
    'features.draw.title': '可视化绘制',
    'features.draw.desc': '直接在图片上拖拽绘制矩形热区，所见即所得，支持选中、编辑和删除。',
    'features.embed.title': '元数据嵌入',
    'features.embed.desc': '热区数据以 PNG tEXt 块形式嵌入图片，不改变像素内容，一个文件携带全部信息。',
    'features.sdk.title': '零依赖 SDK',
    'features.sdk.desc': '配套的 @clickable-img/sdk 无任何外部依赖，体积小巧，支持 ESM/CJS，轻松集成。',
    'features.test.title': '在线测试',
    'features.test.desc': '上传导出的图片，立即在浏览器中预览和测试热区效果，点击查看详细数据。',

    // How it works
    'howto.title': '使用方式',
    'howto.step1.title': '上传图片',
    'howto.step1.desc': '拖拽或点击上传一张 PNG 格式的图片',
    'howto.step2.title': '绘制热区',
    'howto.step2.desc': '在图片上拖拽鼠标绘制矩形可点击区域',
    'howto.step3.title': '设置数据',
    'howto.step3.desc': '为每个热区添加名称标签和自定义 Payload 数据',
    'howto.step4.title': '导出图片',
    'howto.step4.desc': '导出带有嵌入元数据的 PNG 图片，可直接使用 SDK 加载',

    // Try it
    'tryit.title': '立即体验',
    'tryit.desc': '上传一张 PNG 图片，马上开始创建热区',

    // Editor
    'editor.dragHint': '在图片上拖拽创建可点击热区',
    'editor.imgAlt': '编辑中的图片',
    'editor.reupload': '重新上传',
    'editor.export': '导出图片',
    'editor.exported': '已导出！',
    'editor.goTest': '去测试热区效果 →',

    // Hotspot Panel
    'panel.title': '热区列表',
    'panel.empty': '在图片上拖拽以创建热区',
    'panel.unnamed': '未命名热区',
    'panel.editTitle': '编辑热区',
    'panel.label': '名称',
    'panel.payload': 'Payload（点击时回调的数据）',
    'panel.payloadPlaceholder': '输入任意数据，例如 JSON: {"action": "open", "url": "..."}',
    'panel.position': '位置',
    'panel.size': '大小',
    'panel.delete': '删除此热区',

    // Uploader
    'upload.hint': '拖拽或点击上传 PNG 图片',
    'upload.format': '支持 PNG 格式',
    'upload.pngOnly': '请上传 PNG 格式的图片',

    // Tester
    'tester.title': '热区测试',
    'tester.desc': '上传一张已导出的带热区数据的 PNG 图片，在线测试点击效果',
    'tester.upload': '上传已导出的 PNG 图片进行测试',
    'tester.found': '找到 {count} 个热区',
    'tester.noData': '未检测到热区数据',
    'tester.noDataHint': '请确保上传的是通过本工具导出的 PNG 图片',
    'tester.reset': '重新上传',
    'tester.clickHint': '点击热区查看详细数据',
    'tester.detailTitle': '热区详情',
    'tester.detailLabel': '名称',
    'tester.detailPayload': 'Payload',
    'tester.detailPosition': '位置',
    'tester.detailSize': '大小',
    'tester.imgAlt': '测试中的图片',

    // SDK Guide
    'sdk.title': '开发者集成指南',
    'sdk.subtitle': '通过 SDK 将可点击热区集成到你的网页项目中，支持浏览器和小程序平台。',
    'sdk.install': '快速安装',
    'sdk.usage': '快速使用',
    'sdk.usageComment': '自动读取 PNG 中嵌入的热区数据并渲染交互层',
    'sdk.pkg.core.name': '@clickable-img/core',
    'sdk.pkg.core.desc': '核心库，提供类型定义和 PNG 元数据解析，零外部依赖，适用于任何平台。',
    'sdk.pkg.sdk.name': '@clickable-img/sdk',
    'sdk.pkg.sdk.desc': '浏览器端 SDK，自动读取图片热区数据并渲染可交互覆盖层，开箱即用。',
    'sdk.pkg.uniapp.name': '@clickable-img/uniapp',
    'sdk.pkg.uniapp.desc': 'UniApp / 微信小程序组件，Vue 3 适配，跨端支持。',
    'sdk.viewOnGithub': '查看 GitHub 文档',
    'sdk.githubHint': '完整的安装指南、API 文档和使用示例',

    // Footer
    'footer.desc': '免费开源的图片热区编辑工具',
    'footer.github': 'GitHub',
    'footer.license': 'MIT 开源协议',
  },
  en: {
    // Header
    'header.brand': 'Clickable Image',
    'header.editor': 'Editor',
    'header.tester': 'Test Hotspots',
    'header.home': 'Home',

    // Hero
    'hero.title': 'Image Hotspot Editor',
    'hero.subtitle': 'Create Interactive Clickable Hotspots on PNG Images',
    'hero.description': 'A free online tool to visually draw hotspot regions, add labels and custom payload data, then export images with metadata embedded directly in the PNG file. Comes with a zero-dependency SDK for easy integration.',
    'hero.startBtn': 'Start Creating',
    'hero.testBtn': 'Test Hotspots',

    // Features
    'features.title': 'Key Features',
    'features.draw.title': 'Visual Drawing',
    'features.draw.desc': 'Drag to draw rectangular hotspots directly on the image. Select, edit, and delete with ease.',
    'features.embed.title': 'Metadata Embedding',
    'features.embed.desc': 'Hotspot data is embedded as PNG tEXt chunks — no pixel changes, one file carries everything.',
    'features.sdk.title': 'Zero-Dep SDK',
    'features.sdk.desc': 'The @clickable-img/sdk has zero external dependencies. Tiny footprint, supports ESM & CJS.',
    'features.test.title': 'Online Testing',
    'features.test.desc': 'Upload an exported image to instantly preview and test hotspots in your browser.',

    // How it works
    'howto.title': 'How It Works',
    'howto.step1.title': 'Upload Image',
    'howto.step1.desc': 'Drag & drop or click to upload a PNG image',
    'howto.step2.title': 'Draw Hotspots',
    'howto.step2.desc': 'Drag on the image to create rectangular clickable regions',
    'howto.step3.title': 'Set Data',
    'howto.step3.desc': 'Add labels and custom payload data to each hotspot',
    'howto.step4.title': 'Export',
    'howto.step4.desc': 'Export the PNG with embedded metadata, ready for SDK integration',

    // Try it
    'tryit.title': 'Try It Now',
    'tryit.desc': 'Upload a PNG image to start creating hotspots',

    // Editor
    'editor.dragHint': 'Drag on the image to create clickable hotspots',
    'editor.imgAlt': 'Image being edited',
    'editor.reupload': 'Upload New Image',
    'editor.export': 'Export Image',
    'editor.exported': 'Exported!',
    'editor.goTest': 'Test Hotspots →',

    // Hotspot Panel
    'panel.title': 'Hotspot List',
    'panel.empty': 'Drag on the image to create a hotspot',
    'panel.unnamed': 'Unnamed Hotspot',
    'panel.editTitle': 'Edit Hotspot',
    'panel.label': 'Label',
    'panel.payload': 'Payload (callback data on click)',
    'panel.payloadPlaceholder': 'Enter any data, e.g. JSON: {"action": "open", "url": "..."}',
    'panel.position': 'Position',
    'panel.size': 'Size',
    'panel.delete': 'Delete Hotspot',

    // Uploader
    'upload.hint': 'Drag & drop or click to upload a PNG image',
    'upload.format': 'PNG format supported',
    'upload.pngOnly': 'Please upload a PNG image',

    // Tester
    'tester.title': 'Hotspot Tester',
    'tester.desc': 'Upload an exported PNG with hotspot data to test the click behavior online',
    'tester.upload': 'Upload an exported PNG image to test',
    'tester.found': 'Found {count} hotspot(s)',
    'tester.noData': 'No hotspot data detected',
    'tester.noDataHint': 'Make sure you upload a PNG exported from this tool',
    'tester.reset': 'Upload Another',
    'tester.clickHint': 'Click a hotspot to view its data',
    'tester.detailTitle': 'Hotspot Details',
    'tester.detailLabel': 'Label',
    'tester.detailPayload': 'Payload',
    'tester.detailPosition': 'Position',
    'tester.detailSize': 'Size',
    'tester.imgAlt': 'Image being tested',

    // SDK Guide
    'sdk.title': 'Developer Integration Guide',
    'sdk.subtitle': 'Integrate clickable hotspots into your web projects via our SDK. Supports browsers and mini programs.',
    'sdk.install': 'Quick Install',
    'sdk.usage': 'Quick Start',
    'sdk.usageComment': 'Auto-reads hotspot data embedded in PNG and renders interactive overlay',
    'sdk.pkg.core.name': '@clickable-img/core',
    'sdk.pkg.core.desc': 'Core library with type definitions and PNG metadata parsing. Zero dependencies, works on any platform.',
    'sdk.pkg.sdk.name': '@clickable-img/sdk',
    'sdk.pkg.sdk.desc': 'Browser SDK that reads image hotspot data and renders interactive overlays. Works out of the box.',
    'sdk.pkg.uniapp.name': '@clickable-img/uniapp',
    'sdk.pkg.uniapp.desc': 'UniApp / WeChat Mini Program component with Vue 3 support for cross-platform use.',
    'sdk.viewOnGithub': 'View on GitHub',
    'sdk.githubHint': 'Full installation guide, API docs, and usage examples',

    // Footer
    'footer.desc': 'Free & open-source image hotspot editor',
    'footer.github': 'GitHub',
    'footer.license': 'MIT License',
  },
}

function detectLocale(): Locale {
  const saved = localStorage.getItem('clickable-img-locale')
  if (saved === 'zh' || saved === 'en') return saved
  return navigator.language.startsWith('zh') ? 'zh' : 'en'
}

export interface LocaleContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

function createTranslator(locale: Locale) {
  return (key: string, vars?: Record<string, string | number>): string => {
    let text = messages[locale][key] ?? messages['en'][key] ?? key
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, String(v))
      }
    }
    return text
  }
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: createTranslator('en'),
})

export function useLocale() {
  return useContext(LocaleContext)
}

export { detectLocale, createTranslator }
