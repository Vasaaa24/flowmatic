import { useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function Contact() {
  const [ref, isInView] = useInView()
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', business: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

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
            className="bg-dark-card border border-white/5 rounded-3xl p-8 sm:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/50 mb-2">Jméno *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Jan Novák"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="jan@firma.cz"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-white/50 mb-2">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+420 777 123 456"
                  className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors"
                />
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

            <div>
              <label className="block text-sm text-white/50 mb-2">Zpráva *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Popište co potřebujete, jaké funkce vás zajímají..."
                className="w-full bg-dark border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />
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
