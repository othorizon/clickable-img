import { useState } from 'react'
import { readHotspotsFromPng } from '@clickable-img/sdk'
import { ImageUploader } from '../ImageUploader'
import { Canvas } from '../Canvas'
import { HotspotPanel } from '../HotspotPanel'
import { ExportButton } from '../ExportButton'
import { useHotspots } from '../../hooks/useHotspots'
import { useLocale } from '../../i18n'

interface Props {
  initialImageUrl?: string | null
  initialImageBuffer?: ArrayBuffer | null
  onSwitchToTester: () => void
}

export function EditorWorkspace({ initialImageUrl, initialImageBuffer, onSwitchToTester }: Props) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl ?? null)
  const [imageBuffer, setImageBuffer] = useState<ArrayBuffer | null>(initialImageBuffer ?? null)
  const { hotspots, selectedId, setSelectedId, addHotspot, updateHotspot, updateHotspotRect, removeHotspot, loadHotspots, clearAll } = useHotspots()
  const [customData, setCustomData] = useState('')
  const [exported, setExported] = useState(false)
  const [existingDataInfo, setExistingDataInfo] = useState<{ hotspotCount: number; hasCustomData: boolean } | null>(null)
  const { t } = useLocale()

  const handleImageLoaded = (dataUrl: string, buffer: ArrayBuffer) => {
    setImageUrl(dataUrl)
    setImageBuffer(buffer)
    setExported(false)
    setCustomData('')
    clearAll()
    setExistingDataInfo(null)

    // Detect existing embedded data
    const existingData = readHotspotsFromPng(buffer)
    if (existingData && (existingData.hotspots.length > 0 || existingData.customData)) {
      loadHotspots(existingData.hotspots)
      setCustomData(existingData.customData ?? '')
      setExistingDataInfo({
        hotspotCount: existingData.hotspots.length,
        hasCustomData: !!existingData.customData,
      })
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-57px)]">
      {/* Canvas area */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto flex flex-col items-center">
        {existingDataInfo && (
          <div className="w-full max-w-2xl mb-3 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-sm">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            <div className="flex-1">
              <p className="text-amber-800">
                {t('editor.existingData', {
                  count: existingDataInfo.hotspotCount,
                })}
                {existingDataInfo.hasCustomData && ` ${t('editor.existingCustomData')}`}
                {` ${t('editor.existingDataHint')}`}
              </p>
            </div>
            <button
              className="text-amber-600 hover:text-amber-800 shrink-0"
              onClick={() => setExistingDataInfo(null)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {imageUrl ? (
          <Canvas
            imageUrl={imageUrl}
            hotspots={hotspots}
            selectedId={selectedId}
            onAddHotspot={addHotspot}
            onSelectHotspot={setSelectedId}
            onUpdateRect={updateHotspotRect}
          />
        ) : (
          <div className="w-full max-w-lg mt-16 sm:mt-32">
            <ImageUploader onImageLoaded={handleImageLoaded} />
            <p className="text-center text-sm text-gray-400 mt-4">
              {t('editor.dragHint')}
            </p>
          </div>
        )}
      </div>

      {/* Right panel */}
      {imageUrl && (
        <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l p-4 flex flex-col">
          <div className="flex-1 overflow-auto">
            <HotspotPanel
              hotspots={hotspots}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onUpdate={updateHotspot}
              onRemove={removeHotspot}
            />
          </div>

          <div className="border-t pt-4 space-y-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('editor.customData')}</label>
              <textarea
                className="w-full border rounded px-2 py-1.5 text-sm h-20 resize-none font-mono focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={customData}
                onChange={(e) => setCustomData(e.target.value)}
                placeholder={t('editor.customDataPlaceholder')}
              />
            </div>

            <ExportButton
              hotspots={hotspots}
              imageBuffer={imageBuffer}
              customData={customData || undefined}
              onExported={() => setExported(true)}
            />

            {exported && (
              <button
                className="w-full py-2 text-sm text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={onSwitchToTester}
              >
                {t('editor.goTest')}
              </button>
            )}

            <button
              className="w-full py-2 text-sm text-gray-500 border rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => {
                setImageUrl(null)
                setImageBuffer(null)
                setExported(false)
                setCustomData('')
                setExistingDataInfo(null)
                clearAll()
              }}
            >
              {t('editor.reupload')}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
