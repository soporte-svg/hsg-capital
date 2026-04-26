import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Lang } from '../i18n'
import { t } from '../i18n'
import { CONTACT_EMAIL, getWhatsAppHref } from '../config'
import { trackEvent } from '../lib/tracking'
import { CheckIcon, WhatsAppIcon } from '../components/icons'
import { HeroShowcase } from '../components/HeroShowcase'
import { HeroShowcasePulse } from '../components/HeroShowcasePulse'
import { CalculatorSection } from '../components/CalculatorSection'
import { JourneyTimelineSection } from '../components/JourneyTimelineSection'
import { OperatorsStatementSection } from '../components/OperatorsStatementSection'
import { PortfolioPerformanceSection } from '../components/PortfolioPerformanceSection'
import { FeesTransparencySection } from '../components/FeesTransparencySection'
import { TaxCheatSheetSection } from '../components/TaxCheatSheetSection'
import { Button, Container, Modal, SectionTitle } from '../components/ui'

/**
 * ── Secciones ocultas (portafolio + simulador embebido + “Por qué HSG”) ─────────
 * Activar de nuevo: pon `SHOW_PORTFOLIO_SIMULATOR_WHY` en `true` dentro del
 * componente y revisa nav / hero / footer (enlaces a #properties).
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Página dedicada HSG Capital (clásica): /capital.
 * Variante `spectrum`: misma landing con estética violeta→azul en /es/capital y /en/capital.
 */

/** `true` = hero visual “Pulse” (dashboard oscuro + carrusel). `false` = mosaico clásico. */
const USE_HERO_SHOWCASE_PULSE = true

type Property = {
  address: string
  location: string
  yield: number
  progress: number
  targetUsd: number
  status: 'available' | 'soldout'
  imageSrc: string
}

const PROPERTIES: Property[] = [
  {
    address: '10214 South Van Vlissingen Rd',
    location: 'Chicago, IL',
    yield: 7.18,
    progress: 63.4,
    targetUsd: 162_240,
    status: 'available',
    imageSrc: '/image.png',
  },
  {
    address: '8238 South Saginaw Av',
    location: 'Chicago, IL',
    yield: 7.71,
    progress: 100,
    targetUsd: 191_360,
    status: 'soldout',
    imageSrc: '/property-2-D4LPmw2A.jpg',
  },
  {
    address: '8952 South Aberdeen St',
    location: 'Chicago, IL',
    yield: 7.27,
    progress: 100,
    targetUsd: 277_942,
    status: 'soldout',
    imageSrc: '/property-3-C-VAc_JJ.jpg',
  },
]

function formatUsd(amount: number, lang: Lang) {
  return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-CO', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function PropertyImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-44 w-full rounded-t-2xl object-cover"
      loading="lazy"
    />
  )
}

function AnchorLink({
  href,
  children,
  className = '',
  onClick,
}: {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`text-sm font-medium text-slate-700 hover:text-slate-900 ${className}`}
    >
      {children}
    </a>
  )
}

function NavRouteLink({
  onClick,
  children,
  className = '',
}: {
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-sm font-medium text-slate-700 hover:text-slate-900 ${className}`}
    >
      {children}
    </button>
  )
}

export type LandingPageVariant = 'default' | 'spectrum'

export function LandingPage({
  lang,
  variant = 'default',
}: {
  lang: Lang
  variant?: LandingPageVariant
}) {
  const navigate = useNavigate()
  const [simOpen, setSimOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  /** Ver bloque de nota al inicio de este archivo. */
  const SHOW_PORTFOLIO_SIMULATOR_WHY = false
  const isSpectrum = variant === 'spectrum'
  const langPath = `/${lang}`
  const capitalPath = '/capital'

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (!navOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [navOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => {
      if (mq.matches) setNavOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const whatsappMessage =
    lang === 'en'
      ? 'Hi! I want to learn more about investing in U.S. rental properties from $50,000 USD.'
      : 'Hola! Quiero conocer más sobre invertir en propiedades rentadas en EE.UU. desde $50,000 USD.'

  const whatsappHref = getWhatsAppHref(whatsappMessage)

  return (
    <div
      className={`min-h-screen text-slate-900 ${
        isSpectrum
          ? 'spectrum-landing relative bg-[linear-gradient(180deg,#f5f3ff_0%,#ffffff_22%,#f8fafc_55%,#eff6ff_88%,#ffffff_100%)]'
          : 'bg-slate-50'
      }`}
    >
      {isSpectrum ? (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(720px_420px_at_14%_6%,rgba(139,92,246,0.14),transparent_58%),radial-gradient(640px_400px_at_90%_16%,rgba(37,99,235,0.11),transparent_55%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-24 top-24 z-0 h-72 w-72 rounded-full bg-violet-300/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 bottom-32 z-0 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl"
            aria-hidden
          />
        </>
      ) : null}
      <div className={isSpectrum ? 'relative z-10' : undefined}>
      {/* Floating WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <WhatsAppIcon className="h-5 w-5 text-white" />
        <span className="hidden sm:inline">{t(lang, 'hero_primary')}</span>
        <span className="sm:hidden">{t(lang, 'whatsapp')}</span>
      </a>

      {/* Navbar */}
      <div
        className={`relative sticky top-0 z-[70] ${
          isSpectrum
            ? 'bg-white/92 shadow-[0_8px_32px_-14px_rgba(91,33,182,0.14)] backdrop-blur-xl'
            : 'bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.05),0_10px_36px_-22px_rgba(15,23,42,0.1)] backdrop-blur'
        }`}
      >
        <Container>
          <div className="flex h-14 min-h-[3.5rem] items-center justify-between gap-2 md:h-16 md:gap-3">
            <a
              href={isSpectrum ? langPath : '#'}
              className="flex min-w-0 shrink-0 items-center gap-2"
              onClick={() => setNavOpen(false)}
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-900/10">
                <span className="text-sm font-bold tracking-tight">HSG</span>
              </div>
              <span className="truncate text-sm font-semibold tracking-tight text-slate-900">
                HSG Investment
              </span>
            </a>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2 md:gap-3">
              <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
                {SHOW_PORTFOLIO_SIMULATOR_WHY ? (
                  <AnchorLink href="#properties">{t(lang, 'nav_properties')}</AnchorLink>
                ) : null}
                <AnchorLink href="#journey">{t(lang, 'nav_journey')}</AnchorLink>
                <AnchorLink href="#operators">{t(lang, 'nav_operators')}</AnchorLink>
                <AnchorLink href="#faq">{t(lang, 'nav_faq')}</AnchorLink>
                <NavRouteLink
                  onClick={() => navigate(isSpectrum ? langPath : capitalPath)}
                >
                  HSG Capital
                </NavRouteLink>
              </nav>

              <div
                className={`flex shrink-0 items-center rounded-lg p-0.5 ring-1 sm:rounded-xl sm:p-1 ${
                  isSpectrum
                    ? 'bg-violet-50/90 ring-violet-200/60'
                    : 'bg-slate-50 ring-slate-200/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setNavOpen(false)
                    navigate(isSpectrum ? '/es/capital' : '/es')
                  }}
                  className={`rounded-md px-2 py-1.5 text-xs font-semibold sm:rounded-lg sm:px-3 sm:py-1 ${
                    lang === 'es'
                      ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t(lang, 'lang_es')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNavOpen(false)
                    navigate(isSpectrum ? '/en/capital' : '/en')
                  }}
                  className={`rounded-md px-2 py-1.5 text-xs font-semibold sm:rounded-lg sm:px-3 sm:py-1 ${
                    lang === 'en'
                      ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t(lang, 'lang_en')}
                </button>
              </div>

              <Button
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                className="hidden md:inline-flex"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
                {t(lang, 'hero_primary')}
              </Button>

              <button
                type="button"
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2 md:hidden ${
                  isSpectrum
                    ? 'bg-white/80 text-violet-900 ring-1 ring-violet-200/70'
                    : 'bg-white text-slate-800 ring-1 ring-slate-200/80'
                }`}
                aria-expanded={navOpen}
                aria-controls="landing-mobile-nav"
                aria-label={lang === 'en' ? 'Open menu' : 'Abrir menú'}
                onClick={() => setNavOpen((o) => !o)}
              >
                {navOpen ? (
                  <X className="h-5 w-5" strokeWidth={2} aria-hidden />
                ) : (
                  <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {navOpen ? (
        <div className="fixed inset-0 z-[90] md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/35"
            aria-label={lang === 'en' ? 'Close menu' : 'Cerrar menú'}
            onClick={() => setNavOpen(false)}
          />
          <div
            id="landing-mobile-nav"
            className={`absolute inset-0 overflow-y-auto overscroll-contain ${
              isSpectrum ? 'bg-[#fbf7ff]' : 'bg-white'
            } pb-[max(1.25rem,env(safe-area-inset-bottom))]`}
            aria-label={lang === 'en' ? 'Site menu' : 'Menú del sitio'}
          >
            <div className="px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
              <div className="flex h-14 items-center justify-between">
                <a
                  href={isSpectrum ? langPath : '#'}
                  className="flex min-w-0 items-center gap-2"
                  onClick={() => setNavOpen(false)}
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-900/10">
                    <span className="text-sm font-bold tracking-tight">HSG</span>
                  </div>
                  <span className="truncate text-sm font-semibold tracking-tight text-slate-900">
                    HSG Investment
                  </span>
                </a>
                <button
                  type="button"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2 ${
                    isSpectrum
                      ? 'bg-white text-violet-900 ring-1 ring-violet-200/70'
                      : 'bg-white text-slate-800 ring-1 ring-slate-200/80'
                  }`}
                  aria-label={lang === 'en' ? 'Close menu' : 'Cerrar menú'}
                  onClick={() => setNavOpen(false)}
                >
                  <X className="h-5 w-5" strokeWidth={2} aria-hidden />
                </button>
              </div>
            </div>

            <div className="px-4 pb-6 pt-2">
              <nav className="mx-auto flex max-w-6xl flex-col gap-1" aria-label="Mobile">
                {SHOW_PORTFOLIO_SIMULATOR_WHY ? (
                  <AnchorLink
                    href="#properties"
                    className="rounded-xl px-3 py-3 text-base font-semibold text-slate-900 active:bg-slate-100/80"
                    onClick={() => setNavOpen(false)}
                  >
                    {t(lang, 'nav_properties')}
                  </AnchorLink>
                ) : null}
                <AnchorLink
                  href="#journey"
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-900 active:bg-slate-100/80"
                  onClick={() => setNavOpen(false)}
                >
                  {t(lang, 'nav_journey')}
                </AnchorLink>
                <AnchorLink
                  href="#operators"
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-900 active:bg-slate-100/80"
                  onClick={() => setNavOpen(false)}
                >
                  {t(lang, 'nav_operators')}
                </AnchorLink>
                <AnchorLink
                  href="#faq"
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-900 active:bg-slate-100/80"
                  onClick={() => setNavOpen(false)}
                >
                  {t(lang, 'nav_faq')}
                </AnchorLink>
                <NavRouteLink
                  className="block w-full rounded-xl px-3 py-3 text-left text-base font-semibold text-slate-900 active:bg-slate-100/80"
                  onClick={() => {
                    setNavOpen(false)
                    navigate(isSpectrum ? langPath : capitalPath)
                  }}
                >
                  HSG Capital
                </NavRouteLink>
              </nav>

              <div className="mx-auto mt-6 max-w-6xl">
                <Button
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  variant="whatsapp"
                  className="w-full justify-center py-3 text-base"
                  onClick={() => setNavOpen(false)}
                >
                  <WhatsAppIcon className="h-5 w-5 text-white" />
                  {t(lang, 'hero_primary')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Hero */}
      <div
        className={`relative overflow-hidden ${
          isSpectrum ? 'border-b border-violet-200/25' : 'bg-white'
        }`}
      >
        {/* Clean gradient background */}
        <div
          className={
            isSpectrum
              ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_520px_at_18%_8%,rgba(124,58,237,0.12),transparent_58%),radial-gradient(900px_480px_at_88%_28%,rgba(37,99,235,0.11),transparent_55%),linear-gradient(to_bottom,rgba(255,255,255,0.92),#ffffff,#f8fafc)]'
              : 'pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_10%,rgba(37,99,235,0.10),transparent_60%),radial-gradient(900px_500px_at_90%_30%,rgba(56,189,248,0.10),transparent_55%),linear-gradient(to_bottom,#ffffff,#f8fafc,#ffffff)]'
          }
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
                    href={SHOW_PORTFOLIO_SIMULATOR_WHY ? '#properties' : '#calculator'}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    {t(
                      lang,
                      SHOW_PORTFOLIO_SIMULATOR_WHY
                        ? 'hero_secondary'
                        : 'hero_secondary_fallback',
                    )}
                  </Button>
                </div>
              </div>

              {USE_HERO_SHOWCASE_PULSE ? (
                <HeroShowcasePulse lang={lang} />
              ) : (
                <HeroShowcase lang={lang} />
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* Metrics */}
      <div
        className={`border-b py-0 ${
          isSpectrum
            ? 'border-violet-200/25 bg-transparent'
            : 'border-slate-200/60 bg-white'
        }`}
      >
        <Container>
          <div className="grid gap-4 py-10 md:grid-cols-4">
            {[
              ['metrics_min', 'metrics_min_value'],
              ['metrics_yield', 'metrics_yield_value'],
              ['metrics_market', 'metrics_market_value'],
              ['metrics_currency', 'metrics_currency_value'],
            ].map(([k, v]) => (
              <div
                key={k}
                className={`rounded-2xl p-5 shadow-sm ${
                  isSpectrum
                    ? 'border border-white/70 bg-white/75 ring-1 ring-violet-100/70 backdrop-blur-md'
                    : 'bg-white ring-1 ring-slate-200/70'
                }`}
              >
                <p className="text-2xl font-extrabold tracking-tight text-slate-900">
                  {t(lang, v)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{t(lang, k)}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Problem */}
      <div
        id="problem"
        className={`relative border-b ${
          isSpectrum ? 'border-violet-200/25' : 'border-slate-200/60'
        }`}
      >
        <div
          className={
            isSpectrum
              ? 'pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 via-violet-50/30 to-brand-50/25'
              : 'pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white'
          }
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage: [
              'radial-gradient(circle at 18% 12%, rgba(37,99,235,0.22), transparent 55%)',
              'radial-gradient(circle at 88% 18%, rgba(56,189,248,0.18), transparent 55%)',
              'radial-gradient(circle at 50% 92%, rgba(37,99,235,0.12), transparent 60%)',
              'radial-gradient(rgba(37,99,235,0.55) 1px, transparent 1px)',
            ].join(','),
            backgroundSize: 'auto, auto, auto, 22px 22px',
            backgroundPosition: 'center, center, center, 0 0',
            maskImage:
              'radial-gradient(ellipse at center, black 0%, black 62%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 0%, black 62%, transparent 100%)',
          }}
        />

        <Container>
          <div className="relative py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-2xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                {t(lang, 'problem_title')}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-7 text-slate-600 md:text-base">
                {t(lang, 'problem_lead')}
              </p>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
              {[
                ['problem_1_title', 'problem_1_body'],
                ['problem_2_title', 'problem_2_body'],
                ['problem_3_title', 'problem_3_body'],
              ].map(([titleKey, bodyKey]) => (
                <div
                  key={titleKey}
                  className={`rounded-2xl p-6 shadow-sm backdrop-blur ${
                    isSpectrum
                      ? 'border border-white/70 bg-white/70 ring-1 ring-violet-100/60'
                      : 'bg-white/80 ring-1 ring-slate-200/70'
                  }`}
                >
                  <p className="text-sm font-extrabold text-slate-900">
                    {t(lang, titleKey)}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {t(lang, bodyKey)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-3xl">
              <div
                className={`rounded-full border px-6 py-4 text-center shadow-[0_18px_60px_-34px_rgba(2,6,23,0.35)] backdrop-blur-md md:px-10 md:py-5 ${
                  isSpectrum
                    ? 'border-violet-200/50 bg-white/60 ring-1 ring-brand-100/50'
                    : 'border-white/60 bg-white/35 ring-1 ring-slate-200/60'
                }`}
              >
                <p className="text-sm font-semibold leading-7 text-slate-900 md:text-base">
                  {t(lang, 'problem_closing')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div
        className={
          isSpectrum
            ? 'border-y border-violet-200/20 bg-white/55 backdrop-blur-[2px]'
            : ''
        }
      >
        <CalculatorSection lang={lang} />
      </div>

      <JourneyTimelineSection lang={lang} />

      <OperatorsStatementSection lang={lang} />

      <PortfolioPerformanceSection lang={lang} />
      <FeesTransparencySection lang={lang} />
      <TaxCheatSheetSection lang={lang} />

      {SHOW_PORTFOLIO_SIMULATOR_WHY ? (
      <>
      {/* Portfolio */}
      <div
        id="properties"
        className="border-y border-slate-200/60 bg-white py-16 md:py-20"
      >
        <Container>
          <SectionTitle
            title={t(lang, 'portfolio_title')}
            subtitle={t(lang, 'portfolio_sub')}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PROPERTIES.map((p) => {
              const available = p.status === 'available'
              return (
                <div
                  key={p.address}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/70"
                >
                  <PropertyImage src={p.imageSrc} alt={p.address} />
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {p.address}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          <span className="font-semibold text-slate-700">
                            {t(lang, 'card_location')}:
                          </span>{' '}
                          {p.location}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                          available
                            ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                            : 'bg-slate-100 text-slate-600 ring-slate-200'
                        }`}
                      >
                        {available
                          ? t(lang, 'card_available')
                          : t(lang, 'card_sold_out')}
                      </span>
                    </div>

                    <div className="mt-4 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                      <div className="flex items-end justify-between gap-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {t(lang, 'yield_label')}
                        </p>
                        <p className="text-xl font-semibold text-brand-700">
                          {p.yield.toFixed(2)}%
                        </p>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span className="font-semibold text-slate-700">
                            {t(lang, 'card_progress')}
                          </span>
                          <span>{p.progress.toFixed(1)}%</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className={`h-full rounded-full ${
                              available ? 'bg-brand-600' : 'bg-slate-400'
                            }`}
                            style={{ width: `${Math.min(p.progress, 100)}%` }}
                          />
                        </div>
                        <p className="mt-3 text-xs text-slate-600">
                          <span className="font-semibold text-slate-700">
                            {t(lang, 'card_target')}:
                          </span>{' '}
                          {formatUsd(p.targetUsd, lang)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        onClick={() => setSimOpen(true)}
                        variant="secondary"
                        className="w-full"
                      >
                        {t(lang, 'open_simulator')}
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Simulator (locked + blurred) */}
          <div className="relative mt-10 overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 bg-white p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  HSG Investment
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {t(lang, 'simulator_title')}
                </p>
              </div>
              <Button
                onClick={() => setSimOpen(true)}
                variant="whatsapp"
                className="hidden sm:inline-flex"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
                {t(lang, 'simulator_cta')}
              </Button>
            </div>

            <div className="relative">
              <div className="pointer-events-none grid gap-4 p-5 md:grid-cols-3">
                {[
                  { label: 'Monto', value: '$50,000' },
                  { label: 'Renta mensual', value: '$420' },
                  { label: 'Yield anual', value: '7.18%' },
                ].map((x) => (
                  <div
                    key={x.label}
                    className="rounded-2xl bg-white p-4 ring-1 ring-slate-200/70 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {x.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {x.value}
                    </p>
                  </div>
                ))}
                <div className="md:col-span-3">
                  <div className="h-28 rounded-2xl bg-gradient-to-r from-brand-600/15 via-sky-400/10 to-slate-900/5 ring-1 ring-slate-200/60" />
                </div>
              </div>

              <div className="absolute inset-0 grid place-items-center bg-white/40 backdrop-blur-md">
                <div className="mx-auto max-w-lg p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {t(lang, 'simulator_locked_title')}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {t(lang, 'simulator_locked_desc')}
                  </p>
                  <div className="mt-5 flex justify-center">
                    <Button
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      variant="whatsapp"
                    >
                      <WhatsAppIcon className="h-5 w-5 text-white" />
                      {t(lang, 'simulator_cta')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Why */}
      <div className="py-16 md:py-20">
        <Container>
          <SectionTitle title={t(lang, 'why_title')} />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {[t(lang, 'why_1'), t(lang, 'why_2'), t(lang, 'why_3'), t(lang, 'why_4')].map(
              (x) => (
                <div
                  key={x}
                  className="flex items-start gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70"
                >
                  <div className="mt-0.5 rounded-xl bg-emerald-50 p-2 text-emerald-700 ring-1 ring-emerald-100">
                    <CheckIcon className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-6 text-slate-700">{x}</p>
                </div>
              ),
            )}
          </div>
        </Container>
      </div>
      </>
      ) : null}

      {/* FAQ */}
      <div
        id="faq"
        className={`border-t py-16 md:py-20 ${
          isSpectrum
            ? 'border-violet-200/25 bg-white/45 backdrop-blur-sm'
            : 'border-slate-200/60 bg-white'
        }`}
      >
        <Container>
          <SectionTitle title={t(lang, 'faq_title')} />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {(
              [
                ['faq_q1', 'faq_a1'],
                ['faq_q2', 'faq_a2'],
                ['faq_q3', 'faq_a3'],
                ['faq_q4', 'faq_a4'],
                ['faq_q5', 'faq_a5'],
                ['faq_q6', 'faq_a6'],
                ['faq_q7', 'faq_a7'],
                ['faq_q8', 'faq_a8'],
              ] as const
            ).map(([qk, ak]) => (
              <FaqItem
                key={qk}
                q={t(lang, qk)}
                a={t(lang, ak)}
                trackId={qk}
                lang={lang}
                spectrum={isSpectrum}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* Final CTA */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-[#0c1929] to-brand-950 py-20 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(59,130,246,0.18),transparent_55%)]"
          aria-hidden
        />
        <Container>
          <div className="relative mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/[0.06] px-6 py-10 text-center shadow-[0_32px_80px_-48px_rgba(0,0,0,0.55)] backdrop-blur-md md:px-12 md:py-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-300/90">
              {t(lang, 'final_cta_kicker')}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              {t(lang, 'final_cta_title')}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-white/75">
              {t(lang, 'final_cta_sub')}
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                className="px-6 py-3 text-base"
                onClick={() => trackEvent('final_cta_whatsapp', { lang })}
              >
                <WhatsAppIcon className="h-5 w-5 text-white" />
                {t(lang, 'final_cta_button')}
              </Button>
              <Button
                href="#calculator"
                variant="secondary"
                className="px-6 py-3 text-base shadow-sm"
                onClick={() => trackEvent('final_cta_calculator', { lang })}
              >
                {t(lang, 'final_cta_secondary')}
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Footer */}
      <footer
        className={`border-t py-12 ${
          isSpectrum
            ? 'border-violet-200/30 bg-white/80 backdrop-blur-md'
            : 'border-slate-100 bg-white'
        }`}
      >
        <Container>
          <div className="grid gap-10 md:grid-cols-3 md:items-start">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white">
                  <span className="text-sm font-bold tracking-tight">HSG</span>
                </div>
                <p className="text-sm font-semibold">HSG Investment</p>
              </div>
              <p className="mt-3 text-sm text-slate-600">{t(lang, 'footer_legal')}</p>
            </div>

            <div className="text-sm">
              <p className="font-semibold text-slate-900">Links</p>
              <div className="mt-3 space-y-2">
                {SHOW_PORTFOLIO_SIMULATOR_WHY ? (
                  <a className="block text-slate-600 hover:text-slate-900" href="#properties">
                    {t(lang, 'nav_properties')}
                  </a>
                ) : null}
                <a className="block text-slate-600 hover:text-slate-900" href="#journey">
                  {t(lang, 'nav_journey')}
                </a>
                <a className="block text-slate-600 hover:text-slate-900" href="#operators">
                  {t(lang, 'nav_operators')}
                </a>
                <a className="block text-slate-600 hover:text-slate-900" href="#faq">
                  {t(lang, 'nav_faq')}
                </a>
              </div>
            </div>

            <div className="text-sm">
              <p className="font-semibold text-slate-900">Contact</p>
              <div className="mt-3 space-y-2 text-slate-600">
                <a className="block hover:text-slate-900" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Language:</span>
                  <button
                    type="button"
                    onClick={() => navigate(isSpectrum ? '/es/capital' : '/es')}
                    className={`rounded-lg px-2 py-1 text-xs font-semibold ring-1 ${
                      lang === 'es'
                        ? 'bg-slate-900 text-white ring-slate-900'
                        : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ES
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(isSpectrum ? '/en/capital' : '/en')}
                    className={`rounded-lg px-2 py-1 text-xs font-semibold ring-1 ${
                      lang === 'en'
                        ? 'bg-slate-900 text-white ring-slate-900'
                        : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </footer>

      {/* Modal */}
      <Modal
        open={simOpen}
        title={t(lang, 'simulator_locked_title')}
        onClose={() => setSimOpen(false)}
      >
        <p className="text-sm leading-6 text-slate-600">
          {t(lang, 'simulator_locked_desc')}
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button onClick={() => setSimOpen(false)} variant="secondary">
            OK
          </Button>
          <Button
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            variant="whatsapp"
          >
            <WhatsAppIcon className="h-5 w-5 text-white" />
            {t(lang, 'simulator_cta')}
          </Button>
        </div>
      </Modal>
      </div>
    </div>
  )
}

function FaqItem({
  q,
  a,
  trackId,
  lang,
  spectrum = false,
}: {
  q: string
  a: string
  trackId: string
  lang: Lang
  spectrum?: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={
        spectrum
          ? 'rounded-2xl border border-white/70 bg-white/75 ring-1 ring-violet-100/60 backdrop-blur-md'
          : 'rounded-2xl bg-slate-50 ring-1 ring-slate-200/70'
      }
    >
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        onClick={() => {
          setOpen((v) => {
            const next = !v
            if (next) trackEvent('faq_expand', { id: trackId, lang })
            return next
          })
        }}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-900">{q}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 shrink-0 text-slate-500 transition ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div className="px-5 pb-5">
          <p className="text-sm leading-6 text-slate-600">{a}</p>
        </div>
      ) : null}
    </div>
  )
}

