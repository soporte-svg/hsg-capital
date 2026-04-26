import { useEffect, useRef, useState } from 'react'
import type { Lang } from '../i18n'
import { t } from '../i18n'
import { Container } from './ui'

const CARDS = [
  {
    title: 'operators_card_b4i_title',
    body: 'operators_card_b4i_body',
    accent: 'from-[#1d4ed8] via-sky-500 to-cyan-400',
    num: '01',
  },
  {
    title: 'operators_card_orange_title',
    body: 'operators_card_orange_body',
    accent: 'from-amber-400 via-orange-500 to-rose-600',
    num: '02',
  },
  {
    title: 'operators_card_synergy_title',
    body: 'operators_card_synergy_body',
    accent: 'from-teal-500 via-emerald-500 to-cyan-500',
    num: '03',
  },
] as const

export function OperatorsStatementSection({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setVisible(true)
      return
    }
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.06, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="operators"
      className="relative overflow-hidden border-y border-brand-900/30 bg-gradient-to-br from-brand-700 via-brand-800 to-[#0a1628] py-20 text-white md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_-15%,rgba(255,255,255,0.12),transparent_50%),radial-gradient(ellipse_70%_50%_at_100%_0%,rgba(56,189,248,0.12),transparent_45%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-brand-500/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl"
        aria-hidden
      />

      <Container>
        <div
          className={`relative z-10 flex gap-5 transition-all duration-700 ease-out md:gap-8 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div
            className="hidden w-1 shrink-0 rounded-full bg-gradient-to-b from-white via-white/45 to-transparent md:block"
            aria-hidden
          />
          <div className="grid min-w-0 flex-1 grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
            <div className="min-w-0 max-w-xl md:max-w-none">
              <h2 className="text-balance text-3xl font-extrabold leading-[1.12] tracking-tight text-white md:text-[2.15rem] md:leading-[1.12] lg:text-[2.35rem]">
                <span className="block text-white/90">{t(lang, 'operators_line1')}</span>
                <span className="mt-2 block text-white">{t(lang, 'operators_line2')}</span>
              </h2>
              <p className="mt-4 text-pretty text-sm font-semibold leading-relaxed tracking-wide text-white/72 md:mt-5 md:text-base">
                {t(lang, 'operators_kicker')}
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-white/25 bg-white/[0.09] p-6 shadow-[0_24px_80px_-48px_rgba(0,0,0,0.45)] backdrop-blur-xl md:rounded-[1.35rem] md:p-8">
              <p className="text-pretty text-[15px] font-normal leading-[1.75] text-white/82 md:text-base md:leading-8">
                {t(lang, 'operators_intro')}
              </p>
              <p className="mt-6 border-t border-white/15 pt-6 text-pretty text-[15px] font-semibold leading-relaxed text-white md:text-base">
                {t(lang, 'operators_bridge')}
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {CARDS.map((card, index) => (
            <article
              key={card.title}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_22px_55px_-40px_rgba(15,23,42,0.35)] ring-1 ring-slate-200/40 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_70px_-36px_rgba(15,23,42,0.28)] md:rounded-[1.35rem] ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: visible ? `${180 + index * 95}ms` : '0ms',
              }}
            >
              <div
                className={`h-1.5 w-full shrink-0 bg-gradient-to-r ${card.accent}`}
                aria-hidden
              />
              <div className="relative flex flex-1 flex-col p-6 md:p-7">
                <span
                  className="pointer-events-none absolute right-4 top-4 font-mono text-[2.75rem] font-black leading-none text-slate-100 transition-colors duration-300 group-hover:text-slate-200/95 md:right-5 md:top-5 md:text-[3.25rem]"
                  aria-hidden
                >
                  {card.num}
                </span>
                <p className="relative pr-16 text-lg font-extrabold tracking-tight text-slate-900 md:text-xl">
                  {t(lang, card.title)}
                </p>
                <p className="relative mt-3 text-sm font-normal leading-7 text-slate-600 md:text-[15px] md:leading-[1.65]">
                  {t(lang, card.body)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          className={`relative z-10 mt-8 transition-all duration-700 ease-out md:mt-10 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: visible ? `${420 + CARDS.length * 95}ms` : '0ms' }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/95 bg-gradient-to-br from-white via-white to-slate-50/95 p-6 shadow-[0_22px_55px_-42px_rgba(15,23,42,0.3)] ring-1 ring-slate-200/50 md:rounded-[1.35rem] md:p-9">
            <div
              className="absolute bottom-0 left-0 top-0 w-1.5 bg-gradient-to-b from-emerald-400 via-teal-500 to-cyan-600"
              aria-hidden
            />
            <p className="pl-6 text-pretty text-sm font-normal leading-7 text-slate-700 md:pl-8 md:text-[15px] md:leading-[1.75]">
              {t(lang, 'operators_closing')}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
