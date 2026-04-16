import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const COUNTRY_CODES = [
  { code: '+420', flag: '🇨🇿', label: 'CZ' },
  { code: '+421', flag: '🇸🇰', label: 'SK' },
  { code: '+48',  flag: '🇵🇱', label: 'PL' },
  { code: '+43',  flag: '🇦🇹', label: 'AT' },
  { code: '+49',  flag: '🇩🇪', label: 'DE' },
  { code: '+44',  flag: '🇬🇧', label: 'GB' },
  { code: '+1',   flag: '🇺🇸', label: 'US' },
  { code: '+33',  flag: '🇫🇷', label: 'FR' },
  { code: '+39',  flag: '🇮🇹', label: 'IT' },
  { code: '+34',  flag: '🇪🇸', label: 'ES' },
  { code: '+36',  flag: '🇭🇺', label: 'HU' },
  { code: '+380', flag: '🇺🇦', label: 'UA' },
]

function validate(form, gdpr) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Zadejte jméno'
  if (!form.email.trim()) {
    errors.email = 'Zadejte e-mail'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Neplatný formát e-mailu'
  }
  if (form.phone.trim() && !/^[\d\s\-()]{6,15}$/.test(form.phone.trim())) {
    errors.phone = 'Neplatné telefonní číslo'
  }
  if (!form.message.trim()) errors.message = 'Napište zprávu'
  if (!gdpr) errors.gdpr = 'Souhlas je povinný'
  return errors
}

export default function Contact() {
  const [ref, isInView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', phone: '', dialCode: '+420', business: '', message: '' })
  const [gdpr, setGdpr] = useState(false)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value }, gdpr)
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validate(form, gdpr)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
  }

  const handleGdpr = (e) => {
    setGdpr(e.target.checked)
    if (touched.gdpr) {
      setErrors((prev) => ({ ...prev, gdpr: e.target.checked ? undefined : 'Souhlas je povinný' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true, message: true, gdpr: true })
    const newErrors = validate(form, gdpr)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setStatus('sending')
    try {
      const payload = {
        ...form,
        phone: form.phone ? `${form.dialCode} ${form.phone}` : '',
      }
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', dialCode: '+420', business: '', message: '' })
        setGdpr(false)
        setTouched({})
        setErrors({})
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field) =>
    `w-full bg-dark border rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
      errors[field] && touched[field]
        ? 'border-red-500/70 focus:border-red-500'
        : 'border-white/10 focus:border-gold/50'
    }`

  return (
    <section id="contact" className="py-24 sm:py-32 px-6">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Pojďme to{' '}
            <span className="text-gold">rozjet.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            Napište nám co potřebujete — odpovíme do 24 hodin.
          </p>
        </div>

        {status === 'success' ? (
          <div className="bg-dark-card border border-gold/30 rounded-3xl p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Zpráva odeslána!</h3>
            <p className="text-white/50">Ozveme se vám co nejdříve.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm text-gold underline underline-offset-4"
            >
              Odeslat další zprávu
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-dark-card border border-white/5 rounded-3xl p-8 sm:p-10 space-y-5"
          >
            {/* Jméno + Email */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/50 mb-2">Jméno *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Jan Novák"
                  className={inputClass('name')}
                />
                {errors.name && touched.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="jan@firma.cz"
                  className={inputClass('email')}
                />
                {errors.email && touched.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Telefon s předvolbou + Typ byznysu */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/50 mb-2">Telefon</label>
                <div className="flex gap-2">
                  <select
                    name="dialCode"
                    value={form.dialCode}
                    onChange={handleChange}
                    className="bg-dark border border-white/10 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-colors shrink-0"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="777 123 456"
                    className={inputClass('phone')}
                  />
                </div>
                {errors.phone && touched.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Typ byznysu</label>
                <input
                  type="text"
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  placeholder="Kadeřnictví, klinika..."
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            </div>

            {/* Zpráva */}
            <div>
              <label className="block text-sm text-white/50 mb-2">Zpráva *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={4}
                placeholder="Popište co potřebujete, jaké funkce vás zajímají..."
                className={`${inputClass('message')} resize-none`}
              />
              {errors.message && touched.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* GDPR */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={gdpr}
                    onChange={handleGdpr}
                    onBlur={() => setTouched((p) => ({ ...p, gdpr: true }))}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    gdpr ? 'bg-gold border-gold' : errors.gdpr && touched.gdpr ? 'border-red-500/70' : 'border-white/20 group-hover:border-white/40'
                  }`}>
                    {gdpr && (
                      <svg className="w-3 h-3 text-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-white/50 leading-relaxed">
                  Souhlasím se zpracováním osobních údajů za účelem odpovědi na mou poptávku.
                  Údaje nebudou předány třetím stranám a budou uchovány po dobu nezbytně nutnou.{' '}
                  <span className="text-gold/70">*</span>
                </span>
              </label>
              {errors.gdpr && touched.gdpr && (
                <p className="text-red-400 text-xs mt-1 ml-8">{errors.gdpr}</p>
              )}
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">Nepodařilo se odeslat zprávu. Zkuste to znovu.</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-gold text-dark font-bold text-base py-4 rounded-full hover:bg-gold-light transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-gold/20"
            >
              {status === 'sending' ? 'Odesílám...' : 'Odeslat zprávu'}
            </button>

            <p className="text-center text-white/30 text-xs">Odpovídáme do 24 hodin.</p>
          </form>
        )}
      </div>
    </section>
  )
}
