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
    <div className="relative mx-auto w-full max-w-xl">
      {/* Outer wrapper is overflow-visible so overlays can "stick out" */}
      <div className="relative aspect-[4/3] w-full overflow-visible">
        {/* Inner frame keeps the main visuals clipped */}
        <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-slate-100 ring-1 ring-slate-200/70">
          {/* soft backdrop */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-slate-50" />
          <div className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-sky-400/15 blur-3xl" />

          {/* Scene A: UI cards (like your blue/white metric board) */}
          <div
            className={`absolute inset-0 p-5 transition duration-700 ${
              scene === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={scene !== 0}
          >
            <div className="grid h-full grid-cols-2 gap-4">
              <div
                className={`relative col-span-1 row-span-2 overflow-hidden rounded-[28px] bg-brand-600 p-6 text-white shadow-[0_20px_60px_-30px_rgba(29,78,216,0.8)] ${
                  reducedMotion ? '' : 'hsg-float'
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
                  {labels.annualYield}
                </p>
                <p className="mt-5 text-6xl font-semibold leading-none tracking-tight">
                  {labels.yieldPlus}
                </p>
                <p className="mt-3 text-base text-white/80">
                  {labels.annual} • Chicago, IL
                </p>
                <div className="mt-6 rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                  <div className="h-24 w-full">
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
                  <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-white/85">
                    <div>
                      <p className="text-white/65">2022</p>
                      <p className="mt-1 text-sm font-semibold">5.8%</p>
                    </div>
                    <div>
                      <p className="text-white/65">2023</p>
                      <p className="mt-1 text-sm font-semibold">6.4%</p>
                    </div>
                    <div>
                      <p className="text-white/65">2024</p>
                      <p className="mt-1 text-sm font-semibold">7.2%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${cardBase} relative overflow-hidden p-5 ${
                  reducedMotion ? '' : 'hsg-float-delayed'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
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
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      {labels.rentReceived}
                    </p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-emerald-600">
                      {labels.rentValue}{' '}
                      <span className="text-base font-semibold text-slate-500">
                        USD
                      </span>
                    </p>
                    <p className="mt-2 text-sm text-slate-600">
                      {labels.thisMonth} • Van Vlissingen
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`${cardBase} p-5 ${reducedMotion ? '' : 'hsg-float'}`}
              >
                <p className="text-sm font-semibold text-slate-900">
                  10214 Van Vlissingen Rd
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-4xl font-semibold tracking-tight text-amber-600">
                    63.4%
                  </p>
                  <p className="text-sm text-slate-500">{labels.funded}</p>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full bg-brand-600 ${
                      reducedMotion ? '' : 'hsg-progress'
                    }`}
                    style={{ width: '63.4%' }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                  <span className="font-semibold text-brand-700">
                    {formatUsd(162_240, lang)}
                  </span>
                  <span className="text-slate-400">{labels.objective}</span>
                </div>
              </div>
            </div>
            <div
              className={`mt-4 rounded-[28px] bg-brand-600 px-6 py-5 text-white shadow-[0_20px_60px_-30px_rgba(29,78,216,0.8)] ring-1 ring-white/10 ${
                reducedMotion ? '' : 'hsg-float'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/75">
                    {labels.minInvestment}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    {formatUsd(50_000, lang)}
                  </p>
                </div>
                <div className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/15">
                  {labels.marketActive} →
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scene B overlays live OUTSIDE the clipped frame */}
        <div
          className={`absolute inset-0 transition duration-700 ${
            scene === 1 ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={scene !== 1}
        >
          {/* Image stays clipped inside the frame */}
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

          {/* Top-left overlay sticks out */}
          <div className="absolute -left-3 top-6 md:-left-5">
            <div
              className={`flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-slate-900/15 ring-1 ring-slate-200/70 ${
                reducedMotion ? '' : 'hsg-float'
              }`}
            >
              <div className="grid h-9 w-9 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
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
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {labels.rentReceived}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  +$329{' '}
                  <span className="text-xs font-semibold text-slate-500">
                    USD
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom overlay sticks out */}
          <div className="absolute -bottom-7 left-4 right-4 md:left-auto md:right-[-22px] md:w-[64%]">
            <div
              className={`rounded-[26px] bg-white p-4 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-200/70 ${
                reducedMotion ? '' : 'hsg-float-delayed'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] font-semibold text-slate-900">
                    10214 South Van Vlissingen
                  </p>
                  <p className="mt-1 text-xs text-slate-600">Chicago, IL</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                  {lang === 'en' ? 'Available' : 'Disponible'}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {lang === 'en' ? 'Annual yield' : 'Yield anual'}
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                    7.18<span className="text-xl">%</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    {labels.objective}
                  </p>
                  <p className="mt-1 text-base font-semibold text-slate-900">
                    {formatUsd(162_240, lang)}
                  </p>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>63.4% {labels.funded}</span>
                  <span className="font-semibold text-slate-700">
                    {formatUsd(102_860, lang)}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
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

