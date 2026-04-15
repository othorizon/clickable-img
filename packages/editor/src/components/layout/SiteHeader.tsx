import type { AppMode } from '../../hooks/useHashRoute'
import { useLocale } from '../../i18n'

interface Props {
  mode: AppMode
  onSetMode: (mode: AppMode) => void
}

export function SiteHeader({ mode, onSetMode }: Props) {
  const { locale, setLocale, t } = useLocale()

  const tabs: { key: AppMode; label: string }[] = [
    { key: 'editor', label: t('header.editor') },
    { key: 'tester', label: t('header.tester') },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <button
          onClick={() => onSetMode('landing')}
          className="flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity shrink-0"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-base sm:text-lg font-bold text-gray-800 hidden sm:inline">{t('header.brand')}</span>
        </button>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onSetMode(tab.key)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                mode === tab.key
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}

          <div className="w-px h-5 bg-gray-200 mx-1 sm:mx-2" />

          <button
            onClick={() => {
              const next = locale === 'zh' ? 'en' : 'zh'
              localStorage.setItem('clickable-img-locale', next)
              setLocale(next)
            }}
            className="px-2.5 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            title={locale === 'zh' ? 'Switch to English' : '切换到中文'}
          >
            {locale === 'zh' ? 'EN' : '中文'}
          </button>
        </nav>
      </div>
    </header>
  )
}
