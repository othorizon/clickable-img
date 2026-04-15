import { useEffect, useCallback, useRef, useState } from 'react'
import type { Hotspot, HotspotRect } from '../types'
import { useDragRect } from '../hooks/useDragRect'

type ResizeHandle = 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w'

interface InteractionState {
  type: 'move' | 'resize'
  hotspotId: string
  handle?: ResizeHandle
  startMouseX: number
  startMouseY: number
  originalRect: HotspotRect
}

const HANDLE_CURSORS: Record<ResizeHandle, string> = {
  nw: 'nwse-resize', ne: 'nesw-resize', sw: 'nesw-resize', se: 'nwse-resize',
  n: 'ns-resize', s: 'ns-resize', e: 'ew-resize', w: 'ew-resize',
}

interface Props {
  imageUrl: string
  hotspots: Hotspot[]
  selectedId: string | null
  onAddHotspot: (rect: HotspotRect) => void
  onSelectHotspot: (id: string | null) => void
  onUpdateRect: (id: string, rect: HotspotRect) => void
}

export function Canvas({ imageUrl, hotspots, selectedId, onAddHotspot, onSelectHotspot, onUpdateRect }: Props) {
  const { containerRef, dragRect, onPointerDown, onPointerMove, onPointerUp } = useDragRect(onAddHotspot)
  const interactionRef = useRef<InteractionState | null>(null)
  const [liveRect, setLiveRect] = useState<{ id: string; rect: HotspotRect } | null>(null)

  const getRelativePos = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const container = containerRef.current
    if (!container) return null
    const bounds = container.getBoundingClientRect()
    return {
      x: Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width)),
      y: Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height)),
    }
  }, [containerRef])

  const handleInteractionPointerDown = useCallback((
    e: React.PointerEvent,
    hotspotId: string,
    type: 'move' | 'resize',
    handle?: ResizeHandle,
  ) => {
    e.stopPropagation()
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)

    const hs = hotspots.find((h) => h.id === hotspotId)
    if (!hs) return

    const pos = getRelativePos(e.clientX, e.clientY)
    if (!pos) return

    onSelectHotspot(hotspotId)
    interactionRef.current = {
      type,
      hotspotId,
      handle,
      startMouseX: pos.x,
      startMouseY: pos.y,
      originalRect: { ...hs.rect },
    }
  }, [hotspots, getRelativePos, onSelectHotspot])

  const handleInteractionPointerMove = useCallback((e: React.PointerEvent) => {
    const state = interactionRef.current
    if (!state) return

    const pos = getRelativePos(e.clientX, e.clientY)
    if (!pos) return

    const dx = pos.x - state.startMouseX
    const dy = pos.y - state.startMouseY
    const orig = state.originalRect

    let newRect: HotspotRect

    if (state.type === 'move') {
      let nx = orig.x + dx
      let ny = orig.y + dy
      nx = Math.max(0, Math.min(1 - orig.w, nx))
      ny = Math.max(0, Math.min(1 - orig.h, ny))
      newRect = { x: nx, y: ny, w: orig.w, h: orig.h }
    } else {
      const handle = state.handle!
      let x = orig.x
      let y = orig.y
      let w = orig.w
      let h = orig.h

      if (handle.includes('w')) {
        x = Math.max(0, Math.min(orig.x + orig.w - 0.01, orig.x + dx))
        w = orig.x + orig.w - x
      }
      if (handle.includes('e')) {
        w = Math.max(0.01, Math.min(1 - orig.x, orig.w + dx))
      }
      if (handle.includes('n')) {
        y = Math.max(0, Math.min(orig.y + orig.h - 0.01, orig.y + dy))
        h = orig.y + orig.h - y
      }
      if (handle.includes('s')) {
        h = Math.max(0.01, Math.min(1 - orig.y, orig.h + dy))
      }

      newRect = { x, y, w, h }
    }

    setLiveRect({ id: state.hotspotId, rect: newRect })
  }, [getRelativePos])

  const handleInteractionPointerUp = useCallback(() => {
    const state = interactionRef.current
    if (!state) return

    if (liveRect && liveRect.id === state.hotspotId) {
      onUpdateRect(state.hotspotId, liveRect.rect)
    }

    interactionRef.current = null
    setLiveRect(null)
  }, [liveRect, onUpdateRect])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onSelectHotspot(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSelectHotspot])

  const resizeHandles: ResizeHandle[] = ['nw', 'ne', 'sw', 'se', 'n', 's', 'e', 'w']

  return (
    <div
      ref={containerRef}
      className="relative inline-block select-none cursor-crosshair touch-none"
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).dataset.hotspot || (e.target as HTMLElement).dataset.handle) {
          return
        }
        onSelectHotspot(null)
        onPointerDown(e)
      }}
      onPointerMove={(e) => {
        if (interactionRef.current) {
          handleInteractionPointerMove(e)
        } else {
          onPointerMove(e)
        }
      }}
      onPointerUp={() => {
        if (interactionRef.current) {
          handleInteractionPointerUp()
        } else {
          onPointerUp()
        }
      }}
      onPointerCancel={() => {
        if (interactionRef.current) {
          handleInteractionPointerUp()
        } else {
          onPointerUp()
        }
      }}
    >
      <img
        src={imageUrl}
        alt="Image being edited"
        className="max-w-full max-h-[70vh] block pointer-events-none"
        draggable={false}
      />

      {/* Existing hotspots */}
      {hotspots.map((hs) => {
        const rect = (liveRect && liveRect.id === hs.id) ? liveRect.rect : hs.rect
        const isSelected = selectedId === hs.id

        return (
          <div
            key={hs.id}
            data-hotspot="true"
            className={`absolute border-2 transition-colors ${
              isSelected
                ? 'border-blue-500 bg-blue-500/20 cursor-move'
                : 'border-blue-400/60 bg-blue-400/10 hover:bg-blue-400/20 cursor-pointer'
            }`}
            style={{
              left: `${rect.x * 100}%`,
              top: `${rect.y * 100}%`,
              width: `${rect.w * 100}%`,
              height: `${rect.h * 100}%`,
            }}
            onPointerDown={(e) => {
              if (isSelected) {
                handleInteractionPointerDown(e, hs.id, 'move')
              } else {
                e.stopPropagation()
                onSelectHotspot(hs.id)
              }
            }}
          >
            <span className="absolute -top-5 left-0 text-xs text-blue-600 bg-white/80 px-1 rounded whitespace-nowrap pointer-events-none">
              {hs.label}
            </span>

            {/* Resize handles - only show for selected hotspot */}
            {isSelected && resizeHandles.map((handle) => (
              <div
                key={handle}
                data-handle="true"
                className="absolute w-2.5 h-2.5 bg-white border-2 border-blue-500 rounded-sm z-10"
                style={{
                  cursor: HANDLE_CURSORS[handle],
                  ...(handle.includes('n') ? { top: -5 } : {}),
                  ...(handle.includes('s') ? { bottom: -5 } : {}),
                  ...(!handle.includes('n') && !handle.includes('s') ? { top: '50%', marginTop: -5 } : {}),
                  ...(handle.includes('w') ? { left: -5 } : {}),
                  ...(handle.includes('e') ? { right: -5 } : {}),
                  ...(!handle.includes('w') && !handle.includes('e') ? { left: '50%', marginLeft: -5 } : {}),
                }}
                onPointerDown={(e) => handleInteractionPointerDown(e, hs.id, 'resize', handle)}
              />
            ))}
          </div>
        )
      })}

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
