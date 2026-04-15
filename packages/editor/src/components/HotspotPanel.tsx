import type { Hotspot } from '../types'
import { useLocale } from '../i18n'

interface Props {
  hotspots: Hotspot[]
  selectedId: string | null
  onSelect: (id: string) => void
  onUpdate: (id: string, updates: Partial<Pick<Hotspot, 'label' | 'payload'>>) => void
  onRemove: (id: string) => void
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

          <div>
            <label className="block text-xs text-gray-500 mb-1">{t('panel.payload')}</label>
            <textarea
              className="w-full border rounded px-2 py-1.5 text-sm h-28 resize-none font-mono focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={selected.payload}
              onChange={(e) => onUpdate(selected.id, { payload: e.target.value })}
              placeholder={t('panel.payloadPlaceholder')}
            />
          </div>

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
