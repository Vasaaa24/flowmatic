import { useEffect, useRef } from 'react'

/**
 * Apply parallax translateY to an element as it scrolls through viewport.
 * speed: -1 = moves up twice as fast as scroll. +1 = inverse. 0 = static.
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    const update = () => {
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const fromCenter = center - window.innerHeight / 2
      const offset = fromCenter * speed
      el.style.setProperty('--py', `${offset.toFixed(2)}px`)
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return ref
}
