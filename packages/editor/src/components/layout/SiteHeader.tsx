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

          <a
            href="https://github.com/othorizon/clickable-img"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            title="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

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
