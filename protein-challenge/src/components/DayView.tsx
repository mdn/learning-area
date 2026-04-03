'use client'

import { useState, useEffect, useRef } from 'react'
import { type DayData } from '@/lib/challengeData'
import { type ParticipantState, type MealEntry, ensureDayState, calcProteinTotal, saveState, type Question } from '@/lib/store'
import { XP_REWARDS } from '@/lib/gamification'
import RewardUnlock from './RewardUnlock'
import AIChat from './AIChat'

interface Props {
  day: DayData
  state: ParticipantState
  onStateChange: (s: ParticipantState) => void
}

export default function DayView({ day, state, onStateChange }: Props) {
  const [localState, setLocalState] = useState(() => ensureDayState(state, day.num, day.checklist.length))
  const [showLesson, setShowLesson] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [facebookConfirmed, setFacebookConfirmed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const dayState = localState.days[day.num]
  const protein = calcProteinTotal(dayState?.meals || [])
  const goalHit = protein >= localState.proteinGoal
  const checklistCount = (dayState?.checklist || []).filter(Boolean).length
  const totalChecklistItems = day.checklist.length

  const update = (updatedState: ParticipantState) => {
    setLocalState(updatedState)
    onStateChange(updatedState)
  }

  // Debounced save
  const debouncedSave = (s: ParticipantState) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => { saveState(s) }, 300)
  }

  const updateMeal = (index: number, field: keyof MealEntry, value: string) => {
    const meals = [...(dayState.meals)]
    meals[index] = { ...meals[index], [field]: value }
    const total = calcProteinTotal(meals)
    const hit = total >= localState.proteinGoal
    const hitBonus = hit && !dayState.goalHit ? XP_REWARDS.goalHit : 0
    const mealBonus = field === 'food' && value.length > 2 && !dayState.meals[index].food ? XP_REWARDS.mealLogged : 0
    const updated: ParticipantState = {
      ...localState,
      xp: localState.xp + hitBonus + mealBonus,
      days: { ...localState.days, [day.num]: { ...dayState, meals, proteinTotal: total, goalHit: hit } }
    }
    update(updated)
    debouncedSave(updated)
  }

  const toggleChecklist = (i: number) => {
    const checklist = [...(dayState.checklist)]
    const wasChecked = checklist[i]
    checklist[i] = !wasChecked
    const xpDelta = wasChecked ? -XP_REWARDS.checklistItem : XP_REWARDS.checklistItem
    const updated: ParticipantState = {
      ...localState,
      xp: Math.max(0, localState.xp + xpDelta),
      days: { ...localState.days, [day.num]: { ...dayState, checklist } }
    }
    update(updated)
    debouncedSave(updated)
  }

  const updateNotes = (notes: string) => {
    const hasContent = notes.trim().length > 20
    const hadContent = (dayState.notes || '').trim().length > 20
    const xpDelta = hasContent && !hadContent ? XP_REWARDS.reflectionCompleted : 0
    const updated: ParticipantState = {
      ...localState,
      xp: localState.xp + xpDelta,
      days: { ...localState.days, [day.num]: { ...dayState, notes } }
    }
    update(updated)
    debouncedSave(updated)
  }

  const markComplete = () => {
    if (dayState.completed) return
    const xpGain = XP_REWARDS.dayCompleted
    const notification = {
      id: `day-${day.num}-complete`,
      type: 'achievement' as const,
      title: `Day ${day.num} complete! ${day.rewardItem.emoji}`,
      message: `You earned the ${day.rewardItem.name}! ${day.rewardItem.description} +${xpGain + (day.rewardItem.xpValue)} XP 🔥`,
      read: false,
      createdAt: new Date().toISOString(),
    }
    const updated: ParticipantState = {
      ...localState,
      xp: localState.xp + xpGain + day.rewardItem.xpValue,
      unlockedItems: Array.from(new Set([...localState.unlockedItems, day.rewardItem.id])),
      notifications: [...localState.notifications, notification],
      days: { ...localState.days, [day.num]: { ...dayState, completed: true, completedAt: new Date().toISOString() } }
    }
    update(updated)
    saveState(updated)
    setJustCompleted(true)
    setShowReward(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3000)
  }

  const claimFacebookBonus = () => {
    if (localState.facebookBonusClaimed) return
    const notification = {
      id: 'facebook-bonus',
      type: 'achievement' as const,
      title: 'Social Wings unlocked! 🦋',
      message: `You shared with the community! That takes courage. +${XP_REWARDS.facebookPost} XP earned!`,
      read: false,
      createdAt: new Date().toISOString(),
    }
    const updated: ParticipantState = {
      ...localState,
      xp: localState.xp + XP_REWARDS.facebookPost,
      facebookPosted: true,
      facebookBonusClaimed: true,
      unlockedItems: Array.from(new Set([...localState.unlockedItems, 'social_wings'])),
      notifications: [...localState.notifications, notification],
    }
    update(updated)
    saveState(updated)
    setFacebookConfirmed(true)
  }

  const dayColor = day.color
  const isLimeDay = day.color === '#C8F53A'

  return (
    <div className="animate-slide-up">
      {/* Confetti */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                background: ['#07b0a4','#C8F53A','#FF6B9D','#FF9A3C','#ffffff'][i % 5],
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${1 + Math.random()}s`,
                width: `${6 + Math.random() * 8}px`,
                height: `${6 + Math.random() * 8}px`,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          ))}
        </div>
      )}

      {/* Reward Modal */}
      {showReward && (
        <RewardUnlock
          item={day.rewardItem}
          xpGained={XP_REWARDS.dayCompleted + day.rewardItem.xpValue}
          onClose={() => setShowReward(false)}
        />
      )}

      {/* ── DAY HERO ── */}
      <div className="relative overflow-hidden px-4 pt-6 pb-8"
        style={{ background: `linear-gradient(135deg, ${dayColor}15, ${dayColor}05)` }}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm"
              style={{ background: dayColor + '20', border: `1.5px solid ${dayColor}40` }}>
              {day.emoji}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest" style={{ color: dayColor }}>Day {day.num} · {day.subtitle}</div>
              <h1 className="font-heading font-extrabold text-xl text-black leading-tight">{day.title}</h1>
            </div>
          </div>
          {dayState?.completed && (
            <div className="flex items-center gap-1 bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              ✓ Done!
            </div>
          )}
        </div>

        {/* Mini stats row */}
        <div className="flex gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-600 border border-white">
            <span>💪</span> {protein}g / {localState.proteinGoal}g protein
          </div>
          <div className="flex items-center gap-1.5 bg-white/80 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-600 border border-white">
            <span>✅</span> {checklistCount}/{totalChecklistItems} tasks
          </div>
          {goalHit && (
            <div className="flex items-center gap-1.5 bg-teal-500 text-white rounded-xl px-3 py-1.5 text-xs font-bold animate-bounce-in">
              🎯 Goal hit!
            </div>
          )}
        </div>
      </div>

      <div className="px-4 space-y-4 -mt-2">

        {/* ── LESSON ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
          <button
            onClick={() => setShowLesson(!showLesson)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">📖</span>
              <div>
                <div className="font-heading font-bold text-sm text-black">Today&apos;s Lesson</div>
                <div className="text-xs text-gray-400">{showLesson ? 'Tap to collapse' : 'Tap to read'}</div>
              </div>
            </div>
            <span className="text-gray-300 text-lg transition-transform duration-200" style={{ transform: showLesson ? 'rotate(180deg)' : 'none' }}>⌄</span>
          </button>
          {showLesson && (
            <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed space-y-3 border-t border-gray-50 pt-3 animate-slide-up">
              {day.lesson.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
            </div>
          )}
        </div>

        {/* ── CHALLENGE TASK ── */}
        <div className="rounded-3xl p-4 border-2" style={{ background: dayColor + '10', borderColor: dayColor + '30' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎯</span>
            <span className="font-heading font-bold text-sm text-black">Today&apos;s Challenge</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mb-3">{day.challengeTask}</p>
          <div className="bg-white/70 rounded-2xl px-3 py-2.5 flex items-start gap-2">
            <span className="text-lg flex-shrink-0">💡</span>
            <p className="text-xs text-gray-600 leading-relaxed italic">{day.keyInsight}</p>
          </div>
        </div>

        {/* ── PROTEIN TRACKER ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥩</span>
              <span className="font-heading font-bold text-sm text-black">Protein Tracker</span>
            </div>
            <div className="flex items-center gap-2">
              {day.num === 2 && (
                <input
                  type="number"
                  min={50} max={300}
                  value={localState.proteinGoal}
                  onChange={e => {
                    const g = parseInt(e.target.value) || 100
                    const updated = { ...localState, proteinGoal: g }
                    update(updated)
                    debouncedSave(updated)
                  }}
                  className="w-20 text-xs border border-teal-200 rounded-xl px-2 py-1.5 text-center font-bold text-teal-600 focus:outline-none focus:border-teal-400"
                  placeholder="goal"
                />
              )}
              <div className="text-right">
                <span className="text-xl font-heading font-extrabold" style={{ color: goalHit ? '#07b0a4' : '#1A1A1A' }}>{Math.round(protein)}</span>
                <span className="text-xs text-gray-400">/{localState.proteinGoal}g</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-100 rounded-full mb-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (protein / localState.proteinGoal) * 100)}%`, background: goalHit ? 'linear-gradient(90deg, #07b0a4, #C8F53A)' : 'linear-gradient(90deg, #07b0a4, #0ecfc1)' }}
            />
          </div>

          {/* Meal rows */}
          <div className="space-y-2">
            {(dayState?.meals || []).map((meal, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-16 text-xs font-semibold text-gray-400 flex-shrink-0">{meal.name}</div>
                <input
                  type="text"
                  value={meal.food}
                  onChange={e => updateMeal(i, 'food', e.target.value)}
                  placeholder="What did you have?"
                  className="flex-1 text-xs border border-gray-100 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors placeholder:text-gray-300"
                />
                <div className="relative flex-shrink-0">
                  <input
                    type="number"
                    min={0} max={200}
                    value={meal.protein}
                    onChange={e => updateMeal(i, 'protein', e.target.value)}
                    placeholder="0"
                    className="w-14 text-xs border border-gray-100 rounded-xl px-2 py-2 text-center bg-gray-50 focus:outline-none focus:border-teal-300 transition-colors"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-gray-300 pointer-events-none">g</span>
                </div>
              </div>
            ))}
          </div>

          {/* Protein tip */}
          <div className="mt-3 p-3 rounded-2xl bg-teal-50 border border-teal-100">
            <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1">💡 Coach tip</div>
            <p className="text-xs text-teal-700 leading-relaxed whitespace-pre-line">{day.proteinTip}</p>
          </div>
        </div>

        {/* ── HABIT CHECKLIST ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">✅</span>
            <span className="font-heading font-bold text-sm text-black">Daily Habits</span>
            <span className="ml-auto text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">{checklistCount}/{totalChecklistItems}</span>
          </div>
          <div className="space-y-2">
            {day.checklist.map((item, i) => {
              const checked = dayState?.checklist?.[i] || false
              return (
                <button
                  key={i}
                  onClick={() => toggleChecklist(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${checked ? 'border-teal-200 bg-teal-50' : 'border-gray-100 hover:border-teal-100 hover:bg-gray-50'}`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${checked ? 'bg-teal-500 border-teal-500' : 'border-gray-200'}`}>
                    {checked && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className={`text-xs leading-snug ${checked ? 'text-teal-700 line-through opacity-70' : 'text-gray-700'}`}>{item}</span>
                  {checked && <span className="ml-auto text-[10px] text-teal-400 font-semibold whitespace-nowrap">+{XP_REWARDS.checklistItem} XP</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── REFLECTION ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">📝</span>
            <span className="font-heading font-bold text-sm text-black">Reflection</span>
            <span className="ml-auto text-[10px] text-gray-300">+{XP_REWARDS.reflectionCompleted} XP when you write</span>
          </div>
          <p className="text-xs text-gray-400 italic mb-2">{day.reflectionPrompt}</p>
          <textarea
            value={dayState?.notes || ''}
            onChange={e => updateNotes(e.target.value)}
            placeholder="Write your thoughts here... there's no wrong answer 💙"
            rows={4}
            className="w-full text-sm border border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors resize-none placeholder:text-gray-300 leading-relaxed"
          />
        </div>

        {/* ── FACEBOOK BONUS ── */}
        {!localState.facebookBonusClaimed && (
          <div className="bg-white rounded-3xl border-2 border-dashed border-pink-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🦋</span>
              <span className="font-heading font-bold text-sm text-black">Bonus XP — Facebook Group!</span>
              <span className="ml-auto text-xs font-bold text-pink bg-pink-50 px-2 py-1 rounded-full">+{XP_REWARDS.facebookPost} XP</span>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">Share today&apos;s win or question in the Facebook group and unlock the <strong>Social Wings</strong> badge 🦋</p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/groups/4378612459123843"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-xs font-bold py-2.5 rounded-xl bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
              >
                Open Facebook Group →
              </a>
              {!facebookConfirmed ? (
                <button
                  onClick={claimFacebookBonus}
                  className="flex-1 text-xs font-bold py-2.5 rounded-xl border-2 border-pink-200 text-pink hover:bg-pink-50 transition-colors"
                >
                  ✓ I posted!
                </button>
              ) : (
                <div className="flex-1 text-xs font-bold py-2.5 rounded-xl bg-teal-50 text-teal-600 text-center">
                  🦋 Unlocked!
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── AI CHAT ── */}
        <AIChat state={localState} dayNum={day.num} onStateChange={update} />

        {/* ── MARK COMPLETE ── */}
        {!dayState?.completed ? (
          <button
            onClick={markComplete}
            className="w-full py-4 rounded-3xl font-heading font-extrabold text-black text-base tracking-wide transition-all hover:shadow-teal-lg active:scale-95 mb-4"
            style={{ background: `linear-gradient(135deg, ${dayColor}, #C8F53A)` }}
          >
            🎉 Mark Day {day.num} Complete — Unlock {day.rewardItem.emoji}
          </button>
        ) : (
          <div className="w-full py-4 rounded-3xl font-heading font-bold text-center text-teal-700 bg-teal-50 border-2 border-teal-200 mb-4">
            ✓ Day {day.num} Complete · {day.rewardItem.emoji} {day.rewardItem.name} Unlocked!
          </div>
        )}

      </div>
    </div>
  )
}
