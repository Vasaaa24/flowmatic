import { useEffect, useRef } from 'react'

/**
 * Splits text into per-letter spans that reveal with stagger when scrolled
 * into view. Use as: <SplitText>Your headline</SplitText>.
 */
export default function SplitText({
  children,
  as: Tag = 'span',
  className = '',
  stagger = 28,
  delay = 0,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('split-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const renderChildren = (node, base = 0) => {
    if (typeof node === 'string') {
      return splitString(node, base, stagger, delay)
    }
    if (Array.isArray(node)) {
      let offset = base
      return node.map((child, i) => {
        const rendered = renderChildren(child, offset)
        offset += countChars(child)
        return <span key={i}>{rendered}</span>
      })
    }
    if (node && node.props && node.props.children !== undefined) {
      // For nested elements like <span className="text-gold">...</span>,
      // keep the wrapper and split its children.
      const inner = renderChildren(node.props.children, base)
      const Component = node.type
      return (
        <Component {...node.props} key={node.key}>
          {inner}
        </Component>
      )
    }
    return node
  }

  return (
    <Tag ref={ref} className={`split-text ${className}`}>
      {renderChildren(children)}
    </Tag>
  )
}

function splitString(str, base, stagger, delay) {
  return str.split('').map((ch, i) => {
    if (ch === ' ') return <span key={`s${base + i}`} className="split-space">{' '}</span>
    return (
      <span
        key={`c${base + i}`}
        className="split-char"
        style={{ '--d': `${delay + (base + i) * stagger}ms` }}
      >
        {ch}
      </span>
    )
  })
}

function countChars(node) {
  if (typeof node === 'string') return node.length
  if (Array.isArray(node)) return node.reduce((a, c) => a + countChars(c), 0)
  if (node && node.props && node.props.children !== undefined) {
    return countChars(node.props.children)
  }
  return 0
}
