import type { Hotspot, ClickableImgOptions } from '@clickable-img/core'

export interface OverlayInstance {
  container: HTMLElement
  destroy: () => void
}

export function createOverlay(
  img: HTMLImageElement,
  hotspots: Hotspot[],
  options: ClickableImgOptions,
): OverlayInstance {
  const { onClick, showHints = false } = options

  // Wrap the image in a container
  const container = document.createElement('div')
  container.style.position = 'relative'
  container.style.display = 'inline-block'
  container.style.lineHeight = '0'

  img.parentNode!.insertBefore(container, img)
  container.appendChild(img)

  const zones: HTMLDivElement[] = []

  for (const hotspot of hotspots) {
    const zone = document.createElement('div')
    zone.style.position = 'absolute'
    zone.style.left = `${hotspot.rect.x * 100}%`
    zone.style.top = `${hotspot.rect.y * 100}%`
    zone.style.width = `${hotspot.rect.w * 100}%`
    zone.style.height = `${hotspot.rect.h * 100}%`
    zone.style.cursor = 'pointer'
    zone.style.border = showHints ? '2px dashed rgba(59, 130, 246, 0.5)' : 'none'
    zone.style.backgroundColor = 'transparent'
    zone.style.transition = 'background-color 0.15s, border-color 0.15s'
    zone.style.boxSizing = 'border-box'

    zone.addEventListener('mouseenter', () => {
      zone.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
      if (!showHints) zone.style.border = '2px dashed rgba(59, 130, 246, 0.3)'
    })
    zone.addEventListener('mouseleave', () => {
      zone.style.backgroundColor = 'transparent'
      if (!showHints) zone.style.border = 'none'
    })

    zone.addEventListener('click', (e) => {
      e.stopPropagation()
      onClick(hotspot)
    })

    if (hotspot.label) {
      zone.title = hotspot.label
    }

    container.appendChild(zone)
    zones.push(zone)
  }

  return {
    container,
    destroy() {
      for (const zone of zones) {
        zone.remove()
      }
      // Unwrap the image
      container.parentNode!.insertBefore(img, container)
      container.remove()
    },
  }
}
