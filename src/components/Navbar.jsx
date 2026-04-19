import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#problem', label: t('nav', 'about') },
    { href: '#client',  label: t('nav', 'clients') },
    { href: '#admin',   label: t('nav', 'admin') },
    { href: '#preview', label: t('nav', 'preview') },
    { href: '#value',   label: t('nav', 'value') },
    { href: '#pricing', label: t('nav', 'pricing') },
    { href: '#contact', label: t('nav', 'contact') },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-bold tracking-tight">
          <span className="text-gold">VAL</span>TON
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <button
            onClick={() => setLang(lang === 'cs' ? 'uk' : 'cs')}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors border border-white/10 rounded-full px-3 py-1 hover:border-white/30"
            aria-label="Přepnout jazyk"
          >
            {lang === 'cs' ? '🇨🇿 CZ' : '🇺🇦 UA'}
          </button>

          <a
            href="#contact"
            className="bg-gold text-dark font-semibold text-sm px-5 py-2 rounded-full hover:bg-gold-light transition-colors duration-200"
          >
            {t('nav', 'cta')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-dark-card/95 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-gold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile language switcher */}
            <button
              onClick={() => { setLang(lang === 'cs' ? 'uk' : 'cs'); setMenuOpen(false) }}
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-left"
            >
              {lang === 'cs' ? '🇺🇦 Українська' : '🇨🇿 Čeština'}
            </button>

            <a
              href="#contact"
              className="bg-gold text-dark font-semibold text-center px-5 py-2.5 rounded-full"
              onClick={() => setMenuOpen(false)}
            >
              {t('nav', 'cta')}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
