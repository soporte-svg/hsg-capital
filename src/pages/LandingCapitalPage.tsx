import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Check, ChevronRight, Download, Phone } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { trackEvent } from '../lib/tracking'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/shadcn/accordion'
import { cn } from '../lib/utils'

const AVG_PROPERTY_PRICE = 200_000
const AVG_MONTHLY_RENT = 1_800
const EXPENSE_RATIO = 0.35
const APPRECIATION_RATE = 0.04
const RENT_GROWTH_RATE = 0.03
const ACQUISITION_FEE_PCT = 0.025

function formatUsd(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function calculatePortfolio(capital: number) {
  const acquisitionFees = capital * ACQUISITION_FEE_PCT
  const capitalForProperties = capital - acquisitionFees
  const numProperties = Math.floor(capitalForProperties / AVG_PROPERTY_PRICE)

  const monthlyGrossRent = numProperties * AVG_MONTHLY_RENT
  const monthlyNetRent = monthlyGrossRent * (1 - EXPENSE_RATIO)
  const annualCashFlow = monthlyNetRent * 12
  const cashOnCash = annualCashFlow / capital

  let cumulativeCashFlow = 0
  let currentMonthlyRent = monthlyNetRent

  for (let year = 1; year <= 5; year++) {
    cumulativeCashFlow += currentMonthlyRent * 12
    currentMonthlyRent *= 1 + RENT_GROWTH_RATE
  }

  const propertyValueYear5 =
    numProperties * AVG_PROPERTY_PRICE * Math.pow(1 + APPRECIATION_RATE, 5)

  const equityAppreciation = propertyValueYear5 - numProperties * AVG_PROPERTY_PRICE

  const totalReturn = cumulativeCashFlow + equityAppreciation
  const totalReturnPct = totalReturn / capital

  return {
    numProperties,
    monthlyNetRent: Math.round(monthlyNetRent),
    cashOnCash: (cashOnCash * 100).toFixed(1),
    cumulativeCashFlow: Math.round(cumulativeCashFlow / 1000) * 1000,
    equityAppreciation: Math.round(equityAppreciation / 1000) * 1000,
    totalReturn: Math.round(totalReturn / 1000) * 1000,
    totalReturnPct: (totalReturnPct * 100).toFixed(0),
  }
}

const leadSchema = z.object({
  name: z.string().min(2, 'Escribe tu nombre'),
  email: z.string().email('Email inválido'),
})

type LeadForm = z.infer<typeof leadSchema>

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>
}

function Section({
  id,
  className,
  children,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={cn('py-14 md:py-20', className)}>
      {children}
    </section>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-balance text-2xl font-bold leading-tight text-[color:var(--cap-text)] md:text-4xl">
      {children}
    </h2>
  )
}

function P({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-pretty text-[15px] leading-7 text-[color:var(--cap-muted)] md:text-base', className)}>
      {children}
    </p>
  )
}

function Button({
  children,
  variant = 'primary',
  className,
  href,
  onClick,
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  href?: string
  onClick?: () => void
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--cap-accent)] focus-visible:ring-offset-2'
  const variants: Record<string, string> = {
    primary:
      'bg-[color:var(--cap-primary)] text-white hover:opacity-95 shadow-sm shadow-slate-900/10',
    secondary:
      'bg-white text-[color:var(--cap-text)] ring-1 ring-[color:var(--cap-border)] hover:bg-slate-50',
    ghost: 'text-[color:var(--cap-text)] hover:bg-slate-100',
  }
  const cls = cn(base, variants[variant], className)

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  )
}

function Card({
  title,
  children,
  icon,
}: {
  title: string
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-[color:var(--cap-border)] bg-white p-5">
      <div className="flex items-start gap-3">
        {icon ? (
          <div className="mt-0.5 rounded-md bg-[color:var(--cap-bgAlt)] p-2 text-[color:var(--cap-primary)]">
            {icon}
          </div>
        ) : null}
        <div>
          <p className="text-sm font-semibold text-[color:var(--cap-text)]">{title}</p>
          <div className="mt-2 text-sm leading-6 text-[color:var(--cap-muted)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function Modal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg rounded-lg border border-[color:var(--cap-border)] bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--cap-muted)]">
              HSG Capital Investment
            </p>
            <p className="mt-1 text-lg font-bold text-[color:var(--cap-text)]">{title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

function StickyCta({ onClick }: { onClick: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const h = document.documentElement.scrollHeight - window.innerHeight
      const pct = h > 0 ? y / h : 0
      setVisible(pct > 0.5)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--cap-border)] bg-white/90 p-3 backdrop-blur md:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
        'transition-transform',
      )}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--cap-accent)] px-4 py-3 text-sm font-semibold text-white"
      >
        <Phone className="h-4 w-4" />
        Agenda una llamada
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

export function LandingCapitalPage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false)
  const [capital, setCapital] = useState(400_000)
  const calc = useMemo(() => calculatePortfolio(capital), [capital])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', email: '' },
  })

  useEffect(() => {
    document.documentElement.lang = 'es'
  }, [])

  const onCalculatorChange = (value: number) => {
    setCapital(value)
    trackEvent('calculator_interaction', { capital: value })
  }

  const onCalculatorCta = () => {
    trackEvent('calculator_cta_click', { capital })
    setCalendlyOpen(true)
  }

  const onTaxCheatSubmit = handleSubmit(async (values) => {
    trackEvent('tax_cheatsheet_submit', values)
    await new Promise((r) => setTimeout(r, 500))
    setCalendlyOpen(true)
  })

  const onFaqOpen = (value: string) => {
    if (value) trackEvent('faq_expand', { item: value })
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{
        // Inter for this landing only, without changing the other landing.
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
        // Design tokens
        ['--cap-primary' as never]: '#0A2540',
        ['--cap-accent' as never]: '#00875A',
        ['--cap-bgAlt' as never]: '#F4F6F8',
        ['--cap-text' as never]: '#1A2B3C',
        ['--cap-muted' as never]: '#6B7785',
        ['--cap-border' as never]: '#E1E5EA',
        ['--cap-warning' as never]: '#B86E00',
        ['--cap-error' as never]: '#C53030',
      }}
    >
      {/* Navbar */}
      <div className="sticky top-0 z-30 border-b border-[color:var(--cap-border)] bg-white/85 backdrop-blur">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">
            <a href="#top" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-md bg-[color:var(--cap-primary)] text-white">
                <span className="text-sm font-extrabold">HSG</span>
              </div>
              <span className="text-sm font-semibold text-[color:var(--cap-text)]">
                HSG Capital Investment
              </span>
            </a>

            <div className="hidden items-center gap-6 md:flex">
              <a className="text-sm font-medium text-[color:var(--cap-muted)] hover:text-[color:var(--cap-text)]" href="#how">
                Cómo funciona
              </a>
              <a className="text-sm font-medium text-[color:var(--cap-muted)] hover:text-[color:var(--cap-text)]" href="#fees">
                Fees
              </a>
              <a className="text-sm font-medium text-[color:var(--cap-muted)] hover:text-[color:var(--cap-text)]" href="#faq">
                FAQ
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                onClick={() => setCalendlyOpen(true)}
                className="hidden md:inline-flex"
              >
                Agenda una llamada de 20 minutos <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <div id="top" className="relative">
        <div className="absolute inset-0">
          <img
            src="/image.png"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[color:var(--cap-primary)]/40" />
        </div>

        <Container>
          <div className="relative py-16 md:py-24">
            <div className="max-w-2xl">
              <h1 className="text-balance text-3xl font-extrabold leading-tight text-white md:text-5xl">
                Construye tu portafolio de propiedades en Estados Unidos. Tú eres
                dueño. Nosotros operamos todo lo demás.
              </h1>
              <p className="mt-5 text-pretty text-[15px] leading-7 text-white/85 md:text-base">
                Servicio turnkey de inversión inmobiliaria en Georgia para
                inversionistas latinoamericanos. Operado por el equipo que
                administra más de 500 propiedades en USA y 18,000 unidades en
                Latinoamérica.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="primary"
                  onClick={() => setCalendlyOpen(true)}
                  className="bg-[color:var(--cap-accent)] hover:opacity-95 focus-visible:ring-white/70"
                >
                  Agenda una llamada de 20 minutos <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary" href="#cta">
                  O regístrate al próximo webinar gratuito
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap gap-3 text-xs text-white/80">
                <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  Transparencia
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  Operación real
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">
                  Cero promesas infladas
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Trust strip */}
      <Section className="bg-[color:var(--cap-bgAlt)]">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ['500+', 'propiedades en USA'],
              ['18,000+', 'unidades en LATAM'],
              ['12', 'años operando'],
              ['100%', 'operación en español'],
            ].map(([v, k]) => (
              <div
                key={k}
                className="rounded-lg border border-[color:var(--cap-border)] bg-white p-5"
              >
                <p className="text-2xl font-extrabold text-[color:var(--cap-primary)]">
                  {v}
                </p>
                <p className="mt-1 text-sm text-[color:var(--cap-muted)]">{k}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Problem */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <H2>Invertir en propiedades en USA desde Latinoamérica hoy es complicado.</H2>
            <P className="mt-4">
              Si tu dinero depende de terceros que no controlas y de reglas que nadie te
              explicó, no es inversión: es estrés.
            </P>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card
              title="El broker que vende y desaparece"
              icon={<ChevronRight className="h-4 w-4" />}
            >
              Compras una propiedad por internet, firmas papeles que no entiendes del
              todo, y al mes siguiente nadie responde el teléfono. El broker cobró su
              comisión y se fue al siguiente cliente.
            </Card>
            <Card title="Las sorpresas fiscales" icon={<ChevronRight className="h-4 w-4" />}>
              Nadie te explica el FIRPTA, el estate tax, ni cómo se declara renta como
              non-resident alien. Lo descubres seis meses después cuando llega una
              carta del IRS.
            </Card>
            <Card title="Operar a 4,000 km" icon={<ChevronRight className="h-4 w-4" />}>
              El inquilino no paga, el techo se filtra, el property manager no contesta.
              Tú estás en Bogotá, México DF, o Buenos Aires. Tu inversión depende de
              gente que no controlas.
            </Card>
          </div>

          <div className="mt-8 rounded-lg border border-[color:var(--cap-border)] bg-[color:var(--cap-bgAlt)] p-5">
            <p className="text-sm font-semibold text-[color:var(--cap-text)]">
              Por eso construimos HSG Capital Investment.
            </p>
          </div>
        </Container>
      </Section>

      {/* Calculator */}
      <Section className="bg-[color:var(--cap-primary)]">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Calculadora interactiva
              </p>
              <h2 className="mt-3 text-balance text-2xl font-extrabold leading-tight text-white md:text-4xl">
                Calcula tu portafolio en 30 segundos.
              </h2>
              <p className="mt-4 text-pretty text-[15px] leading-7 text-white/80 md:text-base">
                Basado en data real de nuestro portafolio operando en Georgia. Los
                números que ves son rangos conservadores derivados de propiedades que
                ya están rentando hoy.
              </p>
              <p className="mt-4 text-pretty text-[15px] leading-7 text-white/80 md:text-base">
                No son proyecciones infladas. Son lo que estamos viendo en el suelo.
              </p>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Capital disponible</p>
                <p className="text-sm font-semibold text-white">{formatUsd(capital)}</p>
              </div>

              <input
                type="range"
                min={150_000}
                max={1_500_000}
                step={50_000}
                value={capital}
                onChange={(e) => onCalculatorChange(Number(e.target.value))}
                className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-[color:var(--cap-accent)]"
              />

              <div className="mt-6 rounded-lg bg-white p-5 text-[color:var(--cap-text)]">
                <p className="text-sm font-semibold">
                  Con {formatUsd(capital)} puedes construir un portafolio de:
                </p>
                <div className="mt-4 space-y-2 text-sm text-[color:var(--cap-muted)]">
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[color:var(--cap-accent)]" />
                    <span>
                      <strong className="text-[color:var(--cap-text)]">
                        {calc.numProperties}
                      </strong>{' '}
                      propiedades
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[color:var(--cap-accent)]" />
                    <span>
                      ~<strong className="text-[color:var(--cap-text)]">
                        {formatUsd(calc.monthlyNetRent)}
                      </strong>
                      /mes en renta neta proyectada
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[color:var(--cap-accent)]" />
                    <span>
                      <strong className="text-[color:var(--cap-text)]">
                        {calc.cashOnCash}%
                      </strong>{' '}
                      cash-on-cash anual estimado
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[color:var(--cap-accent)]" />
                    <span>Propiedades operadas y rentando en 60-90 días</span>
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-[color:var(--cap-border)] bg-[color:var(--cap-bgAlt)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--cap-muted)]">
                    Proyección a 5 años
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <Metric label="Cash flow acumulado" value={formatUsd(calc.cumulativeCashFlow)} />
                    <Metric label="Apreciación de equity" value={formatUsd(calc.equityAppreciation)} />
                    <Metric label="Retorno total" value={`${formatUsd(calc.totalReturn)} (${calc.totalReturnPct}%)`} />
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-[color:var(--cap-muted)]">
                  Estimaciones basadas en data del portafolio HSG operando en Georgia. Tu
                  resultado real puede variar.
                </p>

                <div className="mt-5">
                  <button
                    type="button"
                    onClick={onCalculatorCta}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--cap-accent)] px-4 py-3 text-sm font-semibold text-white hover:opacity-95"
                  >
                    Quiero hablar con alguien sobre estos números <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section id="how">
        <Container>
          <div className="max-w-3xl">
            <H2>De primera llamada a tu primera renta cobrada en 60-90 días.</H2>
          </div>

          <div className="mt-10 space-y-4">
            {[
              [
                '1. Llamada de descubrimiento',
                'Hablamos 20 minutos. Entendemos tu situación, capital disponible y objetivos. Si hace sentido, avanzamos. Si no, te decimos.',
              ],
              [
                '2. Diseño de portafolio',
                'Diseñamos contigo el portafolio: cuántas propiedades, en qué zonas, con qué perfil de renta. Te entregamos un plan personalizado con escenarios.',
              ],
              [
                '3. Estructura legal y fiscal',
                'Armamos tu estructura: Wyoming LLC, ITIN, cuenta bancaria. Nuestro CPA cross-border te entrega tu plan fiscal completo antes de comprar.',
              ],
              [
                '4. Adquisición de propiedades',
                'Te presentamos solo propiedades pre-analizadas que pasan nuestro scoring. Priorizamos casas ya rentadas para que tu cash flow empiece desde el día uno.',
              ],
              [
                '5. Operación y reporting',
                'B4I administra tu propiedad. Tú ves todo en tu portal: estado, renta cobrada, gastos y documentos fiscales. En español y en tiempo real.',
              ],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-lg border border-[color:var(--cap-border)] bg-white p-5"
              >
                <p className="text-sm font-semibold text-[color:var(--cap-text)]">{title}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--cap-muted)]">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who we are */}
      <Section className="bg-[color:var(--cap-bgAlt)]">
        <Container>
          <div className="max-w-3xl">
            <H2>No somos un broker con landing bonita. Somos operadores.</H2>
            <P className="mt-4">
              HSG Capital Investment es la unidad de inversión del ecosistema HSG, un
              grupo de empresas que opera real estate desde 2014 a ambos lados de la
              frontera.
            </P>
            <P className="mt-4">
              Cuando inviertes con nosotros, no contratas a un intermediario. Conectas
              con la misma operación que ya administra:
            </P>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card title="B4I Management">Property Management en Georgia, USA. Más de 500 propiedades bajo administración.</Card>
            <Card title="Orange Hammer">Facility Management en Georgia, USA. Renovaciones, mantenimiento preventivo y correctivo.</Card>
            <Card title="HSG Synergy">Operación corporativa. 18,000+ unidades administradas en Latinoamérica desde 2014.</Card>
          </div>

          <div className="mt-8 rounded-lg border border-[color:var(--cap-border)] bg-white p-5">
            <p className="text-sm leading-6 text-[color:var(--cap-text)]">
              Esto significa que cuando tu propiedad necesita algo, no llamamos a un
              tercero. Lo resolvemos con nuestro equipo, en nuestro proceso, con nuestros
              estándares.
            </p>
          </div>
        </Container>
      </Section>

      {/* Real numbers */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <H2>Estos son números reales. No proyecciones.</H2>
            <P className="mt-4">
              Performance del portafolio operado en Georgia durante los últimos 12 meses.
              Anonymizado a nivel de propiedad, pero los agregados son la realidad.
            </P>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <Kpi label="Renta promedio" value="$1,820 USD / mes" />
            <Kpi label="Cap rate promedio" value="6.2%" />
            <Kpi label="On-time rent collection" value="94%" />
            <Kpi label="Days to re-rent" value="22 días" />
          </div>

          <p className="mt-6 text-xs leading-5 text-[color:var(--cap-muted)]">
            Performance pasada no garantiza resultados futuros. Cada propiedad varía.
          </p>
        </Container>
      </Section>

      {/* Fees */}
      <Section id="fees" className="bg-[color:var(--cap-bgAlt)]">
        <Container>
          <div className="max-w-3xl">
            <H2>Estos son todos nuestros fees. No hay otros.</H2>
          </div>

          <div className="mt-10 overflow-hidden rounded-lg border border-[color:var(--cap-border)] bg-white">
            <div className="grid grid-cols-3 gap-0 border-b border-[color:var(--cap-border)] bg-[color:var(--cap-bgAlt)] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--cap-muted)]">
              <div>Fee</div>
              <div>Cuándo</div>
              <div>Monto</div>
            </div>
            {[
              ['Acquisition fee', 'Al cierre de cada propiedad', '2.5% del precio de compra'],
              ['Setup de entidad', 'Una vez', '$1,500 incluye Wyoming LLC + ITIN coordination'],
              ['PM setup / transition', 'Por propiedad', '$500'],
              ['PM mensual', 'Mientras administramos', '10% de la renta cobrada'],
              ['Lease renewal', 'Cuando se renueva contrato', '$500'],
              ['Maintenance coordination', 'Cuando aplique', '15% de markup sobre costo de Orange Hammer'],
            ].map(([fee, when, amount]) => (
              <div
                key={fee}
                className="grid grid-cols-1 gap-2 border-b border-[color:var(--cap-border)] px-4 py-4 text-sm text-[color:var(--cap-text)] md:grid-cols-3 md:gap-0"
              >
                <div className="font-semibold">{fee}</div>
                <div className="text-[color:var(--cap-muted)]">{when}</div>
                <div>{amount}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-[color:var(--cap-border)] bg-white p-5 text-sm leading-6 text-[color:var(--cap-text)]">
            No cobramos por la llamada. No cobramos por el portafolio diseñado. No cobramos
            por el acceso al portal. Si no compras, no nos debes nada.
          </div>
        </Container>
      </Section>

      {/* Taxes explained */}
      <Section id="taxes">
        <Container>
          <div className="max-w-3xl">
            <H2>Los impuestos que nadie te explica.</H2>
            <P className="mt-4">
              Como inversionista latinoamericano sin residencia en USA (non-resident alien),
              tienes obligaciones fiscales específicas. Te las explicamos antes de comprar —
              no después.
            </P>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <Card title="Income Tax">
              Pagas impuesto federal sobre la renta neta después de gastos, depreciación e
              intereses. Filing anual obligatorio.
            </Card>
            <Card title="FIRPTA">
              Cuando vendes, el comprador retiene 15% del precio bruto y lo envía al IRS. Es
              un withholding, no un impuesto adicional. Hay que planearlo.
            </Card>
            <Card title="Estate Tax">
              Si fallecieras siendo dueño de propiedades en USA, el IRS puede cobrar hasta 40%
              sobre activos superiores a $60,000. Esto se mitiga con la estructura legal correcta.
            </Card>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-start">
            <div className="rounded-lg border border-[color:var(--cap-border)] bg-[color:var(--cap-bgAlt)] p-5">
              <p className="text-sm font-semibold text-[color:var(--cap-text)]">
                Descarga el cheat sheet fiscal completo
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--cap-muted)]">
                Email gate placeholder (sin envío real aún). Dejamos listo el tracking e
                integración futura con Supabase.
              </p>

              <form className="mt-4 space-y-3" onSubmit={onTaxCheatSubmit}>
                <div>
                  <input
                    {...register('name')}
                    placeholder="Nombre"
                    className="w-full rounded-lg border border-[color:var(--cap-border)] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--cap-accent)]"
                  />
                  {errors.name ? (
                    <p className="mt-1 text-xs text-[color:var(--cap-error)]">
                      {errors.name.message}
                    </p>
                  ) : null}
                </div>
                <div>
                  <input
                    {...register('email')}
                    placeholder="Email"
                    className="w-full rounded-lg border border-[color:var(--cap-border)] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--cap-accent)]"
                  />
                  {errors.email ? (
                    <p className="mt-1 text-xs text-[color:var(--cap-error)]">
                      {errors.email.message}
                    </p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--cap-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  Descargar
                </button>
                <p className="text-xs leading-5 text-[color:var(--cap-muted)]">
                  Esto no constituye asesoría fiscal o legal. Cada situación es única.
                </p>
              </form>
            </div>

            <div className="rounded-lg border border-[color:var(--cap-border)] bg-white p-5">
              <p className="text-sm font-semibold text-[color:var(--cap-text)]">
                Nota de transparencia
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--cap-muted)]">
                Antes de comprar, revisamos contigo la estructura legal y fiscal. No vendemos
                “soluciones mágicas”: te mostramos el modelo, los riesgos y la operación real.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-[color:var(--cap-bgAlt)]">
        <Container>
          <div className="max-w-3xl">
            <H2>Las preguntas que siempre nos hacen.</H2>
          </div>

          <div className="mt-10 rounded-lg border border-[color:var(--cap-border)] bg-white p-5">
            <Accordion type="single" collapsible onValueChange={onFaqOpen}>
              <AccordionItem value="q1">
                <AccordionTrigger>¿Necesito vivir en Estados Unidos para invertir?</AccordionTrigger>
                <AccordionContent>
                  No. Puedes invertir como extranjero/no residente. Nosotros operamos la adquisición y la administración.
                  Antes de comprar, definimos contigo la estructura legal y fiscal adecuada.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>¿Cuánto capital necesito para empezar?</AccordionTrigger>
                <AccordionContent>
                  La estrategia está diseñada para portafolios desde {formatUsd(150_000)}. La calculadora muestra escenarios conservadores y reales del portafolio en Georgia.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>¿Cuánto tiempo toma armar mi LLC e ITIN?</AccordionTrigger>
                <AccordionContent>
                  Depende del caso y del calendario del IRS. Te damos un plan y tiempos estimados antes de avanzar, con hitos claros.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>¿Qué pasa si el inquilino no paga la renta?</AccordionTrigger>
                <AccordionContent>
                  Operamos con procesos de screening, cobranza y re-renta. Si ocurre morosidad, te explicamos el plan de acción y tiempos, y lo verás reflejado en reporting.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger>¿Puedo vender mi propiedad cuando quiera?</AccordionTrigger>
                <AccordionContent>
                  En general sí, pero debes planear el proceso (mercado, tenant, costos de cierre y FIRPTA). Lo explicamos antes de comprar para evitar sorpresas.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q6">
                <AccordionTrigger>¿Qué pasa si quiero operar la propiedad yo mismo?</AccordionTrigger>
                <AccordionContent>
                  Podemos evaluarlo caso a caso. Nuestra propuesta está pensada para inversionistas que prefieren operación delegada con reporting y procesos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q7">
                <AccordionTrigger>¿Puedo financiar la propiedad o tiene que ser cash?</AccordionTrigger>
                <AccordionContent>
                  Depende de tu perfil y del vehículo legal. Si buscas financiamiento, lo discutimos en la llamada para entender condiciones reales y su impacto en retorno.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q8">
                <AccordionTrigger>¿Cómo veo qué pasa con mi propiedad?</AccordionTrigger>
                <AccordionContent>
                  Tendrás reporting y visibilidad de renta cobrada, gastos y documentos. En español y con trazabilidad operativa.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q9">
                <AccordionTrigger>¿Qué los hace diferentes a otros operadores que veo en redes?</AccordionTrigger>
                <AccordionContent>
                  No somos un broker. Somos operadores: property management, facility management y operación corporativa. Te mostramos fees, procesos y la operación real.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q10">
                <AccordionTrigger>¿Y si invierto y no funciona?</AccordionTrigger>
                <AccordionContent>
                  Toda inversión inmobiliaria tiene riesgos (vacancia, mantenimiento, mercado, impuestos). Nuestro trabajo es darte transparencia, operación y un plan realista, no promesas.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section id="cta" className="bg-[color:var(--cap-primary)]">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-balance text-2xl font-extrabold leading-tight text-white md:text-4xl">
                ¿Listo para construir tu portafolio en USA?
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-white/80 md:text-base">
                Tienes dos formas de empezar:
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-white/15 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">Opción A — Webinar gratuito</p>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    Cada mes hacemos un webinar educativo de 45 minutos: “Cómo invertir en
                    propiedades en USA desde Latinoamérica sin perder dinero en el intento.”
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="secondary"
                      className="w-full justify-center"
                      onClick={() => setCalendlyOpen(true)}
                    >
                      Regístrate al próximo webinar <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-white/15 bg-white/5 p-5">
                  <p className="text-sm font-semibold text-white">
                    Opción B — Llamada uno a uno gratuita
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/80">
                    Si ya tienes capital identificado y quieres avanzar, agenda 20 minutos
                    directo con nosotros.
                  </p>
                  <div className="mt-4">
                    <Button
                      variant="primary"
                      className="w-full justify-center bg-[color:var(--cap-accent)] focus-visible:ring-white/70"
                      onClick={() => setCalendlyOpen(true)}
                    >
                      Selecciona horario <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/15 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                Calendly (placeholder)
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                Aquí irá el embed real de Calendly. Por ahora mostramos un placeholder
                institucional.
              </p>
              <div className="mt-4 rounded-lg bg-white/10 p-5 ring-1 ring-white/10">
                <div className="h-40 rounded-md bg-white/10" />
                <p className="mt-3 text-xs text-white/70">
                  TODO: Reemplazar por embed real + tracking de conversiones.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Footer */}
      <footer className="border-t border-[color:var(--cap-border)] bg-white py-12">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-[color:var(--cap-text)]">HSG Capital Investment</p>
              <p className="mt-2 text-sm text-[color:var(--cap-muted)]">Atlanta, Georgia, USA</p>
              <p className="mt-2 text-sm text-[color:var(--cap-muted)]">
                contacto@hsgcapitalinvestment.com
              </p>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-[color:var(--cap-text)]">Links</p>
              <div className="mt-3 space-y-2 text-[color:var(--cap-muted)]">
                {[
                  ['Sobre nosotros', '#how'],
                  ['Cómo funciona', '#how'],
                  ['Webinars', '#cta'],
                  ['Privacy Policy', '#'],
                  ['Terms of Service', '#'],
                  ['Tax Disclaimer', '#taxes'],
                  ['Real Estate Disclosure', '#'],
                ].map(([label, href]) => (
                  <a key={label} href={href} className="block hover:text-[color:var(--cap-text)]">
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-[color:var(--cap-text)]">Disclaimer</p>
              <p className="mt-3 text-xs leading-5 text-[color:var(--cap-muted)]">
                HSG Capital Investment LLC es un servicio de inversión turnkey en propiedades
                inmobiliarias residenciales. No somos un fondo de inversión registrado, no
                vendemos securities, y no proveemos asesoría financiera, fiscal o legal. Toda
                inversión inmobiliaria conlleva riesgo, incluyendo posible pérdida de capital.
                Performance pasada no garantiza resultados futuros. Antes de invertir, consulta
                con tu asesor fiscal y legal.
              </p>
              <p className="mt-4 text-xs text-[color:var(--cap-muted)]">
                © 2026 HSG Capital Investment. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </Container>
      </footer>

      <StickyCta onClick={() => setCalendlyOpen(true)} />

      <Modal
        open={calendlyOpen}
        title="Agenda / Webinar (placeholder)"
        onClose={() => setCalendlyOpen(false)}
      >
        <p className="text-sm leading-6 text-[color:var(--cap-muted)]">
          Aquí irá el Calendly real. Por ahora, este modal es un placeholder para validar
          el flujo de conversión.
        </p>
        <div className="mt-4 rounded-lg border border-[color:var(--cap-border)] bg-[color:var(--cap-bgAlt)] p-5">
          <p className="text-sm font-semibold text-[color:var(--cap-text)]">
            Calendly embed placeholder
          </p>
          <p className="mt-2 text-sm text-[color:var(--cap-muted)]">
            TODO: Insertar link/iframe de Calendly + tracking server-side.
          </p>
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="secondary" onClick={() => setCalendlyOpen(false)}>
            Cerrar
          </Button>
        </div>
      </Modal>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--cap-border)] bg-white p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-[color:var(--cap-muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[color:var(--cap-text)]">{value}</p>
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[color:var(--cap-border)] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--cap-muted)]">
        {label}
      </p>
      <p className="mt-2 text-xl font-extrabold text-[color:var(--cap-primary)]">{value}</p>
      <p className="mt-2 text-xs text-[color:var(--cap-muted)]">Datos reales agregados</p>
    </div>
  )
}

