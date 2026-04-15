import { useLocale } from '../../i18n'

const topicKeys = ['storage', 'coord', 'render'] as const

const topicIcons = {
  storage: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
    </svg>
  ),
  coord: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  ),
  render: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
}

export function HowItWorksTechSection() {
  const { t } = useLocale()

  return (
    <section className="py-16 bg-gray-50 rounded-3xl">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {t('tech.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('tech.subtitle')}
          </p>
        </div>

        {/* Topic cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {topicKeys.map((key) => (
            <div
              key={key}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="w-11 h-11 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                {topicIcons[key]}
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {t(`tech.${key}.title`)}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(`tech.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* Data flow */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-5">
            {t('tech.flow.title')}
          </h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
            {[1, 2, 3, 4].map((step, i) => (
              <div key={step} className="flex items-center gap-3 sm:flex-1">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="flex-shrink-0 w-7 h-7 bg-indigo-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {step}
                  </span>
                  <p className="text-gray-700 text-xs sm:text-sm leading-snug">
                    {t(`tech.flow.step${step}`)}
                  </p>
                </div>
                {i < 3 && (
                  <svg className="hidden sm:block w-5 h-5 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
