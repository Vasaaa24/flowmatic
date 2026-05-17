import { useEffect, useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { useLenis } from './hooks/useLenis'
import Intro from './components/Intro'
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

function MainApp({ onReady }) {
  useLenis()

  // Signal "ready" once mounted + fonts loaded + 2 RAF frames painted.
  useEffect(() => {
    let cancelled = false
    Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
    ]).then(() => {
      if (!cancelled) onReady?.()
    })
    return () => { cancelled = true }
  }, [onReady])

  return (
    <>
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
  // 1) Play intro alone for a minimum window (no competition for CPU)
  // 2) Mount MainApp behind intro
  // 3) When MainApp signals ready, fade intro out
  const [mountMain, setMountMain] = useState(false)
  const [mainReady, setMainReady] = useState(false)
  const [dismissIntro, setDismissIntro] = useState(false)

  // Start mounting the rest of the app after intro's reveal animations finish.
  useEffect(() => {
    const t = setTimeout(() => setMountMain(true), 1700)
    return () => clearTimeout(t)
  }, [])

  // Once app is rendered, tell intro to fade out.
  useEffect(() => {
    if (mainReady) setDismissIntro(true)
  }, [mainReady])

  // Safety net: never let intro linger more than 8 s, even if something stalls.
  useEffect(() => {
    const t = setTimeout(() => setDismissIntro(true), 8000)
    return () => clearTimeout(t)
  }, [])

  return (
    <LanguageProvider>
      <Intro dismiss={dismissIntro} />
      {mountMain && <MainApp onReady={() => setMainReady(true)} />}
    </LanguageProvider>
  )
}
