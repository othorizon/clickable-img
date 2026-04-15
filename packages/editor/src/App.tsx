import { useState } from 'react'
import { ImageUploader } from './components/ImageUploader'
import { Canvas } from './components/Canvas'
import { HotspotPanel } from './components/HotspotPanel'
import { ExportButton } from './components/ExportButton'
import { useHotspots } from './hooks/useHotspots'

export default function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageBuffer, setImageBuffer] = useState<ArrayBuffer | null>(null)
  const { hotspots, selectedId, setSelectedId, addHotspot, updateHotspot, removeHotspot, clearAll } = useHotspots()

  const handleImageLoaded = (dataUrl: string, buffer: ArrayBuffer) => {
    setImageUrl(dataUrl)
    setImageBuffer(buffer)
    clearAll()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Clickable Image Editor</h1>
        <span className="text-xs text-gray-400">在图片上拖拽创建可点击热区</span>
      </header>

      <div className="flex h-[calc(100vh-53px)]">
        {/* Left: Canvas area */}
        <div className="flex-1 p-6 overflow-auto flex items-start justify-center">
          {imageUrl ? (
            <Canvas
              imageUrl={imageUrl}
              hotspots={hotspots}
              selectedId={selectedId}
              onAddHotspot={addHotspot}
              onSelectHotspot={setSelectedId}
            />
          ) : (
            <div className="w-full max-w-lg mt-32">
              <ImageUploader onImageLoaded={handleImageLoaded} />
            </div>
          )}
        </div>

        {/* Right: Panel */}
        {imageUrl && (
          <div className="w-80 bg-white border-l p-4 flex flex-col">
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
              <ExportButton hotspots={hotspots} imageBuffer={imageBuffer} />
              <button
                className="w-full py-2 text-sm text-gray-500 border rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setImageUrl(null)
                  setImageBuffer(null)
                  clearAll()
                }}
              >
                重新上传
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
