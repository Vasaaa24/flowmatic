import { useEffect, useRef } from 'react'

/**
 * Ambient background canvas — slowly drifting gold particles + animated mesh.
 * Reacts to scroll: particles drift faster during scrolling.
 */
const isMobile = () => window.innerWidth < 768

export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (isMobile()) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let particles = []
    let scrollVel = 0
    let lastScroll = window.scrollY

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w
      canvas.height = h
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'

      const density = Math.min(40, Math.floor((w * h) / 60000))
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.5,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const onScroll = () => {
      const y = window.scrollY
      scrollVel = (y - lastScroll) * 0.05
      lastScroll = y
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      scrollVel *= 0.92

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy + scrollVel
        p.phase += 0.008

        if (p.x < -10) p.x = w + 10
        else if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        else if (p.y > h + 10) p.y = -10

        const bob = Math.sin(p.phase) * 0.3 + 0.7
        const alpha = p.a * bob
        ctx.fillStyle = `rgba(255, 230, 0, ${alpha.toFixed(2)})`
        ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2)
      }

      raf = requestAnimationFrame(draw)
    }

    // Pause canvas rendering when tab is hidden — saves CPU
    const onVisibility = () => {
      if (document.hidden) {
        if (raf) {
          cancelAnimationFrame(raf)
          raf = 0
        }
      } else if (!raf) {
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <>
      <div className="ambient-mesh" aria-hidden="true" />
      <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />
    </>
  )
}
