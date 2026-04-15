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
    'hero.sdkBtn': '集成指南',

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
    'panel.jsonFormat': 'JSON 格式化',
    'panel.jsonValid': 'JSON 格式正确，已自动格式化',
    'panel.jsonInvalid': '非标准 JSON 格式，但不影响使用，内容将原样嵌入',

    // Existing data detection
    'editor.existingData': '该图片已包含 {count} 个热区数据',
    'editor.existingCustomData': '及附加信息',
    'editor.existingDataHint': '已自动加载，可直接编辑。重新导出将覆盖原有数据。',

    // Custom Data
    'editor.customData': '附加信息（嵌入图片的自定义内容）',
    'editor.customDataPlaceholder': '输入任意文本，将随图片一起导出嵌入',
    'tester.customData': '附加信息',

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
    'sdk.customDataComment': '读取图片中嵌入的自定义附加信息',
    'sdk.coreUsage': '跨平台使用（Core）',
    'sdk.coreReadHotspots': '解析热区数据和附加信息',
    'sdk.coreReadCustomData': '或直接读取附加信息',
    'sdk.pkg.core.name': '@clickable-img/core',
    'sdk.pkg.core.desc': '核心库，提供类型定义和 PNG 元数据解析，零外部依赖，适用于任何平台。',
    'sdk.pkg.sdk.name': '@clickable-img/sdk',
    'sdk.pkg.sdk.desc': '浏览器端 SDK，自动读取图片热区数据并渲染可交互覆盖层，开箱即用。',
    'sdk.viewOnGithub': '查看 GitHub 文档',
    'sdk.githubHint': '完整的安装指南、API 文档和使用示例',

    // Use Cases
    'usecases.title': '适用场景',
    'usecases.subtitle': '当你需要在图片上实现交互时，clickable-img 是最轻量的解决方案',
    'usecases.ad.title': '运营广告弹窗',
    'usecases.ad.desc': '弹窗广告图中的按钮、商品区域均可配置为热区，更换广告时只需替换图片，无需改动代码。',
    'usecases.landing.title': '活动落地页',
    'usecases.landing.desc': '设计师输出的精美活动图直接用作页面，热区负责跳转链接，免去复杂的 CSS 还原。',
    'usecases.map.title': '导览地图',
    'usecases.map.desc': '景区导览图、商场楼层图等，在图片上标注兴趣点，点击即可展示详情。',
    'usecases.edu.title': '互动教学',
    'usecases.edu.desc': '在教学图片上标注知识点热区，学生点击可查看解释说明，增强互动性。',
    'usecases.case.title': '典型案例：广告弹窗热更新',
    'usecases.case.step1': '项目中开发一次图片弹窗组件，集成 SDK 并配置热区点击事件的处理逻辑',
    'usecases.case.step2': '运营人员使用在线编辑器在新的广告图上绘制交互热区',
    'usecases.case.step3': '将导出的图片上传到 CDN / 对象存储，替换原有图片地址即可生效',
    'usecases.case.result': '全程无需修改代码、无需重新部署，实现广告内容的热更新。',
    'usecases.adv.title': '核心优势',
    'usecases.adv.hotUpdate': '热更新：替换图片即可上线新内容，无需发版',
    'usecases.adv.fastShip': '快速交付：无需用代码还原复杂 UI 设计，一张图即可承载',
    'usecases.adv.lowCost': '低开发成本：展示类页面只需监听点击事件，大幅减少前端工作量',

    // Technical Principle
    'tech.title': '技术原理',
    'tech.subtitle': '所有热区数据都存储在 PNG 文件内部，无需额外服务端支持',
    'tech.storage.title': 'PNG tEXt Chunk 存储',
    'tech.storage.desc': 'PNG 规范定义了 tEXt 类型的辅助数据块，用于存储文本元数据。编辑器将热区信息序列化为 JSON，以 "clickable-img" 为关键字写入 tEXt chunk，插入到 IEND 之前。图片像素数据不受任何影响。',
    'tech.coord.title': '归一化坐标系',
    'tech.coord.desc': '热区坐标使用 0~1 的相对值（相对于图片宽高的百分比），因此无论图片在页面中以何种尺寸渲染，热区位置始终精确对齐。',
    'tech.render.title': 'DOM 覆盖层渲染',
    'tech.render.desc': 'SDK 在运行时请求图片数据，解析 tEXt chunk 中的热区 JSON，然后在图片外层包裹一个 relative 容器，每个热区生成一个 absolute 定位的透明 div，监听点击事件并回调。',
    'tech.flow.title': '数据流',
    'tech.flow.step1': '编辑器绘制热区 → 序列化为 JSON',
    'tech.flow.step2': 'JSON 写入 PNG tEXt chunk → 导出图片',
    'tech.flow.step3': 'SDK 加载图片 → 解析 tEXt chunk',
    'tech.flow.step4': '根据热区坐标生成 DOM 覆盖层 → 监听交互事件',

    // Cross-platform
    'xplat.title': '跨平台集成',
    'xplat.desc': 'clickable-img 可在任何基于 JavaScript 的平台上集成。@clickable-img/sdk 是面向浏览器的开箱即用封装，但并非必需——你只需要 @clickable-img/core。',
    'xplat.step1.title': '读取热区数据',
    'xplat.step1.desc': '调用 core 包的 readHotspotsFromPng 解析 PNG，获取热区坐标和自定义数据。',
    'xplat.step2.title': '自行实现交互层',
    'xplat.step2.desc': '根据热区坐标，用你所在平台的方式（Canvas、原生 View、WebGL 等）在图片上叠加可点击区域。',
    'xplat.step3.title': '处理点击事件',
    'xplat.step3.desc': '用户点击热区时，读取 label 和 payload 执行业务逻辑，如跳转页面、弹窗展示等。',
    'xplat.hint': 'core 包零外部依赖、纯 JavaScript 实现，可在 Node.js、React Native、小程序、Electron 等任何 JS 运行时中使用。',

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
    'hero.sdkBtn': 'Integration Guide',

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
    'panel.jsonFormat': 'Format JSON',
    'panel.jsonValid': 'Valid JSON, formatted',
    'panel.jsonInvalid': 'Not standard JSON, but it will still be embedded as-is',

    // Existing data detection
    'editor.existingData': 'This image contains {count} existing hotspot(s)',
    'editor.existingCustomData': 'and custom data',
    'editor.existingDataHint': 'Loaded automatically. Re-exporting will overwrite the original data.',

    // Custom Data
    'editor.customData': 'Custom Data (embedded in the image)',
    'editor.customDataPlaceholder': 'Enter any text to embed with the image',
    'tester.customData': 'Custom Data',

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
    'sdk.customDataComment': 'Read custom data embedded in the image',
    'sdk.coreUsage': 'Cross-Platform Usage (Core)',
    'sdk.coreReadHotspots': 'Parse hotspot data and custom data',
    'sdk.coreReadCustomData': 'Or read custom data directly',
    'sdk.pkg.core.name': '@clickable-img/core',
    'sdk.pkg.core.desc': 'Core library with type definitions and PNG metadata parsing. Zero dependencies, works on any platform.',
    'sdk.pkg.sdk.name': '@clickable-img/sdk',
    'sdk.pkg.sdk.desc': 'Browser SDK that reads image hotspot data and renders interactive overlays. Works out of the box.',
    'sdk.viewOnGithub': 'View on GitHub',
    'sdk.githubHint': 'Full installation guide, API docs, and usage examples',

    // Use Cases
    'usecases.title': 'Use Cases',
    'usecases.subtitle': 'When you need interactive regions on images, clickable-img is the lightest solution',
    'usecases.ad.title': 'Ad Pop-ups',
    'usecases.ad.desc': 'Buttons and product areas in pop-up ads can be configured as hotspots. Swap the image to update — no code changes needed.',
    'usecases.landing.title': 'Campaign Pages',
    'usecases.landing.desc': 'Use the designer\'s artwork directly as the page. Hotspots handle navigation links — no complex CSS reproduction needed.',
    'usecases.map.title': 'Interactive Maps',
    'usecases.map.desc': 'Scenic area guides, mall floor plans — mark points of interest on the image, click to show details.',
    'usecases.edu.title': 'Interactive Learning',
    'usecases.edu.desc': 'Mark knowledge points on educational images. Students click to view explanations, enhancing engagement.',
    'usecases.case.title': 'Real-World Example: Hot-Updatable Ad Pop-ups',
    'usecases.case.step1': 'Develop the image pop-up component once, integrate the SDK and configure hotspot click handlers',
    'usecases.case.step2': 'Operations team uses the online editor to draw hotspots on the new ad image',
    'usecases.case.step3': 'Upload the exported image to CDN / object storage, replacing the old image URL',
    'usecases.case.result': 'No code changes, no redeployment — ad content is hot-updated instantly.',
    'usecases.adv.title': 'Key Advantages',
    'usecases.adv.hotUpdate': 'Hot Update: replace the image to ship new content, no release needed',
    'usecases.adv.fastShip': 'Fast Delivery: no need to reproduce complex UI designs in code — one image carries it all',
    'usecases.adv.lowCost': 'Low Dev Cost: display-oriented pages only need click event listeners, drastically reducing frontend work',

    // Technical Principle
    'tech.title': 'Technical Principle',
    'tech.subtitle': 'All hotspot data is stored inside the PNG file — no extra server required',
    'tech.storage.title': 'PNG tEXt Chunk Storage',
    'tech.storage.desc': 'The PNG spec defines tEXt auxiliary chunks for storing text metadata. The editor serializes hotspot data as JSON, writes it into a tEXt chunk keyed "clickable-img", and inserts it before the IEND marker. Pixel data remains untouched.',
    'tech.coord.title': 'Normalized Coordinates',
    'tech.coord.desc': 'Hotspot coordinates use relative values in the 0~1 range (percentage of image dimensions), so hotspots always align precisely regardless of the rendered image size.',
    'tech.render.title': 'DOM Overlay Rendering',
    'tech.render.desc': 'The SDK fetches the image data at runtime, parses the hotspot JSON from the tEXt chunk, wraps the image in a relative container, and generates an absolute-positioned transparent div for each hotspot with click event listeners.',
    'tech.flow.title': 'Data Flow',
    'tech.flow.step1': 'Editor draws hotspots → serialized to JSON',
    'tech.flow.step2': 'JSON written into PNG tEXt chunk → image exported',
    'tech.flow.step3': 'SDK loads image → parses tEXt chunk',
    'tech.flow.step4': 'DOM overlay generated from hotspot coordinates → interaction events bound',

    // Cross-platform
    'xplat.title': 'Cross-Platform Integration',
    'xplat.desc': 'clickable-img works on any JavaScript-based platform. @clickable-img/sdk is a ready-to-use wrapper for the browser, but it\'s not required — all you need is @clickable-img/core.',
    'xplat.step1.title': 'Read Hotspot Data',
    'xplat.step1.desc': 'Call readHotspotsFromPng from the core package to parse the PNG and extract hotspot coordinates and custom data.',
    'xplat.step2.title': 'Build Your Own Overlay',
    'xplat.step2.desc': 'Use the hotspot coordinates to create clickable regions on top of the image using your platform\'s approach — Canvas, native Views, WebGL, etc.',
    'xplat.step3.title': 'Handle Click Events',
    'xplat.step3.desc': 'When a user taps a hotspot, read its label and payload to execute business logic — navigate, show a modal, trigger an action, etc.',
    'xplat.hint': 'The core package has zero external dependencies and is pure JavaScript — it runs in Node.js, React Native, Mini Programs, Electron, and any other JS runtime.',

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
