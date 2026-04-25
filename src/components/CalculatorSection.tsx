import { useMemo, useState } from 'react'
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

  const whatsappMessage =
    lang === 'en'
      ? `Hi! I used the portfolio calculator with ${formatUsd(capital, lang)}. I want to understand the numbers and next steps.`
      : `Hola! Usé la calculadora de portafolio con ${formatUsd(capital, lang)}. Quiero entender los números y los siguientes pasos.`

  const whatsappHref = getWhatsAppHref(whatsappMessage)

  const onCapitalChange = (next: number) => {
    setCapital(next)
    trackEvent('calculator_interaction', { capital: next, lang })
  }

  const onCta = () => {
    trackEvent('calculator_cta_click', { capital, lang })
  }

  return (
    <section id="calculator" className="border-b border-slate-200/60 bg-white">
      <Container>
        <div className="py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center rounded-full bg-white/60 px-4 py-1 text-xs font-semibold text-brand-700 ring-1 ring-slate-200/70 backdrop-blur">
              {t(lang, 'calc_kicker')}
            </p>
            <h2 className="mt-5 text-balance text-2xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {t(lang, 'calc_title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-7 text-slate-600 md:text-base">
              {t(lang, 'calc_desc')}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-2 md:items-stretch">
            <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm ring-1 ring-slate-200/50 md:p-8">
              <div className="flex shrink-0 items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {t(lang, 'calc_capital_label')}
                  </p>
                  <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                    {formatUsd(capital, lang)}
                  </p>
                </div>
                <p className="max-w-[11rem] text-right text-xs leading-snug text-slate-500">
                  {t(lang, 'calc_slider_hint')}
                </p>
              </div>

              <input
                type="range"
                min={150_000}
                max={1_500_000}
                step={50_000}
                value={capital}
                onChange={(e) => onCapitalChange(Number(e.target.value))}
                className="mt-6 h-2 w-full shrink-0 cursor-pointer appearance-none rounded-full bg-slate-200 accent-brand-600"
              />

              <div className="relative mt-6 min-h-[200px] flex-1 overflow-hidden rounded-2xl ring-1 ring-slate-200/70 md:min-h-[240px]">
                <img
                  src="/image.png"
                  alt={t(lang, 'calc_visual_alt')}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent"
                  aria-hidden
                />
                <p className="absolute inset-x-0 bottom-0 p-4 text-left text-xs font-semibold leading-snug text-white/95 drop-shadow-sm">
                  {t(lang, 'calc_visual_caption')}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm ring-1 ring-slate-200/50 md:p-8">
              <p className="text-sm font-semibold text-slate-900">
                {applyTemplate(t(lang, 'calc_bullets_intro'), {
                  capital: formatUsd(capital, lang),
                })}
              </p>

              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                  <span>
                    {applyTemplate(t(lang, 'calc_bullet_properties'), {
                      count: calc.numProperties,
                    })}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                  <span>
                    {applyTemplate(t(lang, 'calc_bullet_net_rent'), {
                      amount: formatUsd(calc.monthlyNetRent, lang),
                    })}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                  <span>
                    {applyTemplate(t(lang, 'calc_bullet_coc'), {
                      pct: calc.cashOnCash,
                    })}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-600" />
                  <span>{t(lang, 'calc_bullet_timeline')}</span>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-slate-200/70 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t(lang, 'calc_projection_title')}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200/70 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {t(lang, 'calc_projection_cashflow')}
                    </p>
                    <p className="mt-2 text-sm font-extrabold text-slate-900">
                      {formatUsd(calc.cumulativeCashFlow, lang)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200/70 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {t(lang, 'calc_projection_equity')}
                    </p>
                    <p className="mt-2 text-sm font-extrabold text-slate-900">
                      {formatUsd(calc.equityAppreciation, lang)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200/70 bg-white p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      {t(lang, 'calc_projection_total')}
                    </p>
                    <p className="mt-2 text-sm font-extrabold text-slate-900">
                      {formatUsd(calc.totalReturn, lang)}{' '}
                      <span className="text-xs font-semibold text-slate-500">
                        ({calc.totalReturnPct}%)
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-500">
                {t(lang, 'calc_disclaimer')}
              </p>

              <div className="mt-5">
                <Button
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  variant="whatsapp"
                  className="w-full justify-center"
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
