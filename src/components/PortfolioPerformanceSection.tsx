import type { Lang } from '../i18n'
import { t } from '../i18n'
import { Container, SectionTitle } from './ui'

const METRICS: { label: string; value: string }[] = [
  { label: 'stats_metric_rent_label', value: 'stats_metric_rent_value' },
  { label: 'stats_metric_cap_label', value: 'stats_metric_cap_value' },
  { label: 'stats_metric_ontime_label', value: 'stats_metric_ontime_value' },
  { label: 'stats_metric_rerent_label', value: 'stats_metric_rerent_value' },
]

export function PortfolioPerformanceSection({ lang }: { lang: Lang }) {
  return (
    <section
      id="performance"
      className="border-b border-slate-200/60 bg-gradient-to-b from-slate-50 to-white py-16 md:py-20"
    >
      <Container>
        <SectionTitle title={t(lang, 'stats_title')} subtitle={t(lang, 'stats_subtitle')} />

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {t(lang, m.label)}
              </p>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-[1.65rem]">
                {t(lang, m.value)}
              </p>
              <p className="mt-2 text-xs font-medium text-brand-700">{t(lang, 'stats_data_note')}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-slate-500 md:text-sm">
          {t(lang, 'stats_disclaimer')}
        </p>
      </Container>
    </section>
  )
}
