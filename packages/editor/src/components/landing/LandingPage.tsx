import { HeroSection } from './HeroSection'
import { FeaturesSection } from './FeaturesSection'
import { HowItWorksSection } from './HowItWorksSection'
import { TryItSection } from './TryItSection'

interface Props {
  onStartEditor: () => void
  onStartTester: () => void
  onImageLoaded: (dataUrl: string, buffer: ArrayBuffer) => void
}

export function LandingPage({ onStartEditor, onStartTester, onImageLoaded }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
      <HeroSection onStartEditor={onStartEditor} onStartTester={onStartTester} />
      <FeaturesSection />
      <HowItWorksSection />
      <TryItSection onImageLoaded={onImageLoaded} />
    </div>
  )
}
