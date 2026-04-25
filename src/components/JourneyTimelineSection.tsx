import { useEffect, useMemo, useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Banknote,
  ClipboardList,
  HardHat,
  PenLine,
  Phone,
} from 'lucide-react'
import type { Lang } from '../i18n'
import { t } from '../i18n'

type StepDef = {
  phaseKey: string
  titleKey: string
  bodyKey: string
  icon: LucideIcon
}

const GRID_COLS = 11
const GRID_ROWS = 7

const STEPS: StepDef[] = [
  {
    phaseKey: 'journey_1_phase',
    titleKey: 'journey_1_title',
    bodyKey: 'journey_1_body',
    icon: Phone,
  },
  {
    phaseKey: 'journey_2_phase',
    titleKey: 'journey_2_title',
    bodyKey: 'journey_2_body',
    icon: ClipboardList,
  },
  {
    phaseKey: 'journey_3_phase',
    titleKey: 'journey_3_title',
    bodyKey: 'journey_3_body',
    icon: PenLine,
  },
  {
    phaseKey: 'journey_4_phase',
    titleKey: 'journey_4_title',
    bodyKey: 'journey_4_body',
    icon: HardHat,
  },
  {
    phaseKey: 'journey_5_phase',
    titleKey: 'journey_5_title',
    bodyKey: 'journey_5_body',
    icon: Banknote,
  },
]

function JourneyPatternGrid() {
  const cells = useMemo(
    () =>
      Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) => ({
        i,
        col: i % GRID_COLS,
        row: Math.floor(i / GRID_COLS),
      })),
    [],
  )

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="grid h-full min-h-full w-full opacity-90"
        style={{
          gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
          gridAutoRows: 'minmax(2.5rem, 1fr)',
        }}
      >
        {cells.map(({ i, col, row }) => {
          const variant = (col + row * 2) % 4
          const grad =
            variant === 0
              ? 'from-brand-500/30 via-sky-400/12 to-transparent'
              : variant === 1
                ? 'from-sky-400/25 via-brand-600/10 to-transparent'
                : variant === 2
                  ? 'from-brand-400/22 via-slate-300/15 to-transparent'
                  : 'from-slate-200/40 via-brand-500/8 to-transparent'
          return (
            <div
              key={i}
              className={`hsg-journey-cell m-px rounded-lg bg-gradient-to-br ${grad}`}
              style={{
                animationDelay: `${((col * 5 + row * 7) % 24) * 0.1}s`,
              }}
            />
          )
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white/70 to-white/95" />
    </div>
  )
}

export function JourneyTimelineSection({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setRevealed(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true)
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden border-b border-slate-200/60 bg-white py-16 md:py-24"
    >
      <JourneyPatternGrid />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
        <header
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-600 md:text-xs">
            {t(lang, 'journey_kicker')}
          </p>
          <h2 className="mt-5 text-balance text-[1.65rem] font-extrabold leading-[1.15] tracking-tight text-slate-900 md:text-5xl md:leading-[1.1]">
            <span className="block text-slate-400 md:inline md:text-slate-500">
              {t(lang, 'journey_title_prefix')}
            </span>{' '}
            <span className="mt-1 block md:mt-0 md:inline">
              {t(lang, 'journey_title_highlight')}
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-sm leading-7 text-slate-600 md:text-base">
            {t(lang, 'journey_lead')}
          </p>
        </header>

        <div className="mx-auto mt-16 max-w-2xl md:mt-20">
          <div className="relative">
            <div
              className="absolute left-[22px] w-[3px] -translate-x-1/2 overflow-hidden rounded-full md:left-6"
              style={{ top: '1.65rem', bottom: '2.75rem' }}
              aria-hidden
            >
              <div
                className={`h-full w-full origin-top rounded-full transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${
                  revealed ? 'scale-y-100' : 'scale-y-0'
                }`}
                style={{
                  background:
                    'linear-gradient(180deg, #2563eb 0%, #3b82f6 38%, #0d9488 78%, #10b981 100%)',
                }}
              />
            </div>

            <ol className="relative m-0 list-none p-0">
              {STEPS.map((step, index) => {
                const Icon = step.icon
                const isLast = index === STEPS.length - 1

                return (
                  <li
                    key={step.titleKey}
                    className={`flex gap-5 transition-all duration-700 ease-out md:gap-8 ${
                      isLast ? 'pb-0' : 'pb-12 md:pb-14'
                    } ${
                      revealed
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-5 opacity-0'
                    }`}
                    style={{
                      transitionDelay: revealed ? `${120 + index * 100}ms` : '0ms',
                    }}
                  >
                    <div className="relative z-10 flex w-11 shrink-0 justify-center md:w-12">
                      <div
                        className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-full shadow-sm ring-2 transition-transform duration-500 ease-out md:h-12 md:w-12 ${
                          isLast
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white ring-emerald-200/90'
                            : 'bg-white text-brand-600 ring-brand-100'
                        } ${
                          revealed
                            ? 'scale-100'
                            : 'scale-75 md:scale-[0.85]'
                        }`}
                        style={{
                          transitionDelay: revealed ? `${180 + index * 100}ms` : '0ms',
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={isLast ? 2.25 : 2}
                        />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 pt-1">
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 md:text-xs">
                        {t(lang, step.phaseKey)}
                      </p>
                      <h3 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900 md:text-xl">
                        {t(lang, step.titleKey)}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 md:text-[15px] md:leading-7">
                        {t(lang, step.bodyKey)}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <p
            className={`mt-10 text-center text-xs leading-5 text-slate-500 transition-all duration-700 ease-out md:text-sm ${
              revealed ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
            style={{
              transitionDelay: revealed ? `${120 + STEPS.length * 100 + 80}ms` : '0ms',
            }}
          >
            {t(lang, 'journey_footnote')}
          </p>
        </div>
      </div>
    </section>
  )
}
