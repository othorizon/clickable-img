import { useState } from 'react'
import type { Hotspot } from '../types'
import { useLocale } from '../i18n'

interface Props {
  hotspots: Hotspot[]
  selectedId: string | null
  onSelect: (id: string) => void
  onUpdate: (id: string, updates: Partial<Pick<Hotspot, 'label' | 'payload'>>) => void
  onRemove: (id: string) => void
}

function PayloadEditor({ payload, onChange, t }: { payload: string; onChange: (v: string) => void; t: (key: string) => string }) {
  const [jsonStatus, setJsonStatus] = useState<'valid' | 'invalid' | null>(null)

  const handleFormat = () => {
    const trimmed = payload.trim()
    if (!trimmed) {
      setJsonStatus(null)
      return
    }
    try {
      const parsed = JSON.parse(trimmed)
      onChange(JSON.stringify(parsed, null, 2))
      setJsonStatus('valid')
    } catch {
      setJsonStatus('invalid')
    }
    setTimeout(() => setJsonStatus(null), 3000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-xs text-gray-500">{t('panel.payload')}</label>
        <button
          type="button"
          className="flex items-center gap-1 px-1.5 py-0.5 text-xs rounded border border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={handleFormat}
          title={t('panel.jsonFormat')}
        >
          <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 2C2.5 2 2 3 2 4v2c0 1-1 1.5-1 1.5S2 8 2 9v3c0 1 .5 2 2 2M12 2c1.5 0 2 1 2 2v2c0 1 1 1.5 1 1.5s-1 .5-1 1.5v3c0 1-.5 2-2 2" />
          </svg>
          JSON
        </button>
      </div>
      <textarea
        className={`w-full border rounded px-2 py-1.5 text-sm h-28 resize-none font-mono focus:outline-none focus:ring-2 ${
          jsonStatus === 'valid'
            ? 'border-green-400 focus:ring-green-300'
            : jsonStatus === 'invalid'
              ? 'border-amber-400 focus:ring-amber-300'
              : 'focus:ring-blue-300'
        }`}
        value={payload}
        onChange={(e) => {
          onChange(e.target.value)
          setJsonStatus(null)
        }}
        placeholder={t('panel.payloadPlaceholder')}
      />
      {jsonStatus === 'valid' && (
        <p className="text-xs text-green-600 mt-1">{t('panel.jsonValid')}</p>
      )}
      {jsonStatus === 'invalid' && (
        <p className="text-xs text-amber-600 mt-1">{t('panel.jsonInvalid')}</p>
      )}
    </div>
  )
}

export function HotspotPanel({ hotspots, selectedId, onSelect, onUpdate, onRemove }: Props) {
  const selected = hotspots.find((h) => h.id === selectedId)
  const { t } = useLocale()

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-3">{t('panel.title')}</h2>

      {hotspots.length === 0 ? (
        <p className="text-gray-400 text-sm">{t('panel.empty')}</p>
      ) : (
        <ul className="space-y-1 mb-4 max-h-48 overflow-y-auto">
          {hotspots.map((hs) => (
            <li
              key={hs.id}
              className={`px-3 py-2 rounded cursor-pointer text-sm transition-colors ${
                selectedId === hs.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => onSelect(hs.id)}
            >
              {hs.label || t('panel.unnamed')}
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="border-t pt-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-600">{t('panel.editTitle')}</h3>

          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('panel.label')}</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={selected.label}
              onChange={(e) => onUpdate(selected.id, { label: e.target.value })}
            />
          </div>

          <PayloadEditor
            payload={selected.payload}
            onChange={(value) => onUpdate(selected.id, { payload: value })}
            t={t}
          />

          <div className="text-xs text-gray-400">
            {t('panel.position')}: ({(selected.rect.x * 100).toFixed(1)}%, {(selected.rect.y * 100).toFixed(1)}%)
            {' '}{t('panel.size')}: {(selected.rect.w * 100).toFixed(1)}% x {(selected.rect.h * 100).toFixed(1)}%
          </div>

          <button
            className="w-full py-1.5 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
            onClick={() => onRemove(selected.id)}
          >
            {t('panel.delete')}
          </button>
        </div>
      )}
    </div>
  )
}
