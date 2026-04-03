'use client'

import { useState } from 'react'
import { type ParticipantState, saveState } from '@/lib/store'

const PRE_CHECKLIST = [
  { label: 'Read the Workbook', desc: 'Familiarize yourself with how this challenge works' },
  { label: 'Plan Your Meals', desc: 'Choose 1–2 protein breakfast options for the week' },
  { label: 'Make Your Grocery List', desc: 'Plan your shopping and grab what you need before Day 1' },
  { label: 'Start with the Right Mindset', desc: 'Choose progress over perfection this week' },
  { label: 'Join the Facebook Group', desc: 'Join and get ready for one action step each day' },
]

const HOW_TO_CHECKLIST = [
  'Read the daily email',
  'Watch the daily recorded video',
  'Complete the workbook page for the day',
  'Take the action step',
  'Do your check-in',
]

const ROADMAP = [
  { day: 1, title: 'Notice where protein is missing', color: '#07b0a4' },
  { day: 2, title: 'Set your protein standard', color: '#07b0a4' },
  { day: 3, title: 'Fix breakfast first', color: '#C8F53A' },
  { day: 4, title: 'Build protein-first lunches and dinners', color: '#FF6B9D' },
  { day: 5, title: 'Create your busy-day backup plan', color: '#07b0a4' },
  { day: 6, title: 'Prep protein without overwhelm', color: '#07b0a4' },
  { day: 7, title: 'Reflect, lock in the habit, and choose your next step', color: '#C8F53A' },
]

const GROCERY_CATS = [
  { key: 'proteins' as const, label: 'Proteins 🥩', placeholder: 'e.g. chicken, eggs, Greek yogurt, tofu, salmon, cottage cheese, deli turkey, tempeh' },
  { key: 'breakfast' as const, label: 'Breakfast Items 🌅', placeholder: 'e.g. oats, fruit, protein powder, egg whites, yogurt, toast, chia seeds' },
  { key: 'produce' as const, label: 'Produce 🥦', placeholder: 'e.g. berries, spinach, broccoli, green beans, peppers, salad mix, bananas' },
  { key: 'carbs' as const, label: 'Carbs / Extras 🍚', placeholder: 'e.g. rice, potatoes, wraps, crackers' },
  { key: 'busyDay' as const, label: 'Busy-Day Backup Foods ⚡', placeholder: 'e.g. protein shake, hard boiled eggs, string cheese, jerky' },
]

interface Props {
  state: ParticipantState
  onStateChange: (s: ParticipantState) => void
}

export default function Day0View({ state, onStateChange }: Props) {
  const day0 = state.day0 || {
    preChecklist: new Array(5).fill(false),
    howToChecklist: new Array(5).fill(false),
    grocery: { proteins: '', breakfast: '', produce: '', carbs: '', busyDay: '' },
  }

  const togglePre = (i: number) => {
    const preChecklist = [...day0.preChecklist]
    preChecklist[i] = !preChecklist[i]
    const updated = { ...state, day0: { ...day0, preChecklist } }
    onStateChange(updated)
    saveState(updated)
  }

  const toggleHow = (i: number) => {
    const howToChecklist = [...day0.howToChecklist]
    howToChecklist[i] = !howToChecklist[i]
    const updated = { ...state, day0: { ...day0, howToChecklist } }
    onStateChange(updated)
    saveState(updated)
  }

  const updateGrocery = (key: keyof typeof day0.grocery, value: string) => {
    const updated = { ...state, day0: { ...day0, grocery: { ...day0.grocery, [key]: value } } }
    onStateChange(updated)
    saveState(updated)
  }

  const preCount = day0.preChecklist.filter(Boolean).length
  const howCount = day0.howToChecklist.filter(Boolean).length

  return (
    <div className="animate-slide-up">
      {/* Hero */}
      <div className="relative overflow-hidden px-4 pt-6 pb-6" style={{ background: 'linear-gradient(135deg, #07b0a415, #07b0a405)' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm" style={{ background: '#07b0a420', border: '1.5px solid #07b0a440' }}>
            🚀
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-teal-600">Before Day 1</div>
            <h1 className="font-heading font-extrabold text-xl text-black leading-tight">Before You Start</h1>
          </div>
        </div>
        <div className="mt-4 bg-white/80 rounded-2xl p-3 text-xs text-gray-600 leading-relaxed space-y-1">
          <p>This challenge is designed to help you simplify protein so it feels realistic, doable, and supportive of your goals.</p>
          <p>• This is not about perfection.</p>
          <p>• This is not about overcomplicating food.</p>
          <p className="font-semibold text-teal-700">• This is about learning how to make protein easier in real life.</p>
        </div>
      </div>

      <div className="px-4 space-y-4 mt-2">

        {/* ── PRE-CHALLENGE CHECKLIST ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">✅</span>
            <span className="font-heading font-bold text-sm text-black">Pre-Challenge Preparation</span>
            <span className="ml-auto text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">{preCount}/{PRE_CHECKLIST.length}</span>
          </div>
          <div className="space-y-2">
            {PRE_CHECKLIST.map((item, i) => {
              const checked = day0.preChecklist[i] || false
              return (
                <button key={i} onClick={() => togglePre(i)}
                  className={`w-full flex items-start gap-3 p-3 rounded-2xl border transition-all text-left ${checked ? 'border-teal-200 bg-teal-50' : 'border-gray-100 hover:border-teal-100 hover:bg-gray-50'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all mt-0.5 ${checked ? 'bg-teal-500 border-teal-500' : 'border-gray-200'}`}>
                    {checked && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <div>
                    <div className={`text-xs font-semibold leading-snug ${checked ? 'text-teal-700 line-through opacity-70' : 'text-gray-800'}`}>{item.label}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
          {preCount === PRE_CHECKLIST.length && (
            <div className="mt-3 p-2.5 rounded-2xl bg-teal-50 border border-teal-100 text-center text-xs font-bold text-teal-600">
              🎉 You're ready to start!
            </div>
          )}
        </div>

        {/* ── HOW TO USE ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📋</span>
            <span className="font-heading font-bold text-sm text-black">How to Use This App</span>
            <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{howCount}/{HOW_TO_CHECKLIST.length}</span>
          </div>
          <p className="text-xs text-gray-500 mb-3 leading-relaxed">Each day, do these five things:</p>
          <div className="space-y-2">
            {HOW_TO_CHECKLIST.map((item, i) => {
              const checked = day0.howToChecklist[i] || false
              return (
                <button key={i} onClick={() => toggleHow(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl border transition-all text-left ${checked ? 'border-teal-200 bg-teal-50' : 'border-gray-100 hover:border-teal-100 hover:bg-gray-50'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all ${checked ? 'bg-teal-500 border-teal-500' : 'border-gray-200'}`}>
                    {checked && <span className="text-white text-[10px]">✓</span>}
                  </div>
                  <span className={`text-xs leading-snug ${checked ? 'text-teal-700 line-through opacity-70' : 'text-gray-700'}`}>{item}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── 7-DAY ROADMAP ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🗺️</span>
            <span className="font-heading font-bold text-sm text-black">Your 7-Day Roadmap</span>
          </div>
          <div className="space-y-2">
            {ROADMAP.map(item => (
              <div key={item.day} className="flex items-center gap-3 p-2.5 rounded-2xl bg-gray-50">
                <div className="w-14 flex-shrink-0 text-center font-heading font-bold text-xs py-1 rounded-xl" style={{ background: item.color + '20', color: item.color }}>
                  Day {item.day}
                </div>
                <span className="text-xs text-gray-700 leading-snug">{item.title}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-3 italic">Small wins build momentum. This week is about progress, not perfection. 💪</p>
        </div>

        {/* ── GROCERY LIST ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🛒</span>
            <span className="font-heading font-bold text-sm text-black">Grocery List</span>
          </div>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">Choose a few simple protein options, easy breakfast items, produce, and busy-day backup foods so healthy eating feels easier all week.</p>
          <div className="space-y-4">
            {GROCERY_CATS.map(cat => (
              <div key={cat.key}>
                <div className="text-xs font-bold text-gray-700 mb-1.5">{cat.label}</div>
                <textarea
                  value={day0.grocery[cat.key]}
                  onChange={e => updateGrocery(cat.key, e.target.value)}
                  placeholder={cat.placeholder}
                  rows={2}
                  className="w-full text-xs border border-gray-100 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors resize-none placeholder:text-gray-300 leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Join Facebook */}
        <div className="bg-[#1877F2] rounded-3xl p-4 text-center mb-4">
          <p className="text-white text-xs font-semibold mb-3">Join the Facebook group to connect with other participants and get daily support 🦋</p>
          <a href="https://www.facebook.com/groups/4378612459123843" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-white text-[#1877F2] font-heading font-bold text-sm px-6 py-2.5 rounded-2xl hover:opacity-90 transition-opacity">
            Join the Group →
          </a>
        </div>

      </div>
    </div>
  )
}
