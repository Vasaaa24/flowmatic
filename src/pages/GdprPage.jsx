import { useLanguage } from '../context/LanguageContext'

export default function GdprPage() {
  const { lang } = useLanguage()

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert">
        {lang === 'uk' ? (
          <>
            <h1 className="text-3xl font-bold mb-8">Політика конфіденційності</h1>
            <p className="text-white/60 mb-6">Останнє оновлення: червень 2026</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">1. Хто є оператором персональних даних?</h2>
            <p className="text-white/60">Оператором персональних даних є Valton (valton.reserv@gmail.com).</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">2. Які дані ми збираємо?</h2>
            <p className="text-white/60">Ми збираємо лише дані, необхідні для роботи сервісу: ім'я, e-mail, номер телефону та деталі бронювань.</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">3. Для чого використовуються дані?</h2>
            <p className="text-white/60">Дані використовуються виключно для управління бронюваннями, відправки підтверджень та SMS/email нагадувань.</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">4. Як довго зберігаються дані?</h2>
            <p className="text-white/60">Дані зберігаються протягом усього терміну дії договору та 3 роки після його закінчення.</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">5. Ваші права</h2>
            <p className="text-white/60">Ви маєте право на доступ, виправлення, видалення та обмеження обробки ваших персональних даних. Зв'яжіться з нами за адресою valton.reserv@gmail.com.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8">Zásady ochrany osobních údajů</h1>
            <p className="text-white/60 mb-6">Poslední aktualizace: červen 2026</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">1. Kdo je správcem osobních údajů?</h2>
            <p className="text-white/60">Správcem osobních údajů je Valton (valton.reserv@gmail.com).</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">2. Jaké údaje zpracováváme?</h2>
            <p className="text-white/60">Zpracováváme pouze údaje nezbytné pro provoz služby: jméno, e-mail, telefonní číslo a detaily rezervací.</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">3. K čemu údaje slouží?</h2>
            <p className="text-white/60">Údaje slouží výhradně ke správě rezervací, odesílání potvrzení a SMS/email připomínek.</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">4. Jak dlouho údaje uchováváme?</h2>
            <p className="text-white/60">Údaje uchováváme po dobu trvání smluvního vztahu a 3 roky po jeho skončení.</p>
            <h2 className="text-xl font-semibold mt-8 mb-3">5. Vaše práva</h2>
            <p className="text-white/60">Máte právo na přístup, opravu, výmaz a omezení zpracování svých osobních údajů. Kontaktujte nás na valton.reserv@gmail.com.</p>
          </>
        )}
      </div>
    </div>
  )
}
