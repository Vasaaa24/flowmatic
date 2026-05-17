import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'
import TiltCard from './TiltCard'
import SplitText from './SplitText'

/* ─── Visual mockups shown inside each card ─── */

function LogoPreview() {
  return (
    <div className="flex-1 min-h-[260px] rounded-xl overflow-hidden border border-white/8">
      <img
        src="/logo-preview.png"
        alt="Valton logo preview"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function BrandPreview() {
  const swatches = ['#FFC107', '#0d0d0d', '#ffffff', '#7a6e4a']
  return (
    <div className="relative h-24 sm:h-28 rounded-xl bg-dark p-3 flex flex-col justify-between overflow-hidden border border-white/5">
      <div className="flex gap-1.5">
        {swatches.map((c, i) => (
          <div
            key={i}
            className="flex-1 h-5 rounded-sm shadow-inner shadow-black/30"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-serif italic text-2xl text-gold leading-none">Aa</span>
        <span className="font-sans font-bold text-base text-white leading-none">Bb</span>
        <span className="font-mono text-xs text-white/50 leading-none">— 01</span>
      </div>
    </div>
  )
}

function GraphicPreview() {
  return (
    <div className="relative h-24 sm:h-28 rounded-xl bg-dark p-3 flex items-center gap-2 overflow-hidden border border-white/5">
      {/* Business card mock */}
      <div className="w-12 h-16 rounded-sm bg-gradient-to-br from-gold/80 to-gold-dark p-1.5 shrink-0 shadow-lg shadow-gold/20">
        <div className="w-1.5 h-1.5 rounded-full bg-dark mb-1" />
        <div className="h-0.5 w-6 bg-dark/70 mb-0.5" />
        <div className="h-0.5 w-4 bg-dark/50" />
      </div>
      {/* Flyer mock */}
      <div className="flex-1 h-16 rounded-sm bg-dark-card border border-white/10 p-1.5 flex flex-col gap-1">
        <div className="h-1 w-3/4 bg-gold/70 rounded-full" />
        <div className="h-0.5 w-full bg-white/20 rounded-full" />
        <div className="h-0.5 w-5/6 bg-white/15 rounded-full" />
        <div className="h-0.5 w-2/3 bg-white/15 rounded-full" />
        <div className="mt-auto h-1.5 w-8 rounded-full bg-gold/80" />
      </div>
      {/* Social post mock */}
      <div className="w-12 h-16 rounded-sm bg-gradient-to-br from-dark-card to-dark border border-gold/20 p-1.5 shrink-0 flex flex-col items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-gold mb-1" />
        <div className="h-0.5 w-6 bg-white/30 rounded-full" />
      </div>
    </div>
  )
}

export default function Design() {
  const ref = useReveal()
  const { t } = useLanguage()

  return (
    <section id="design" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[100px]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="fx-reveal inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
            <svg className="w-3.5 h-3.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-gold uppercase tracking-wider">Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <SplitText>{t('design', 'h1')}</SplitText>
            <br />
            <SplitText delay={200}><span className="text-gold">{t('design', 'h2')}</span></SplitText>
          </h2>
          <p className="fx-reveal fx-d-1 text-white/50 text-lg max-w-2xl mx-auto">{t('design', 'p')}</p>
        </div>

        {/* Asymmetric grid: hero logo card (3) + stacked column (2) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          <TiltCard className="fx-reveal fx-d-2 fx-glow-hover group lg:col-span-3 lg:row-span-2 bg-dark-card border border-white/5 rounded-3xl p-6 sm:p-8 hover:border-gold/20 flex flex-col">
            <LogoPreview />
            <div className="mt-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{t('design', 'f1title')}</h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">{t('design', 'f1text')}</p>
            </div>
          </TiltCard>

          <TiltCard className="fx-reveal fx-d-3 fx-glow-hover group lg:col-span-2 bg-dark-card border border-white/5 rounded-3xl p-6 hover:border-gold/20">
            <BrandPreview />
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-1">{t('design', 'f2title')}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t('design', 'f2text')}</p>
            </div>
          </TiltCard>

          <TiltCard className="fx-reveal fx-d-4 fx-glow-hover group lg:col-span-2 bg-dark-card border border-white/5 rounded-3xl p-6 hover:border-gold/20">
            <GraphicPreview />
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-1">{t('design', 'f3title')}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{t('design', 'f3text')}</p>
            </div>
          </TiltCard>
        </div>

        <div className="fx-reveal fx-d-5 fx-trace-border relative overflow-hidden bg-dark-card border border-white/5 rounded-3xl p-8 sm:p-10 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,193,7,0.06),transparent_70%)] pointer-events-none" />
          <div className="relative">
            <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-3">
              {t('design', 'priceLabel')}
            </div>
            <p className="text-xl sm:text-2xl font-semibold mb-3">{t('design', 'priceText')}</p>
            <p className="text-white/50 text-sm mb-6 max-w-xl mx-auto">{t('design', 'priceNote')}</p>
            <Link
              to="/cenik"
              className="inline-flex items-center gap-2 bg-gold text-dark font-bold px-8 py-3.5 rounded-full hover:bg-gold-light transition-colors shadow-lg shadow-gold/20"
            >
              {t('design', 'cta')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
