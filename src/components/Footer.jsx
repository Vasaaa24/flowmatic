import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { lang } = useLanguage()

  const tagline = lang === 'uk'
    ? 'Система бронювання для будь-якого бізнесу.'
    : 'Rezervační systém pro jakýkoliv byznys.'

  const columns = [
    {
      title: lang === 'uk' ? 'Продукт' : 'Produkt',
      links: [
        { to: '/', label: lang === 'uk' ? 'Бронювання' : 'Rezervace' },
        { to: '/weby', label: lang === 'uk' ? 'Сайти' : 'Weby' },
        { to: '/design', label: 'Design' },
        { to: '/cenik', label: lang === 'uk' ? 'Контакт' : 'Kontakt' },
      ],
    },
    {
      title: lang === 'uk' ? 'Правове' : 'Právní',
      links: [
        { to: '/gdpr', label: lang === 'uk' ? 'Конфіденційність' : 'Ochrana údajů' },
        { to: '/cookies', label: 'Cookies' },
      ],
    },
  ]

  return (
    <footer className="px-6 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="divider-fade mb-12" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-10 lg:mb-12">
          <div className="col-span-2">
            <div className="text-2xl font-bold tracking-tight mb-3">
              <span className="text-grad-gold">Val</span>ton
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">{tagline}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">{col.title}</div>
              <div className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <Link key={l.to + l.label} to={l.to} className="text-sm text-white/50 hover:text-gold transition-colors w-fit">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Valton. {lang === 'uk' ? 'Всі права захищені.' : 'Všechna práva vyhrazena.'}
          </div>
          <a href="mailto:valton.reserv@gmail.com" className="text-xs text-white/25 hover:text-gold transition-colors">
            valton.reserv@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
