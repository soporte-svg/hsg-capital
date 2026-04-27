import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '../i18n'
import { t } from '../i18n'
import { calculatePortfolio } from '../lib/portfolioCalculator'
import { trackEvent } from '../lib/tracking'
import { getWhatsAppHref } from '../config'
import { Button, Container } from './ui'

function formatUsd(amount: number, lang: Lang) {
  return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'es-CO', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function applyTemplate(
  template: string,
  vars: Record<string, string | number>,
) {
  return template.replaceAll(/\{(\w+)\}/g, (_, key: string) => {
    const v = vars[key]
    return v == null ? '' : String(v)
  })
}

export function CalculatorSection({ lang }: { lang: Lang }) {
  const [capital, setCapital] = useState(400_000)
  const calc = useMemo(() => calculatePortfolio(capital), [capital])
  const [shotIndex, setShotIndex] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    const id = window.setInterval(() => {
      setShotIndex((i) => (i + 1) % 3)
    }, 5200)
    return () => window.clearInterval(id)
  }, [])

  const shots = useMemo(
    () => ['/image.png', '/property-2-D4LPmw2A.jpg', '/property-3-C-VAc_JJ.jpg'],
    [],
  )

  const whatsappMessage =
    lang === 'en'
      ? `Hi! I used the portfolio calculator with ${formatUsd(capital, lang)}. I want to understand the numbers and next steps.`
      : `Hola! Usé la calculadora de portafolio con ${formatUsd(capital, lang)}. Quiero entender los números y los siguientes pasos.`

  const whatsappHref = getWhatsAppHref(whatsappMessage)

  const onCapitalChange = (next: number) => {
    setCapital(next)
    trackEvent('calculator_interaction', { capital: next, lang })
  }

  const sliderPct = ((capital - 100_000) / (1_500_000 - 100_000)) * 100

  const onCta = () => {
    trackEvent('calculator_cta_click', { capital, lang })
  }

  return (
    <section id="calculator" className="bg-[#F4F6FB] py-16 md:py-24">
      <Container>
        <div>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-700">
              {t(lang, 'calc_kicker')}
            </p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-slate-900 md:mt-4 md:text-5xl">
              {t(lang, 'calc_title')}
            </h2>
            <p className="mx-auto mt-2 max-w-[32rem] text-pretty text-[15px] leading-7 text-slate-600 md:mt-3">
              {t(lang, 'calc_desc')}
            </p>
          </div>

          <div className="mx-auto mt-6 grid max-w-6xl gap-4 md:mt-10 md:grid-cols-2 md:items-stretch md:gap-6">
            <div className="flex h-full flex-col rounded-[20px] border border-slate-200/80 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.04)] md:p-8">
              <div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                    {t(lang, 'calc_capital_label')}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold tracking-[-0.04em] text-slate-900">
                    {formatUsd(capital, lang)}
                  </p>
                </div>
                <p className="mt-1 text-xs text-slate-500">{t(lang, 'calc_slider_hint')}</p>
              </div>

              <input
                type="range"
                min={100_000}
                max={1_500_000}
                step={50_000}
                value={capital}
                onChange={(e) => onCapitalChange(Number(e.target.value))}
                className="calc-range mt-4 w-full shrink-0 cursor-pointer appearance-none md:mt-6"
                style={{
                  background: `linear-gradient(to right, #1d4ed8 ${sliderPct}%, #E2E7F0 ${sliderPct}%)`,
                }}
              />

              <div className="relative mt-4 min-h-[132px] flex-1 overflow-hidden rounded-xl bg-slate-900 md:mt-[22px] md:min-h-[180px]">
                {shots.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt={t(lang, 'calc_visual_alt')}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                      i === shotIndex ? 'opacity-90 scale-100' : 'opacity-0 scale-[1.04]'
                    }`}
                    loading="lazy"
                  />
                ))}
                <div
                  className="pointer-events-none absolute inset-0 opacity-90"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 20%, rgba(59,130,246,0.18), transparent 55%)',
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
                  aria-hidden
                />
                <p className="absolute inset-x-0 bottom-0 p-3 text-left text-xs font-semibold leading-snug text-white/95 drop-shadow-sm md:p-4">
                  {t(lang, 'calc_visual_caption')}
                </p>
              </div>
            </div>

            {/* Mobile: compact summary to avoid excessive scrolling */}
            <div className="md:hidden">
              <div className="rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-brand-700">
                  {t(lang, 'calc_projection_title')}
                </p>

                <div className="mt-2 rounded-2xl bg-[#F4F6FB] p-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-slate-500">
                    {t(lang, 'calc_projection_total')}
                  </p>
                  <p className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-brand-700">
                    {formatUsd(calc.totalReturn, lang)}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {calc.totalReturnPct}% {lang === 'en' ? 'estimated in 5 years' : 'estimado a 5 años'}
                  </p>

                  <div className="mt-4 space-y-4 border-t border-slate-200/70 pt-4">
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-slate-500">
                        {t(lang, 'calc_projection_cashflow')}
                      </p>
                      <p className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-slate-900">
                        {formatUsd(calc.cumulativeCashFlow, lang)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-slate-500">
                        {t(lang, 'calc_projection_equity')}
                      </p>
                      <p className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-slate-900">
                        {formatUsd(calc.equityAppreciation, lang)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    <div className="rounded-xl bg-white px-3 py-2.5 ring-1 ring-slate-200/70">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-slate-500">
                        {lang === 'en' ? 'Net rent / month' : 'Renta neta / mes'}
                      </p>
                      <p className="mt-1 text-base font-extrabold tracking-[-0.02em] text-slate-900">
                        {formatUsd(calc.monthlyNetRent, lang)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white px-3 py-2.5 ring-1 ring-slate-200/70">
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-slate-500">
                        {lang === 'en' ? 'Properties' : 'Propiedades'}
                      </p>
                      <p className="mt-1 text-base font-extrabold tracking-[-0.02em] text-slate-900">
                        {calc.numProperties}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    {applyTemplate(t(lang, 'calc_bullets_intro'), {
                      capital: formatUsd(capital, lang),
                    })}
                  </p>

                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    <li className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                      <span>
                        {applyTemplate(t(lang, 'calc_bullet_properties'), {
                          count: calc.numProperties,
                        })}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                      <span>
                        {applyTemplate(t(lang, 'calc_bullet_net_rent'), {
                          amount: formatUsd(calc.monthlyNetRent, lang),
                        })}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                      <span>
                        {applyTemplate(t(lang, 'calc_bullet_coc'), {
                          pct: calc.cashOnCash,
                        })}
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                      <span>{t(lang, 'calc_bullet_timeline')}</span>
                    </li>
                  </ul>

                  <p className="mt-3 text-[11px] leading-5 text-slate-500">
                    {t(lang, 'calc_disclaimer')}
                  </p>
                </div>

                <div className="mt-3">
                  <Button
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    variant="whatsapp"
                    className="w-full justify-center rounded-full px-[18px] py-2.5 text-[15px]"
                    onClick={onCta}
                  >
                    {t(lang, 'calc_cta')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Desktop/tablet: keep original detail panel */}
            <div className="hidden rounded-[20px] border border-slate-200/80 bg-white p-8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] md:block">
              <p className="text-sm font-semibold text-slate-900">
                {applyTemplate(t(lang, 'calc_bullets_intro'), {
                  capital: formatUsd(capital, lang),
                })}
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                  <span>
                    {applyTemplate(t(lang, 'calc_bullet_properties'), {
                      count: calc.numProperties,
                    })}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                  <span>
                    {applyTemplate(t(lang, 'calc_bullet_net_rent'), {
                      amount: formatUsd(calc.monthlyNetRent, lang),
                    })}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                  <span>
                    {applyTemplate(t(lang, 'calc_bullet_coc'), {
                      pct: calc.cashOnCash,
                    })}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-700" />
                  <span>{t(lang, 'calc_bullet_timeline')}</span>
                </li>
              </ul>

              <div className="mt-5 rounded-xl bg-[#F4F6FB] p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
                  {t(lang, 'calc_projection_title')}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-slate-500">
                      {t(lang, 'calc_projection_cashflow')}
                    </p>
                    <p className="mt-1 text-[18px] font-extrabold tracking-[-0.02em] text-slate-900">
                      {formatUsd(calc.cumulativeCashFlow, lang)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-slate-500">
                      {t(lang, 'calc_projection_equity')}
                    </p>
                    <p className="mt-1 text-[18px] font-extrabold tracking-[-0.02em] text-slate-900">
                      {formatUsd(calc.equityAppreciation, lang)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.06em] text-brand-700">
                      {t(lang, 'calc_projection_total')}
                    </p>
                    <p className="mt-1 text-[18px] font-extrabold tracking-[-0.02em] text-brand-700">
                      {formatUsd(calc.totalReturn, lang)} ({calc.totalReturnPct}%)
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-5 text-slate-500">
                {t(lang, 'calc_disclaimer')}
              </p>

              <div className="mt-5">
                <Button
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  variant="whatsapp"
                  className="w-full justify-center rounded-full px-[18px] py-3 text-base"
                  onClick={onCta}
                >
                  {t(lang, 'calc_cta')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
