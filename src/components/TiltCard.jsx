export default function TiltCard({ className = '', children, ...rest }) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}
