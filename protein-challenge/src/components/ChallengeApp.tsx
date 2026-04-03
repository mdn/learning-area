'use client'

import { useState, useEffect } from 'react'
import { type ParticipantState, saveState } from '@/lib/store'
import { CHALLENGE_DAYS } from '@/lib/challengeData'
import { getLevelFromXP, getXPProgressInLevel, getXPToNextLevel } from '@/lib/gamification'
import DayView from './DayView'
import ProgressView from './ProgressView'
import ResultsView from './ResultsView'
import AvatarView from './AvatarView'
import NotificationBell from './NotificationBell'
import XPBar from './XPBar'
import Logo from './Logo'

interface Props {
  initialState: ParticipantState
  onStateChange: (s: ParticipantState) => void
}

export default function ChallengeApp({ initialState, onStateChange }: Props) {
  const [state, setState] = useState(initialState)
  const [view, setView] = useState<string>(initialState.currentView || 'day-1')

  const update = (newState: ParticipantState) => {
    setState(newState)
    onStateChange(newState)
  }

  const changeView = (v: string) => {
    setView(v)
    update({ ...state, currentView: v })
  }

  const level = getLevelFromXP(state.xp)
  const xpProgress = getXPProgressInLevel(state.xp)
  const xpToNext = getXPToNextLevel(state.xp)
  const firstName = state.name.split(' ')[0]

  // Which day is "current" based on startDate
  const today = new Date()
  const start = new Date(state.startDate)
  const daysSinceStart = Math.max(0, Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
  const currentDayNum = Math.min(7, daysSinceStart + 1)

  const completedDays = Object.values(state.days).filter(d => d.completed).length
  const unreadNotifs = state.notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* ── TOP HEADER ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell
              notifications={state.notifications}
              onRead={(id) => {
                const notifs = state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
                update({ ...state, notifications: notifs })
              }}
            />
            <div className="text-right">
              <div className="text-xs text-gray-400 font-medium">Hey, {firstName}! 👋</div>
              <div className="text-xs font-bold" style={{ color: level.color }}>{level.emoji} {level.title}</div>
            </div>
            <button onClick={() => changeView('avatar')} className="w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 border-teal-200 bg-teal-50 hover:border-teal-400 transition-colors flex-shrink-0">
              {state.avatarUrl ? (
                <img src={state.avatarUrl} alt="You" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{['🧘‍♀️','💪','🌟','🦋','🔥','💎','🌸','⚡'][parseInt(state.avatarId.split('_')[1] || '1') - 1]}</span>
              )}
            </button>
          </div>
        </div>

        {/* XP Bar */}
        <XPBar xp={state.xp} level={level} progress={xpProgress} toNext={xpToNext} />

        {/* Day dots */}
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="flex items-center justify-between">
            {CHALLENGE_DAYS.map(d => {
              const done = state.days[d.num]?.completed
              const isToday = d.num === currentDayNum
              const isFuture = d.num > currentDayNum
              const active = view === `day-${d.num}`
              return (
                <button
                  key={d.num}
                  onClick={() => changeView(`day-${d.num}`)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                    ${done ? 'bg-teal-500 text-white shadow-teal' : isToday ? 'bg-white border-2 border-teal-500 text-teal-600 animate-pulse-soft' : isFuture ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-500'}
                    ${active ? 'ring-2 ring-offset-1 ring-teal-400' : ''}
                  `}>
                    {done ? '✓' : d.num}
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium hidden sm:block">D{d.num}</span>
                </button>
              )
            })}
            <button onClick={() => changeView('progress')} className={`flex flex-col items-center gap-1 ${view==='progress'?'opacity-100':'opacity-50'} hover:opacity-100 transition-opacity`}>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">📊</div>
              <span className="text-[9px] text-gray-400 hidden sm:block">Stats</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 pb-24 max-w-lg mx-auto w-full">
        {view.startsWith('day-') && (() => {
          const dayNum = parseInt(view.split('-')[1])
          const dayData = CHALLENGE_DAYS[dayNum - 1]
          if (!dayData) return null
          return (
            <DayView
              key={view}
              day={dayData}
              state={state}
              onStateChange={update}
            />
          )
        })()}
        {view === 'progress' && <ProgressView state={state} onNavigateDay={(n) => changeView(`day-${n}`)} />}
        {view === 'results' && <ResultsView state={state} />}
        {view === 'avatar' && <AvatarView state={state} onStateChange={update} onBack={() => changeView(state.currentView || 'day-1')} />}
      </main>

      {/* ── BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg bottom-nav z-40 no-print">
        <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2">
          {[
            { v: `day-${currentDayNum}`, icon: '📅', label: "Today" },
            { v: 'progress', icon: '📊', label: 'Progress' },
            { v: 'avatar', icon: '🦸‍♀️', label: 'Avatar' },
            { v: 'results', icon: '🏅', label: 'Results' },
          ].map(item => (
            <button
              key={item.v}
              onClick={() => changeView(item.v)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all ${view === item.v || (item.v.startsWith('day') && view.startsWith('day')) ? 'bg-teal-50' : 'hover:bg-gray-50'}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`text-[10px] font-semibold ${view === item.v ? 'text-teal-600' : 'text-gray-400'}`}>{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
