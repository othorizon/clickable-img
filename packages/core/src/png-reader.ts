import type { ClickableImgData } from './types'

const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10]
const TEXT_CHUNK_TYPE = 'tEXt'
const KEYWORD = 'clickable-img'

function readUint32(data: DataView, offset: number): number {
  return data.getUint32(offset, false) // big-endian
}

function bytesToString(bytes: Uint8Array, start: number, length: number): string {
  let str = ''
  for (let i = start; i < start + length; i++) {
    str += String.fromCharCode(bytes[i])
  }
  return str
}

export function readCustomDataFromPng(buffer: ArrayBuffer): string | null {
  const data = readHotspotsFromPng(buffer)
  return data?.customData ?? null
}

export function readHotspotsFromPng(buffer: ArrayBuffer): ClickableImgData | null {
  const bytes = new Uint8Array(buffer)
  const view = new DataView(buffer)

  // Verify PNG signature
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (bytes[i] !== PNG_SIGNATURE[i]) {
      return null
    }
  }

  let offset = 8 // Skip signature

  while (offset < bytes.length) {
    const chunkLength = readUint32(view, offset)
    const chunkType = bytesToString(bytes, offset + 4, 4)

    if (chunkType === TEXT_CHUNK_TYPE) {
      const dataStart = offset + 8
      const dataEnd = dataStart + chunkLength

      // Find null separator between keyword and text
      let nullPos = dataStart
      while (nullPos < dataEnd && bytes[nullPos] !== 0) {
        nullPos++
      }

      const keyword = bytesToString(bytes, dataStart, nullPos - dataStart)

      if (keyword === KEYWORD && nullPos < dataEnd) {
        const textBytes = bytes.slice(nullPos + 1, dataEnd)
        const text = new TextDecoder('utf-8').decode(textBytes)
        try {
          return JSON.parse(text) as ClickableImgData
        } catch {
          return null
        }
      }
    }

    if (chunkType === 'IEND') break

    // Move to next chunk: 4 (length) + 4 (type) + data + 4 (crc)
    offset += 4 + 4 + chunkLength + 4
  }

  return null
}
