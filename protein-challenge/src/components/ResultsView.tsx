'use client'
import { type ParticipantState } from '@/lib/store'
import { CHALLENGE_DAYS } from '@/lib/challengeData'
import { getLevelFromXP } from '@/lib/gamification'

interface Props { state: ParticipantState }

export default function ResultsView({ state }: Props) {
  const level = getLevelFromXP(state.xp)
  const completedDays = CHALLENGE_DAYS.filter(d => state.days[d.num]?.completed).length
  const totalProtein = Object.values(state.days).reduce((sum, d) => sum + (d.proteinTotal || 0), 0)
  const avgProtein = completedDays > 0 ? Math.round(totalProtein / Math.max(1, Object.values(state.days).filter(d => d.proteinTotal > 0).length)) : 0
  const totalChecked = Object.values(state.days).reduce((sum, d) => sum + (d.checklist?.filter(Boolean).length || 0), 0)
  const unlockedCount = state.unlockedItems.length

  return (
    <div className="animate-slide-up px-4 pt-6 pb-6 space-y-5">
      {/* Print button */}
      <div className="flex items-center justify-between no-print">
        <h2 className="font-heading font-extrabold text-2xl text-black">Your Results 🏅</h2>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-teal-200 text-teal-600 text-xs font-bold hover:bg-teal-50 transition-colors"
        >
          📄 Download PDF
        </button>
      </div>

      {/* Print header (hidden on screen) */}
      <div className="print-only hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12">
            <svg viewBox="0 0 100 120" fill="none"><ellipse cx="50" cy="95" rx="32" ry="5" fill="#e0e0e0"/><circle cx="50" cy="58" r="32" fill="#1A1A1A"/><rect x="37" y="12" width="26" height="18" rx="13" fill="#1A1A1A"/></svg>
          </div>
          <div><div className="font-bold text-2xl tracking-widest uppercase">GRIND LAB</div><div className="text-sm tracking-widest uppercase text-gray-500">FITNESS</div></div>
        </div>
        <h1 className="text-3xl font-bold mb-1">7-Day Protein Jumpstart Results</h1>
        <p className="text-gray-500">Completed by {state.name} · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <hr className="my-4" />
      </div>

      {/* Hero card */}
      <div className="rounded-4xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #07b0a4, #0a5c57)' }}>
        <div className="p-6 text-white text-center">
          <div className="text-5xl mb-2">{level.emoji}</div>
          <div className="font-heading font-extrabold text-2xl">{state.name}</div>
          <div className="text-teal-200 font-semibold mb-4">{level.title}</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: `${state.xp}`, label: 'Total XP' },
              { val: `${completedDays}/7`, label: 'Days Done' },
              { val: `${unlockedCount}`, label: 'Items Earned' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-heading font-extrabold text-2xl text-lime">{s.val}</div>
                <div className="text-xs text-teal-200 font-semibold uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { val: `${avgProtein}g`, label: 'Avg daily protein', icon: '💪', color: '#07b0a4' },
          { val: totalChecked, label: 'Total habits hit', icon: '✅', color: '#C8F53A' },
          { val: state.questions.length, label: 'Questions asked', icon: '💬', color: '#FF6B9D' },
          { val: state.facebookPosted ? '✓ Yes!' : 'Not yet', label: 'Facebook bonus', icon: '🦋', color: '#07b0a4' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-3xl border border-gray-100 shadow-card p-4 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className="font-heading font-extrabold text-lg" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide leading-tight">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Day-by-day breakdown */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4 space-y-3">
        <div className="font-heading font-bold text-sm text-black">Day-by-Day Summary</div>
        {CHALLENGE_DAYS.map(d => {
          const ds = state.days[d.num]
          const done = ds?.completed
          const checked = ds?.checklist?.filter(Boolean).length || 0
          const protein = ds?.proteinTotal || 0
          return (
            <div key={d.num} className={`rounded-2xl p-3 border ${done ? 'border-teal-100 bg-teal-50' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-base">{d.emoji}</span>
                  <div>
                    <div className="font-semibold text-xs text-black">Day {d.num}: {d.title}</div>
                    <div className="text-[10px] text-gray-400">{d.subtitle}</div>
                  </div>
                </div>
                {done ? (
                  <div className="flex items-center gap-1 text-teal-500 text-xs font-bold">{d.rewardItem.emoji} Unlocked</div>
                ) : (
                  <div className="text-gray-300 text-xs">Not completed</div>
                )}
              </div>
              {done && (
                <div className="flex gap-3 text-[10px] text-gray-500 pl-7">
                  <span>💪 {Math.round(protein)}g protein</span>
                  <span>✅ {checked}/{d.checklist.length} habits</span>
                  {ds?.notes?.trim() && <span>📝 Notes added</span>}
                </div>
              )}
              {done && ds?.notes?.trim() && (
                <div className="mt-2 pl-7 text-xs text-gray-500 italic leading-relaxed border-l-2 border-teal-200 ml-7">
                  &ldquo;{ds.notes.trim().slice(0, 120)}{ds.notes.trim().length > 120 ? '...' : ''}&rdquo;
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Collected items */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
        <div className="font-heading font-bold text-sm text-black mb-3">🎒 Items Collected</div>
        <div className="flex flex-wrap gap-2">
          {[...CHALLENGE_DAYS.map(d => d.rewardItem), { id: 'social_wings', name: 'Social Wings', emoji: '🦋', description: '' }].map(item => {
            const unlocked = state.unlockedItems.includes(item.id)
            return (
              <div key={item.id} className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold ${unlocked ? 'border-teal-200 bg-teal-50 text-teal-700' : 'border-gray-100 text-gray-300'}`}>
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Coach message */}
      <div className="rounded-3xl p-5 border-2 border-teal-100 bg-teal-50">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">GL</div>
          <div>
            <div className="font-heading font-bold text-sm text-black mb-1">A message from your coach</div>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              &ldquo;Ok yes — YOU DID IT!! I am so incredibly proud of you!! Look at that!! You showed up, you learned, you built something real. This is just the beginning. Have you thought about 1-1 coaching? I can help you take everything you built this week and make it really stick — and you will be SO PLEASED with what&apos;s possible!! 💙&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Print trigger */}
      <button
        onClick={() => window.print()}
        className="w-full py-4 rounded-3xl font-heading font-extrabold text-black text-sm tracking-wide no-print"
        style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
      >
        📄 Download My Results as PDF
      </button>
    </div>
  )
}
