export const AVG_PROPERTY_PRICE = 200_000
// We model portfolio building using typical equity per property (vs full purchase price).
// This keeps the calculator aligned with the product: investors deploy capital as equity and
// can operate properties with financing on top.
export const AVG_EQUITY_PER_PROPERTY = 100_000
export const AVG_MONTHLY_RENT = 1_800
export const EXPENSE_RATIO = 0.35
export const APPRECIATION_RATE = 0.04
export const RENT_GROWTH_RATE = 0.03
export const ACQUISITION_FEE_PCT = 0.025
export const DEFAULT_LTV = 0.5
export const DEFAULT_MORTGAGE_RATE = 0.07
export const DEFAULT_MORTGAGE_TERM_YEARS = 30

function monthlyPayment(principal: number, annualRate: number, termYears: number) {
  const r = annualRate / 12
  const n = termYears * 12
  if (principal <= 0) return 0
  if (r <= 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

function remainingBalanceAfterMonths(
  principal: number,
  annualRate: number,
  termYears: number,
  monthsPaid: number,
) {
  const r = annualRate / 12
  const n = termYears * 12
  if (principal <= 0) return 0
  if (r <= 0) return Math.max(0, principal * (1 - monthsPaid / n))
  const pmt = monthlyPayment(principal, annualRate, termYears)
  // Standard amortization balance formula.
  return principal * Math.pow(1 + r, monthsPaid) - (pmt * (Math.pow(1 + r, monthsPaid) - 1)) / r
}

export function calculatePortfolio(capital: number) {
  const acquisitionFees = capital * ACQUISITION_FEE_PCT
  const capitalForProperties = capital - acquisitionFees
  const numProperties = Math.max(
    1,
    Math.floor(capitalForProperties / AVG_EQUITY_PER_PROPERTY),
  )

  const propertyPrice = AVG_PROPERTY_PRICE
  const equityPerProperty = AVG_EQUITY_PER_PROPERTY
  const debtPerProperty = Math.max(0, propertyPrice - equityPerProperty)
  const mortgagePmt = monthlyPayment(debtPerProperty, DEFAULT_MORTGAGE_RATE, DEFAULT_MORTGAGE_TERM_YEARS)

  const monthlyGrossRent = numProperties * AVG_MONTHLY_RENT
  const monthlyNetBeforeDebt = monthlyGrossRent * (1 - EXPENSE_RATIO)
  const monthlyDebtService = numProperties * mortgagePmt
  const monthlyNetRent = monthlyNetBeforeDebt - monthlyDebtService
  const annualCashFlow = monthlyNetRent * 12
  const cashOnCash = capital > 0 ? annualCashFlow / capital : 0

  let cumulativeCashFlow = 0
  let currentMonthlyNetBeforeDebt = monthlyNetBeforeDebt

  for (let year = 1; year <= 5; year++) {
    // Rent grows, mortgage stays constant → net cashflow changes over time.
    const yearlyNet = currentMonthlyNetBeforeDebt * 12 - monthlyDebtService * 12
    cumulativeCashFlow += yearlyNet
    currentMonthlyNetBeforeDebt *= 1 + RENT_GROWTH_RATE
  }

  const propertyValueYear5 =
    numProperties * propertyPrice * Math.pow(1 + APPRECIATION_RATE, 5)

  const appreciationGain = propertyValueYear5 - numProperties * propertyPrice

  const remainingDebtYear5 = numProperties
    * remainingBalanceAfterMonths(
      debtPerProperty,
      DEFAULT_MORTGAGE_RATE,
      DEFAULT_MORTGAGE_TERM_YEARS,
      60,
    )

  const initialDebt = numProperties * debtPerProperty
  const principalPaydown = Math.max(0, initialDebt - remainingDebtYear5)

  const equityAppreciation = appreciationGain + principalPaydown

  const totalReturn = cumulativeCashFlow + equityAppreciation
  const totalReturnPct = capital > 0 ? totalReturn / capital : 0

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
