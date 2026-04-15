export interface HotspotRect {
  x: number
  y: number
  w: number
  h: number
}

export interface Hotspot {
  id: string
  rect: HotspotRect
  label: string
  payload: string
}

export interface ClickableImgData {
  version: string
  hotspots: Hotspot[]
  customData?: string
}
