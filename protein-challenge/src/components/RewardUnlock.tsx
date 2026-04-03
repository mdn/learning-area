'use client'
import { type RewardItem } from '@/lib/challengeData'

interface Props {
  item: RewardItem
  xpGained: number
  onClose: () => void
}

export default function RewardUnlock({ item, xpGained, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="bg-white rounded-4xl p-8 max-w-sm w-full text-center animate-bounce-in shadow-teal-lg">
        {/* Glow ring */}
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 rounded-full animate-spin-slow opacity-30"
            style={{ background: 'conic-gradient(from 0deg, #07b0a4, #C8F53A, #FF6B9D, #07b0a4)', filter: 'blur(8px)', transform: 'scale(1.3)' }} />
          <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center text-5xl shadow-card-hover border-4 border-teal-100">
            {item.emoji}
          </div>
        </div>

        <div className="inline-flex items-center gap-1 bg-lime/20 text-lime-800 font-bold text-xs px-3 py-1 rounded-full mb-3 border border-lime/40">
          🔓 NEW ITEM UNLOCKED
        </div>

        <h2 className="font-heading font-extrabold text-2xl text-black mb-1">{item.name}</h2>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{item.description}</p>

        <div className="bg-teal-50 rounded-2xl px-4 py-3 mb-5">
          <div className="font-heading font-bold text-teal-600 text-lg">+{xpGained} XP</div>
          <div className="text-xs text-teal-500">added to your profile</div>
        </div>

        <div className="text-base text-gray-600 leading-relaxed mb-6 italic">
          &ldquo;I am SO proud of you!! Yay!!! You are absolutely heading in the right direction!! Keep going!! 💙&rdquo;
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl font-heading font-extrabold text-black text-sm tracking-wide"
          style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
        >
          Let&apos;s keep going! →
        </button>
      </div>
    </div>
  )
}
