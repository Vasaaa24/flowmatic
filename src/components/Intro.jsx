import { useEffect, useState } from 'react'

export default function Intro({ dismiss = false }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!dismiss) return
    const t = setTimeout(() => setVisible(false), 500)
    return () => clearTimeout(t)
  }, [dismiss])

  if (!visible) return null

  return (
    <div className={`intro-root ${dismiss ? 'intro-out' : ''}`}>
      <div className="intro-logo-wrap">
        <img src="/ValtonLogo.jpg" alt="Valton" className="intro-logo" style={{ mixBlendMode: 'screen' }} />
      </div>
      <div className="intro-bar" />
    </div>
  )
}
