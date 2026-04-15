import type { Hotspot } from '../types'

interface Props {
  hotspots: Hotspot[]
  selectedId: string | null
  onSelect: (id: string) => void
  onUpdate: (id: string, updates: Partial<Pick<Hotspot, 'label' | 'payload'>>) => void
  onRemove: (id: string) => void
}

export function HotspotPanel({ hotspots, selectedId, onSelect, onUpdate, onRemove }: Props) {
  const selected = hotspots.find((h) => h.id === selectedId)

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-3">热区列表</h2>

      {hotspots.length === 0 ? (
        <p className="text-gray-400 text-sm">在图片上拖拽以创建热区</p>
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
              {hs.label || '未命名热区'}
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="border-t pt-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-600">编辑热区</h3>

          <div>
            <label className="block text-xs text-gray-500 mb-1">名称</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={selected.label}
              onChange={(e) => onUpdate(selected.id, { label: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Payload（点击时回调的数据）</label>
            <textarea
              className="w-full border rounded px-2 py-1.5 text-sm h-28 resize-none font-mono focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={selected.payload}
              onChange={(e) => onUpdate(selected.id, { payload: e.target.value })}
              placeholder='输入任意数据，例如 JSON: {"action": "open", "url": "..."}'
            />
          </div>

          <div className="text-xs text-gray-400">
            位置: ({(selected.rect.x * 100).toFixed(1)}%, {(selected.rect.y * 100).toFixed(1)}%)
            {' '}大小: {(selected.rect.w * 100).toFixed(1)}% x {(selected.rect.h * 100).toFixed(1)}%
          </div>

          <button
            className="w-full py-1.5 text-sm text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
            onClick={() => onRemove(selected.id)}
          >
            删除此热区
          </button>
        </div>
      )}
    </div>
  )
}
