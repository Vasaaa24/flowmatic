export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-sm font-medium">Rezervační systém nové generace</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
          Automatizujte své{' '}
          <span className="text-gold">rezervace.</span>
          <br />
          Zvyšte své{' '}
          <span className="text-gold">zisky.</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Rezervační systém pro jakýkoliv byznys — kadeřnictví, klinika, studio, posilovna a další.
          Nastavíme ho přesně pro vaše odvětví a přidáme funkce podle vašich požadavků.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#client"
            className="group inline-flex items-center justify-center gap-2 bg-gold text-dark font-bold text-lg px-8 py-4 rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-105 shadow-lg shadow-gold/20"
          >
            Chci vidět, jak to funguje
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

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: '24/7', label: 'Dostupnost' },
            { value: '3x', label: 'Kliknutí' },
            { value: '1 týden', label: 'Nasazení' },
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
