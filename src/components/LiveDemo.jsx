import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'

const DEMO_URL = 'https://valton.cloud'

export default function LiveDemo() {
  const ref = useReveal()
  const { t } = useLanguage()

  return (
    <section id="demo" className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-3xl mx-auto">
        <div className="fx-reveal fx-d-1 fx-trace-border card rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('demo', 'h1')}{' '}
            <span className="text-grad-gold">{t('demo', 'h2')}</span>
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
            {t('demo', 'p')}
          </p>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full"
          >
            {t('demo', 'openBtn')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
          <p className="text-white/40 text-sm mt-4">{t('demo', 'note')}</p>

          <div className="divider-fade max-w-xs mx-auto mt-8 mb-6" />
          <p className="text-white/50 text-sm leading-relaxed max-w-md mx-auto">
            {t('demo', 'template')}{' '}
            <Link to="/cenik" className="text-gold font-medium hover:underline underline-offset-4">
              {t('demo', 'contactLink')}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
