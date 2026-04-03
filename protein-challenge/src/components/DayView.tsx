'use client'

import { useState, useRef } from 'react'
import { type DayData } from '@/lib/challengeData'
import { type ParticipantState, type MealEntry, ensureDayState, saveState } from '@/lib/store'
import { XP_REWARDS } from '@/lib/gamification'
import RewardUnlock from './RewardUnlock'
import MealRow from './MealRow'

interface Props {
  day: DayData
  state: ParticipantState
  onStateChange: (s: ParticipantState) => void
}

export default function DayView({ day, state, onStateChange }: Props) {
  const [localState, setLocalState] = useState(() => ensureDayState(state, day.num, day.checklist.length))
  const [showLesson, setShowLesson] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [facebookConfirmed, setFacebookConfirmed] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const dayState = localState.days[day.num]

  const update = (updatedState: ParticipantState) => {
    setLocalState(updatedState)
    onStateChange(updatedState)
  }

  const debouncedSave = (s: ParticipantState) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => { saveState(s) }, 500)
  }

  const updateMeal = (index: number, field: keyof MealEntry, value: string) => {
    const meals = [...(dayState.meals)]
    meals[index] = { ...meals[index], [field]: value }
    const mealBonus = field === 'food' && value.length > 2 && !dayState.meals[index].food ? XP_REWARDS.mealLogged : 0
    const updated: ParticipantState = {
      ...localState,
      xp: localState.xp + mealBonus,
      days: { ...localState.days, [day.num]: { ...dayState, meals } }
    }
    update(updated)
    debouncedSave(updated)
  }

  const updatePrompt = (id: string, value: string) => {
    const prompts = { ...(dayState.prompts || {}), [id]: value }
    const xpDelta = value.length > 5 && !(dayState.prompts?.[id]?.length > 5) ? 5 : 0
    const updated: ParticipantState = {
      ...localState,
      xp: localState.xp + xpDelta,
      days: { ...localState.days, [day.num]: { ...dayState, prompts } }
    }
    update(updated)
    debouncedSave(updated)
  }

  const updateCheckIn = (field: keyof typeof dayState.checkIn, value: string) => {
    const checkIn = { ...(dayState.checkIn || { win: '', easy: '', hard: '', improve: '' }), [field]: value }
    const wasEmpty = !dayState.checkIn?.[field]
    const xpDelta = wasEmpty && value.length > 5 ? XP_REWARDS.reflectionCompleted / 4 : 0
    const updated: ParticipantState = {
      ...localState,
      xp: localState.xp + xpDelta,
      days: { ...localState.days, [day.num]: { ...dayState, checkIn } }
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
      message: `You earned the ${day.rewardItem.name}! ${day.rewardItem.description} +${xpGain + day.rewardItem.xpValue} XP 🔥`,
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
    setShowReward(true)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 3000)
  }

  const claimFacebookBonus = () => {
    if (localState.facebookBonusClaimed) return
    const updated: ParticipantState = {
      ...localState,
      xp: localState.xp + XP_REWARDS.facebookPost,
      facebookPosted: true,
      facebookBonusClaimed: true,
      unlockedItems: Array.from(new Set([...localState.unlockedItems, 'social_wings'])),
      notifications: [...localState.notifications, {
        id: 'facebook-bonus',
        type: 'achievement' as const,
        title: 'Social Wings unlocked! 🦋',
        message: `You shared with the community! +${XP_REWARDS.facebookPost} XP earned!`,
        read: false,
        createdAt: new Date().toISOString(),
      }],
    }
    update(updated)
    saveState(updated)
    setFacebookConfirmed(true)
  }

  const dayColor = day.color
  const checkIn = dayState?.checkIn || { win: '', easy: '', hard: '', improve: '' }
  const prompts = dayState?.prompts || {}

  return (
    <div className="animate-slide-up">
      {/* Confetti */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="confetti-piece absolute" style={{
              left: `${Math.random() * 100}%`, top: `-10px`,
              background: ['#07b0a4','#C8F53A','#FF6B9D','#FF9A3C','#ffffff'][i % 5],
              animationDelay: `${Math.random() * 1}s`, animationDuration: `${1 + Math.random()}s`,
              width: `${6 + Math.random() * 8}px`, height: `${6 + Math.random() * 8}px`,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }} />
          ))}
        </div>
      )}

      {showReward && (
        <RewardUnlock item={day.rewardItem} xpGained={XP_REWARDS.dayCompleted + day.rewardItem.xpValue} onClose={() => setShowReward(false)} />
      )}

      {/* ── DAY HERO ── */}
      <div className="relative overflow-hidden px-4 pt-6 pb-6" style={{ background: `linear-gradient(135deg, ${dayColor}15, ${dayColor}05)` }}>
        <div className="flex items-start justify-between">
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
            <div className="flex items-center gap-1 bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">✓ Done!</div>
          )}
        </div>
      </div>

      <div className="px-4 space-y-4 mt-2">

        {/* ── LESSON ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
          <button onClick={() => setShowLesson(!showLesson)} className="w-full flex items-center justify-between p-4 text-left">
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

        {/* ── WORKBOOK SECTION ── */}
        {(day.workbookContent || (day.workbookPrompts && day.workbookPrompts.length > 0)) && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <span className="font-heading font-bold text-sm text-black">Your Workbook Tasks</span>
            </div>

            {/* Intro text */}
            {day.workbookContent?.intro && (
              <div className="bg-teal-50 border border-teal-100 rounded-2xl p-3">
                <p className="text-xs text-teal-800 leading-relaxed">{day.workbookContent.intro}</p>
              </div>
            )}

            {/* Items list (breakfast ideas, meal examples, etc.) */}
            {day.workbookContent?.items && day.workbookContent.items.length > 0 && (
              <div className="bg-gray-50 rounded-2xl p-3 space-y-1.5">
                {day.workbookContent.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-teal-500 flex-shrink-0 mt-0.5">•</span>
                    <span className="text-xs text-gray-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Prompts */}
            {day.workbookPrompts?.map(prompt => {
              if (prompt.type === 'list' && prompt.count) {
                return (
                  <div key={prompt.id}>
                    <div className="text-xs font-bold text-gray-600 mb-2">{prompt.label}</div>
                    <div className="space-y-2">
                      {Array.from({ length: prompt.count }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 w-4 flex-shrink-0">{i + 1}.</span>
                          <input
                            type="text"
                            value={prompts[`${prompt.id}_${i}`] || ''}
                            onChange={e => updatePrompt(`${prompt.id}_${i}`, e.target.value)}
                            placeholder={prompt.placeholder || ''}
                            className="flex-1 text-xs border border-gray-100 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors placeholder:text-gray-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )
              }
              if (prompt.type === 'textarea') {
                return (
                  <div key={prompt.id}>
                    <div className="text-xs font-bold text-gray-600 mb-1.5">{prompt.label}</div>
                    <textarea
                      value={prompts[prompt.id] || ''}
                      onChange={e => updatePrompt(prompt.id, e.target.value)}
                      placeholder={prompt.placeholder || ''}
                      rows={2}
                      className="w-full text-xs border border-gray-100 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors resize-none placeholder:text-gray-300 leading-relaxed"
                    />
                  </div>
                )
              }
              return (
                <div key={prompt.id}>
                  <div className="text-xs font-bold text-gray-600 mb-1.5">{prompt.label}</div>
                  <input
                    type="text"
                    value={prompts[prompt.id] || ''}
                    onChange={e => updatePrompt(prompt.id, e.target.value)}
                    placeholder={prompt.placeholder || ''}
                    className="w-full text-xs border border-gray-100 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors placeholder:text-gray-300"
                  />
                </div>
              )
            })}
          </div>
        )}

        {/* ── MEAL LOG ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🥩</span>
            <span className="font-heading font-bold text-sm text-black">Today&apos;s Meals</span>
          </div>
          <div className="space-y-3">
            {(dayState?.meals || []).map((meal, i) => (
              <MealRow key={i} meal={meal} onUpdate={(field, value) => updateMeal(i, field, value)} />
            ))}
          </div>
          {(() => {
            const total = (dayState?.meals || []).reduce((sum, m) => sum + (parseFloat(m.protein) || 0), 0)
            return total > 0 ? (
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="text-xs font-bold text-teal-600">~{Math.round(total)}g protein today</span>
                <span className="text-[10px] text-gray-300">AI estimate — not exact</span>
              </div>
            ) : null
          })()}
          <div className="mt-3 p-3 rounded-2xl bg-teal-50 border border-teal-100">
            <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1">💡 Tip</div>
            <p className="text-xs text-teal-700 leading-relaxed whitespace-pre-line">{day.proteinTip}</p>
          </div>
        </div>

        {/* ── DAILY CHECK-IN (not on Day 7 — has its own reflection prompts) ── */}
        {day.num !== 7 && <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✍️</span>
            <div>
              <div className="font-heading font-bold text-sm text-black">Daily Check-In</div>
              <div className="text-[10px] text-gray-400">Take 2 minutes at the end of each day</div>
            </div>
            <span className="ml-auto text-[10px] text-gray-300">+XP when you write</span>
          </div>

          {[
            { field: 'win' as const, label: "Today's win 🏆", placeholder: 'e.g. I packed my lunch / I had protein at breakfast...' },
            { field: 'easy' as const, label: 'What felt easy today:', placeholder: 'e.g. Breakfast was easy / having eggs ready helped...' },
            { field: 'hard' as const, label: 'What felt hard today:', placeholder: 'e.g. I forgot to prep lunch / dinner felt rushed...' },
            { field: 'improve' as const, label: 'What I want to improve tomorrow:', placeholder: 'e.g. Bring a protein snack to work...' },
          ].map(({ field, label, placeholder }) => (
            <div key={field}>
              <div className="text-xs font-bold text-gray-600 mb-1.5">{label}</div>
              <textarea
                value={checkIn[field] || ''}
                onChange={e => updateCheckIn(field, e.target.value)}
                placeholder={placeholder}
                rows={2}
                className="w-full text-xs border border-gray-100 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors resize-none placeholder:text-gray-300 leading-relaxed"
              />
            </div>
          ))}
        </div>}

        {/* ── FACEBOOK BONUS ── */}
        {!localState.facebookBonusClaimed && (
          <div className="bg-white rounded-3xl border-2 border-dashed border-pink-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🦋</span>
              <span className="font-heading font-bold text-sm text-black">Bonus XP — Share in the group!</span>
              <span className="ml-auto text-xs font-bold text-pink bg-pink-50 px-2 py-1 rounded-full">+{XP_REWARDS.facebookPost} XP</span>
            </div>
            <p className="text-xs text-gray-500 mb-3 leading-relaxed">Share today&apos;s win in the Facebook group and unlock the <strong>Social Wings</strong> badge 🦋</p>
            <div className="flex gap-2">
              <a href="https://www.facebook.com/groups/4378612459123843" target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center text-xs font-bold py-2.5 rounded-xl bg-[#1877F2] text-white hover:opacity-90 transition-opacity">
                Open Facebook Group →
              </a>
              {!facebookConfirmed ? (
                <button onClick={claimFacebookBonus} className="flex-1 text-xs font-bold py-2.5 rounded-xl border-2 border-pink-200 text-pink hover:bg-pink-50 transition-colors">
                  ✓ I posted!
                </button>
              ) : (
                <div className="flex-1 text-xs font-bold py-2.5 rounded-xl bg-teal-50 text-teal-600 text-center">🦋 Unlocked!</div>
              )}
            </div>
          </div>
        )}

        {/* ── MARK COMPLETE ── */}
        {!dayState?.completed ? (
          <button onClick={markComplete}
            className="w-full py-4 rounded-3xl font-heading font-extrabold text-black text-base tracking-wide transition-all hover:shadow-teal-lg active:scale-95 mb-4"
            style={{ background: `linear-gradient(135deg, ${dayColor}, #C8F53A)` }}>
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
