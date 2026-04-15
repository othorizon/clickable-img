import { useEffect } from 'react'
import type { Hotspot, HotspotRect } from '../types'
import { useDragRect } from '../hooks/useDragRect'

interface Props {
  imageUrl: string
  hotspots: Hotspot[]
  selectedId: string | null
  onAddHotspot: (rect: HotspotRect) => void
  onSelectHotspot: (id: string | null) => void
}

export function Canvas({ imageUrl, hotspots, selectedId, onAddHotspot, onSelectHotspot }: Props) {
  const { containerRef, dragRect, onPointerDown, onPointerMove, onPointerUp } = useDragRect(onAddHotspot)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSelectHotspot(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSelectHotspot])

  return (
    <div
      ref={containerRef}
      className="relative inline-block select-none cursor-crosshair touch-none"
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).dataset.hotspot) {
          return
        }
        onSelectHotspot(null)
        onPointerDown(e)
      }}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <img
        src={imageUrl}
        alt="Image being edited"
        className="max-w-full max-h-[70vh] block pointer-events-none"
        draggable={false}
      />

      {/* Existing hotspots */}
      {hotspots.map((hs) => (
        <div
          key={hs.id}
          data-hotspot="true"
          className={`absolute border-2 transition-colors cursor-pointer ${
            selectedId === hs.id
              ? 'border-blue-500 bg-blue-500/20'
              : 'border-blue-400/60 bg-blue-400/10 hover:bg-blue-400/20'
          }`}
          style={{
            left: `${hs.rect.x * 100}%`,
            top: `${hs.rect.y * 100}%`,
            width: `${hs.rect.w * 100}%`,
            height: `${hs.rect.h * 100}%`,
          }}
          onPointerDown={(e) => {
            e.stopPropagation()
            onSelectHotspot(hs.id)
          }}
        >
          <span className="absolute -top-5 left-0 text-xs text-blue-600 bg-white/80 px-1 rounded whitespace-nowrap">
            {hs.label}
          </span>
        </div>
      ))}

      {/* Drag preview */}
      {dragRect && (
        <div
          className="absolute border-2 border-dashed border-green-500 bg-green-500/10 pointer-events-none"
          style={{
            left: `${dragRect.x * 100}%`,
            top: `${dragRect.y * 100}%`,
            width: `${dragRect.w * 100}%`,
            height: `${dragRect.h * 100}%`,
          }}
        />
      )}
    </div>
  )
}
