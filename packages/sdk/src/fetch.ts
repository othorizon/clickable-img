export async function fetchImageData(src: string): Promise<ArrayBuffer> {
  if (src.startsWith('data:')) {
    const base64 = src.split(',')[1]
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes.buffer
  }

  const response = await fetch(src)
  return response.arrayBuffer()
}
