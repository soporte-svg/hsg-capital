import { useEffect, useMemo, useState } from 'react'
import type { Lang } from '../i18n'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function formatUsd(amount: number, lang: Lang) {
  return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-CO', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

type Slide = 0 | 1 | 2

export function HeroShowcasePulse({ lang }: { lang: Lang }) {
  const reducedMotion = usePrefersReducedMotion()
  const [slide, setSlide] = useState<Slide>(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setSlide((s) => ((s + 1) % 3) as Slide)
    }, 4800)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  const copy = useMemo(() => {
    return lang === 'en'
      ? {
          live: 'Live',
          yieldHead: 'Annual yield',
          deal: 'Active deal',
          floor: 'Entry ticket',
          rentChip: 'Rent',
          fundChip: 'Funding',
          annual: 'annual',
          chicago: 'Chicago, IL',
          thisMonth: 'This month',
          funded: 'funded',
          objective: 'Target',
          minInvestment: 'Minimum',
          marketActive: 'Active market',
          available: 'Available',
          yieldShort: 'Yield',
        }
      : {
          live: 'En vivo',
          yieldHead: 'Rentabilidad',
          deal: 'Operación activa',
          floor: 'Ticket de entrada',
          rentChip: 'Renta',
          fundChip: 'Fondeo',
          annual: 'anual',
          chicago: 'Chicago, IL',
          thisMonth: 'Este mes',
          funded: 'financiado',
          objective: 'Objetivo',
          minInvestment: 'Mínimo',
          marketActive: 'Mercado activo',
          available: 'Disponible',
          yieldShort: 'Yield',
        }
  }, [lang])

  const showSlide = reducedMotion ? 0 : slide

  return (
    <div
      className={`hero-showcase-pulse relative mx-auto w-full max-w-xl ${
        reducedMotion ? 'hsp-static' : ''
      }`}
    >
      <div className="relative flex aspect-[10/13] w-full flex-col overflow-hidden rounded-[28px] ring-1 ring-white/10 md:aspect-[16/11]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950" />
        <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-[55%] w-[70%] rounded-full bg-brand-500/25 blur-3xl hsp-orb-a" />
        <div className="pointer-events-none absolute -bottom-1/4 -right-1/4 h-[50%] w-[65%] rounded-full bg-sky-400/20 blur-3xl hsp-orb-b" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, white 1px, transparent 1px)',
            backgroundSize: '14px 14px',
          }}
        />

        <div className="relative z-10 flex items-center justify-between gap-2 border-b border-white/10 px-4 py-3 md:px-5 md:py-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 hsp-ping-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300/90 md:text-xs">
              {copy.live}
            </span>
          </div>
          <div className="flex flex-wrap justify-end gap-1.5 md:gap-2">
            <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-white/90 shadow-sm backdrop-blur-sm md:px-3 md:text-[11px]">
              7%+ {copy.annual}
            </span>
            <span className="rounded-full border border-emerald-400/25 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold text-emerald-100 md:px-3 md:text-[11px]">
              +$356 USD
            </span>
            <span className="hidden rounded-full border border-amber-400/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-100 sm:inline md:px-3 md:text-[11px]">
              63.4% {copy.funded}
            </span>
          </div>
        </div>

        <div className="relative z-10 min-h-0 flex-1 px-4 md:px-5">
          <div className="relative h-full min-h-[200px] py-3 md:min-h-[220px] md:py-4">
            {/* Slide 0 — Yield */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center px-1 transition-all duration-700 ease-out ${
                showSlide === 0
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-4 opacity-0'
              }`}
              aria-hidden={showSlide !== 0}
            >
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-200/70 md:text-xs">
                {copy.yieldHead}
              </p>
              <p
                className="hsp-shimmer mt-3 bg-gradient-to-r from-white via-sky-100 to-brand-200 bg-clip-text text-center text-5xl font-extrabold tracking-tight text-transparent md:mt-4 md:text-7xl"
                style={{ backgroundSize: '220% auto' }}
              >
                7%+
              </p>
              <p className="mt-3 text-center text-sm text-white/55 md:text-base">
                {copy.chicago} · USD
              </p>
              <div className="mt-6 flex gap-5 text-center text-xs text-white/50 md:mt-8 md:gap-8 md:text-sm">
                <div>
                  <p className="text-white/40">2022</p>
                  <p className="mt-1 font-semibold text-white/90">5.8%</p>
                </div>
                <div>
                  <p className="text-white/40">2023</p>
                  <p className="mt-1 font-semibold text-white/90">6.4%</p>
                </div>
                <div>
                  <p className="text-white/40">2024</p>
                  <p className="mt-1 font-semibold text-emerald-300">7.2%</p>
                </div>
              </div>
            </div>

            {/* Slide 1 — Deal + imagen */}
            <div
              className={`absolute inset-0 flex flex-col justify-center gap-4 px-0 transition-all duration-700 ease-out md:flex-row md:items-center md:gap-5 ${
                showSlide === 1
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-4 opacity-0'
              }`}
              aria-hidden={showSlide !== 1}
            >
              <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-2xl ring-2 ring-white/20 shadow-2xl shadow-brand-900/40 md:mx-0 md:h-32 md:w-32">
                <img
                  src="/image.png"
                  alt=""
                  className="h-full w-full object-cover hsp-photo-drift"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
              <div className="min-w-0 flex-1 space-y-3 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200 ring-1 ring-emerald-400/30">
                    {copy.available}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                    {copy.deal}
                  </span>
                </div>
                <p className="text-balance text-sm font-semibold leading-snug text-white md:text-base">
                  10214 Van Vlissingen Rd
                </p>
                <div className="flex flex-wrap items-end justify-center gap-2 md:justify-start">
                  <span className="text-3xl font-bold tabular-nums text-amber-300 md:text-4xl">
                    63.4%
                  </span>
                  <span className="pb-1 text-xs text-white/50">{copy.funded}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-400 to-sky-400 hsp-bar-fill"
                    style={{ width: '63.4%' }}
                  />
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/55 md:justify-start">
                  <span className="font-semibold text-white/90">
                    {formatUsd(162_240, lang)}
                  </span>
                  <span>{copy.objective}</span>
                  <span className="text-emerald-300/90">
                    {copy.thisMonth}: +$329
                  </span>
                </div>
              </div>
            </div>

            {/* Slide 2 — Mínimo + mercado */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center px-2 transition-all duration-700 ease-out ${
                showSlide === 2
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-4 opacity-0'
              }`}
              aria-hidden={showSlide !== 2}
            >
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45 md:text-xs">
                {copy.floor}
              </p>
              <p className="mt-3 text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                {formatUsd(50_000, lang)}
              </p>
              <p className="mt-2 text-center text-xs text-white/45 md:text-sm">
                {copy.minInvestment}
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md md:mt-8 md:px-5 md:py-2.5 md:text-base">
                <span className="hsp-glow-dot h-2 w-2 rounded-full bg-sky-400" />
                {copy.marketActive}
                <span aria-hidden className="text-white/60">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 px-4 py-3 md:px-5 md:py-4">
          <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-90 hsp-scan" />
          </div>
          <div className="mt-2.5 flex justify-center gap-1.5">
            {([0, 1, 2] as const).map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => !reducedMotion && setSlide(i)}
                aria-current={showSlide === i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  showSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
                aria-label={
                  (lang === 'en'
                    ? (['Yield', 'Deal', 'Minimum'] as const)
                    : (['Rendimiento', 'Operación', 'Mínimo'] as const))[i]
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
