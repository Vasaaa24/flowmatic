import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} <span className="text-gold">VAL</span>TON. {t('footer', 'rights').replace(`© ${new Date().getFullYear()} Valton. `, '')}
        </div>
        <div className="flex items-center gap-6">
          <a href="#hero" className="text-sm text-white/30 hover:text-gold transition-colors">
            {t('footer', 'up')}
          </a>
          <a href="mailto:valton.reserv@gmail.com" className="text-sm text-white/30 hover:text-gold transition-colors">
            valton.reserv@gmail.com
          </a>
        </div>
      </div>
    </footer>
  )
}
