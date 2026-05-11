import { useRef } from 'react'

/**
 * Magnetic + glow wrapper. Renders as <a> by default, <button> when `as="button"`.
 * Tracks cursor and translates the element slightly toward it.
 */
export default function MagneticButton({
  as = 'a',
  className = '',
  strength = 0.25,
  children,
  ...rest
}) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dx = (x - rect.width / 2) * strength
    const dy = (y - rect.height / 2) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
    el.style.setProperty('--mx', `${(x / rect.width) * 100}%`)
    el.style.setProperty('--my', `${(y / rect.height) * 100}%`)
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  const Tag = as
  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`fx-magnetic ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
