import { useEffect, useRef } from 'react'

export default function FlyThroughDivider({ variant = 'ring' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('fly-triggered')
        const shape = el.querySelector('.fly-shape')
        if (shape) {
          shape.addEventListener('animationend', () => {
            el.classList.remove('fly-triggered')
          }, { once: true })
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="fly-divider" aria-hidden="true">
      <div className={`fly-shape fly-shape-${variant}`} />
    </div>
  )
}
