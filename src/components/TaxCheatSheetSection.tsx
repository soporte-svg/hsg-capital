import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Lang } from '../i18n'
import { t } from '../i18n'
import { trackEvent } from '../lib/tracking'
import { Button, Container, SectionTitle } from './ui'

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
    <section id="tax" className="border-b border-slate-200/60 bg-slate-50 py-16 md:py-20">
      <Container>
        <SectionTitle title={t(lang, 'tax_title')} subtitle={t(lang, 'tax_lead')} />

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {TOPICS.map((topic) => (
            <div
              key={topic.title}
              className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-7"
            >
              <p className="text-base font-extrabold tracking-tight text-slate-900">
                {t(lang, topic.title)}
              </p>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t(lang, topic.body)}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-100 md:p-8">
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
