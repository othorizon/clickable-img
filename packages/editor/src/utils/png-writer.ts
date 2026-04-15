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

function isClickableImgTextChunk(bytes: Uint8Array, offset: number, chunkLength: number): boolean {
  if (chunkLength < KEYWORD.length + 1) return false
  const chunkType = String.fromCharCode(bytes[offset + 4], bytes[offset + 5], bytes[offset + 6], bytes[offset + 7])
  if (chunkType !== 'tEXt') return false
  const dataStart = offset + 8
  for (let i = 0; i < KEYWORD.length; i++) {
    if (bytes[dataStart + i] !== KEYWORD.charCodeAt(i)) return false
  }
  return bytes[dataStart + KEYWORD.length] === 0
}

export function embedHotspotsInPng(originalBuffer: ArrayBuffer, hotspots: Hotspot[], customData?: string): Blob {
  const original = new Uint8Array(originalBuffer)
  const view = new DataView(originalBuffer)

  // Collect all chunks, stripping existing clickable-img tEXt chunks
  const chunks: Uint8Array[] = []
  chunks.push(original.slice(0, 8)) // PNG signature

  let offset = 8
  let iendChunk: Uint8Array | null = null

  while (offset < original.length) {
    const chunkLength = view.getUint32(offset, false)
    const chunkType = String.fromCharCode(
      original[offset + 4],
      original[offset + 5],
      original[offset + 6],
      original[offset + 7],
    )
    const chunkEnd = offset + 4 + 4 + chunkLength + 4

    if (chunkType === 'IEND') {
      iendChunk = original.slice(offset, chunkEnd)
      break
    }

    // Skip existing clickable-img tEXt chunks
    if (!isClickableImgTextChunk(original, offset, chunkLength)) {
      chunks.push(original.slice(offset, chunkEnd))
    }

    offset = chunkEnd
  }

  if (!iendChunk) {
    throw new Error('Invalid PNG: IEND chunk not found')
  }

  // Build hotspot data
  const data: ClickableImgData = {
    version: '1.0',
    hotspots,
    ...(customData ? { customData } : {}),
  }
  const jsonText = JSON.stringify(data)
  const textChunk = createTextChunk(KEYWORD, jsonText)

  // Assemble: [existing chunks] + [new tEXt chunk] + [IEND]
  chunks.push(textChunk)
  chunks.push(iendChunk)

  const totalLength = chunks.reduce((sum, c) => sum + c.length, 0)
  const result = new Uint8Array(totalLength)
  let pos = 0
  for (const chunk of chunks) {
    result.set(chunk, pos)
    pos += chunk.length
  }

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
