import { useEffect, useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { useLenis } from './hooks/useLenis'
import Intro from './components/Intro'
import AmbientBackground from './components/AmbientBackground'
import CursorSpotlight from './components/CursorSpotlight'
import ScrollProgress from './components/ScrollProgress'
import FlyThroughDivider from './components/FlyThroughDivider'
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

function MainApp() {
  useLenis()
  return (
    <>
      <AmbientBackground />
      <CursorSpotlight />
      <ScrollProgress />
      <div className="min-h-screen bg-dark text-white overflow-x-hidden">
        <Navbar />
        <Hero />
        <FlyThroughDivider variant="line" />
        <Problem />
        <FlyThroughDivider variant="plus" />
        <ClientExperience />
        <FlyThroughDivider variant="diamond" />
        <Admin />
        <FlyThroughDivider variant="arrow" />
        <AppPreview />
        <ValueProposition />
        <FlyThroughDivider variant="ring" />
        <Pricing />
        <Websites />
        <FlyThroughDivider variant="diamond" />
        <Design />
        <Reviews />
        <FlyThroughDivider variant="ring" />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  const [contentReady, setContentReady] = useState(false)

  // Mount the heavy app tree only after intro finishes, so intro
  // animations don't compete with React render / canvas RAF / observers.
  useEffect(() => {
    const t = setTimeout(() => setContentReady(true), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <LanguageProvider>
      <Intro />
      {contentReady && <MainApp />}
    </LanguageProvider>
  )
}
