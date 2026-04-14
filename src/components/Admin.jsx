import { useInView } from '../hooks/useInView'

function DashboardMockup({ isInView }) {
  const appointments = [
    { time: '9:00', name: 'Jan Novak', service: 'Strih', barber: 'Martin', color: 'bg-gold/20 border-gold/30' },
    { time: '9:30', name: 'Petr Svoboda', service: 'Brada', barber: 'Jakub', color: 'bg-blue-500/20 border-blue-500/30' },
    { time: '10:00', name: 'Lukas Dvorak', service: 'Strih + Brada', barber: 'Martin', color: 'bg-gold/20 border-gold/30' },
    { time: '10:30', name: 'Ondrej Cerny', service: 'Royal balicek', barber: 'Tomas', color: 'bg-purple-500/20 border-purple-500/30' },
    { time: '11:00', name: 'Adam Horak', service: 'Strih', barber: 'Pavel', color: 'bg-green-500/20 border-green-500/30' },
  ]

  return (
    <div
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: '200ms' }}
    >
      {/* Laptop frame */}
      <div className="relative max-w-3xl mx-auto">
        <div className="bg-dark-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-dark-lighter border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 text-center text-xs text-white/30">admin.flowmatic.cz</div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 sm:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-lg font-semibold">Dnesni agenda</h4>
                <p className="text-sm text-white/40">Streda, 16. dubna 2026</p>
              </div>
              <div className="bg-gold/10 text-gold text-sm font-medium px-3 py-1 rounded-full">
                12 rezervaci
              </div>
            </div>

            {/* Appointments list */}
            <div className="space-y-2">
              {appointments.map((apt, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border ${apt.color}`}>
                  <div className="text-sm font-mono text-white/50 w-12">{apt.time}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{apt.name}</div>
                    <div className="text-xs text-white/40">{apt.service}</div>
                  </div>
                  <div className="text-xs text-white/30 hidden sm:block">{apt.barber}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsMockup({ isInView }) {
  const bars = [65, 80, 45, 90, 75, 60, 85]
  const days = ['Po', 'Ut', 'St', 'Ct', 'Pa', 'So', 'Ne']

  return (
    <div
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: '400ms' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mt-6">
        {/* Revenue card */}
        <div className="bg-dark-card border border-white/10 rounded-2xl p-5">
          <div className="text-sm text-white/40 mb-1">Trzby tento tyden</div>
          <div className="text-2xl font-bold text-gold mb-4">32 450 Kc</div>
          <div className="flex items-end gap-2 h-24">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gold/20 rounded-t-md transition-all duration-1000"
                  style={{
                    height: isInView ? `${h}%` : '0%',
                    transitionDelay: `${600 + i * 100}ms`,
                  }}
                />
                <span className="text-[10px] text-white/30">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Utilization card */}
        <div className="bg-dark-card border border-white/10 rounded-2xl p-5">
          <div className="text-sm text-white/40 mb-1">Vytizenost</div>
          <div className="text-2xl font-bold text-gold mb-4">87%</div>
          <div className="space-y-3">
            {[
              { name: 'Martin', pct: 92 },
              { name: 'Jakub', pct: 85 },
              { name: 'Tomas', pct: 88 },
              { name: 'Pavel', pct: 78 },
            ].map((barber) => (
              <div key={barber.name} className="flex items-center gap-3">
                <span className="text-xs text-white/50 w-12">{barber.name}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gold/60 rounded-full transition-all duration-1000"
                    style={{
                      width: isInView ? `${barber.pct}%` : '0%',
                      transitionDelay: '800ms',
                    }}
                  />
                </div>
                <span className="text-xs text-white/40">{barber.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [ref, isInView] = useInView()

  return (
    <section id="admin" className="py-24 sm:py-32 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Kontrola pro vas <span className="text-gold">byznys.</span>
          </h2>
          <p className="text-white/50 text-lg">Vsechno na jednom miste, prehledne a intuitivne.</p>
        </div>

        <DashboardMockup isInView={isInView} />
        <StatsMockup isInView={isInView} />

        <p
          className={`text-center text-white/40 text-lg mt-8 transition-all duration-700 ${
            isInView ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          Kompletni sprava salonu <span className="text-gold font-semibold">ve vasi kapse.</span>
        </p>
      </div>
    </section>
  )
}
