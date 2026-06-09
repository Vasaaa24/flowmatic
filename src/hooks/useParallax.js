import { useEffect, useRef } from 'react'

/**
 * Sets --py CSS variable based on scroll position. Compose with CSS:
 *   .parallax { transform: translate3d(0, var(--py, 0px), 0); }
 * Gated by IntersectionObserver — only runs when element is visible.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.innerWidth < 768) return

    let raf = 0
    let inView = false

    const update = () => {
      raf = 0
      if (!inView) return
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const fromCenter = center - window.innerHeight / 2
      const offset = fromCenter * speed
      el.style.setProperty('--py', `${offset.toFixed(1)}px`)
    }

    const onScroll = () => {
      if (!inView || raf) return
      raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) update()
      },
      { rootMargin: '100px' }
    )
    io.observe(el)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return ref
}
