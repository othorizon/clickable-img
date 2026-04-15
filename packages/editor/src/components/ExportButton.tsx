import type { Hotspot } from '../types'
import { embedHotspotsInPng, downloadBlob } from '../utils/png-writer'

interface Props {
  hotspots: Hotspot[]
  imageBuffer: ArrayBuffer | null
}

export function ExportButton({ hotspots, imageBuffer }: Props) {
  const disabled = !imageBuffer || hotspots.length === 0

  const handleExport = () => {
    if (!imageBuffer || hotspots.length === 0) return
    const blob = embedHotspotsInPng(imageBuffer, hotspots)
    downloadBlob(blob, 'clickable-image.png')
  }

  return (
    <button
      className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
        disabled
          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
      }`}
      disabled={disabled}
      onClick={handleExport}
    >
      导出图片
    </button>
  )
}
