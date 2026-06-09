import { useLanguage } from '../context/LanguageContext'

export default function CookiesPage() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {lang === 'uk' ? (
          <>
            <h1 className="text-3xl font-bold mb-8">Політика cookies</h1>
            <p className="text-white/60 mb-6">Останнє оновлення: червень 2026</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">Що таке cookies?</h2>
            <p className="text-white/60">Cookies — це невеликі текстові файли, які зберігаються у вашому браузері при відвідуванні веб-сайту.</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">Які cookies ми використовуємо?</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-dark-card border border-white/5 rounded-2xl p-5">
                <div className="font-semibold mb-1">Необхідні cookies</div>
                <p className="text-white/50 text-sm">Забезпечують основну функціональність сайту. Не можуть бути відключені.</p>
              </div>
              <div className="bg-dark-card border border-white/5 rounded-2xl p-5">
                <div className="font-semibold mb-1">Аналітичні cookies</div>
                <p className="text-white/50 text-sm">Допомагають нам розуміти, як відвідувачі використовують сайт (анонімно).</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mt-8 mb-3">Як керувати cookies?</h2>
            <p className="text-white/60">Ви можете відключити cookies в налаштуваннях браузера. Це може вплинути на функціональність сайту.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8">Zásady cookies</h1>
            <p className="text-white/60 mb-6">Poslední aktualizace: červen 2026</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">Co jsou cookies?</h2>
            <p className="text-white/60">Cookies jsou malé textové soubory, které se ukládají do vašeho prohlížeče při návštěvě webové stránky.</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">Jaké cookies používáme?</h2>
            <div className="mt-4 space-y-4">
              <div className="bg-dark-card border border-white/5 rounded-2xl p-5">
                <div className="font-semibold mb-1">Nezbytné cookies</div>
                <p className="text-white/50 text-sm">Zajišťují základní funkčnost webu. Nelze je vypnout.</p>
              </div>
              <div className="bg-dark-card border border-white/5 rounded-2xl p-5">
                <div className="font-semibold mb-1">Analytické cookies</div>
                <p className="text-white/50 text-sm">Pomáhají nám pochopit, jak návštěvníci web používají (anonymně).</p>
              </div>
            </div>
            <h2 className="text-xl font-semibold mt-8 mb-3">Jak spravovat cookies?</h2>
            <p className="text-white/60">Cookies můžete vypnout v nastavení prohlížeče. Může to ovlivnit funkčnost webu.</p>
          </>
        )}
      </div>
    </div>
  )
}
