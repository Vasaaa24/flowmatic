import { useInView } from '../hooks/useInView'

export default function AppPreview() {
  const [ref, isInView] = useInView()

  return (
    <section id="preview" className="py-24 sm:py-32 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Příklad{' '}
            <span className="text-gold">aplikace.</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Prohlédněte si, jak rezervační systém vypadá v praxi.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 bg-dark-card"
          style={{ paddingBottom: '56.25%', height: 0 }}
        >
          <iframe
            src="https://www.canva.com/design/DAHFbrBFBqw/rjuRPHL0xc7nLzp98B4CVw/view?embed"
            allowFullScreen
            allow="fullscreen"
            title="Příklad aplikace Valton"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>
      </div>
    </section>
  )
}
