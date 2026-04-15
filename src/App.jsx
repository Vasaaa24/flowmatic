import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import ClientExperience from './components/ClientExperience'
import Admin from './components/Admin'
import AppPreview from './components/AppPreview'
import ValueProposition from './components/ValueProposition'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Problem />
      <ClientExperience />
      <Admin />
      <AppPreview />
      <ValueProposition />
      <Pricing />
      <Footer />
    </div>
  )
}
