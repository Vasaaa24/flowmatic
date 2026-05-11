import { useEffect, useState } from 'react'

export default function Intro() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!visible) return
    document.documentElement.classList.add('intro-lock')

    const t1 = setTimeout(() => setFading(true), 1900)
    const t2 = setTimeout(() => {
      document.documentElement.classList.remove('intro-lock')
      setVisible(false)
    }, 2600)

    return () => {
      clearTimeout(t1); clearTimeout(t2)
      document.documentElement.classList.remove('intro-lock')
    }
  }, [visible])

  if (!visible) return null

  const letters = [
    { c: 'V', gold: true },
    { c: 'A', gold: true },
    { c: 'L', gold: true },
    { c: 'T', gold: false },
    { c: 'O', gold: false },
    { c: 'N', gold: false },
  ]

  return (
    <div className={`intro-root ${fading ? 'intro-out' : ''}`}>
      <div className="intro-mark">
        <svg
          className="intro-arrow"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 14 L14 6" />
          <path d="M7 6 L14 6 L14 13" />
        </svg>
        <div className="intro-wordmark">
          {letters.map((l, i) => (
            <span
              key={i}
              className={`intro-letter ${l.gold ? 'intro-letter-gold' : ''}`}
              style={{ animationDelay: `${320 + i * 70}ms` }}
            >
              {l.c}
            </span>
          ))}
        </div>
      </div>
      <div className="intro-underline" />
    </div>
  )
}
