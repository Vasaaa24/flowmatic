import { useInView } from '../hooks/useInView'

export default function Pricing() {
  const [ref, isInView] = useInView()

  const included = [
    'Rezervační systém na míru',
    'Vlastní brand a barvy',
    'Admin panel s dashboardem',
    'Statistiky a reporty',
    'SMS/email připomínky',
    'Neomezený počet rezervací',
    'Technická podpora',
    'Nastavení a konfigurace',
  ]

  return (
    <section id="pricing" className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-3xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Průhledná cena
            <br />
            <span className="text-gold">bez závazků.</span>
          </h2>
          <p className="text-white/50 text-lg">Žádné skryté poplatky. Zrušit můžete kdykoliv.</p>
        </div>

        {/* Pricing card */}
        <div
          className={`relative bg-dark-card border border-gold/20 rounded-3xl p-8 sm:p-10 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-dark text-sm font-bold px-5 py-1.5 rounded-full">
            Zaváděcí nabídka
          </div>

          <div className="mb-8 pt-2">
            <div className="grid grid-cols-2 divide-x divide-white/10 text-center">
              <div className="pr-6">
                <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-2">1. měsíc</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-gold">999</span>
                  <span className="text-base text-white/50">Kč</span>
                </div>
              </div>
              <div className="pl-6">
                <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">Poté každý měsíc</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-white">1 900</span>
                  <span className="text-base text-white/50">Kč</span>
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm mt-4 text-center">včetně nastavení, konfigurace a celodenní podpory</p>
          </div>

          {/* Features list */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {included.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                <span className="text-sm text-white/70">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://wa.me/420776282628?text=Mám%20zájem%20o%20demo%20Valton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-dark font-bold text-lg px-10 py-4 rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 shadow-lg shadow-gold/20"
            >
              Získat demo zdarma
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <p className="text-white/30 text-xs mt-4">Bez závazků. Odpovíme do 24 hodin.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
