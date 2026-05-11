import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'
import MagneticButton from './MagneticButton'
import TiltCard from './TiltCard'

const icons = [
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>,
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
  </svg>,
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zM12 6.75A2.25 2.25 0 119.75 4.5 2.25 2.25 0 0112 6.75zM4.875 11.25a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25zM19.5 11.25a2.625 2.625 0 100-5.25 2.625 2.625 0 000 5.25zM16.5 17.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>,
]

export default function Design() {
  const ref = useReveal()
  const { t } = useLanguage()

  const features = [
    { icon: icons[0], title: t('design', 'f1title'), text: t('design', 'f1text') },
    { icon: icons[1], title: t('design', 'f2title'), text: t('design', 'f2text') },
    { icon: icons[2], title: t('design', 'f3title'), text: t('design', 'f3text') },
  ]

  return (
    <section id="design" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="fx-reveal text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('design', 'h1')}
            <br />
            <span className="text-gold">{t('design', 'h2')}</span>
          </h2>
          <p className="fx-reveal fx-d-1 text-white/50 text-lg max-w-2xl mx-auto">{t('design', 'p')}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <TiltCard
              key={i}
              className={`fx-reveal fx-d-${i + 2} fx-glow-hover group bg-dark-card border border-white/5 rounded-2xl p-6 hover:border-gold/20`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold/10 text-gold mb-4 group-hover:bg-gold/20 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{feature.text}</p>
            </TiltCard>
          ))}
        </div>

        <div className="fx-reveal fx-d-5 fx-trace-border bg-dark-card border border-white/5 rounded-3xl p-8 sm:p-10 text-center">
          <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-3">
            {t('design', 'priceLabel')}
          </div>
          <p className="text-xl sm:text-2xl font-semibold mb-3">{t('design', 'priceText')}</p>
          <p className="text-white/50 text-sm mb-6 max-w-xl mx-auto">{t('design', 'priceNote')}</p>
          <MagneticButton
            href="#contact"
            className="inline-flex items-center gap-2 bg-gold text-dark font-bold px-8 py-3.5 rounded-full hover:bg-gold-light shadow-lg shadow-gold/20"
          >
            {t('design', 'cta')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
