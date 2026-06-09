import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'
import MagneticButton from './MagneticButton'
import SplitText from './SplitText'

export default function Pricing() {
  const ref = useReveal()
  const { t } = useLanguage()

  const included = [
    t('pricing', 'f1'), t('pricing', 'f2'), t('pricing', 'f3'), t('pricing', 'f4'),
    t('pricing', 'f5'), t('pricing', 'f6'), t('pricing', 'f7'), t('pricing', 'f8'),
  ]

  return (
    <section id="pricing" className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <SplitText>{t('pricing', 'h1')}</SplitText>
            <br />
            <SplitText delay={200}><span className="text-gold">{t('pricing', 'h2')}</span></SplitText>
          </h2>
          <p className="fx-reveal fx-d-1 text-white/50 text-lg">{t('pricing', 'p')}</p>
        </div>

        <div className="fx-reveal fx-d-2 fx-trace-border relative bg-dark-card border border-white/5 rounded-3xl p-8 sm:p-10">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-dark text-sm font-bold px-5 py-1.5 rounded-full whitespace-nowrap">
            {t('pricing', 'badge')}
          </div>

          <div className="mb-8 pt-2">
            <div className="flex flex-col sm:flex-row sm:divide-x divide-white/10 gap-6 sm:gap-0 text-center">
              <div className="fx-reveal fx-d-3 sm:px-6 sm:flex-1">
                <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-2">{t('pricing', 'month0')}</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gold">{t('pricing', 'month0val')}</span>
                </div>
                <div className="text-xs text-white/40 mt-1">{t('pricing', 'month0note')}</div>
              </div>
              <div className="fx-reveal fx-d-4 sm:px-6 sm:flex-1">
                <div className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-2">{t('pricing', 'monthReg')}</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-white">999</span>
                  <span className="text-lg text-white/50">Kč</span>
                </div>
              </div>
            </div>
            <div className="fx-line fx-d-5 mt-6 mx-auto h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <p className="text-white/40 text-sm mt-4 text-center">{t('pricing', 'note')}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {included.map((feature, i) => (
              <div key={i} className={`fx-reveal fx-d-${Math.min(6, 3 + Math.floor(i / 2))} flex items-center gap-3`}>
                <svg className="w-5 h-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span className="text-sm text-white/70">{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <MagneticButton
              href="https://wa.me/420776282628?text=Mám%20zájem%20o%20demo%20Valton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-dark font-bold text-lg px-10 py-4 rounded-full hover:bg-gold-light shadow-lg shadow-gold/20"
            >
              {t('pricing', 'cta')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </MagneticButton>
            <p className="text-white/30 text-xs mt-4">{t('pricing', 'ctaNote')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
