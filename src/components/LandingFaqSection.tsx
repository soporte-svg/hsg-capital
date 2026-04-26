import { useState } from 'react'
import type { Lang } from '../i18n'
import { t } from '../i18n'
import { trackEvent } from '../lib/tracking'
import { Container } from './ui'

export function LandingFaqSection({
  lang,
}: {
  lang: Lang
}) {
  return (
    <section id="faq" className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-700">
            {lang === 'en' ? 'FAQ' : 'FAQ'}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl md:leading-[1.1]">
            {t(lang, 'faq_title')}
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl border-b border-slate-200">
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
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

function FaqItem({
  q,
  a,
  trackId,
  lang,
}: {
  q: string
  a: string
  trackId: string
  lang: Lang
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-t border-slate-200">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
        onClick={() => {
          setOpen((v) => {
            const next = !v
            if (next) trackEvent('faq_expand', { id: trackId, lang })
            return next
          })
        }}
        aria-expanded={open}
      >
        <span className="text-[16px] font-extrabold text-slate-900 leading-snug">{q}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-500 transition-all ${
            open ? 'bg-brand-700 border-brand-700 text-white rotate-45' : ''
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      {open ? (
        <div className="pb-6">
          <p className="text-[15px] leading-7 text-slate-600">{a}</p>
        </div>
      ) : null}
    </div>
  )
}

