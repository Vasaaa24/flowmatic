import { LanguageProvider } from './context/LanguageContext'
import { useLenis } from './hooks/useLenis'
import Intro from './components/Intro'
import AmbientBackground from './components/AmbientBackground'
import CursorSpotlight from './components/CursorSpotlight'
import ScrollProgress from './components/ScrollProgress'
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
  useLenis()

  return (
    <LanguageProvider>
      <Intro />
      <AmbientBackground />
      <CursorSpotlight />
      <ScrollProgress />
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
