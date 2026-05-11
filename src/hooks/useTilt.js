import { useEffect, useRef } from 'react'

/**
 * Apply mouse-based 3D tilt to an element.
 * Returns a ref to attach to the element you want to tilt.
 */
export function useTilt({ max = 8, scale = 1.02, speed = 220 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia?.('(hover: none)').matches) return

    const el = ref.current
    if (!el) return

    el.style.transformStyle = 'preserve-3d'
    el.style.transition = `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (0.5 - py) * max * 2
      const ry = (px - 0.5) * max * 2
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }
    const onLeave = () => {
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max, scale, speed])

  return ref
}
