import { useEffect, useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import ClientExperience from './components/ClientExperience'
import Admin from './components/Admin'
import AppPreview from './components/AppPreview'
import ValueProposition from './components/ValueProposition'
import Pricing from './components/Pricing'
import Websites from './components/Websites'
import Design from './components/Design'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [dismiss, setDismiss] = useState(false)

  // Dismiss intro after 2s — no scroll lock, app is already usable
  useEffect(() => {
    const t = setTimeout(() => setDismiss(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <LanguageProvider>
      <Intro dismiss={dismiss} />
      <div className="min-h-screen bg-dark text-white overflow-x-hidden">
        <Navbar />
        <Hero />
        <Problem />
        <ClientExperience />
        <Admin />
        <AppPreview />
        <ValueProposition />
        <Pricing />
        <Websites />
        <Design />
        <Reviews />
        <Contact />
        <Footer />
      </div>
    </LanguageProvider>
  )
}
