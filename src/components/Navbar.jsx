import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function LangSwitch() {
  const { lang, setLang } = useLanguage()
  return (
    <div className="relative">
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="appearance-none bg-white/5 border border-white/15 rounded-xl pl-3 pr-8 py-2 text-sm text-white/80 focus:outline-none focus:border-gold/50 cursor-pointer w-full"
      >
        <option value="cs" className="bg-[#111]">Čeština</option>
        <option value="uk" className="bg-[#111]">Українська</option>
      </select>
      <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLanguage()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const pages = [
    { to: '/',       label: 'Rezervace' },
    { to: '/weby',   label: 'Weby' },
    { to: '/design', label: 'Design' },
    { to: '/cenik',  label: 'Kontakt' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="group flex items-center gap-2 text-2xl font-bold tracking-tight">
          <svg
            className="w-5 h-5 text-gold transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 14 L14 6" />
            <path d="M7 6 L14 6 L14 13" />
          </svg>
          <span><span className="text-gold">VAL</span>TON</span>
        </NavLink>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {pages.map((p) => (
            <NavLink
              key={p.to}
              to={p.to}
              end={p.to === '/'}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${isActive ? 'text-gold font-semibold' : 'text-white/70 hover:text-gold'}`
              }
            >
              {p.label}
            </NavLink>
          ))}
          <LangSwitch />
          <NavLink
            to="/cenik"
            className="bg-gold text-dark font-semibold text-sm px-5 py-2 rounded-full hover:bg-gold-light transition-colors duration-200"
          >
            {t('nav', 'cta')}
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-card/95 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {pages.map((p) => (
              <NavLink
                key={p.to}
                to={p.to}
                end={p.to === '/'}
                className={({ isActive }) =>
                  `transition-colors text-base ${isActive ? 'text-gold font-semibold' : 'text-white/70 hover:text-gold'}`
                }
              >
                {p.label}
              </NavLink>
            ))}
            <LangSwitch />
            <NavLink
              to="/cenik"
              className="bg-gold text-dark font-semibold text-center px-5 py-2.5 rounded-full"
            >
              {t('nav', 'cta')}
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}
