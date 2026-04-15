import { useLocale } from '../../i18n'

interface Props {
  onStartEditor: () => void
  onStartTester: () => void
}

export function HeroSection({ onStartEditor, onStartTester }: Props) {
  const { t } = useLocale()

  return (
    <section className="py-16 sm:py-24 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
        {t('hero.title')}
      </h1>
      <p className="mt-4 text-xl sm:text-2xl text-blue-600 font-medium">
        {t('hero.subtitle')}
      </p>
      <p className="mt-6 max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
        {t('hero.description')}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onStartEditor}
          className="px-8 py-3.5 bg-blue-600 text-white text-lg font-semibold rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-200"
        >
          {t('hero.startBtn')}
        </button>
        <button
          onClick={onStartTester}
          className="px-8 py-3.5 bg-white text-gray-700 text-lg font-semibold rounded-xl border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          {t('hero.testBtn')}
        </button>
      </div>
    </section>
  )
}
