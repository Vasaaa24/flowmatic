import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useLanguage } from '../context/LanguageContext'

const BIZ_ICONS = {
  salon: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  ),
  restaurant: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  fitness: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  beauty: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  auto: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
}

const businesses = {
  cs: [
    {
      id: 'salon',
      label: 'Kadeřnictví',
      stepTitles: ['Vyber službu', 'Vyber specialistu', 'Vyber termín'],
      steps: [
        { items: ['Střih — 30 min', 'Barvení — 90 min', 'Royal balíček — 60 min'], selected: 0 },
        { items: ['Martin ★★★★★', 'Jakub ★★★★', 'Tomáš ★★★★★'], selected: 0 },
        { items: ['9:00', '10:00', '14:30'], selected: 1 },
      ],
    },
    {
      id: 'restaurant',
      label: 'Restaurace',
      stepTitles: ['Pro kolik hostů?', 'Kde chcete sedět?', 'V kolik hodin?'],
      steps: [
        { items: ['Stůl pro 2', 'Stůl pro 4', 'Stůl pro 8'], selected: 1 },
        { items: ['Terasa', 'Interiér', 'Privátní salonek'], selected: 0 },
        { items: ['12:00', '18:00', '20:30'], selected: 2 },
      ],
    },
    {
      id: 'fitness',
      label: 'Fitness',
      stepTitles: ['Vyber lekci', 'Vyber lektora', 'Vyber termín'],
      steps: [
        { items: ['Osobní trénink — 60 min', 'Skupinová lekce', 'Pilates — 45 min'], selected: 0 },
        { items: ['Petra ★★★★★', 'Lukáš ★★★★', 'Jana ★★★★★'], selected: 2 },
        { items: ['7:00', '9:00', '17:30'], selected: 2 },
      ],
    },
    {
      id: 'beauty',
      label: 'Kosmetika',
      stepTitles: ['Vyber službu', 'Vyber kosmetičku', 'Vyber termín'],
      steps: [
        { items: ['Manikúra — 45 min', 'Pedikúra — 60 min', 'Gelové nehty — 90 min'], selected: 2 },
        { items: ['Simona ★★★★★', 'Monika ★★★★★', 'Tereza ★★★★'], selected: 0 },
        { items: ['10:00', '11:30', '15:00'], selected: 1 },
      ],
    },
    {
      id: 'auto',
      label: 'Autoservis',
      stepTitles: ['Vyber službu', 'Vyber mechanika', 'Vyber termín'],
      steps: [
        { items: ['STK — 30 min', 'Výměna oleje — 45 min', 'Pneuservis — 60 min'], selected: 1 },
        { items: ['Mechanik A', 'Mechanik B', 'Mechanik C'], selected: 0 },
        { items: ['8:00', '10:30', '13:00'], selected: 0 },
      ],
    },
  ],
  uk: [
    {
      id: 'salon',
      label: 'Перукарня',
      stepTitles: ['Обери послугу', 'Обери спеціаліста', 'Обери час'],
      steps: [
        { items: ['Стрижка — 30 хв', 'Фарбування — 90 хв', 'Royal пакет — 60 хв'], selected: 0 },
        { items: ['Мартін ★★★★★', 'Якуб ★★★★', 'Томаш ★★★★★'], selected: 0 },
        { items: ['9:00', '10:00', '14:30'], selected: 1 },
      ],
    },
    {
      id: 'restaurant',
      label: 'Ресторан',
      stepTitles: ['На скільки гостей?', 'Де хочете сидіти?', 'О котрій годині?'],
      steps: [
        { items: ['Стіл на 2', 'Стіл на 4', 'Стіл на 8'], selected: 1 },
        { items: ['Тераса', 'Зал', 'Приватний кабінет'], selected: 0 },
        { items: ['12:00', '18:00', '20:30'], selected: 2 },
      ],
    },
    {
      id: 'fitness',
      label: 'Фітнес',
      stepTitles: ['Обери заняття', 'Обери тренера', 'Обери час'],
      steps: [
        { items: ['Персональне тренування', 'Групове заняття', 'Пілатес — 45 хв'], selected: 0 },
        { items: ['Петра ★★★★★', 'Лукаш ★★★★', 'Яна ★★★★★'], selected: 2 },
        { items: ['7:00', '9:00', '17:30'], selected: 2 },
      ],
    },
    {
      id: 'beauty',
      label: 'Косметика',
      stepTitles: ['Обери послугу', 'Обери косметолога', 'Обери час'],
      steps: [
        { items: ['Манікюр — 45 хв', 'Педикюр — 60 хв', 'Гелеві нігті — 90 хв'], selected: 2 },
        { items: ['Сімона ★★★★★', 'Моніка ★★★★★', 'Тереза ★★★★'], selected: 0 },
        { items: ['10:00', '11:30', '15:00'], selected: 1 },
      ],
    },
    {
      id: 'auto',
      label: 'Автосервіс',
      stepTitles: ['Обери послугу', 'Обери механіка', 'Обери час'],
      steps: [
        { items: ['ТО — 30 хв', 'Заміна масла — 45 хв', 'Шиномонтаж — 60 хв'], selected: 1 },
        { items: ['Механік А', 'Механік Б', 'Механік В'], selected: 0 },
        { items: ['8:00', '10:30', '13:00'], selected: 0 },
      ],
    },
  ],
}

const stepMeta = {
  cs: [
    {
      number: '01',
      label: 'Krok 1',
      title: 'Vyber službu',
      desc: 'Zákazník si vybere přesně to, co potřebuje — ze služeb, které vy nabízíte.',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    },
    {
      number: '02',
      label: 'Krok 2',
      title: 'Vyber specialistu',
      desc: 'Zákazník si vybere pracovníka, stůl, lektora — cokoliv co vaše firma nabízí.',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
    {
      number: '03',
      label: 'Krok 3',
      title: 'Vyber termín',
      desc: 'Volné sloty v reálném čase. Rezervace potvrzená jedním klikem.',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    },
  ],
  uk: [
    {
      number: '01',
      label: 'Крок 1',
      title: 'Обери послугу',
      desc: 'Клієнт обирає саме те, що потрібно — з послуг, які пропонуєте ви.',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    },
    {
      number: '02',
      label: 'Крок 2',
      title: 'Обери спеціаліста',
      desc: 'Клієнт обирає працівника, стіл, тренера — що завгодно у вашому бізнесі.',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    },
    {
      number: '03',
      label: 'Крок 3',
      title: 'Обери час',
      desc: 'Вільні слоти в реальному часі. Бронювання підтверджено одним кліком.',
      icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    },
  ],
}

export default function ClientExperience() {
  const ref = useReveal()
  const { t, lang } = useLanguage()
  const [activeIdx, setActiveIdx] = useState(0)

  const bizList = businesses[lang] ?? businesses.cs
  const meta = stepMeta[lang] ?? stepMeta.cs
  const activeBiz = bizList[activeIdx]

  return (
    <section id="client" className="py-24 sm:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/[0.02] to-transparent" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="fx-reveal text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            {t('client', 'h1')} <span className="text-grad-gold">{t('client', 'h2')}</span>
          </h2>
          <p className="fx-reveal fx-d-1 text-white/50 text-lg">{t('client', 'p')}</p>
        </div>

        {/* Business type switcher */}
        <div className="fx-reveal fx-d-2 grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 mb-12 max-w-sm sm:max-w-none mx-auto">
          {bizList.map((biz, i) => (
            <button
              key={biz.id}
              onClick={() => setActiveIdx(i)}
              className={`${i === bizList.length - 1 ? 'col-span-2 sm:col-span-1' : ''} flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-full text-sm font-medium border transition-all duration-200 ${
                i === activeIdx
                  ? 'bg-gold border-gold text-dark shadow-lg shadow-gold/20'
                  : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              {BIZ_ICONS[biz.id]}
              {biz.label}
            </button>
          ))}
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {meta.map((step, i) => {
            const stepData = activeBiz.steps[i]
            return (
              <div
                key={`${activeBiz.id}-${i}`}
                className="card relative rounded-3xl p-7 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-gold/20 leading-none select-none">{step.number}</span>
                  <div className="w-11 h-11 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold/15 transition-colors">
                    {step.icon}
                  </div>
                </div>

                <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">{step.label}</div>
                <h3 className="text-xl font-bold mb-3">{activeBiz.stepTitles?.[i] ?? step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{step.desc}</p>

                <div className="flex flex-col gap-2">
                  {stepData.items.map((item, j) => (
                    <div
                      key={j}
                      className={`flex items-center gap-2 text-sm px-3 py-2 rounded-xl transition-all duration-300 ${
                        j === stepData.selected
                          ? 'bg-gold/10 border border-gold/25 text-gold font-medium'
                          : 'bg-white/4 border border-white/5 text-white/50'
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${j === stepData.selected ? 'bg-gold' : 'bg-white/20'}`} />
                      {item}
                      {j === stepData.selected && (
                        <svg className="w-4 h-4 ml-auto text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* AI assistant banner */}
        <div className="fx-reveal fx-d-5 mt-6 relative overflow-hidden bg-dark-card border border-gold/20 rounded-3xl p-7 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(255,230,0,0.07),transparent_60%)] pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Icon */}
            <div className="shrink-0 w-14 h-14 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
              </svg>
            </div>
            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gold font-semibold uppercase tracking-wider">
                  {lang === 'uk' ? 'AI помічник' : 'AI pomocník'}
                </span>
                <span className="inline-flex items-center gap-1 bg-gold/10 border border-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  {lang === 'uk' ? 'завжди онлайн' : 'vždy online'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">
                {lang === 'uk' ? 'AI асистент для адміністратора.' : 'AI asistent pro administrátora.'}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {lang === 'uk'
                  ? 'Адмін має přímý přístup до бази даних přes AI chat. Může se zeptat na cokoliv — přehledy, statistiky, rezervace.'
                  : 'Admin má přímý přístup do databáze přes AI chat. Může se zeptat na cokoliv — přehledy, statistiky, rezervace.'}
              </p>
            </div>
            {/* Chat bubble mockup */}
            <div className="shrink-0 hidden lg:flex flex-col gap-2 min-w-[210px]">
              <div className="self-start bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-white/60 max-w-[200px]">
                {lang === 'uk' ? 'Скільки rezervací було цього тижня?' : 'Kolik rezervací bylo tento týden?'}
              </div>
              <div className="self-end bg-gold/15 border border-gold/25 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-gold max-w-[200px]">
                {lang === 'uk' ? 'Цього тижня 47 rezervací, +12 % oproti minulému ✨' : 'Tento týden 47 rezervací, +12 % oproti minulému ✨'}
              </div>
            </div>
          </div>
        </div>

        <p className="fx-reveal fx-d-6 text-center text-white/40 text-lg mt-12">
          {t('client', 'footer')} <span className="text-gold font-semibold">{t('client', 'footerBold')}</span>{t('client', 'footerEnd')}
        </p>
      </div>
    </section>
  )
}
