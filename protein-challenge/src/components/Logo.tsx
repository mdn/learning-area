interface Props { size?: 'sm' | 'md' | 'lg' }

export default function Logo({ size = 'md' }: Props) {
  const sz = size === 'sm' ? 28 : size === 'md' ? 40 : 56
  return (
    <div className="flex items-center gap-2">
      <svg width={sz} height={sz * 1.2} viewBox="0 0 100 120" fill="none">
        <ellipse cx="50" cy="95" rx="32" ry="5" fill="#e0e0e0"/>
        <ellipse cx="50" cy="93" rx="28" ry="4" fill="#ccc"/>
        <circle cx="50" cy="58" r="32" fill="#1A1A1A"/>
        <circle cx="50" cy="58" r="26" fill="#0A0A0A"/>
        <ellipse cx="43" cy="46" rx="7" ry="5" fill="rgba(255,255,255,0.12)" transform="rotate(-20 43 46)"/>
        <rect x="37" y="12" width="26" height="18" rx="13" fill="#1A1A1A"/>
        <rect x="42" y="16" width="16" height="10" rx="8" fill="#0A0A0A"/>
      </svg>
      <div>
        <div className="font-heading font-extrabold tracking-widest uppercase text-black leading-none" style={{ fontSize: size === 'sm' ? 11 : size === 'md' ? 14 : 20 }}>GRIND LAB</div>
        <div className="font-heading tracking-[0.2em] uppercase text-gray-500 leading-none" style={{ fontSize: size === 'sm' ? 8 : size === 'md' ? 10 : 13 }}>FITNESS</div>
      </div>
    </div>
  )
}
