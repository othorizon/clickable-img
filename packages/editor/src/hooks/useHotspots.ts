import { useState, useCallback } from 'react'
import type { Hotspot, HotspotRect } from '../types'

let nextId = 1
function generateId(): string {
  return `hs_${nextId++}_${Date.now().toString(36)}`
}

export function useHotspots() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const addHotspot = useCallback((rect: HotspotRect) => {
    const id = generateId()
    const hotspot: Hotspot = {
      id,
      rect,
      label: `热区 ${nextId - 1}`,
      payload: '',
    }
    setHotspots((prev) => [...prev, hotspot])
    setSelectedId(id)
    return hotspot
  }, [])

  const updateHotspot = useCallback((id: string, updates: Partial<Pick<Hotspot, 'label' | 'payload'>>) => {
    setHotspots((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h)),
    )
  }, [])

  const removeHotspot = useCallback((id: string) => {
    setHotspots((prev) => prev.filter((h) => h.id !== id))
    setSelectedId((prev) => (prev === id ? null : prev))
  }, [])

  const clearAll = useCallback(() => {
    setHotspots([])
    setSelectedId(null)
  }, [])

  return {
    hotspots,
    selectedId,
    setSelectedId,
    addHotspot,
    updateHotspot,
    removeHotspot,
    clearAll,
  }
}
