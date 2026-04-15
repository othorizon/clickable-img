import { useState, useEffect, useCallback } from 'react'
import { useHashRoute } from './hooks/useHashRoute'
import { LocaleContext, detectLocale, createTranslator, type Locale } from './i18n'
import { SiteHeader } from './components/layout/SiteHeader'
import { SiteFooter } from './components/layout/SiteFooter'
import { LandingPage } from './components/landing/LandingPage'
import { EditorWorkspace } from './components/editor/EditorWorkspace'
import { TesterWorkspace } from './components/tester/TesterWorkspace'

export default function App() {
  const { mode, setMode } = useHashRoute()
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  // State for passing image from landing uploader to editor
  const [pendingImage, setPendingImage] = useState<{ url: string; buffer: ArrayBuffer } | null>(null)

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en'
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  const t = createTranslator(locale)

  const handleLandingImageLoaded = (dataUrl: string, buffer: ArrayBuffer) => {
    setPendingImage({ url: dataUrl, buffer })
    setMode('editor')
  }

  return (
    <LocaleContext value={{ locale, setLocale, t }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <SiteHeader mode={mode} onSetMode={setMode} />

        <main className="flex-1">
          {mode === 'landing' && (
            <LandingPage
              onStartEditor={() => setMode('editor')}
              onStartTester={() => setMode('tester')}
              onImageLoaded={handleLandingImageLoaded}
            />
          )}
          {mode === 'editor' && (
            <EditorWorkspace
              key={pendingImage?.url}
              initialImageUrl={pendingImage?.url}
              initialImageBuffer={pendingImage?.buffer}
              onSwitchToTester={() => setMode('tester')}
            />
          )}
          {mode === 'tester' && <TesterWorkspace />}
        </main>

        {mode === 'landing' && <SiteFooter />}
      </div>
    </LocaleContext>
  )
}
