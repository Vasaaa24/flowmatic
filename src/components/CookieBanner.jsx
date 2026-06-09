import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function CookieBanner() {
  const [visible, setVisible] = useState(true)
  const { lang } = useLanguage()

  if (!visible) return null

  const cs = {
    text: 'Tento web používá cookies pro zajištění základní funkčnosti.',
    gdpr: 'Zásady ochrany osobních údajů',
    cookies: 'Zásady cookies',
    accept: 'Přijmout',
    decline: 'Odmítnout',
  }
  const uk = {
    text: 'Цей сайт використовує cookies для забезпечення базової функціональності.',
    gdpr: 'Політика конфіденційності',
    cookies: 'Політика cookies',
    accept: 'Прийняти',
    decline: 'Відхилити',
  }
  const t = lang === 'uk' ? uk : cs

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div className="max-w-4xl mx-auto bg-dark-card border border-white/10 rounded-2xl px-6 py-4 shadow-2xl shadow-black/50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 text-sm text-white/60 leading-relaxed">
          {t.text}{' '}
          <Link to="/gdpr" className="text-gold hover:underline">{t.gdpr}</Link>
          {' · '}
          <Link to="/cookies" className="text-gold hover:underline">{t.cookies}</Link>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setVisible(false)}
            className="text-sm text-white/40 hover:text-white/70 transition-colors px-4 py-2"
          >
            {t.decline}
          </button>
          <button
            onClick={() => setVisible(false)}
            className="text-sm bg-gold text-dark font-semibold px-5 py-2 rounded-full hover:bg-gold-light transition-colors"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
