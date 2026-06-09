import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} <span className="text-gold">VAL</span>TON. {t('footer', 'rights').replace(`© ${new Date().getFullYear()} Valton. `, '')}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <Link to="/gdpr" className="text-sm text-white/30 hover:text-gold transition-colors">
            {lang === 'uk' ? 'Конфіденційність' : 'Ochrana údajů'}
          </Link>
          <Link to="/cookies" className="text-sm text-white/30 hover:text-gold transition-colors">
            Cookies
          </Link>
          <Link to="/" className="text-sm text-white/30 hover:text-gold transition-colors">
            {t('footer', 'up')}
          </Link>
          <a href="mailto:valton.reserv@gmail.com" className="text-sm text-white/30 hover:text-gold transition-colors">
            valton.reserv@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
