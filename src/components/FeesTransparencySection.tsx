import type { Lang } from '../i18n'
import { t } from '../i18n'
import { Container } from './ui'

const FEE_ROWS = [1, 2, 3, 4, 5, 6] as const

export function FeesTransparencySection({ lang }: { lang: Lang }) {
  return (
    <section id="fees" className="bg-white py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-700">
            {lang === 'en' ? 'Transparency' : 'Transparencia'}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl md:leading-[1.1]">
            {t(lang, 'fees_title')}
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200/90 md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#09142A]">
                  <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white/70">
                    {t(lang, 'fees_col_fee')}
                  </th>
                  <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white/70">
                    {t(lang, 'fees_col_when')}
                  </th>
                  <th className="px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.06em] text-white/70">
                    {t(lang, 'fees_col_amount')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {FEE_ROWS.map((n) => (
                  <tr
                    key={n}
                    className="border-t border-slate-200/80 transition-colors hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-extrabold text-slate-900">
                      {t(lang, `fees_r${n}_fee`)}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {t(lang, `fees_r${n}_when`)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-brand-700">
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

          <p className="mx-auto mt-10 max-w-3xl text-pretty text-center text-[13px] leading-6 text-slate-600 md:text-[15px] md:leading-7">
            {t(lang, 'fees_note')}
          </p>
        </div>
      </Container>
    </section>
  )
}
