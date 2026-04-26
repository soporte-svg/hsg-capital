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
import { Container } from './ui'

type StepDef = {
  phaseKey: string
  titleKey: string
  bodyKey: string
  icon: LucideIcon
}

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

function consecutiveFromStart(visible: boolean[]) {
  let c = 0
  for (let i = 0; i < visible.length; i++) {
    if (visible[i]) c = i + 1
    else break
  }
  return visible.length > 0 ? c / visible.length : 0
}

const IO_OPTS: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: '0px 0px -6% 0px',
}

function prefersReducedMotionInitially() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function JourneyTimelineSection({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLLIElement | null)[]>([])
  const reducedInitially = prefersReducedMotionInitially()
  const [headerInView, setHeaderInView] = useState(reducedInitially)
  const [stepVisible, setStepVisible] = useState(() =>
    reducedInitially ? STEPS.map(() => true) : STEPS.map(() => false),
  )

  const lineProgress = useMemo(
    () => consecutiveFromStart(stepVisible),
    [stepVisible],
  )

  const footnoteVisible = stepVisible[STEPS.length - 1] === true

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => {
      if (mq.matches) {
        setHeaderInView(true)
        setStepVisible(STEPS.map(() => true))
      }
    }
    mq.addEventListener('change', onMotionChange)

    if (mq.matches) {
      return () => mq.removeEventListener('change', onMotionChange)
    }

    const headerEl = headerRef.current
    const headerIo = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) setHeaderInView(true)
    }, IO_OPTS)
    if (headerEl) headerIo.observe(headerEl)

    const stepIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const raw = (entry.target as HTMLElement).dataset.stepIndex
        const idx = raw !== undefined ? Number.parseInt(raw, 10) : NaN
        if (Number.isNaN(idx) || idx < 0 || idx >= STEPS.length) return
        setStepVisible((prev) => {
          if (prev[idx]) return prev
          const next = [...prev]
          next[idx] = true
          return next
        })
      })
    }, IO_OPTS)

    for (const el of stepRefs.current) {
      if (el) stepIo.observe(el)
    }

    return () => {
      mq.removeEventListener('change', onMotionChange)
      headerIo.disconnect()
      stepIo.disconnect()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="bg-white py-[100px]"
    >
      <Container>
        <header
          ref={headerRef}
          className={`grid gap-5 md:grid-cols-2 md:items-end md:gap-[60px] mb-20 transition-all duration-700 ease-out ${
            headerInView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-700">
              {t(lang, 'journey_kicker')}
            </p>
            <h2 className="mt-4 text-[clamp(28px,4vw,48px)] font-extrabold tracking-[-0.03em] leading-[1.1] text-slate-900">
              {t(lang, 'journey_title_prefix')}{' '}
              <span className="text-slate-900 not-italic">{t(lang, 'journey_title_highlight').replace('60–90 días.', '')}</span>{' '}
              <em className="italic text-brand-700">60–90 días.</em>
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-slate-600">
            {t(lang, 'journey_lead')}
          </p>
        </header>

        <div className="relative">
            <div
              className="absolute left-7 top-0 bottom-0 w-px md:left-8"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(29,78,216,1) 0%, rgba(29,78,216,1) 80%, rgba(29,78,216,0) 100%)',
              }}
              aria-hidden
            />

            <ol className="relative m-0 list-none p-0">
              {STEPS.map((step, index) => {
                const Icon = step.icon
                const isLast = index === STEPS.length - 1
                const visible = stepVisible[index]

                return (
                  <li
                    key={step.titleKey}
                    ref={(el) => {
                      stepRefs.current[index] = el
                    }}
                    data-step-index={index}
                    className={`grid grid-cols-[56px_1fr] gap-8 transition-all duration-700 ease-out ${
                      visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`grid h-14 w-14 place-items-center rounded-full border-2 transition-colors duration-300 ${
                          index <= Math.floor(lineProgress * (STEPS.length - 1) + 0.0001)
                            ? 'border-brand-700 bg-brand-700 text-white'
                            : 'border-slate-200 bg-white text-slate-500'
                        }`}
                      >
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                    </div>

                    <div className={`min-w-0 py-[14px] ${isLast ? 'pb-0' : 'pb-12'}`}>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-brand-700 mb-1.5">
                        {t(lang, step.phaseKey)}
                      </p>
                      <h3 className="text-xl font-extrabold tracking-[-0.02em] text-slate-900">
                        {t(lang, step.titleKey)}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.7] text-slate-600 max-w-[540px]">
                        {t(lang, step.bodyKey)}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ol>
        </div>

        <p
          className={`mt-2 text-center text-xs leading-5 text-slate-500 transition-all duration-700 ease-out md:text-sm ${
            footnoteVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          {t(lang, 'journey_footnote')}
        </p>
      </Container>
    </section>
  )
}
