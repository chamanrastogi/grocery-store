import { useId } from 'react'
import { cn } from '@/utils/cn'

interface Palette {
  from: string
  to: string
  accent: string
  dot: string
}

const palettes: Record<string, Palette> = {
  fruits: { from: '#fff1dd', to: '#ffd9a8', accent: '#f09c1d', dot: 'rgba(240,156,29,0.16)' },
  vegetables: { from: '#e9f5e6', to: '#cfe8c8', accent: '#3f9d4d', dot: 'rgba(63,157,77,0.16)' },
  dairy: { from: '#e8f2fb', to: '#c9e2f5', accent: '#1f7fd4', dot: 'rgba(31,127,212,0.16)' },
  bakery: { from: '#fbf1dc', to: '#f1ddb0', accent: '#a8731f', dot: 'rgba(168,115,31,0.16)' },
  meat: { from: '#fbeae5', to: '#f2cdc1', accent: '#cf4f23', dot: 'rgba(207,79,35,0.16)' },
  beverages: { from: '#e0f4f5', to: '#bde6e8', accent: '#0f8b93', dot: 'rgba(15,139,147,0.16)' },
  snacks: { from: '#fbe9f0', to: '#f5cddc', accent: '#c04374', dot: 'rgba(192,67,116,0.16)' },
  frozen: { from: '#e9ebf8', to: '#cfd4ee', accent: '#4653b3', dot: 'rgba(70,83,179,0.16)' },
  household: { from: '#eef1f2', to: '#d5dcde', accent: '#5b6d76', dot: 'rgba(91,109,118,0.14)' },
  'personal-care': { from: '#f5e9f7', to: '#e6ccec', accent: '#7a35a1', dot: 'rgba(122,53,161,0.16)' },
  default: { from: '#eef4ec', to: '#d9e6d5', accent: '#4b8f4e', dot: 'rgba(75,143,78,0.15)' },
}

interface ProduceArtProps {
  emoji: string
  tone?: string
  className?: string
}

const DOT_POSITIONS = [
  [24, 30], [168, 26], [30, 172], [172, 172], [96, 20], [24, 96], [176, 96], [96, 178],
] as const

export function ProduceArt({ emoji, tone = 'default', className }: ProduceArtProps) {
  const gradientId = useId()
  const palette = palettes[tone] ?? palettes.default

  if (emoji === '🍫') {
    return <ChocolateArt className={className} />
  }

  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={cn('block h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow`} cx="0.5" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <rect width="200" height="200" fill={`url(#${gradientId})`} />
      <rect width="200" height="200" fill={`url(#${gradientId}-glow)`} />

      {DOT_POSITIONS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill={palette.dot} />
      ))}

      <circle cx="100" cy="162" r="52" fill="rgba(0,0,0,0.07)" />

      <text
        x="100"
        y="128"
        textAnchor="middle"
        fontSize="92"
        style={{ userSelect: 'none' }}
      >
        {emoji}
      </text>

      <circle cx="174" cy="26" r="13" fill={palette.accent} opacity="0.92" />
      <text
        x="174"
        y="31"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#fff"
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        100%
      </text>
    </svg>
  )
}

function ChocolateArt({ className }: { className?: string }) {
  const gradientId = useId()

  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={cn('block h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#faf0dd" />
          <stop offset="100%" stopColor="#f0dcb9" />
        </linearGradient>
        <radialGradient id={`${gradientId}-glow`} cx="0.5" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <linearGradient id={`${gradientId}-foil`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e5b45a" />
          <stop offset="100%" stopColor="#c08a2c" />
        </linearGradient>
        <linearGradient id={`${gradientId}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a2a16" />
          <stop offset="100%" stopColor="#2e1709" />
        </linearGradient>
      </defs>

      <rect width="200" height="200" fill={`url(#${gradientId})`} />
      <rect width="200" height="200" fill={`url(#${gradientId}-glow)`} />

      {DOT_POSITIONS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill="rgba(192,138,44,0.18)" />
      ))}

      <ellipse cx="104" cy="166" rx="52" ry="9" fill="rgba(0,0,0,0.08)" />

      <g transform="rotate(-8 100 104)">
        <rect x="58" y="52" width="84" height="104" rx="11" fill={`url(#${gradientId}-foil)`} />
        <rect x="64" y="58" width="16" height="92" rx="7" fill="rgba(255,255,255,0.22)" />
        <rect x="66" y="60" width="68" height="88" rx="7" fill={`url(#${gradientId}-bar)`} />
        <rect x="66" y="60" width="22" height="28" rx="7" fill="rgba(255,255,255,0.07)" />
        {[84, 102, 120].map((x) => (
          <line key={x} x1={x} y1="60" x2={x} y2="148" stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        ))}
        {[82, 104, 126].map((y) => (
          <line key={y} x1="66" y1={y} x2="134" y2={y} stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
        ))}
      </g>

      <g transform="rotate(24 150 138)">
        <rect x="141" y="129" width="18" height="22" rx="5" fill="rgba(0,0,0,0.12)" />
        <rect x="138" y="126" width="18" height="22" rx="5" fill="#3d2111" />
      </g>

      <circle cx="168" cy="34" r="13" fill="#c04374" opacity="0.92" />
      <text
        x="168"
        y="39"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill="#fff"
        style={{ fontFamily: 'Sora, sans-serif' }}
      >
        100%
      </text>
    </svg>
  )
}