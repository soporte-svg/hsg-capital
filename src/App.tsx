import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { CapitalLandingRoute } from './pages/CapitalLandingRoute'
import { LandingDesignRoute } from './pages/LandingDesignRoute'
import { LandingCapitalPage } from './pages/LandingCapitalPage'
import { LandingPage } from './pages/LandingPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route path="/es" element={<LandingPage lang="es" />} />
        <Route path="/en" element={<LandingPage lang="en" />} />
        <Route path="/landing" element={<Navigate to="/es/landing" replace />} />
        <Route path="/:lang/landing" element={<LandingDesignRoute />} />
        <Route path="/capital" element={<LandingCapitalPage />} />
        <Route path="/:lang/capital" element={<CapitalLandingRoute />} />
        <Route path="*" element={<Navigate to="/es" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
