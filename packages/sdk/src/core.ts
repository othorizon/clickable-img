import type { ClickableImgOptions } from '@clickable-img/core'
import { readHotspotsFromPng } from '@clickable-img/core'
import { fetchImageData } from './fetch'
import { createOverlay, type OverlayInstance } from './overlay'

export class ClickableImg {
  private overlay: OverlayInstance

  private constructor(overlay: OverlayInstance) {
    this.overlay = overlay
  }

  static async attach(
    img: HTMLImageElement,
    options: ClickableImgOptions,
  ): Promise<ClickableImg> {
    const buffer = await fetchImageData(img.src)
    const data = readHotspotsFromPng(buffer)

    if (!data || data.hotspots.length === 0) {
      throw new Error('No clickable-img hotspot data found in this image')
    }

    const overlay = createOverlay(img, data.hotspots, options)
    return new ClickableImg(overlay)
  }

  destroy(): void {
    this.overlay.destroy()
  }
}
