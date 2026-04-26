export type Lang = 'es' | 'en'

type Dict = Record<string, string>

const es: Dict = {
  nav_properties: 'Propiedades',
  nav_operators: 'Contexto',
  nav_journey: 'Nuestra operación',
  nav_faq: 'FAQ',
  lang_es: 'ES',
  lang_en: 'EN',
  whatsapp: 'WhatsApp',

  hero_title: 'Construye tu portafolio de propiedades en EE.UU.',
  hero_sub:
    'Tú eres dueño. Nosotros operamos todo lo demás. Acceso para extranjeros y no residentes desde $50,000 USD.',
  hero_primary: 'Hablar por WhatsApp',
  hero_secondary: 'Ver propiedades',
  hero_secondary_fallback: 'Ver calculadora',

  metrics_min: 'propiedades en USA',
  metrics_min_value: '500+',
  metrics_yield: 'unidades en LATAM',
  metrics_yield_value: '18,000+',
  metrics_market: 'años operando',
  metrics_market_value: '12',
  metrics_currency: 'operación en español',
  metrics_currency_value: '100%',

  problem_title: 'Invertir en propiedades en USA desde Latinoamérica hoy es complicado.',
  problem_lead:
    'Si tu dinero depende de terceros que no controlas y de reglas que nadie te explicó, no es inversión: es estrés.',
  problem_1_title: 'El broker que vende y desaparece',
  problem_1_body:
    'Compras una propiedad por internet, firmas papeles que no entiendes del todo, y al mes siguiente nadie responde el teléfono. El broker cobró su comisión y se fue al siguiente cliente.',
  problem_2_title: 'Las sorpresas fiscales',
  problem_2_body:
    'Nadie te explica el FIRPTA, el estate tax, ni cómo se declara renta como non-resident alien. Lo descubres seis meses después cuando llega una carta del IRS.',
  problem_3_title: 'Operar a 4,000 km',
  problem_3_body:
    'El inquilino no paga, el techo se filtra, el property manager no contesta. Tú estás en Bogotá, México DF, o Buenos Aires. Tu inversión depende de gente que no controlas.',
  problem_closing: 'Por eso construimos HSG Capital Investment.',

  calc_kicker: 'Calculadora',
  calc_title: 'Calcula tu portafolio en 30 segundos.',
  calc_desc:
    'Basado en rangos conservadores de un portafolio operando en Georgia. No son promesas: son estimaciones para conversar con contexto.',
  calc_capital_label: 'Capital disponible',
  calc_slider_hint: 'Rango: $150,000 – $1,500,000 • pasos de $50,000',
  calc_bullets_intro: 'Con {capital} puedes construir un portafolio de:',
  calc_bullet_properties: '{count} propiedades',
  calc_bullet_net_rent: '~{amount}/mes en renta neta proyectada',
  calc_bullet_coc: '{pct}% cash-on-cash anual estimado',
  calc_bullet_timeline: 'Propiedades operadas y rentando en 60-90 días',
  calc_projection_title: 'Proyección a 5 años',
  calc_projection_cashflow: 'Cash flow acumulado',
  calc_projection_equity: 'Apreciación de equity',
  calc_projection_total: 'Retorno total',
  calc_disclaimer:
    'Estimaciones basadas en data operativa. Tu resultado real puede variar.',
  calc_cta: 'Quiero hablar con alguien sobre estos números',
  calc_visual_alt: 'Propiedad tipo cartera en Chicago, Illinois',
  calc_visual_caption: 'Ejemplo de activo en cartera — operación real, EE. UU.',

  operators_line1: 'No somos un broker con landing bonita.',
  operators_line2: 'Somos operadores.',
  operators_kicker: 'Ecosistema operativo · desde 2014',
  operators_intro:
    'HSG Capital Investment es la unidad de inversión del ecosistema HSG, un grupo de empresas que opera real estate desde 2014 a ambos lados de la frontera.',
  operators_bridge:
    'Cuando inviertes con nosotros, no contratas a un intermediario. Conectas con la misma operación que ya administra:',
  operators_card_b4i_title: 'B4I Management',
  operators_card_b4i_body:
    'Property Management en Georgia, USA. Más de 500 propiedades bajo administración.',
  operators_card_orange_title: 'Orange Hammer',
  operators_card_orange_body:
    'Facility Management en Georgia, USA. Renovaciones, mantenimiento preventivo y correctivo.',
  operators_card_synergy_title: 'HSG Synergy',
  operators_card_synergy_body:
    'Operación corporativa. 18,000+ unidades administradas en Latinoamérica desde 2014.',
  operators_closing:
    'Esto significa que cuando tu propiedad necesita algo, no llamamos a un tercero. Lo resolvemos con nuestro equipo, en nuestro proceso, con nuestros estándares.',

  journey_kicker: 'Ritmo operativo',
  journey_title_prefix: 'De primera llamada',
  journey_title_highlight: 'a tu primera renta cobrada en 60–90 días.',
  journey_lead:
    'Un solo hilo: legal, capital y operación en terreno. Los plazos finales dependen del activo, tu banco y documentación — aquí ves el ritmo que apuntamos.',
  journey_1_phase: 'Día 0',
  journey_1_title: 'Conversación clara',
  journey_1_body:
    'Capital, objetivo y restricciones. Te explicamos cómo encaja el modelo HSG, qué pide un socio típico y qué NO prometemos.',
  journey_2_phase: 'Días 1–7',
  journey_2_title: 'Propuesta alineada',
  journey_2_body:
    'Opciones de cartera según tu ticket, números sensibles y escenarios. Sin humo: lo que ves es lo que usamos para decidir.',
  journey_3_phase: 'Días 8–45',
  journey_3_title: 'Cierre y estructura',
  journey_3_body:
    'Firma, vehículo acordado (p. ej. LLC), transferencias coordinadas y contratos listos. Te guiamos en cada paso para que no pierdas semanas en trámites evitables.',
  journey_4_phase: 'En paralelo',
  journey_4_title: 'Activo en marcha',
  journey_4_body:
    'Rehabilitación si aplica, listing y property management activo. Objetivo: inquilino calificado y cobranza funcionando.',
  journey_5_phase: '60–90 días',
  journey_5_title: 'Primera renta en tu cuenta',
  journey_5_body:
    'Renta neta en dólares, liquidaciones legibles y un equipo que responde. Ahí empieza el flujo recurrente.',
  journey_footnote:
    'Plazos orientativos basados en operación típica; cada caso se confirma por escrito con tu deal team.',

  stats_title: 'Estos son números reales. No proyecciones.',
  stats_subtitle:
    'Performance del portafolio operado en Georgia durante los últimos 12 meses. Anonymizado a nivel de propiedad, pero los agregados son la realidad.',
  stats_data_note: 'Datos reales agregados',
  stats_metric_rent_label: 'Renta promedio',
  stats_metric_rent_value: '$1,820 USD / mes',
  stats_metric_cap_label: 'Cap rate promedio',
  stats_metric_cap_value: '6.2%',
  stats_metric_ontime_label: 'Cobranza de renta a tiempo',
  stats_metric_ontime_value: '94%',
  stats_metric_rerent_label: 'Días para re-rentar',
  stats_metric_rerent_value: '22 días',
  stats_disclaimer:
    'Performance pasada no garantiza resultados futuros. Cada propiedad varía.',

  fees_title: 'Estos son todos nuestros fees. No hay otros.',
  fees_col_fee: 'Fee',
  fees_col_when: 'Cuándo',
  fees_col_amount: 'Monto',
  fees_r1_fee: 'Acquisition fee',
  fees_r1_when: 'Al cierre de cada propiedad',
  fees_r1_amount: '2.5% del precio de compra',
  fees_r2_fee: 'Setup de entidad',
  fees_r2_when: 'Una vez',
  fees_r2_amount: '$1,500 — incluye Wyoming LLC + coordinación ITIN',
  fees_r3_fee: 'PM setup / transition',
  fees_r3_when: 'Por propiedad',
  fees_r3_amount: '$500',
  fees_r4_fee: 'PM mensual',
  fees_r4_when: 'Mientras administramos',
  fees_r4_amount: '10% de la renta cobrada',
  fees_r5_fee: 'Lease renewal',
  fees_r5_when: 'Cuando se renueva contrato',
  fees_r5_amount: '$500',
  fees_r6_fee: 'Maintenance coordination',
  fees_r6_when: 'Cuando aplique',
  fees_r6_amount: '15% de markup sobre costo de Orange Hammer',
  fees_note:
    'No cobramos por la llamada. No cobramos por el portafolio diseñado. No cobramos por el acceso al portal. Si no compras, no nos debes nada.',

  tax_title: 'Los impuestos que nadie te explica.',
  tax_lead:
    'Como inversionista latinoamericano sin residencia en USA (non-resident alien), tienes obligaciones fiscales específicas. Te las explicamos antes de comprar — no después.',
  tax_income_title: 'Income tax',
  tax_income_body:
    'Pagas impuesto federal sobre la renta neta después de gastos, depreciación e intereses. Filing anual obligatorio.',
  tax_firpta_title: 'FIRPTA',
  tax_firpta_body:
    'Cuando vendes, el comprador retiene 15% del precio bruto y lo envía al IRS. Es un withholding, no un impuesto adicional. Hay que planearlo.',
  tax_estate_title: 'Estate tax',
  tax_estate_body:
    'Si fallecieras siendo dueño de propiedades en USA, el IRS puede cobrar hasta 40% sobre activos superiores a $60,000. Esto se mitiga con la estructura legal correcta.',
  tax_cta_title: 'Descarga el cheat sheet fiscal completo',
  tax_form_note:
    'Email gate (sin envío real aún). Dejamos listo el tracking e integración futura con Supabase.',
  tax_name_label: 'Nombre',
  tax_email_label: 'Email',
  tax_download: 'Descargar',
  tax_form_success: 'Listo. Pronto habilitamos el envío; ya quedó registrado tu interés.',
  tax_form_legal:
    'Esto no constituye asesoría fiscal o legal. Cada situación es única.',

  portfolio_title: 'Propiedades disponibles',
  portfolio_sub:
    'Selecciona una propiedad y desbloquea el simulador de inversión contactándonos por WhatsApp.',
  card_location: 'Ubicación',
  card_target: 'Objetivo',
  card_progress: 'Financiado',
  card_available: 'Disponible',
  card_sold_out: 'Sin fracciones disponibles',
  yield_label: 'Ingreso total por rentas',
  open_simulator: 'Ver simulador',

  simulator_title: 'Simulador de inversión',
  simulator_locked_title: 'Desbloquea el simulador',
  simulator_locked_desc:
    'Te compartimos el análisis completo (renta, costos y proyección) por WhatsApp. Sin registro.',
  simulator_cta: 'Desbloquear por WhatsApp',

  why_title: 'Por qué HSG Investment',
  why_1: 'Propiedades en EE.UU. seleccionadas y administradas por expertos',
  why_2: 'Renta en dólares, cobras desde cualquier país',
  why_3: 'Sin trámites — nosotros gestionamos todo',
  why_4: 'Inversión desde $50,000 USD',

  faq_title: 'Preguntas frecuentes',
  faq_q1: '¿Quién puede invertir con HSG?',
  faq_a1:
    'Personas físicas y familias en Latinoamérica (y otros países) que buscan renta en dólares en propiedades rentadas en EE.UU., típicamente como non-resident alien. Evaluamos perfil, origen de fondos y afinidad con el modelo antes de avanzar.',
  faq_q2: '¿Cuál es la inversión mínima?',
  faq_a2:
    'Desde $50,000 USD según oportunidad y estructura. El ticket exacto depende del activo y del vehículo (por ejemplo LLC). Lo alineamos en la primera conversación.',
  faq_q3: '¿Cómo recibo mi renta?',
  faq_a3:
    'Transferencia en dólares a la cuenta que indiques, según liquidaciones del property management. Te compartimos el flujo y los plazos típicos antes de cerrar.',
  faq_q4: '¿Qué diferencia a HSG de un broker con “bonita landing”?',
  faq_a4:
    'Operamos con unidades del ecosistema: property management y facility management en Georgia (B4I Management, Orange Hammer) y operación corporativa en LATAM (HSG Synergy). Cuando tu propiedad necesita algo, no desaparecemos ni delegamos en desconocidos.',
  faq_q5: '¿Los números de performance (renta, cap rate, etc.) son reales?',
  faq_a5:
    'Son agregados del portafolio operado en Georgia, últimos 12 meses, anonymizado a nivel de propiedad. No son promesas para tu inversión futura: son la foto de lo que ya administramos. Performance pasada no garantiza resultados futuros.',
  faq_q6: '¿Dónde veo todos los fees?',
  faq_a6:
    'En esta misma página, sección de fees: listado único. No cobramos por la llamada, por el portafolio diseñado ni por el portal. Si no compras, no nos debes nada.',
  faq_q7: '¿Qué impuestos debo tener en mente como inversionista latino sin residencia en USA?',
  faq_a7:
    'Income tax sobre renta neta, FIRPTA al vender (withholding 15% sobre precio bruto, con reglas de reclamo) y riesgos de estate tax si no hay estructura adecuada. Lo explicamos antes de comprar; también ofrecemos un cheat sheet fiscal (no es asesoría personalizada).',
  faq_q8: '¿Qué pasa si el inquilino no paga o hay vacancia?',
  faq_a8:
    'El property management sigue el proceso acordado (cobranza, legal, re-listing). El detalle varía por propiedad y estado del mercado; te lo explicamos con números sensibles por WhatsApp.',

  final_cta_kicker: 'HSG Capital Investment',
  final_cta_title: '¿Listo para construir tu portafolio en EE. UU.?',
  final_cta_sub:
    'Misma operación, mismos fees publicados, mismos estándares. Hablemos por WhatsApp y vemos si encajas con el modelo.',
  final_cta_button: 'Hablar por WhatsApp',
  final_cta_secondary: 'Ver calculadora',

  footer_legal:
    'HSG Investment no es un asesor de inversiones registrado. Toda inversión conlleva riesgo.',
}

const en: Dict = {
  nav_properties: 'Properties',
  nav_operators: 'Context',
  nav_journey: 'Our operations',
  nav_faq: 'FAQ',
  lang_es: 'ES',
  lang_en: 'EN',
  whatsapp: 'WhatsApp',

  hero_title: 'Build your U.S. rental property portfolio.',
  hero_sub:
    'You own the asset. We operate everything else. Access for foreigners and non-residents starting from $50,000 USD.',
  hero_primary: 'Chat on WhatsApp',
  hero_secondary: 'View properties',
  hero_secondary_fallback: 'View calculator',

  metrics_min: 'properties in the U.S.',
  metrics_min_value: '500+',
  metrics_yield: 'units in LATAM',
  metrics_yield_value: '18,000+',
  metrics_market: 'years operating',
  metrics_market_value: '12',
  metrics_currency: 'operations in Spanish',
  metrics_currency_value: '100%',

  problem_title:
    'Investing in U.S. properties from Latin America today is complicated.',
  problem_lead:
    'If your money depends on people you don’t control and rules nobody explained, it’s not investing — it’s stress.',
  problem_1_title: 'The broker who sells and disappears',
  problem_1_body:
    'You buy a property online, sign documents you don’t fully understand, and a month later nobody answers the phone. The broker collected their commission and moved on to the next client.',
  problem_2_title: 'Tax surprises',
  problem_2_body:
    'Nobody explains FIRPTA, estate tax, or how rental income is reported as a non-resident alien. You find out six months later when a letter from the IRS arrives.',
  problem_3_title: 'Operating from 4,000 km away',
  problem_3_body:
    'The tenant doesn’t pay, the roof leaks, the property manager doesn’t respond. You’re in Bogotá, Mexico City, or Buenos Aires. Your investment depends on people you don’t control.',
  problem_closing: 'That’s why we built HSG Capital Investment.',

  calc_kicker: 'Calculator',
  calc_title: 'Calculate your portfolio in 30 seconds.',
  calc_desc:
    'Based on conservative ranges from an operating portfolio in Georgia. Not a promise — estimates to give you context for a real conversation.',
  calc_capital_label: 'Available capital',
  calc_slider_hint: 'Range: $150,000 – $1,500,000 • $50,000 steps',
  calc_bullets_intro: 'With {capital} you can build a portfolio of:',
  calc_bullet_properties: '{count} properties',
  calc_bullet_net_rent: '~{amount}/mo in projected net rent',
  calc_bullet_coc: '{pct}% estimated annual cash-on-cash',
  calc_bullet_timeline: 'Properties operating and renting in 60-90 days',
  calc_projection_title: '5-year projection',
  calc_projection_cashflow: 'Cumulative cash flow',
  calc_projection_equity: 'Equity appreciation',
  calc_projection_total: 'Total return',
  calc_disclaimer:
    'Estimates based on operating data. Your actual results may vary.',
  calc_cta: 'I want to talk to someone about these numbers',
  calc_visual_alt: 'Sample portfolio property in Chicago, Illinois',
  calc_visual_caption: 'Example in-portfolio asset — real operations, U.S.',

  operators_line1: "We're not a broker with a pretty landing page.",
  operators_line2: "We're operators.",
  operators_kicker: 'Operating ecosystem · since 2014',
  operators_intro:
    'HSG Capital Investment is the investment unit of the HSG ecosystem — a group of companies that has operated real estate since 2014 on both sides of the border.',
  operators_bridge:
    'When you invest with us, you are not hiring a middleman. You connect with the same operation that already runs:',
  operators_card_b4i_title: 'B4I Management',
  operators_card_b4i_body:
    'Property management in Georgia, USA. 500+ properties under management.',
  operators_card_orange_title: 'Orange Hammer',
  operators_card_orange_body:
    'Facility management in Georgia, USA. Renovations, preventive and corrective maintenance.',
  operators_card_synergy_title: 'HSG Synergy',
  operators_card_synergy_body:
    'Corporate operations. 18,000+ units under management in Latin America since 2014.',
  operators_closing:
    'That means when your property needs something, we do not call a third party. We solve it with our team, our process, and our standards.',

  journey_kicker: 'Operating cadence',
  journey_title_prefix: 'From first call',
  journey_title_highlight: 'to your first rent collected in 60–90 days.',
  journey_lead:
    'One thread: legal, capital, and boots-on-the-ground operations. Final timing depends on the asset, your bank, and paperwork — this is the cadence we aim for.',
  journey_1_phase: 'Day 0',
  journey_1_title: 'A straight conversation',
  journey_1_body:
    'Capital, goals, and constraints. We explain how the HSG model fits, what partners typically need, and what we will not promise.',
  journey_2_phase: 'Days 1–7',
  journey_2_title: 'A proposal that fits',
  journey_2_body:
    'Portfolio options for your ticket size, conservative numbers, and scenarios. No smoke: what you see is what we use to decide.',
  journey_3_phase: 'Days 8–45',
  journey_3_title: 'Close + structure',
  journey_3_body:
    'Signing, the agreed vehicle (e.g. LLC), coordinated transfers, and contracts ready. We guide each step so you do not lose weeks to avoidable back-and-forth.',
  journey_4_phase: 'In parallel',
  journey_4_title: 'Asset in motion',
  journey_4_body:
    'Rehab when needed, listing, and active property management. Goal: a qualified tenant and collections running.',
  journey_5_phase: '60–90 days',
  journey_5_title: 'First rent hits your account',
  journey_5_body:
    'Net rent in USD, readable settlements, and a team that answers. That is when the recurring cash flow begins.',
  journey_footnote:
    'Indicative timelines based on typical operations; each case is confirmed in writing with your deal team.',

  stats_title: 'These are real numbers. Not projections.',
  stats_subtitle:
    'Performance of the operating portfolio in Georgia over the last 12 months. Anonymized at the property level — the aggregates are the reality.',
  stats_data_note: 'Aggregated real data',
  stats_metric_rent_label: 'Average rent',
  stats_metric_rent_value: '$1,820 USD / month',
  stats_metric_cap_label: 'Average cap rate',
  stats_metric_cap_value: '6.2%',
  stats_metric_ontime_label: 'On-time rent collection',
  stats_metric_ontime_value: '94%',
  stats_metric_rerent_label: 'Days to re-rent',
  stats_metric_rerent_value: '22 days',
  stats_disclaimer:
    'Past performance does not guarantee future results. Each property varies.',

  fees_title: 'These are all our fees. There are no others.',
  fees_col_fee: 'Fee',
  fees_col_when: 'When',
  fees_col_amount: 'Amount',
  fees_r1_fee: 'Acquisition fee',
  fees_r1_when: 'At closing of each property',
  fees_r1_amount: '2.5% of purchase price',
  fees_r2_fee: 'Entity setup',
  fees_r2_when: 'One-time',
  fees_r2_amount: '$1,500 — includes Wyoming LLC + ITIN coordination',
  fees_r3_fee: 'PM setup / transition',
  fees_r3_when: 'Per property',
  fees_r3_amount: '$500',
  fees_r4_fee: 'Monthly PM',
  fees_r4_when: 'While we manage',
  fees_r4_amount: '10% of rent collected',
  fees_r5_fee: 'Lease renewal',
  fees_r5_when: 'When the lease renews',
  fees_r5_amount: '$500',
  fees_r6_fee: 'Maintenance coordination',
  fees_r6_when: 'When applicable',
  fees_r6_amount: '15% markup on Orange Hammer cost',
  fees_note:
    'We do not charge for the call. We do not charge for the designed portfolio. We do not charge for portal access. If you do not buy, you owe us nothing.',

  tax_title: 'The taxes nobody explains.',
  tax_lead:
    'As a Latin American investor without U.S. residency (non-resident alien), you have specific tax obligations. We explain them before you buy — not after.',
  tax_income_title: 'Income tax',
  tax_income_body:
    'You pay federal tax on net rent after expenses, depreciation, and interest. Annual filing is required.',
  tax_firpta_title: 'FIRPTA',
  tax_firpta_body:
    'When you sell, the buyer withholds 15% of gross price and remits to the IRS. It is withholding, not an extra tax. Plan for it.',
  tax_estate_title: 'Estate tax',
  tax_estate_body:
    'If you passed away owning U.S. property, the IRS can collect up to ~40% on estates above $60,000. The right legal structure mitigates this.',
  tax_cta_title: 'Download the full tax cheat sheet',
  tax_form_note:
    'Email gate (no real send yet). Tracking is ready for a future Supabase integration.',
  tax_name_label: 'Name',
  tax_email_label: 'Email',
  tax_download: 'Download',
  tax_form_success: 'Done. Delivery is coming soon — your interest is logged.',
  tax_form_legal:
    'This is not tax or legal advice. Every situation is unique.',

  portfolio_title: 'Available properties',
  portfolio_sub:
    'Choose a property and unlock the investment simulator by contacting us on WhatsApp.',
  card_location: 'Location',
  card_target: 'Target',
  card_progress: 'Funded',
  card_available: 'Available',
  card_sold_out: 'Sold out',
  yield_label: 'Total rental income',
  open_simulator: 'View simulator',

  simulator_title: 'Investment simulator',
  simulator_locked_title: 'Unlock the simulator',
  simulator_locked_desc:
    'We’ll share the full analysis (rent, costs, projection) via WhatsApp. No registration.',
  simulator_cta: 'Unlock on WhatsApp',

  why_title: 'Why HSG Investment',
  why_1: 'U.S. properties selected and managed by experts',
  why_2: 'USD rent income — get paid from anywhere',
  why_3: 'No paperwork — we handle everything',
  why_4: 'Invest starting from $50,000 USD',

  faq_title: 'Frequently asked questions',
  faq_q1: 'Who can invest with HSG?',
  faq_a1:
    'Individuals and families in Latin America (and elsewhere) seeking USD rental income from U.S. properties, typically as non-resident aliens. We review profile, source of funds, and fit with the model before moving forward.',
  faq_q2: 'What is the minimum investment?',
  faq_a2:
    'From $50,000 USD depending on opportunity and structure. The exact ticket depends on the asset and vehicle (e.g. LLC). We align on the first call.',
  faq_q3: 'How do I receive rent?',
  faq_a3:
    'USD transfer to the account you specify, based on property-management settlements. We share the flow and typical timelines before closing.',
  faq_q4: 'What makes HSG different from an online broker with a pretty site?',
  faq_a4:
    'We operate with ecosystem units: property and facility management in Georgia (B4I Management, Orange Hammer) and corporate operations in Latin America (HSG Synergy). When your property needs something, we do not vanish or hand you off to strangers.',
  faq_q5: 'Are the performance numbers (rent, cap rate, etc.) real?',
  faq_a5:
    'They are aggregates from the operating Georgia portfolio, last 12 months, anonymized at the property level. They are not a promise for your future investment — they are a picture of what we already manage. Past performance does not guarantee future results.',
  faq_q6: 'Where do I see all fees?',
  faq_a6:
    'On this page, in the fees section: a single list. We do not charge for the call, the designed portfolio, or portal access. If you do not buy, you owe us nothing.',
  faq_q7: 'What taxes should I keep in mind as a Latin American investor without U.S. residency?',
  faq_a7:
    'Income tax on net rent, FIRPTA on sale (15% withholding on gross price, with claim rules), and estate-tax exposure without the right structure. We explain before you buy; we also offer a tax cheat sheet (not personalized advice).',
  faq_q8: 'What if the tenant does not pay or there is vacancy?',
  faq_a8:
    'Property management follows the agreed process (collections, legal, re-listing). Details vary by property and market; we walk you through conservative scenarios on WhatsApp.',

  final_cta_kicker: 'HSG Capital Investment',
  final_cta_title: 'Ready to build your U.S. portfolio?',
  final_cta_sub:
    'Same operation, same published fees, same standards. Let’s chat on WhatsApp and see if you are a fit.',
  final_cta_button: 'Chat on WhatsApp',
  final_cta_secondary: 'View calculator',

  footer_legal:
    'HSG Investment is not a registered investment advisor. All investments involve risk.',
}

export function t(lang: Lang, key: string) {
  const dict = lang === 'en' ? en : es
  return dict[key] ?? key
}

