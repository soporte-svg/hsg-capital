import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Lang } from '../i18n'
import { t } from '../i18n'
import { CONTACT_EMAIL, getWhatsAppHref } from '../config'
import { trackEvent } from '../lib/tracking'
import { CheckIcon, WhatsAppIcon } from '../components/icons'
import { LandingHeroSection } from '../components/LandingHeroSection'
import { CalculatorSection } from '../components/CalculatorSection'
import { JourneyTimelineSection } from '../components/JourneyTimelineSection'
import { OperatorsStatementSection } from '../components/OperatorsStatementSection'
import { PortfolioPerformanceSection } from '../components/PortfolioPerformanceSection'
import { FeesTransparencySection } from '../components/FeesTransparencySection'
import { TaxCheatSheetSection } from '../components/TaxCheatSheetSection'
import { LandingFaqSection } from '../components/LandingFaqSection'
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
      className={`text-sm font-medium text-slate-900/75 transition-opacity hover:text-slate-900 hover:opacity-100 ${className}`}
    >
      {children}
    </a>
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
      className={`min-h-screen overflow-x-hidden text-slate-900 ${
        isSpectrum
          ? 'spectrum-landing relative bg-[linear-gradient(180deg,#f5f3ff_0%,#ffffff_22%,#f8fafc_55%,#eff6ff_88%,#ffffff_100%)]'
          : 'bg-white'
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
        className={`sticky top-0 z-[70] ${
          isSpectrum
            ? 'bg-white/92 shadow-[0_8px_32px_-14px_rgba(91,33,182,0.14)] backdrop-blur-xl'
            : 'bg-white/92 shadow-[0_10px_32px_-22px_rgba(15,23,42,0.12)] backdrop-blur-[12px] ring-1 ring-slate-200/70'
        }`}
      >
        <Container>
          <div className="flex h-16 items-center justify-between gap-3">
            <a
              href={isSpectrum ? langPath : '#'}
              className="flex min-w-0 shrink-0 items-center gap-2"
              onClick={() => setNavOpen(false)}
            >
              <img
                src="/hsg-investment-color.png"
                alt="HSG Investment"
                className="h-16 w-auto shrink-0 object-contain"
                loading="eager"
              />
              <span className="truncate text-[15px] font-extrabold tracking-tight text-slate-900">
                HSG Investment
              </span>
            </a>

            <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:gap-2 md:gap-3">
              <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
                {SHOW_PORTFOLIO_SIMULATOR_WHY ? (
                  <AnchorLink href="#properties">{t(lang, 'nav_properties')}</AnchorLink>
                ) : null}
                <AnchorLink href="#problem">{t(lang, 'nav_operators')}</AnchorLink>
                <AnchorLink href="#calculator">{t(lang, 'calc_kicker')}</AnchorLink>
                <AnchorLink href="#journey">{t(lang, 'nav_journey')}</AnchorLink>
                <AnchorLink href="#faq">{t(lang, 'nav_faq')}</AnchorLink>
              </nav>

              <div className="hidden sm:flex">
                <div
                  className={`relative inline-flex items-center rounded-full p-1 ring-1 ${
                    isSpectrum
                      ? 'bg-white/80 ring-violet-200/80'
                      : 'bg-slate-50 ring-slate-200/80'
                  }`}
                  role="group"
                  aria-label={lang === 'en' ? 'Language' : 'Idioma'}
                >
                  <span
                    className={`pointer-events-none absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      lang === 'en' ? 'translate-x-full' : 'translate-x-0'
                    }`}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setNavOpen(false)
                      navigate(isSpectrum ? '/es/capital' : '/es')
                    }}
                    className={`relative z-10 rounded-full px-3 py-1 text-[13px] font-semibold transition-colors ${
                      lang === 'es' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    aria-pressed={lang === 'es'}
                  >
                    {t(lang, 'lang_es')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNavOpen(false)
                      navigate(isSpectrum ? '/en/capital' : '/en')
                    }}
                    className={`relative z-10 rounded-full px-3 py-1 text-[13px] font-semibold transition-colors ${
                      lang === 'en' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    aria-pressed={lang === 'en'}
                  >
                    {t(lang, 'lang_en')}
                  </button>
                </div>
              </div>

              <Button
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                className="hidden md:inline-flex rounded-full px-[18px] py-[9px]"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
                {t(lang, 'hero_primary')}
              </Button>

              <button
                type="button"
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2 md:hidden ${
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
                  <img
                    src="/hsg-investment-color.png"
                    alt="HSG Investment"
                    className="h-10 w-auto shrink-0 object-contain"
                    loading="eager"
                  />
                  <span className="truncate text-sm font-extrabold tracking-tight text-slate-900">
                    HSG Investment
                  </span>
                </a>
                <button
                  type="button"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 focus-visible:ring-offset-2 ${
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
              <div className="mb-4">
                <div
                  className={`relative inline-flex items-center rounded-full p-1 ring-1 ${
                    isSpectrum
                      ? 'bg-white ring-violet-200/80'
                      : 'bg-slate-50 ring-slate-200/80'
                  }`}
                  role="group"
                  aria-label={lang === 'en' ? 'Language' : 'Idioma'}
                >
                  <span
                    className={`pointer-events-none absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      lang === 'en' ? 'translate-x-full' : 'translate-x-0'
                    }`}
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setNavOpen(false)
                      navigate(isSpectrum ? '/es/capital' : '/es')
                    }}
                    className={`relative z-10 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                      lang === 'es' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    aria-pressed={lang === 'es'}
                  >
                    {t(lang, 'lang_es')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNavOpen(false)
                      navigate(isSpectrum ? '/en/capital' : '/en')
                    }}
                    className={`relative z-10 rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                      lang === 'en' ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    aria-pressed={lang === 'en'}
                  >
                    {t(lang, 'lang_en')}
                  </button>
                </div>
              </div>
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
                  href="#problem"
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-900 active:bg-slate-100/80"
                  onClick={() => setNavOpen(false)}
                >
                  {t(lang, 'nav_operators')}
                </AnchorLink>
                <AnchorLink
                  href="#calculator"
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-900 active:bg-slate-100/80"
                  onClick={() => setNavOpen(false)}
                >
                  {t(lang, 'calc_kicker')}
                </AnchorLink>
                <AnchorLink
                  href="#journey"
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-900 active:bg-slate-100/80"
                  onClick={() => setNavOpen(false)}
                >
                  {t(lang, 'nav_journey')}
                </AnchorLink>
                <AnchorLink
                  href="#faq"
                  className="rounded-xl px-3 py-3 text-base font-semibold text-slate-900 active:bg-slate-100/80"
                  onClick={() => setNavOpen(false)}
                >
                  {t(lang, 'nav_faq')}
                </AnchorLink>
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
      <LandingHeroSection
        lang={lang}
        whatsappHref={whatsappHref}
        isSpectrum={isSpectrum}
        showPortfolioCta={SHOW_PORTFOLIO_SIMULATOR_WHY}
        usePulseHero={USE_HERO_SHOWCASE_PULSE}
      />

      {/* Stats strip */}
      <div className="border-y border-slate-200/80 bg-white">
        <div className="mx-auto w-full max-w-[calc(1160px+160px)] px-4 sm:px-6 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              ['metrics_min', 'metrics_min_value'],
              ['metrics_yield', 'metrics_yield_value'],
              ['metrics_market', 'metrics_market_value'],
              ['metrics_currency', 'metrics_currency_value'],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={[
                  'px-6 py-9 md:px-10',
                  i % 2 === 1 ? 'border-l border-slate-200/80' : '',
                  i >= 2 ? 'border-t border-slate-200/80 md:border-t-0' : '',
                  i < 3 ? 'md:border-r md:border-slate-200/80' : '',
                ].join(' ')}
              >
                <p className="text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold tracking-[-0.04em] text-slate-900 leading-none">
                  {t(lang, v)}
                </p>
                <p className="mt-2 text-[13px] font-medium text-slate-500">
                  {t(lang, k)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem */}
      <section id="problem" className="bg-[#09142A] py-24">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="mx-auto max-w-[1160px]">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-400">
              {lang === 'en' ? 'The problem' : 'El problema'}
            </p>

            {(() => {
              const title = t(lang, 'problem_title')
              const parts = title.trim().split(/\s+/)
              const last = parts.pop()
              const head = parts.join(' ')
              return (
                <h2 className="mt-4 max-w-[40rem] text-balance text-3xl font-extrabold tracking-tight text-white md:text-5xl md:leading-[1.1]">
                  {head}{' '}
                  <em className="font-extrabold not-italic text-white/45">{last}</em>
                </h2>
              )
            })()}

            <p className="mt-4 max-w-[32rem] text-pretty text-base leading-7 text-white/45">
              {t(lang, 'problem_lead')}
            </p>

            <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              <div className="grid gap-px bg-white/10 md:grid-cols-3">
                {[
                  ['01', 'problem_1_title', 'problem_1_body'],
                  ['02', 'problem_2_title', 'problem_2_body'],
                  ['03', 'problem_3_title', 'problem_3_body'],
                ].map(([num, titleKey, bodyKey]) => (
                  <div
                    key={titleKey}
                    className="bg-white/[0.03] px-7 py-9 transition-colors hover:bg-white/[0.06]"
                  >
                    <p className="text-[72px] font-extrabold tracking-[-0.05em] text-white/[0.06] leading-none">
                      {num}
                    </p>
                    <p className="mt-4 text-base font-extrabold text-white/90">
                      {t(lang, titleKey)}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/45">
                      {t(lang, bodyKey)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-12 text-center text-[15px] font-semibold text-white/35">
              {lang === 'en' ? (
                <>
                  That's why we built <strong className="text-white/85">HSG Capital Investment.</strong>
                </>
              ) : (
                <>
                  Por eso construimos{' '}
                  <strong className="text-white/85">HSG Capital Investment.</strong>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

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
      <LandingFaqSection lang={lang} />

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#09142A] py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.20)_0%,transparent_65%)]"
          aria-hidden
        />
        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            <p className="inline-block rounded-full border border-brand-500/25 bg-brand-500/15 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-200/90">
              {t(lang, 'final_cta_kicker')}
            </p>
            <h2 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white md:text-6xl md:leading-[1.05]">
              {t(lang, 'final_cta_title')}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-white/50">
              {t(lang, 'final_cta_sub')}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="whatsapp"
                className="rounded-full px-6 py-3 text-base"
                onClick={() => trackEvent('final_cta_whatsapp', { lang })}
              >
                <WhatsAppIcon className="h-5 w-5 text-white" />
                {t(lang, 'final_cta_button')}
              </Button>
              <a
                href="#calculator"
                className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/15 hover:text-white"
                onClick={() => trackEvent('final_cta_calculator', { lang })}
              >
                {t(lang, 'final_cta_secondary')}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <Container>
          <div className="grid gap-10 md:grid-cols-3 md:items-start">
            <div>
              <div className="flex items-center gap-2">
                <img
                  src="/hsg-investment-color.png"
                  alt="HSG Investment"
                  className="h-10 w-auto object-contain"
                  loading="lazy"
                />
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
                <a className="block text-slate-600 hover:text-slate-900" href="#problem">
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
                    className={`rounded-md px-2 py-1 text-[13px] font-semibold ${
                      lang === 'es'
                        ? 'text-slate-900'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    ES
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(isSpectrum ? '/en/capital' : '/en')}
                    className={`rounded-md px-2 py-1 text-[13px] font-semibold ${
                      lang === 'en'
                        ? 'text-slate-900'
                        : 'text-slate-500 hover:text-slate-900'
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

