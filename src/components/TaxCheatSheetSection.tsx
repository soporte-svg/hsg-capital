import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Lang } from '../i18n'
import { t } from '../i18n'
import { trackEvent } from '../lib/tracking'
import { Button, Container } from './ui'

const TOPICS: { title: string; body: string }[] = [
  { title: 'tax_income_title', body: 'tax_income_body' },
  { title: 'tax_firpta_title', body: 'tax_firpta_body' },
  { title: 'tax_estate_title', body: 'tax_estate_body' },
]

export function TaxCheatSheetSection({ lang }: { lang: Lang }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    trackEvent('tax_cheat_sheet_request', {
      lang,
      nameLen: name.trim().length,
      emailDomain: email.includes('@') ? email.split('@')[1]?.slice(0, 40) : null,
    })
    setSent(true)
  }

  return (
    <section id="tax" className="bg-[#F4F6FB] py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-700">
            {lang === 'en' ? 'Tax context' : 'Contexto fiscal'}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl md:leading-[1.1]">
            {t(lang, 'tax_title')}
          </h2>
          <p className="mx-auto mt-3 max-w-[34rem] text-pretty text-[15px] leading-7 text-slate-600">
            {t(lang, 'tax_lead')}
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="rounded-2xl border border-slate-200/90 bg-white p-7 shadow-[0_2px_20px_rgba(0,0,0,0.04)] ring-0"
            >
              <div className="h-1 w-10 rounded-full bg-brand-700" aria-hidden />
              <p className="mt-4 text-base font-extrabold tracking-tight text-slate-900">
                {t(lang, topic.title)}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t(lang, topic.body)}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-lg rounded-[20px] border border-slate-200/90 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.05)]">
          <p className="text-center text-lg font-bold text-slate-900">
            {t(lang, 'tax_cta_title')}
          </p>
          <p className="mt-2 text-center text-xs leading-5 text-slate-500">{t(lang, 'tax_form_note')}</p>

          {sent ? (
            <p className="mt-6 rounded-xl bg-brand-50 px-4 py-3 text-center text-sm font-medium text-brand-900 ring-1 ring-brand-100">
              {t(lang, 'tax_form_success')}
            </p>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="tax-name"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {t(lang, 'tax_name_label')}
                </label>
                <input
                  id="tax-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label
                  htmlFor="tax-email"
                  className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {t(lang, 'tax_email_label')}
                </label>
                <input
                  id="tax-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full py-2.5">
                {t(lang, 'tax_download')}
              </Button>
            </form>
          )}

          <p className="mt-4 text-center text-[11px] leading-5 text-slate-500">{t(lang, 'tax_form_legal')}</p>
        </div>
      </Container>
    </section>
  )
}
