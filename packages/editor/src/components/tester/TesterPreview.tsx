import { useMemo, useState } from 'react'
import { readHotspotsFromPng } from '@clickable-img/sdk'
import type { Hotspot } from '../../types'
import { useLocale } from '../../i18n'

interface Props {
  imageUrl: string
  imageBuffer: ArrayBuffer
  onReset: () => void
}

export function TesterPreview({ imageUrl, imageBuffer, onReset }: Props) {
  const { t } = useLocale()
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)

  const data = useMemo(() => readHotspotsFromPng(imageBuffer), [imageBuffer])
  const hotspots = data?.hotspots ?? []

  if (hotspots.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('tester.noData')}</h3>
        <p className="text-gray-500 mb-6">{t('tester.noDataHint')}</p>
        <button
          onClick={onReset}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          {t('tester.reset')}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-57px)]">
      {/* Image preview area */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto flex flex-col items-center">
        <div className="mb-4 flex items-center gap-4 w-full max-w-2xl">
          <div className="flex-1 flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-sm font-medium rounded-full">
              {t('tester.found', { count: hotspots.length })}
            </span>
            <span className="text-sm text-gray-400">{t('tester.clickHint')}</span>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-1.5 text-sm text-gray-600 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('tester.reset')}
          </button>
        </div>

        <div className="relative inline-block select-none">
          <img
            src={imageUrl}
            alt={t('tester.imgAlt')}
            className="max-w-full max-h-[70vh] block"
            draggable={false}
          />

          {hotspots.map((hs) => (
            <div
              key={hs.id}
              className={`absolute border-2 transition-all cursor-pointer ${
                selectedHotspot?.id === hs.id
                  ? 'border-blue-500 bg-blue-500/20 shadow-lg'
                  : 'border-blue-400/40 bg-transparent hover:border-blue-400 hover:bg-blue-400/15'
              }`}
              style={{
                left: `${hs.rect.x * 100}%`,
                top: `${hs.rect.y * 100}%`,
                width: `${hs.rect.w * 100}%`,
                height: `${hs.rect.h * 100}%`,
              }}
              onClick={() => setSelectedHotspot(hs)}
            >
              <span className="absolute -top-5 left-0 text-xs text-blue-600 bg-white/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                {hs.label || t('panel.unnamed')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l p-4">
        <h3 className="text-lg font-semibold mb-4">{t('tester.detailTitle')}</h3>

        {selectedHotspot ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('tester.detailLabel')}</label>
              <p className="text-sm font-medium text-gray-800 bg-gray-50 rounded px-3 py-2">
                {selectedHotspot.label || t('panel.unnamed')}
              </p>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">{t('tester.detailPayload')}</label>
              <pre className="text-sm text-gray-800 bg-gray-50 rounded px-3 py-2 font-mono whitespace-pre-wrap break-all max-h-48 overflow-auto">
                {formatPayload(selectedHotspot.payload)}
              </pre>
            </div>

            <div className="text-xs text-gray-400 space-y-1">
              <p>
                {t('tester.detailPosition')}: ({(selectedHotspot.rect.x * 100).toFixed(1)}%, {(selectedHotspot.rect.y * 100).toFixed(1)}%)
              </p>
              <p>
                {t('tester.detailSize')}: {(selectedHotspot.rect.w * 100).toFixed(1)}% x {(selectedHotspot.rect.h * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">{t('tester.clickHint')}</p>
        )}

        {/* Hotspot list */}
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">{t('panel.title')}</h4>
          <ul className="space-y-1">
            {hotspots.map((hs) => (
              <li
                key={hs.id}
                className={`px-3 py-2 rounded cursor-pointer text-sm transition-colors ${
                  selectedHotspot?.id === hs.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setSelectedHotspot(hs)}
              >
                {hs.label || t('panel.unnamed')}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function formatPayload(payload: string): string {
  if (!payload) return '(empty)'
  try {
    return JSON.stringify(JSON.parse(payload), null, 2)
  } catch {
    return payload
  }
}
