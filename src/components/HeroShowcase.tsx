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

export function HeroShowcase({ lang }: { lang: Lang }) {
  const reducedMotion = usePrefersReducedMotion()
  const [scene, setScene] = useState<0 | 1>(0)

  useEffect(() => {
    if (reducedMotion) return
    const id = window.setInterval(() => {
      setScene((s) => (s === 0 ? 1 : 0))
    }, 7200)
    return () => window.clearInterval(id)
  }, [reducedMotion])

  const labels = useMemo(() => {
    return lang === 'en'
      ? {
          annualYield: 'Annual yield',
          rentReceived: 'Rent received',
          funded: 'funded',
          objective: 'target',
          minInvestment: 'Minimum investment',
          marketActive: 'Active market',
          thisMonth: 'This month',
          yieldPlus: '7%+',
          annual: 'annual',
          rentValue: '+$356',
        }
      : {
          annualYield: 'Rentabilidad anual',
          rentReceived: 'Renta recibida',
          funded: 'financiado',
          objective: 'objetivo',
          minInvestment: 'Inversión mínima',
          marketActive: 'Mercado activo',
          thisMonth: 'Este mes',
          yieldPlus: '7%+',
          annual: 'anual',
          rentValue: '+$356',
        }
  }, [lang])

  const cardBase =
    'rounded-[28px] bg-white shadow-[0_18px_50px_-24px_rgba(2,6,23,0.35)] ring-1 ring-slate-200/70'

  return (
    <div className="hero-showcase relative mx-auto w-full max-w-xl">
      <div className="relative w-full overflow-visible md:aspect-[4/3] md:min-h-0">
        <div className="relative overflow-hidden rounded-[32px] bg-slate-100 ring-1 ring-slate-200/70 max-md:overflow-x-hidden md:absolute md:inset-0 md:min-h-0 md:overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-slate-50" />
          <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />

          <div
            className={`relative z-10 flex flex-col gap-2.5 p-3.5 transition duration-700 max-md:min-h-0 md:absolute md:inset-0 md:z-auto md:gap-4 md:p-5 ${
              scene === 0 ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={scene !== 0}
          >
            <div className="grid grid-cols-1 gap-2.5 md:flex-1 md:grid-cols-2 md:grid-rows-[auto_auto] md:items-stretch md:gap-4 md:self-stretch">
              <div
                className={`relative overflow-hidden rounded-[28px] bg-brand-600 p-4 text-white shadow-[0_20px_60px_-30px_rgba(29,78,216,0.8)] md:row-span-2 md:flex md:h-full md:min-h-0 md:flex-col md:p-6 ${
                  reducedMotion ? '' : 'hsg-float'
                }`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75 md:text-xs">
                  {labels.annualYield}
                </p>
                <p className="mt-2.5 text-3xl font-semibold leading-none tracking-tight md:mt-5 md:text-5xl lg:text-6xl">
                  {labels.yieldPlus}
                </p>
                <p className="mt-2 text-sm text-white/80 md:mt-3 md:text-base">
                  {labels.annual} • Chicago, IL
                </p>
                <div className="mt-3 rounded-2xl bg-white/10 p-2.5 ring-1 ring-white/15 md:mt-6 md:flex md:min-h-0 md:flex-1 md:flex-col md:p-4">
                  <div className="h-12 w-full md:min-h-[5.5rem] md:flex-1">
                    <svg
                      viewBox="0 0 260 90"
                      className="h-full w-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 70 C 50 60, 70 50, 96 55 C 125 60, 145 42, 170 38 C 195 34, 210 28, 254 20"
                        stroke="rgba(255,255,255,0.85)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 70 C 50 60, 70 50, 96 55 C 125 60, 145 42, 170 38 C 195 34, 210 28, 254 20 V 92 H 6 Z"
                        fill="rgba(255,255,255,0.10)"
                      />
                    </svg>
                  </div>
                  <div className="mt-2.5 grid grid-cols-3 gap-2 text-[11px] text-white/85 md:mt-4 md:gap-3 md:text-xs">
                    <div>
                      <p className="text-white/65">2022</p>
                      <p className="mt-0.5 text-xs font-semibold md:mt-1 md:text-sm">5.8%</p>
                    </div>
                    <div>
                      <p className="text-white/65">2023</p>
                      <p className="mt-0.5 text-xs font-semibold md:mt-1 md:text-sm">6.4%</p>
                    </div>
                    <div>
                      <p className="text-white/65">2024</p>
                      <p className="mt-0.5 text-xs font-semibold md:mt-1 md:text-sm">7.2%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${cardBase} relative min-h-0 overflow-visible p-3.5 md:min-h-0 md:self-start md:p-5 ${
                  reducedMotion ? '' : 'hsg-float-delayed'
                }`}
              >
                <div className="flex items-start gap-2.5 md:gap-3">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 md:h-10 md:w-10">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 md:h-5 md:w-5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 17 17 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M10 7h7v7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 md:text-xs">
                      {labels.rentReceived}
                    </p>
                    <p className="mt-1.5 text-xl font-semibold tracking-tight text-emerald-600 md:mt-2 md:text-3xl">
                      {labels.rentValue}{' '}
                      <span className="text-xs font-semibold text-slate-500 md:text-base">
                        USD
                      </span>
                    </p>
                    <p className="mt-1.5 text-xs leading-snug text-slate-600 md:mt-2 md:text-sm">
                      {labels.thisMonth} • Van Vlissingen
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`${cardBase} min-h-0 p-3.5 md:min-h-0 md:self-start md:p-5 ${
                  reducedMotion ? '' : 'hsg-float'
                }`}
              >
                <p className="text-xs font-semibold text-slate-900 md:text-sm">
                  10214 Van Vlissingen Rd
                </p>
                <div className="mt-2 flex items-baseline gap-2 md:mt-3">
                  <p className="text-2xl font-semibold tracking-tight text-amber-600 md:text-4xl">
                    63.4%
                  </p>
                  <p className="text-xs text-slate-500 md:text-sm">{labels.funded}</p>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 md:mt-3 md:h-2">
                  <div
                    className={`h-full rounded-full bg-brand-600 ${
                      reducedMotion ? '' : 'hsg-progress'
                    }`}
                    style={{ width: '63.4%' }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600 md:mt-4 md:text-sm">
                  <span className="font-semibold text-brand-700">
                    {formatUsd(162_240, lang)}
                  </span>
                  <span className="text-slate-400">{labels.objective}</span>
                </div>
              </div>
            </div>
            <div
              className={`shrink-0 rounded-[28px] bg-brand-600 px-3.5 py-3 text-white shadow-[0_20px_60px_-30px_rgba(29,78,216,0.8)] ring-1 ring-white/10 md:px-6 md:py-5 ${
                reducedMotion ? '' : 'hsg-float'
              }`}
            >
              <div className="flex items-center justify-between gap-3 md:gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/75 md:text-xs">
                    {labels.minInvestment}
                  </p>
                  <p className="mt-1.5 text-xl font-semibold tracking-tight md:mt-2 md:text-3xl">
                    {formatUsd(50_000, lang)}
                  </p>
                </div>
                <div className="shrink-0 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-white/15 md:px-4 md:py-2 md:text-sm">
                  {labels.marketActive} →
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 transition duration-700 md:overflow-visible ${
            scene === 1 ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={scene !== 1}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[32px] shadow-[0_22px_80px_-50px_rgba(2,6,23,0.45)]" />

          <div className="absolute inset-0 overflow-hidden rounded-[32px]">
            <img
              src="/image.png"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/0 to-white/70" />
          </div>

          <div className="absolute left-3 top-4 z-20 md:-left-5 md:top-6">
            <div
              className={`flex items-center gap-3 rounded-2xl bg-white px-3 py-2.5 shadow-xl shadow-slate-900/15 ring-1 ring-slate-200/70 md:px-4 md:py-3 ${
                reducedMotion ? '' : 'hsg-float'
              }`}
            >
              <div className="grid h-8 w-8 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 md:h-9 md:w-9">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 md:h-5 md:w-5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7 17 17 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 7h7v7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:text-[11px]">
                  {labels.rentReceived}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-slate-900 md:text-sm">
                  +$329{' '}
                  <span className="text-[11px] font-semibold text-slate-500 md:text-xs">
                    USD
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 left-3 right-3 z-10 md:-bottom-7 md:left-auto md:right-[-22px] md:w-[64%]">
            <div
              className={`rounded-[26px] bg-white p-3.5 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200/70 md:p-4 ${
                reducedMotion ? '' : 'hsg-float-delayed'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-900 md:text-[13px]">
                    10214 South Van Vlissingen
                  </p>
                  <p className="mt-1 text-[11px] text-slate-600 md:text-xs">
                    Chicago, IL
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200 md:px-3 md:py-1 md:text-xs">
                  {lang === 'en' ? 'Available' : 'Disponible'}
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-2 md:mt-3 md:gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:text-[11px]">
                    {lang === 'en' ? 'Annual yield' : 'Yield anual'}
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                    7.18<span className="text-base md:text-xl">%</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:text-[11px]">
                    {labels.objective}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-900 md:text-base">
                    {formatUsd(162_240, lang)}
                  </p>
                </div>
              </div>

              <div className="mt-2.5 md:mt-3">
                <div className="flex items-center justify-between text-[11px] text-slate-600 md:text-xs">
                  <span>63.4% {labels.funded}</span>
                  <span className="font-semibold text-slate-700">
                    {formatUsd(102_860, lang)}
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 md:mt-2 md:h-2">
                  <div
                    className={`h-full rounded-full bg-amber-500 ${
                      reducedMotion ? '' : 'hsg-progress'
                    }`}
                    style={{ width: '63.4%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
