import { useEffect, useRef, useState } from 'react'

export default function Intro() {
  const [visible, setVisible] = useState(true)
  const [stage, setStage] = useState('boot')
  const screenRef = useRef(null)
  const cameraRef = useRef(null)

  // Compute the exact scale needed so the laptop screen fills the viewport.
  useEffect(() => {
    if (!visible) return
    const compute = () => {
      const screen = screenRef.current
      const camera = cameraRef.current
      if (!screen || !camera) return
      const rect = screen.getBoundingClientRect()
      const scaleX = window.innerWidth / rect.width
      const scaleY = window.innerHeight / rect.height
      const scale = Math.max(scaleX, scaleY)
      camera.style.setProperty('--intro-scale', scale.toFixed(3))
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [visible])

  useEffect(() => {
    if (!visible) return
    document.documentElement.classList.add('intro-lock')

    const t1 = setTimeout(() => setStage('zoom'), 1100)
    const t2 = setTimeout(() => setStage('fade'), 2200)
    const t3 = setTimeout(() => {
      document.documentElement.classList.remove('intro-lock')
      setVisible(false)
    }, 2900)

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      document.documentElement.classList.remove('intro-lock')
    }
  }, [visible])

  if (!visible) return null

  return (
    <div className={`intro-root ${stage === 'fade' ? 'intro-out' : ''}`}>
      <div className="intro-bg" />
      <div className={`intro-stage intro-stage-${stage}`}>
        <div className="intro-camera" ref={cameraRef}>
          <div className="intro-laptop">
            {/* Camera notch */}
            <div className="intro-notch" />
            {/* Screen */}
            <div className="intro-screen" ref={screenRef}>
              <div className="intro-mock">
                <div className="intro-mock-title">
                  <span className="text-gold">VAL</span>TON
                </div>
              </div>
            </div>
            {/* Hinge */}
            <div className="intro-hinge" />
            {/* Base */}
            <div className="intro-base" />
          </div>

          {/* Floor reflection / glow */}
          <div className="intro-floor" />
        </div>
      </div>
    </div>
  )
}
