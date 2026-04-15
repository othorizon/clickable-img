import { useLocale } from '../../i18n'

const scenarioKeys = ['ad', 'landing', 'map', 'edu'] as const

const scenarioIcons = {
  ad: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  landing: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  map: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  edu: (
    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
}

export function UseCasesSection() {
  const { t } = useLocale()

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {t('usecases.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('usecases.subtitle')}
          </p>
        </div>

        {/* Scenario cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {scenarioKeys.map((key) => (
            <div
              key={key}
              className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                {scenarioIcons[key]}
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1.5">
                {t(`usecases.${key}.title`)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(`usecases.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Real-world example */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
          <h3 className="text-xl font-bold text-gray-900 mb-5">
            {t('usecases.case.title')}
          </h3>
          <div className="space-y-3 mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                  {step}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t(`usecases.case.step${step}`)}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-white/70 rounded-xl px-5 py-3 border border-blue-200/50">
            <p className="text-blue-800 text-sm font-medium">
              {t('usecases.case.result')}
            </p>
          </div>

          {/* Advantages */}
          <div className="mt-6 pt-6 border-t border-blue-200/50">
            <h4 className="text-base font-semibold text-gray-900 mb-3">
              {t('usecases.adv.title')}
            </h4>
            <ul className="space-y-2">
              {['hotUpdate', 'fastShip', 'lowCost'].map((key) => (
                <li key={key} className="flex items-start gap-2 text-sm text-gray-700">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t(`usecases.adv.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
