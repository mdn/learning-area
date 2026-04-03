'use client'
import { type MealEntry } from '@/lib/store'

interface Props {
  meal: MealEntry
  onUpdate: (field: keyof MealEntry, value: string) => void
}

export default function MealRow({ meal, onUpdate }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 text-xs font-semibold text-gray-400 flex-shrink-0">{meal.name}</div>

      <input
        type="text"
        value={meal.food}
        onChange={e => onUpdate('food', e.target.value)}
        placeholder="What did you eat?"
        className="flex-1 min-w-0 text-xs border border-gray-100 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors placeholder:text-gray-300"
      />

      <div className="flex items-center gap-1 flex-shrink-0">
        <input
          type="number"
          min={0}
          max={300}
          value={meal.protein}
          onChange={e => onUpdate('protein', e.target.value)}
          placeholder="0"
          className="w-14 text-xs border border-gray-100 rounded-xl px-2 py-2 text-center bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors placeholder:text-gray-300"
        />
        <span className="text-xs text-gray-400">g</span>
      </div>
    </div>
  )
}
