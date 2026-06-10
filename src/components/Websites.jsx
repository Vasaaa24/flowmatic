import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'
import TiltCard from './TiltCard'
import SplitText from './SplitText'

const icons = [
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
  </svg>,
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3.375 3.375 0 00-3 3.285m18-3.285A3.375 3.375 0 0119.5 17.535m-15-3.285l1.179-4.456m13.642 4.456l.713-2.69a48.077 48.077 0 00.422-1.886m-14.777 4.576h13.642m-13.642 0L5.106 5.272m14.777 4.576a48.62 48.62 0 00-1.176-1.886M6.106 5.272h13.83a.75.75 0 01.736.91L19.49 9.848M9.75 21a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm9 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>,
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
]

export default function Websites() {
  const ref = useReveal()
  const { t } = useLanguage()

  const features = [
    { icon: icons[0], title: t('websites', 'f1title'), text: t('websites', 'f1text') },
    { icon: icons[1], title: t('websites', 'f2title'), text: t('websites', 'f2text') },
    { icon: icons[2], title: t('websites', 'f3title'), text: t('websites', 'f3text') },
  ]

  return (
    <section id="websites" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <SplitText>{t('websites', 'h1')}</SplitText>
            <br />
            <SplitText delay={200}><span className="text-gold">{t('websites', 'h2')}</span></SplitText>
          </h2>
          <p className="fx-reveal fx-d-1 text-white/50 text-sm sm:text-lg max-w-2xl mx-auto">{t('websites', 'p')}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {features.map((feature, i) => (
            <TiltCard
              key={i}
              className={`fx-reveal fx-d-${i + 2} card group rounded-2xl p-4 sm:p-6`}
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
            {t('websites', 'priceLabel')}
          </div>
          <p className="text-xl sm:text-2xl font-semibold mb-3">{t('websites', 'priceText')}</p>
          <p className="text-white/50 text-sm mb-6 max-w-xl mx-auto">{t('websites', 'priceNote')}</p>
          <Link
            to="/cenik"
            className="btn-gold inline-flex items-center gap-2 font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full"
          >
            {t('websites', 'cta')}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
