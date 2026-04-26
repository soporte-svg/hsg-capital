import { useEffect, useRef, useState } from 'react'
import type { Lang } from '../i18n'
import { t } from '../i18n'
import { Container } from './ui'

const CARDS = [
  {
    title: 'operators_card_b4i_title',
    body: 'operators_card_b4i_body',
    num: '01',
  },
  {
    title: 'operators_card_orange_title',
    body: 'operators_card_orange_body',
    num: '02',
  },
  {
    title: 'operators_card_synergy_title',
    body: 'operators_card_synergy_body',
    num: '03',
  },
] as const

export function OperatorsStatementSection({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
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
      className="relative overflow-hidden bg-brand-700 py-[100px] text-white"
    >
      <div
        className="pointer-events-none absolute -right-[200px] -top-[200px] h-[600px] w-[600px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 70%)',
        }}
        aria-hidden
      />

      <Container>
        <div className="relative z-10 grid gap-10 md:grid-cols-2 md:items-start md:gap-[60px]">
          <div
            className={`transition-all duration-700 ease-out ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h2 className="text-balance text-4xl font-extrabold tracking-[-0.03em] text-white md:text-5xl md:leading-[1.08]">
              {t(lang, 'operators_line1')}
              <br />
              {t(lang, 'operators_line2')}
            </h2>
          </div>
          <div
            className={`pt-2 transition-all duration-700 ease-out ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: visible ? '120ms' : '0ms' }}
          >
            <p className="text-pretty text-[15px] leading-[1.7] text-white/60">
              {t(lang, 'operators_intro')}
            </p>
            <div className="mt-5 rounded-xl border border-white/15 bg-white/10 px-5 py-[18px] text-[14px] leading-[1.65] text-white/85">
              <strong className="text-white">{t(lang, 'operators_bridge')}</strong>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-14 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-4">
          {CARDS.map((card, index) => (
            <article
              key={card.title}
              className={`relative flex flex-col rounded-2xl border border-white/12 bg-white/[0.07] px-6 py-7 transition-colors hover:bg-white/[0.12] ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: visible ? `${180 + index * 95}ms` : '0ms',
              }}
            >
              <span
                className="absolute right-5 top-5 text-[32px] font-extrabold tracking-[-0.04em] leading-none text-white/[0.08]"
                aria-hidden
              >
                {card.num}
              </span>
              <p className="text-[17px] font-extrabold tracking-tight text-white">
                {t(lang, card.title)}
              </p>
              <p className="mt-2.5 text-[13px] leading-[1.65] text-white/55">
                {t(lang, card.body)}
              </p>
            </article>
          ))}
        </div>

        <div
          className={`relative z-10 mt-5 transition-all duration-700 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: visible ? `${420 + CARDS.length * 95}ms` : '0ms' }}
        >
          <div className="rounded-xl border border-white/10 bg-white/[0.07] px-6 py-[18px] text-[14px] leading-[1.6] text-white/60">
            {t(lang, 'operators_closing')}
          </div>
        </div>
      </Container>
    </section>
  )
}
