import { useEffect, useRef } from 'react'

/**
 * Ambient background canvas — slowly drifting gold particles + animated mesh.
 * Reacts to scroll: particles drift faster during scrolling.
 */
export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let raf = 0
    let particles = []
    let scrollVel = 0
    let lastScroll = window.scrollY
    let mouseX = 0
    let mouseY = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * DPR
      canvas.height = h * DPR
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(DPR, DPR)

      const density = Math.floor((w * h) / 22000)
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.6 + 0.2,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const onScroll = () => {
      const y = window.scrollY
      scrollVel = (y - lastScroll) * 0.05
      lastScroll = y
    }

    const onMouse = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const draw = (t) => {
      const w = canvas.width / DPR
      const h = canvas.height / DPR
      ctx.clearRect(0, 0, w, h)

      // Decay scroll velocity
      scrollVel *= 0.92

      for (const p of particles) {
        // Drift + scroll bias + sine bob
        p.x += p.vx
        p.y += p.vy + scrollVel
        p.phase += 0.008

        // Wrap edges
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        // Mouse repel (gentle)
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist2 = dx * dx + dy * dy
        if (dist2 < 14400) {
          const force = (14400 - dist2) / 14400
          p.x += (dx / Math.sqrt(dist2 + 0.01)) * force * 0.6
          p.y += (dy / Math.sqrt(dist2 + 0.01)) * force * 0.6
        }

        const bob = Math.sin(p.phase) * 0.3 + 0.7
        const alpha = p.a * bob
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 193, 7, ${alpha.toFixed(3)})`
        ctx.shadowColor = 'rgba(255, 193, 7, 0.6)'
        ctx.shadowBlur = 6
        ctx.fill()
      }
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouse, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <>
      <div className="ambient-mesh" aria-hidden="true" />
      <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />
    </>
  )
}
