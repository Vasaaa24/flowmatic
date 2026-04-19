import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

function PhoneMockup({ children, delay = 0, isInView }) {
  return (
    <div
      className={`transition-all duration-700 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative mx-auto w-[240px] sm:w-[260px]">
        <div className="relative bg-dark-card border-2 border-white/10 rounded-[2.5rem] p-3 shadow-2xl shadow-black/50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-dark-card rounded-b-2xl z-10 border-b-2 border-x-2 border-white/10" />
          <div className="bg-dark rounded-[2rem] overflow-hidden pt-8 pb-6 px-4 min-h-[380px] flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceItem({ name, duration, price, icon, selected }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl mb-2 transition-all ${
        selected ? 'bg-gold/15 border border-gold/30' : 'bg-white/5 border border-transparent'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1 text-left">
        <div className={`text-sm font-medium ${selected ? 'text-gold' : 'text-white'}`}>{name}</div>
        <div className="text-xs text-white/40">{duration}</div>
      </div>
      <div className="text-sm font-semibold text-white/70">{price}</div>
      {selected && (
        <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
        </svg>
      )}
    </div>
  )
}

function BarberItem({ name, rating, selected }) {
  return (
    <div
      className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
        selected ? 'bg-gold/15 border border-gold/30' : 'bg-white/5 border border-transparent'
      }`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold ${
        selected ? 'bg-gold text-dark' : 'bg-dark-lighter text-white/60'
      }`}>
        {name[0]}
      </div>
      <div className={`text-sm font-medium ${selected ? 'text-gold' : 'text-white/70'}`}>{name}</div>
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-3 h-3 ${i < rating ? 'text-gold' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    </div>
  )
}

function TimeSlot({ time, selected }) {
  return (
    <div
      className={`py-2 px-3 rounded-lg text-center text-sm font-medium transition-all ${
        selected ? 'bg-gold text-dark' : 'bg-white/5 text-white/60 border border-white/10'
      }`}
    >
      {time}
    </div>
  )
}

export default function ClientExperience() {
  const [ref, isInView] = useInView()
  const { t } = useLanguage()

  return (
    <section id="client" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('client', 'h1')} <span className="text-gold">{t('client', 'h2')}</span>
          </h2>
          <p className="text-white/50 text-lg">{t('client', 'p')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <PhoneMockup delay={100} isInView={isInView}>
            <div className="text-center mb-4">
              <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">{t('client', 'step1')}</div>
              <div className="text-base font-semibold">{t('client', 'step1label')}</div>
            </div>
            <ServiceItem icon="✂️" name={t('client', 's1')} duration={t('client', 's1d')} price={t('client', 's1p')} selected />
            <ServiceItem icon="🧔" name={t('client', 's2')} duration={t('client', 's2d')} price={t('client', 's2p')} selected={false} />
            <ServiceItem icon="💈" name={t('client', 's3')} duration={t('client', 's3d')} price={t('client', 's3p')} selected={false} />
            <ServiceItem icon="🧖" name={t('client', 's4')} duration={t('client', 's4d')} price={t('client', 's4p')} selected={false} />
          </PhoneMockup>

          <PhoneMockup delay={300} isInView={isInView}>
            <div className="text-center mb-4">
              <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">{t('client', 'step2')}</div>
              <div className="text-base font-semibold">{t('client', 'step2label')}</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <BarberItem name="Martin" rating={5} selected />
              <BarberItem name="Jakub" rating={4} selected={false} />
              <BarberItem name="Tomáš" rating={5} selected={false} />
              <BarberItem name="Pavel" rating={4} selected={false} />
            </div>
          </PhoneMockup>

          <PhoneMockup delay={500} isInView={isInView}>
            <div className="text-center mb-4">
              <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">{t('client', 'step3')}</div>
              <div className="text-base font-semibold">{t('client', 'step3label')}</div>
            </div>
            <div className="text-sm text-white/40 text-center mb-3">{t('client', 'date')}</div>
            <div className="grid grid-cols-3 gap-2">
              <TimeSlot time="9:00" />
              <TimeSlot time="9:30" />
              <TimeSlot time="10:00" selected />
              <TimeSlot time="10:30" />
              <TimeSlot time="11:00" />
              <TimeSlot time="11:30" />
              <TimeSlot time="13:00" />
              <TimeSlot time="13:30" />
              <TimeSlot time="14:00" />
            </div>
            <div className="mt-auto pt-4">
              <button className="w-full bg-gold text-dark font-bold py-3 rounded-xl text-sm">
                {t('client', 'confirmBtn')}
              </button>
            </div>
          </PhoneMockup>
        </div>

        <p
          className={`text-center text-white/40 text-lg mt-12 transition-all duration-700 delay-500 ${
            isInView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {t('client', 'footer')} <span className="text-gold font-semibold">{t('client', 'footerBold')}</span>{t('client', 'footerEnd')}
        </p>
      </div>
    </section>
  )
}
