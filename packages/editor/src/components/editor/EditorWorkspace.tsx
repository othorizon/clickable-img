import { useState } from 'react'
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
  const { hotspots, selectedId, setSelectedId, addHotspot, updateHotspot, removeHotspot, clearAll } = useHotspots()
  const [exported, setExported] = useState(false)
  const { t } = useLocale()

  const handleImageLoaded = (dataUrl: string, buffer: ArrayBuffer) => {
    setImageUrl(dataUrl)
    setImageBuffer(buffer)
    setExported(false)
    clearAll()
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-57px)]">
      {/* Canvas area */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto flex items-start justify-center">
        {imageUrl ? (
          <Canvas
            imageUrl={imageUrl}
            hotspots={hotspots}
            selectedId={selectedId}
            onAddHotspot={addHotspot}
            onSelectHotspot={setSelectedId}
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
            <ExportButton
              hotspots={hotspots}
              imageBuffer={imageBuffer}
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
