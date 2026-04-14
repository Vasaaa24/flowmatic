export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-white/30">
          &copy; {new Date().getFullYear()} <span className="text-gold">Flow</span>matic. Vsechna prava vyhrazena.
        </div>
        <div className="flex items-center gap-6">
          <a href="#hero" className="text-sm text-white/30 hover:text-gold transition-colors">
            Nahoru
          </a>
          <a href="mailto:info@flowmatic.cz" className="text-sm text-white/30 hover:text-gold transition-colors">
            info@flowmatic.cz
          </a>
        </div>
      </div>
    </footer>
  )
}
