'use client'
import { type Level } from '@/lib/gamification'

interface Props {
  xp: number
  level: Level
  progress: number
  toNext: number
}

export default function XPBar({ xp, level, progress, toNext }: Props) {
  return (
    <div className="max-w-lg mx-auto px-4 pb-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold" style={{ color: level.color }}>{level.emoji}</span>
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, #07b0a4, ${level.color})` }}
          />
        </div>
        <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap">{xp} XP {toNext > 0 ? `· ${toNext} to next` : '· MAX'}</span>
      </div>
    </div>
  )
}
