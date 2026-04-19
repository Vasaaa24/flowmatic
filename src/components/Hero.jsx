import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-sm font-medium">{t('hero', 'badge')}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
          {t('hero', 'h1a')}{' '}
          <span className="text-gold">{t('hero', 'h1b')}</span>
          <br />
          {t('hero', 'h1c')}{' '}
          <span className="text-gold">{t('hero', 'h1d')}</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero', 'p')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#client"
            className="group inline-flex items-center justify-center gap-2 bg-gold text-dark font-bold text-lg px-8 py-4 rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 shadow-lg shadow-gold/20"
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
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: t('hero', 'stat1val'), label: t('hero', 'stat1') },
            { value: t('hero', 'stat2val'), label: t('hero', 'stat2') },
            { value: t('hero', 'stat3val'), label: t('hero', 'stat3') },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-bold text-gold">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
