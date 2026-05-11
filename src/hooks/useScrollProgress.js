import { useEffect, useRef } from 'react'

/**
 * Sets CSS variable --p (0→1) based on element's scroll position.
 *
 * mode='through' (default) — 0 when element enters viewport from below,
 *                            1 when it leaves from the top.
 *                            Use for sections that should react both on
 *                            entry and exit (fly-through dividers).
 *
 * mode='out'    — 0 at top of page (element at viewport top),
 *                 1 when element fully scrolled past.
 *                 Use for hero scroll-out animations.
 */
export function useScrollProgress(mode = 'through') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    let inView = false

    const update = () => {
      raf = 0
      if (!inView) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      let p
      if (mode === 'out') {
        p = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)))
      } else {
        const total = rect.height + vh
        const traveled = vh - rect.top
        p = Math.max(0, Math.min(1, traveled / total))
      }
      el.style.setProperty('--p', p.toFixed(3))
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
      { rootMargin: '50px' }
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
  }, [mode])

  return ref
}
