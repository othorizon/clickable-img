import type { Hotspot, ClickableImgData } from '../types'

const KEYWORD = 'clickable-img'

// CRC32 lookup table
const crcTable: number[] = []
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  }
  crcTable[n] = c
}

function crc32(buf: Uint8Array): number {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function createTextChunk(keyword: string, text: string): Uint8Array {
  const encoder = new TextEncoder()
  const keywordBytes = encoder.encode(keyword)
  // Encode text as UTF-8
  const textBytes = encoder.encode(text)

  // data = keyword + null + text
  const dataLength = keywordBytes.length + 1 + textBytes.length
  const chunk = new Uint8Array(4 + 4 + dataLength + 4) // length + type + data + crc
  const view = new DataView(chunk.buffer)

  // Length (big-endian)
  view.setUint32(0, dataLength, false)

  // Type: "tEXt"
  chunk[4] = 0x74 // t
  chunk[5] = 0x45 // E
  chunk[6] = 0x58 // X
  chunk[7] = 0x74 // t

  // Keyword
  chunk.set(keywordBytes, 8)
  // Null separator
  chunk[8 + keywordBytes.length] = 0
  // Text
  chunk.set(textBytes, 8 + keywordBytes.length + 1)

  // CRC (over type + data)
  const crcData = chunk.slice(4, 4 + 4 + dataLength)
  const crcValue = crc32(crcData)
  view.setUint32(4 + 4 + dataLength, crcValue, false)

  return chunk
}

export function embedHotspotsInPng(originalBuffer: ArrayBuffer, hotspots: Hotspot[]): Blob {
  const original = new Uint8Array(originalBuffer)
  const view = new DataView(originalBuffer)

  // Find IEND chunk position
  let offset = 8 // Skip PNG signature
  let iendOffset = -1

  while (offset < original.length) {
    const chunkLength = view.getUint32(offset, false)
    const chunkType = String.fromCharCode(
      original[offset + 4],
      original[offset + 5],
      original[offset + 6],
      original[offset + 7],
    )

    if (chunkType === 'IEND') {
      iendOffset = offset
      break
    }

    offset += 4 + 4 + chunkLength + 4
  }

  if (iendOffset === -1) {
    throw new Error('Invalid PNG: IEND chunk not found')
  }

  // Build hotspot data
  const data: ClickableImgData = {
    version: '1.0',
    hotspots,
  }
  const jsonText = JSON.stringify(data)
  const textChunk = createTextChunk(KEYWORD, jsonText)

  // Assemble: [before IEND] + [tEXt chunk] + [IEND chunk]
  const beforeIend = original.slice(0, iendOffset)
  const iendChunk = original.slice(iendOffset)

  const result = new Uint8Array(beforeIend.length + textChunk.length + iendChunk.length)
  result.set(beforeIend, 0)
  result.set(textChunk, beforeIend.length)
  result.set(iendChunk, beforeIend.length + textChunk.length)

  return new Blob([result], { type: 'image/png' })
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
