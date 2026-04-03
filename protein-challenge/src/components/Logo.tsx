interface Props { size?: 'sm' | 'md' | 'lg' }

export default function Logo({ size = 'md' }: Props) {
  const h = size === 'sm' ? 32 : size === 'md' ? 44 : 60
  return (
    <img
      src="/logo.png"
      alt="Grind Lab Fitness"
      style={{ height: h, width: 'auto' }}
      className="object-contain"
    />
  )
}
