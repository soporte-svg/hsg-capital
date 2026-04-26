import type { Lang } from '../i18n'
import { t } from '../i18n'
import { HeroShowcase } from './HeroShowcase'
import { HeroShowcasePulse } from './HeroShowcasePulse'
import { Button, Container } from './ui'
import { WhatsAppIcon } from './icons'

export function LandingHeroSection({
  lang,
  whatsappHref,
  isSpectrum,
  showPortfolioCta,
  usePulseHero,
}: {
  lang: Lang
  whatsappHref: string
  isSpectrum: boolean
  showPortfolioCta: boolean
  usePulseHero: boolean
}) {
  return (
    <div className="relative overflow-hidden bg-transparent">
      <div
        className={
          isSpectrum
            ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_520px_at_18%_8%,rgba(124,58,237,0.12),transparent_58%),radial-gradient(900px_480px_at_88%_28%,rgba(37,99,235,0.11),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.92),#ffffff,#f8fafc)]'
            : 'pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(37,99,235,0.10),transparent_60%),radial-gradient(900px_500px_at_90%_30%,rgba(56,189,248,0.10),transparent_55%),linear-gradient(to_bottom,#ffffff,#f8fafc,#ffffff)]'
        }
        aria-hidden
      />
      <Container>
        <div className="relative py-14 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <p
                className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold ring-1 ${
                  isSpectrum
                    ? 'border border-violet-200/60 bg-white/80 text-violet-800 ring-violet-100/80'
                    : 'bg-brand-50 text-brand-700 ring-brand-100'
                }`}
              >
                HSG Investment • Real estate • USD income
              </p>
              <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
                {t(lang, 'hero_title')}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-slate-600 md:text-lg">
                {t(lang, 'hero_sub')}
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                <Button
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  variant="whatsapp"
                  className="w-full sm:w-auto"
                >
                  <WhatsAppIcon className="h-5 w-5 text-white" />
                  {t(lang, 'hero_primary')}
                </Button>
                <Button
                  href={showPortfolioCta ? '#properties' : '#calculator'}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {t(lang, showPortfolioCta ? 'hero_secondary' : 'hero_secondary_fallback')}
                </Button>
              </div>
            </div>

            {usePulseHero ? <HeroShowcasePulse lang={lang} /> : <HeroShowcase lang={lang} />}
          </div>
        </div>
      </Container>
    </div>
  )
}

