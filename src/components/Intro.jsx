import { useEffect, useState } from 'react'

/**
 * Plays the intro on mount. Stays on screen until `dismiss` becomes true,
 * then fades out and unmounts.
 */
export default function Intro({ dismiss = false }) {
  const [visible, setVisible] = useState(true)

  // Fade out + unmount when parent says we're done.
  useEffect(() => {
    if (!dismiss) return
    const t = setTimeout(() => setVisible(false), 700)
    return () => clearTimeout(t)
  }, [dismiss])

  if (!visible) return null

  return (
    <div className={`intro-root ${dismiss ? 'intro-out' : ''}`}>
      <div className="intro-mark">
        <img
          src="/ValtonLogo.jpg"
          alt="Valton"
          className="intro-logo"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>
      <div className="intro-underline" />
      <div className="intro-spinner" aria-hidden="true" />
    </div>
  )
}
