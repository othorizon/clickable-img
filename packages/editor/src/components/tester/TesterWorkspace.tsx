import { useState, useCallback, useRef } from 'react'
import { TesterPreview } from './TesterPreview'
import { useLocale } from '../../i18n'

export function TesterWorkspace() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [imageBuffer, setImageBuffer] = useState<ArrayBuffer | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useLocale()

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/png')) {
      alert(t('upload.pngOnly'))
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer
      const blob = new Blob([buffer], { type: file.type })
      const dataUrl = URL.createObjectURL(blob)
      setImageUrl(dataUrl)
      setImageBuffer(buffer)
    }
    reader.readAsArrayBuffer(file)
  }, [t])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const reset = () => {
    setImageUrl(null)
    setImageBuffer(null)
  }

  if (imageUrl && imageBuffer) {
    return <TesterPreview imageUrl={imageUrl} imageBuffer={imageBuffer} onReset={reset} />
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('tester.title')}</h2>
      <p className="text-gray-600 mb-8">{t('tester.desc')}</p>

      <div
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-12 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        <p className="text-gray-600 text-lg mb-1">{t('tester.upload')}</p>
        <p className="text-gray-400 text-sm">{t('upload.format')}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />
      </div>
    </div>
  )
}
