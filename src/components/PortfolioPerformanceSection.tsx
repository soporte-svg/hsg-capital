import type { Lang } from '../i18n'
import { t } from '../i18n'
import { Container } from './ui'

function splitHeadline(text: string) {
  const firstDot = text.indexOf('.')
  if (firstDot === -1) return { a: text.trim(), b: '' }
  const a = text.slice(0, firstDot + 1).trim()
  const b = text.slice(firstDot + 1).trim()
  return { a, b }
}

function extractLeadingNumber(text: string) {
  const m = text.trim().match(/^(\$[\d,]+|\d+(?:[.,]\d+)?%?)/)
  if (!m) return { head: text.trim(), rest: '' }
  const head = m[1]
  const rest = text.trim().slice(head.length).trim()
  return { head, rest }
}

const METRICS: Array<{
  labelKey: string
  valueKey: string
  tagKey?: string
  kind?: 'rent' | 'rerent'
}> = [
  { labelKey: 'stats_metric_rent_label', valueKey: 'stats_metric_rent_value', kind: 'rent' },
  { labelKey: 'stats_metric_cap_label', valueKey: 'stats_metric_cap_value', tagKey: 'stats_data_note' },
  { labelKey: 'stats_metric_ontime_label', valueKey: 'stats_metric_ontime_value', tagKey: 'stats_data_note' },
  { labelKey: 'stats_metric_rerent_label', valueKey: 'stats_metric_rerent_value', kind: 'rerent' },
]

export function PortfolioPerformanceSection({ lang }: { lang: Lang }) {
  const title = splitHeadline(t(lang, 'stats_title'))
  return (
    <section
      id="performance"
      className="bg-[#09142A] py-[100px] text-white"
    >
      <Container>
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-brand-400">
            {t(lang, 'stats_data_note')}
          </p>
          <h2 className="mt-4 text-balance text-[clamp(30px,4vw,52px)] font-extrabold tracking-[-0.03em] text-white leading-[1.1]">
            {title.a}
            {title.b ? (
              <>
                <br />
                <em className="italic text-white/35">{title.b}</em>
              </>
            ) : null}
          </h2>
          <p className="mt-3 max-w-[520px] text-pretty text-[15px] leading-[1.65] text-white/45">
            {t(lang, 'stats_subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.08] md:grid-cols-4">
          {METRICS.map((m) => {
            const rawValue = t(lang, m.valueKey)
            const { head, rest } = extractLeadingNumber(rawValue)
            const value =
              m.kind === 'rent' || m.kind === 'rerent'
                ? head
                : rawValue

            const tag =
              m.kind === 'rent'
                ? (rest ? `${rest} · ${lang === 'en' ? 'real data' : 'datos reales'}` : (lang === 'en' ? 'Real data' : 'Datos reales'))
                : m.kind === 'rerent'
                  ? `${rest || (lang === 'en' ? 'days' : 'días')} · ${lang === 'en' ? 'real data' : 'datos reales'}`
                  : m.tagKey
                    ? t(lang, m.tagKey)
                    : (lang === 'en' ? 'Real data' : 'Datos reales')

            return (
            <div
              key={m.labelKey}
              className="bg-white/[0.03] px-8 py-10 transition-colors hover:bg-white/[0.06]"
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-white/35">
                {t(lang, m.labelKey)}
              </p>
              <p className="mt-3 text-[clamp(36px,4vw,60px)] font-extrabold tracking-[-0.04em] text-white leading-none">
                {value}
              </p>
              <p className="mt-3 text-xs font-semibold text-[#93B4FF]">
                {tag}
              </p>
            </div>
            )
          })}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-white/25 md:text-sm">
          {t(lang, 'stats_disclaimer')}
        </p>
      </Container>
    </section>
  )
}
