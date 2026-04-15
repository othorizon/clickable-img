import { useState, useCallback, useRef } from 'react'

interface DragState {
  startX: number
  startY: number
  currentX: number
  currentY: number
}

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export function useDragRect(onComplete: (rect: Rect) => void) {
  const [dragRect, setDragRect] = useState<Rect | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<DragState | null>(null)

  const getRelativePos = useCallback((clientX: number, clientY: number): { x: number; y: number } | null => {
    const container = containerRef.current
    if (!container) return null
    const bounds = container.getBoundingClientRect()
    return {
      x: Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width)),
      y: Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height)),
    }
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return
    const pos = getRelativePos(e.clientX, e.clientY)
    if (!pos) return

    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)

    dragStateRef.current = { startX: pos.x, startY: pos.y, currentX: pos.x, currentY: pos.y }
    setDragRect(null)
  }, [getRelativePos])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const state = dragStateRef.current
    if (!state) return
    const pos = getRelativePos(e.clientX, e.clientY)
    if (!pos) return

    state.currentX = pos.x
    state.currentY = pos.y

    setDragRect({
      x: Math.min(state.startX, state.currentX),
      y: Math.min(state.startY, state.currentY),
      w: Math.abs(state.currentX - state.startX),
      h: Math.abs(state.currentY - state.startY),
    })
  }, [getRelativePos])

  const onPointerUp = useCallback(() => {
    const state = dragStateRef.current
    if (!state) return

    const x = Math.min(state.startX, state.currentX)
    const y = Math.min(state.startY, state.currentY)
    const w = Math.abs(state.currentX - state.startX)
    const h = Math.abs(state.currentY - state.startY)

    dragStateRef.current = null
    setDragRect(null)

    // Minimum size threshold (1% of image)
    if (w > 0.01 && h > 0.01) {
      onComplete({ x, y, w, h })
    }
  }, [onComplete])

  return {
    containerRef,
    dragRect,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  }
}
