import { Navigate, useParams } from 'react-router-dom'
import type { Lang } from '../i18n'
import { LandingPage } from './LandingPage'

export function CapitalLandingRoute() {
  const { lang } = useParams()
  if (lang !== 'es' && lang !== 'en') {
    return <Navigate to="/es/capital" replace />
  }
  return <LandingPage lang={lang as Lang} variant="spectrum" />
}
