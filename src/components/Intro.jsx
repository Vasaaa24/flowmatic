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

  const letters = [
    { c: 'V', gold: true },
    { c: 'A', gold: true },
    { c: 'L', gold: true },
    { c: 'T', gold: false },
    { c: 'O', gold: false },
    { c: 'N', gold: false },
  ]

  return (
    <div className={`intro-root ${dismiss ? 'intro-out' : ''}`}>
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
      <div className="intro-spinner" aria-hidden="true" />
    </div>
  )
}
