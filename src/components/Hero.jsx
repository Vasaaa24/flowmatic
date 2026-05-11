import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useParallax } from '../hooks/useParallax'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const { t } = useLanguage()
  const rootRef = useRef(null)
  const orbRef = useParallax(-0.25)

  // Reveal everything on mount — Hero is above the fold.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      el.querySelectorAll('.fx-reveal').forEach((n) => n.classList.add('is-visible'))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={orbRef} className="parallax-centered absolute top-1/4 left-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div ref={rootRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="fx-reveal inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-sm font-medium">{t('hero', 'badge')}</span>
        </div>

        <h1 className="fx-reveal fx-d-1 text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
          {t('hero', 'h1a')}{' '}
          <span className="text-gold">{t('hero', 'h1b')}</span>
          <br />
          {t('hero', 'h1c')}{' '}
          <span className="text-gold">{t('hero', 'h1d')}</span>
        </h1>

        <p className="fx-reveal fx-d-2 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero', 'p')}
        </p>

        <div className="fx-reveal fx-d-3 flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton
            href="#client"
            className="group inline-flex items-center justify-center gap-2 bg-gold text-dark font-bold text-lg px-8 py-4 rounded-full hover:bg-gold-light shadow-lg shadow-gold/20"
          >
            {t('hero', 'btn')}
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </MagneticButton>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
          {[
            { value: t('hero', 'stat1val'), label: t('hero', 'stat1') },
            { value: t('hero', 'stat2val'), label: t('hero', 'stat2') },
            { value: t('hero', 'stat3val'), label: t('hero', 'stat3') },
          ].map((stat, i) => (
            <div key={stat.label} className={`fx-reveal fx-d-${4 + i}`}>
              <div className="text-xl sm:text-3xl font-bold text-gold whitespace-nowrap">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
