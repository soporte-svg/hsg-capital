import type { Lang } from '../i18n'
import { t } from '../i18n'
import { Container, SectionTitle } from './ui'

const FEE_ROWS = [1, 2, 3, 4, 5, 6] as const

export function FeesTransparencySection({ lang }: { lang: Lang }) {
  return (
    <section id="fees" className="border-b border-slate-200/60 bg-white py-16 md:py-20">
      <Container>
        <SectionTitle title={t(lang, 'fees_title')} />

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200/90 ring-1 ring-slate-100 md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90">
                  <th className="px-5 py-3.5 font-semibold text-slate-900">
                    {t(lang, 'fees_col_fee')}
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-slate-900">
                    {t(lang, 'fees_col_when')}
                  </th>
                  <th className="px-5 py-3.5 font-semibold text-slate-900">
                    {t(lang, 'fees_col_amount')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((n) => (
                  <tr
                    key={n}
                    className="border-b border-slate-100 last:border-0 odd:bg-white even:bg-slate-50/40"
                  >
                    <td className="px-5 py-3.5 font-semibold text-slate-900">
                      {t(lang, `fees_r${n}_fee`)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">
                      {t(lang, `fees_r${n}_when`)}
                    </td>
                    <td className="px-5 py-3.5 text-slate-700">
                      {t(lang, `fees_r${n}_amount`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {FEE_ROWS.map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-100"
              >
                <p className="font-semibold text-slate-900">{t(lang, `fees_r${n}_fee`)}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t(lang, 'fees_col_when')}
                </p>
                <p className="mt-1 text-sm text-slate-600">{t(lang, `fees_r${n}_when`)}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {t(lang, 'fees_col_amount')}
                </p>
                <p className="mt-1 text-sm text-slate-800">{t(lang, `fees_r${n}_amount`)}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-pretty text-center text-sm leading-7 text-slate-600 md:text-base">
            {t(lang, 'fees_note')}
          </p>
        </div>
      </Container>
    </section>
  )
}
