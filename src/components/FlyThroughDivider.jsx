import { useScrollProgress } from '../hooks/useScrollProgress'

/**
 * Massive gold blob that grows from a dot to fill the viewport as user
 * scrolls past — feels like flying through the shape.
 * variant: 'blob' | 'ring' | 'diamond'
 */
export default function FlyThroughDivider({ variant = 'blob' }) {
  const ref = useScrollProgress()
  return (
    <div ref={ref} className="fly-divider" aria-hidden="true">
      <div className={`fly-shape fly-shape-${variant}`} />
    </div>
  )
}
