import { useState, useEffect, useCallback, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { useLanguage } from '../context/LanguageContext'

const reviews = {
  cs: [
    {
      name: 'Markéta Horáčková',
      business: 'Kadeřnictví, Praha',
      avatar: 'MH',
      stars: 5,
      text: 'Zavedení trvalo jen pár dní a hned jsme pocítili rozdíl. Klientky si rezervují samy a já mám konečně čas na práci, ne na telefon.',
    },
    {
      name: 'Tomáš Blažek',
      business: 'FIT Studio, Brno',
      avatar: 'TB',
      stars: 5,
      text: 'Čekal jsem složité nastavení, ale proběhlo hladce. Teď vidím obsazenost v reálném čase a plánování je pro mě hračka.',
    },
    {
      name: 'Jana Procházková',
      business: 'Beauty Salon, Ostrava',
      avatar: 'JP',
      stars: 5,
      text: 'Zákazníci reagují jen pozitivně. Rezervace přes mobil je super jednoduchá a SMS připomínky výrazně snížily zapomenuté termíny.',
    },
    {
      name: 'Petr Kovář',
      business: 'Autoservis, Plzeň',
      avatar: 'PK',
      stars: 5,
      text: 'Nečekal jsem, že jde systém použít i pro autoservis, ale funguje skvěle. Žádné zmeškané hovory, vše online.',
    },
    {
      name: 'Lucie Veselá',
      business: 'Masážní studio, Č. Budějovice',
      avatar: 'LV',
      stars: 5,
      text: 'Systém přizpůsobili přesně pro naše potřeby — různé typy masáží s různými délkami. Vše funguje bez problémů.',
    },
  ],
  uk: [
    {
      name: 'Олена Мельник',
      business: 'Перукарня, Прага',
      avatar: 'ОМ',
      stars: 5,
      text: 'Впровадження зайняло лише кілька днів і ми одразу відчули різницю. Клієнти бронюють самі, а я нарешті маю час на роботу.',
    },
    {
      name: 'Іван Коваленко',
      business: 'Фітнес-студія, Брно',
      avatar: 'ІК',
      stars: 5,
      text: 'Очікував складного налаштування, але все пройшло гладко. Тепер бачу завантаженість у реальному часі.',
    },
    {
      name: 'Наталія Шевченко',
      business: 'Салон краси, Острава',
      avatar: 'НШ',
      stars: 5,
      text: 'Клієнти реагують лише позитивно. Бронювання через телефон дуже просте, а SMS-нагадування зменшили пропущені записи.',
    },
    {
      name: 'Андрій Бондаренко',
      business: 'Автосервіс, Пльзень',
      avatar: 'АБ',
      stars: 5,
      text: 'Не очікував, що систему можна використовувати для автосервісу, але вона працює чудово. Жодних пропущених дзвінків.',
    },
    {
      name: 'Юлія Петренко',
      business: 'Масажний салон, Ческе-Будейовіце',
      avatar: 'ЮП',
      stars: 5,
      text: 'Систему адаптували саме під наші потреби — різні типи масажу з різною тривалістю. Все працює бездоганно.',
    },
  ],
}

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? 'text-gold' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const [ref, isInView] = useInView()
  const { lang } = useLanguage()
  const list = reviews[lang] ?? reviews.cs
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [direction, setDirection] = useState('right') // 'right' | 'left'
  const [animKey, setAnimKey] = useState(0)
  const touchStartX = useRef(null)

  const goTo = useCallback((index, dir) => {
    setDirection(dir)
    setAnimKey((k) => k + 1)
    setActive(index)
  }, [])

  const next = useCallback(() => {
    goTo((active + 1) % list.length, 'right')
  }, [active, list.length, goTo])

  const prev = useCallback(() => {
    goTo((active - 1 + list.length) % list.length, 'left')
  }, [active, list.length, goTo])

  useEffect(() => { setActive(0) }, [lang])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [paused, next])

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  const review = list[active]

  return (
    <section id="reviews" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div ref={ref} className={`relative z-10 max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {lang === 'uk' ? 'Що кажуть' : 'Co říkají'}{' '}
            <span className="text-gold">{lang === 'uk' ? 'клієнти.' : 'klienti.'}</span>
          </h2>
        </div>

        {/* Arrows + Card row */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={prev} className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-gold hover:border-gold/40 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div
            className="flex-1 bg-dark-card border border-white/5 rounded-2xl p-6 overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div key={animKey} className={direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'}>
              <Stars count={review.stars} />
              <p className="text-base sm:text-lg text-white/80 leading-relaxed mt-3 mb-5">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-xs shrink-0">
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{review.name}</div>
                  <div className="text-xs text-white/40">{review.business}</div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={next} className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-gold hover:border-gold/40 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active ? 'w-6 h-2 bg-gold' : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
