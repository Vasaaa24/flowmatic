import Hero from '../components/Hero'
import Problem from '../components/Problem'
import ClientExperience from '../components/ClientExperience'
import Admin from '../components/Admin'
import AppPreview from '../components/AppPreview'
import ValueProposition from '../components/ValueProposition'
import Pricing from '../components/Pricing'
import Reviews from '../components/Reviews'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <ClientExperience />
      <Admin />
      <AppPreview />
      <ValueProposition />
      <Reviews />
      <Pricing />
    </>
  )
}
