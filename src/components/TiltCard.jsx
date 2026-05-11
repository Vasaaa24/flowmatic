import { useTilt } from '../hooks/useTilt'

export default function TiltCard({ className = '', children, ...rest }) {
  const ref = useTilt({ max: 6, scale: 1.03 })
  return (
    <div ref={ref} className={`tilt-card ${className}`} {...rest}>
      {children}
    </div>
  )
}
