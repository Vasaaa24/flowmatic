export default function SplitText({
  children,
  as: Tag = 'span',
  className = '',
  stagger,
  delay,
}) {
  return (
    <Tag className={`fx-reveal ${className}`}>
      {children}
    </Tag>
  )
}
