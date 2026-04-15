import { useLocale } from '../../i18n'

const GITHUB_URL = 'https://github.com/othorizon/clickable-img'

const packages = ['core', 'sdk'] as const

const packageIcons = {
  core: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  sdk: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
}

export function SdkGuideSection() {
  const { t } = useLocale()

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {t('sdk.title')}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t('sdk.subtitle')}
          </p>
        </div>

        {/* Quick install */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm font-medium">{t('sdk.install')}</span>
          </div>
          <pre className="text-green-400 font-mono text-sm sm:text-base overflow-x-auto">
            <code>npm install @clickable-img/sdk</code>
          </pre>
        </div>

        {/* Quick usage example */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm font-medium">{t('sdk.usage')}</span>
          </div>
          <pre className="text-gray-300 font-mono text-sm overflow-x-auto leading-relaxed">
            <code>{`import { ClickableImg } from '@clickable-img/sdk'

// ${t('sdk.usageComment')}
ClickableImg.attach(document.querySelector('img'), {
  onClick: (hotspot) => console.log(hotspot)
})`}</code>
          </pre>
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {packages.map((pkg) => (
            <div
              key={pkg}
              className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  {packageIcons[pkg]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {t(`sdk.pkg.${pkg}.name`)}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(`sdk.pkg.${pkg}.desc`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-lg font-semibold rounded-xl hover:bg-gray-800 active:bg-gray-700 transition-colors shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            {t('sdk.viewOnGithub')}
          </a>
          <p className="mt-4 text-gray-500 text-sm">
            {t('sdk.githubHint')}
          </p>
        </div>
      </div>
    </section>
  )
}
