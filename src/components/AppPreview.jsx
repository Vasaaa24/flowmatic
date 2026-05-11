import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'

const CANVA_URL = 'https://www.canva.com/design/DAHFbrBFBqw/rjuRPHL0xc7nLzp98B4CVw/view'
const CANVA_EMBED = `${CANVA_URL}?embed`

export default function AppPreview() {
  const ref = useReveal()
  const { t } = useLanguage()

  return (
    <section id="preview" className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="fx-reveal text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('preview', 'h1')}{' '}
            <span className="text-gold">{t('preview', 'h2')}</span>
          </h2>
          <p className="fx-reveal fx-d-1 text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t('preview', 'p')}
          </p>
        </div>

        {/* Desktop embed */}
        <div className="fx-reveal fx-d-2 hidden sm:block relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-dark-card"
          style={{ paddingBottom: '56.25%', height: 0 }}
        >
          <iframe
            src={CANVA_EMBED}
            allowFullScreen
            allow="fullscreen"
            title="Příklad aplikace Valton"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
          />
          <a
            href={CANVA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute inset-0 flex items-end justify-end p-4"
            aria-label={t('preview', 'openBtn')}
          >
            <span className="inline-flex items-center gap-2 bg-dark/80 backdrop-blur-md border border-gold/40 text-gold text-sm font-medium px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              {t('preview', 'openBtn')}
            </span>
          </a>
        </div>

        {/* Mobile */}
        <div className="sm:hidden flex flex-col items-center gap-6 py-8">
          <div className="fx-reveal fx-d-2 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-dark-card w-full"
            style={{ paddingBottom: '75%', height: 0 }}
          >
            <iframe
              src={CANVA_EMBED}
              allowFullScreen
              allow="fullscreen"
              title="Příklad aplikace Valton"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', pointerEvents: 'none' }}
            />
          </div>
          <a
            href={CANVA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold/40 text-gold text-sm font-medium px-6 py-3 rounded-full hover:bg-gold/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            {t('preview', 'openBtn')}
          </a>
        </div>
      </div>
    </section>
  )
}
