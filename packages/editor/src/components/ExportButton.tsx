import type { Hotspot } from '../types'
import { embedHotspotsInPng, downloadBlob } from '../utils/png-writer'
import { useLocale } from '../i18n'

interface Props {
  hotspots: Hotspot[]
  imageBuffer: ArrayBuffer | null
  onExported?: () => void
}

export function ExportButton({ hotspots, imageBuffer, onExported }: Props) {
  const disabled = !imageBuffer || hotspots.length === 0
  const { t } = useLocale()

  const handleExport = () => {
    if (!imageBuffer || hotspots.length === 0) return
    const blob = embedHotspotsInPng(imageBuffer, hotspots)
    downloadBlob(blob, 'clickable-image.png')
    onExported?.()
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
      {t('editor.export')}
    </button>
  )
}
