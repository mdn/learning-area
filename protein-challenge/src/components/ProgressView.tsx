'use client'
import { type ParticipantState } from '@/lib/store'
import { CHALLENGE_DAYS } from '@/lib/challengeData'
import { getLevelFromXP, LEVELS, XP_REWARDS } from '@/lib/gamification'

interface Props {
  state: ParticipantState
  onNavigateDay: (n: number) => void
}

export default function ProgressView({ state, onNavigateDay }: Props) {
  const level = getLevelFromXP(state.xp)
  const completedDays = Object.values(state.days).filter(d => d.completed).length
  const totalChecked = Object.values(state.days).reduce((sum, d) => sum + (d.checklist?.filter(Boolean).length || 0), 0)
  const avgProtein = Object.values(state.days).filter(d => d.proteinTotal > 0).reduce((sum, d, _, arr) => sum + d.proteinTotal / arr.length, 0)

  return (
    <div className="animate-slide-up px-4 pt-6 pb-6 space-y-4">
      <h2 className="font-heading font-extrabold text-2xl text-black">Your Progress 📊</h2>

      {/* Level card */}
      <div className="rounded-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #07b0a4, #0a5c57)' }}>
        <div className="p-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs opacity-70 font-semibold mb-1">CURRENT LEVEL</div>
              <div className="font-heading font-extrabold text-2xl">{level.emoji} {level.title}</div>
            </div>
            <div className="text-right">
              <div className="font-heading font-extrabold text-3xl">{state.xp}</div>
              <div className="text-xs opacity-70">Total XP</div>
            </div>
          </div>
          {/* Level progress */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs opacity-70">
              <span>Level {level.num}</span>
              <span>Level {Math.min(level.num + 1, LEVELS.length)}</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(100, ((state.xp - level.minXP) / (level.maxXP - level.minXP)) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { val: completedDays, label: 'Days Done', icon: '🏆', color: '#07b0a4' },
          { val: `${Math.round(avgProtein)}g`, label: 'Avg Protein', icon: '💪', color: '#C8F53A' },
          { val: totalChecked, label: 'Habits Hit', icon: '✅', color: '#FF6B9D' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-card p-3 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-heading font-extrabold text-xl" style={{ color: s.color }}>{s.val}</div>
            <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Protein bar chart */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-heading font-bold text-sm text-black">Daily Protein</span>
          <span className="text-xs text-gray-400">Goal: {state.proteinGoal}g</span>
        </div>
        <div className="flex items-end gap-2 h-28">
          {CHALLENGE_DAYS.map(d => {
            const dayData = state.days[d.num]
            const protein = dayData?.proteinTotal || 0
            const pct = Math.min(100, (protein / state.proteinGoal) * 100)
            const hit = protein >= state.proteinGoal
            const done = dayData?.completed
            return (
              <button
                key={d.num}
                onClick={() => onNavigateDay(d.num)}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <span className="text-[9px] text-gray-400 font-bold">{protein > 0 ? `${Math.round(protein)}g` : ''}</span>
                <div className="w-full rounded-t-lg relative overflow-hidden" style={{ height: `${Math.max(4, pct)}%`, background: hit ? 'linear-gradient(180deg, #07b0a4, #0ecfc1)' : done ? '#e0e0e0' : '#f0fdfb', transition: 'height 0.8s ease', minHeight: '6px' }}>
                  {hit && <div className="absolute inset-0 shimmer" />}
                </div>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {done ? '✓' : d.num}
                </div>
              </button>
            )
          })}
        </div>
        {/* Goal line label */}
        <div className="flex items-center gap-2 mt-2">
          <div className="h-px flex-1 border-t-2 border-dashed border-teal-200" />
          <span className="text-[10px] text-teal-400 font-semibold">Goal line</span>
        </div>
      </div>

      {/* Unlocked items */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
        <div className="font-heading font-bold text-sm text-black mb-3">🎒 Your Collection</div>
        <div className="flex flex-wrap gap-2">
          {CHALLENGE_DAYS.map(d => {
            const unlocked = state.unlockedItems.includes(d.rewardItem.id)
            return (
              <div key={d.rewardItem.id} className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all ${unlocked ? 'border-teal-200 bg-teal-50' : 'border-gray-100 bg-gray-50 opacity-40'}`}>
                <span className="text-2xl">{d.rewardItem.emoji}</span>
                <span className="text-[9px] font-bold text-center leading-tight text-gray-600 max-w-[56px]">{d.rewardItem.name}</span>
              </div>
            )
          })}
          <div className={`flex flex-col items-center gap-1 p-3 rounded-2xl border transition-all ${state.unlockedItems.includes('social_wings') ? 'border-pink-200 bg-pink-50' : 'border-gray-100 bg-gray-50 opacity-40'}`}>
            <span className="text-2xl">🦋</span>
            <span className="text-[9px] font-bold text-center leading-tight text-gray-600 max-w-[56px]">Social Wings</span>
          </div>
        </div>
      </div>

      {/* XP breakdown */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
        <div className="font-heading font-bold text-sm text-black mb-3">⚡ XP Opportunities</div>
        <div className="space-y-2">
          {[
            { label: 'Log a meal', xp: XP_REWARDS.mealLogged },
            { label: 'Check a habit', xp: XP_REWARDS.checklistItem },
            { label: 'Write reflection (20+ chars)', xp: XP_REWARDS.reflectionCompleted },
            { label: 'Hit protein goal', xp: XP_REWARDS.goalHit },
            { label: 'Complete a day', xp: XP_REWARDS.dayCompleted },
            { label: 'Post in Facebook group', xp: XP_REWARDS.facebookPost },
            { label: 'Ask a question', xp: XP_REWARDS.questionAsked },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between text-xs">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-bold text-teal-600">+{item.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
