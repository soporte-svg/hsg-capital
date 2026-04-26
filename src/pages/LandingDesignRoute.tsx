import { Navigate, useParams } from 'react-router-dom'
import { LandingDesignPage } from './LandingDesignPage'

export function LandingDesignRoute() {
  const { lang } = useParams()
  if (lang !== 'es' && lang !== 'en') return <Navigate to="/es/landing" replace />
  return <LandingDesignPage lang={lang} />
}

