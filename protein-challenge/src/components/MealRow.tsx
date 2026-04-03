'use client'
import { useState, useRef } from 'react'
import { type MealEntry } from '@/lib/store'

interface Props {
  meal: MealEntry
  onUpdate: (field: keyof MealEntry, value: string) => void
}

export default function MealRow({ meal, onUpdate }: Props) {
  const [estimating, setEstimating] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>()

  const handleFoodChange = (value: string) => {
    onUpdate('food', value)
    clearTimeout(timerRef.current)
    if (value.trim().length < 3) return
    timerRef.current = setTimeout(async () => {
      setEstimating(true)
      try {
        const res = await fetch('/api/ai/estimate-protein', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ foodName: value, quantity: null, portion: null, cooked: null, imageBase64: null }),
        })
        if (res.ok) {
          const { grams } = await res.json()
          onUpdate('protein', String(grams))
        }
      } catch {}
      setEstimating(false)
    }, 1500)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-16 text-xs font-semibold text-gray-400 flex-shrink-0">{meal.name}</div>
      <input
        type="text"
        value={meal.food}
        onChange={e => handleFoodChange(e.target.value)}
        placeholder="What did you eat?"
        className={`flex-1 text-xs border rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors placeholder:text-gray-300 ${estimating ? 'border-teal-200' : 'border-gray-100'}`}
      />
      {estimating && <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse flex-shrink-0" title="Estimating protein..." />}
    </div>
  )
}
