export const AVG_PROPERTY_PRICE = 200_000
// We model portfolio building using typical equity per property (vs full purchase price).
// This keeps the calculator aligned with the product: investors deploy capital as equity and
// can operate properties with financing on top.
export const AVG_EQUITY_PER_PROPERTY = 100_000
// Tuned to match expected ~0.8% monthly net yield at ~$100k (1 property).
export const AVG_MONTHLY_RENT = 1_250
export const EXPENSE_RATIO = 0.35
export const APPRECIATION_RATE = 0.04
export const RENT_GROWTH_RATE = 0.03
export const ACQUISITION_FEE_PCT = 0.025

export function calculatePortfolio(capital: number) {
  const acquisitionFees = capital * ACQUISITION_FEE_PCT
  const capitalForProperties = capital - acquisitionFees
  const numProperties = Math.max(
    1,
    Math.floor(capitalForProperties / AVG_EQUITY_PER_PROPERTY),
  )

  const monthlyGrossRent = numProperties * AVG_MONTHLY_RENT
  const monthlyNetRent = monthlyGrossRent * (1 - EXPENSE_RATIO)
  const annualCashFlow = monthlyNetRent * 12
  const cashOnCash = capital > 0 ? annualCashFlow / capital : 0

  let cumulativeCashFlow = 0
  let currentMonthlyRent = monthlyNetRent

  for (let year = 1; year <= 5; year++) {
    cumulativeCashFlow += currentMonthlyRent * 12
    currentMonthlyRent *= 1 + RENT_GROWTH_RATE
  }

  const propertyValueYear5 =
    numProperties * AVG_PROPERTY_PRICE * Math.pow(1 + APPRECIATION_RATE, 5)

  const equityAppreciation =
    propertyValueYear5 - numProperties * AVG_PROPERTY_PRICE

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
