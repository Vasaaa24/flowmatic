import { useEffect, useRef, useState } from 'react'

/**
 * Animate a number from 0 → target when the element scrolls into view.
 * Returns [ref, displayValue]. displayValue is `null` until first frame.
 */
export function useCountUp(target, { duration = 1400, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let start = 0

    const tick = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / duration)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(target * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          raf = requestAnimationFrame(tick)
          observer.unobserve(el)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [target, duration])

  const display = decimals === 0 ? Math.round(value) : value.toFixed(decimals)
  return [ref, display]
}
