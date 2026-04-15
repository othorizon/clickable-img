import { useLocale } from '../../i18n'
import { ImageUploader } from '../ImageUploader'

interface Props {
  onImageLoaded: (dataUrl: string, buffer: ArrayBuffer) => void
}

export function TryItSection({ onImageLoaded }: Props) {
  const { t } = useLocale()

  return (
    <section className="py-16 bg-gray-50 rounded-3xl">
      <div className="max-w-lg mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {t('tryit.title')}
        </h2>
        <p className="text-gray-600 mb-8">{t('tryit.desc')}</p>
        <ImageUploader onImageLoaded={onImageLoaded} />
      </div>
    </section>
  )
}
