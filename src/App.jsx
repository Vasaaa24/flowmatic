import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import WebsitesPage from './pages/WebsitesPage'
import DesignPage from './pages/DesignPage'
import PricingPage from './pages/PricingPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Layout() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/weby" element={<WebsitesPage />} />
        <Route path="/design" element={<DesignPage />} />
        <Route path="/cenik" element={<PricingPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  const [dismiss, setDismiss] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDismiss(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Intro dismiss={dismiss} />
        <Layout />
      </BrowserRouter>
    </LanguageProvider>
  )
}
