'use client'
import { useState } from 'react'
import { RECIPES } from '@/lib/challengeData'

type Category = 'breakfast' | 'lunch' | 'dinner' | 'vegan'

const TABS: { id: Category; label: string; emoji: string }[] = [
  { id: 'breakfast', label: 'Breakfast', emoji: '🌅' },
  { id: 'lunch', label: 'Lunch', emoji: '☀️' },
  { id: 'dinner', label: 'Dinner', emoji: '🌙' },
  { id: 'vegan', label: 'Vegan', emoji: '🌱' },
]

export default function RecipesView() {
  const [category, setCategory] = useState<Category>('breakfast')
  const [open, setOpen] = useState<string | null>(null)
  const recipes = RECIPES[category]

  return (
    <div className="px-4 py-4 space-y-4 animate-slide-up">
      <div>
        <h1 className="font-heading font-extrabold text-xl text-black">Recipes 🍽️</h1>
        <p className="text-xs text-gray-400 mt-0.5">High-protein meals aligned with the challenge</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setCategory(tab.id); setOpen(null) }}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-2xl border-2 text-xs font-bold transition-all ${category === tab.id ? 'border-teal-400 bg-teal-50 text-teal-700' : 'border-gray-100 bg-white text-gray-500 hover:border-teal-200'}`}
          >
            <span className="text-lg">{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {category === 'vegan' && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-2xl px-3 py-2">
          <span>🌱</span>
          <p className="text-xs text-green-700 font-medium">Plant-based · high protein · ready in 10 minutes or less</p>
        </div>
      )}

      {/* Recipe cards */}
      <div className="space-y-3">
        {recipes.map((recipe) => {
          const isOpen = open === recipe.name
          const img = (recipe as { image?: string }).image || '🍽️'
          return (
            <div key={recipe.name} className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : recipe.name)}
                className="w-full flex items-center gap-3 p-4 text-left"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 bg-gray-50 border border-gray-100">
                  {img}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-heading font-bold text-sm text-black leading-tight">{recipe.name}</div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{recipe.protein}g protein</span>
                    <span className="text-[10px] text-gray-400">{recipe.prepTime} prep</span>
                    {recipe.cookTime !== '0 min' && <span className="text-[10px] text-gray-400">{recipe.cookTime} cook</span>}
                  </div>
                </div>
                <span className="text-gray-300 text-lg flex-shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>⌄</span>
              </button>

              {isOpen && (
                <div className="border-t border-gray-50 px-4 pb-4 pt-3 space-y-3 animate-slide-up">
                  {/* Macros */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: 'Protein', val: `${recipe.protein}g`, color: '#07b0a4' },
                      { label: 'Carbs', val: `${recipe.carbs}g`, color: '#FF9A3C' },
                      { label: 'Fat', val: `${recipe.fat}g`, color: '#FF6B9D' },
                      { label: 'Cal', val: String(recipe.calories), color: '#8B5CF6' },
                    ].map(m => (
                      <div key={m.label} className="text-center p-2 rounded-2xl bg-gray-50">
                        <div className="font-heading font-extrabold text-sm" style={{ color: m.color }}>{m.val}</div>
                        <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Ingredients */}
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ingredients</div>
                    <div className="space-y-1">
                      {recipe.ingredients.map((ing, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-teal-400 flex-shrink-0 mt-0.5 text-xs">•</span>
                          <span className="text-xs text-gray-600 leading-snug">{ing}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Steps</div>
                    <div className="space-y-2">
                      {recipe.steps.map((step, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-xs text-gray-600 leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
