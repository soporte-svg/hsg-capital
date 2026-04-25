import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { LandingCapitalPage } from './pages/LandingCapitalPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route path="/es" element={<LandingPage lang="es" />} />
        <Route path="/en" element={<LandingPage lang="en" />} />
        <Route path="/capital" element={<LandingCapitalPage />} />
        <Route path="*" element={<Navigate to="/es" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
