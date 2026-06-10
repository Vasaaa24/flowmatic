import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import SplitText from './SplitText'

export default function Hero() {
  const { t } = useLanguage()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const id = requestAnimationFrame(() => {
      el.querySelectorAll('.fx-reveal').forEach((n) => n.classList.add('is-visible'))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 sm:pt-24 pb-10 sm:pb-16"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-grid absolute inset-0" />
        <div className="hidden sm:block absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[80px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="fx-reveal inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-sm font-medium">{t('hero', 'badge')}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5 tracking-tight">
          <SplitText stagger={26}>
            {t('hero', 'h1a')}{' '}
          </SplitText>
          <SplitText stagger={26} delay={180}>
            <span className="text-gold">{t('hero', 'h1b')}</span>
          </SplitText>
          <br />
          <SplitText stagger={26} delay={380}>
            {t('hero', 'h1c')}{' '}
          </SplitText>
          <SplitText stagger={26} delay={520}>
            <span className="text-gold">{t('hero', 'h1d')}</span>
          </SplitText>
        </h1>

        <p className="fx-reveal fx-d-2 text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t('hero', 'p')}
        </p>

        <div className="fx-reveal fx-d-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/cenik"
            className="btn-gold inline-flex items-center justify-center gap-2 font-bold text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full"
          >
            {t('hero', 'btn')}
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto">
          {[
            { value: t('hero', 'stat1val'), label: t('hero', 'stat1') },
            { value: t('hero', 'stat2val'), label: t('hero', 'stat2') },
            { value: t('hero', 'stat3val'), label: t('hero', 'stat3') },
          ].map((stat, i) => (
            <div key={stat.label} className={`fx-reveal fx-d-${4 + i}`}>
              <div className="text-lg sm:text-3xl font-bold text-grad-gold whitespace-nowrap">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="fx-reveal fx-d-6 flex justify-center mt-10 sm:mt-14">
          {/* Mobile: bouncing arrow */}
          <a href="#problem" aria-label="Scroll" className="sm:hidden flex flex-col items-center gap-1 text-gold/80">
            <svg className="w-7 h-7 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
          {/* Desktop: mouse indicator */}
          <div className="hidden sm:flex w-6 h-10 rounded-full border-2 border-white/15 justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-gold/70 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
