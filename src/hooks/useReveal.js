import { useEffect, useRef } from 'react'

/**
 * Attach to an element (or its parent) to reveal `.fx-reveal`, `.fx-line`,
 * `.fx-trace-border` descendants when the wrapper scrolls into view.
 * If `selfOnly` is true, only the ref'd element itself is revealed.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', selfOnly = false } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reveal = () => {
      if (selfOnly) {
        el.classList.add('is-visible')
        return
      }
      const targets = el.querySelectorAll('.fx-reveal, .fx-line, .fx-trace-border')
      targets.forEach((t) => t.classList.add('is-visible'))
      // If the element itself has any of these classes, reveal it too.
      if (
        el.classList.contains('fx-reveal') ||
        el.classList.contains('fx-line') ||
        el.classList.contains('fx-trace-border')
      ) {
        el.classList.add('is-visible')
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, selfOnly])

  return ref
}
