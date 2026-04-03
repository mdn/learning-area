'use client'
import { useState } from 'react'
import { RECIPES } from '@/lib/challengeData'

type Category = 'breakfast' | 'lunch' | 'dinner'

export default function RecipesView() {
  const [category, setCategory] = useState<Category>('breakfast')
  const [open, setOpen] = useState<string | null>(null)

  const recipes = RECIPES[category]

  return (
    <div className="animate-slide-up px-4 pt-6 pb-6 space-y-4">
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-black">Recipes 🍽️</h2>
        <p className="text-xs text-gray-400 mt-1">High-protein recipes from your challenge workbook.</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2">
        {(['breakfast', 'lunch', 'dinner'] as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => { setCategory(cat); setOpen(null) }}
            className={`flex-1 py-2 rounded-2xl text-xs font-bold capitalize transition-all border-2 ${category === cat ? 'border-teal-400 bg-teal-50 text-teal-700' : 'border-gray-100 bg-white text-gray-500 hover:border-teal-200'}`}
          >
            {cat === 'breakfast' ? '🌅' : cat === 'lunch' ? '☀️' : '🌙'} {cat}
          </button>
        ))}
      </div>

      {/* Recipe cards */}
      <div className="space-y-3">
        {recipes.map(recipe => (
          <div key={recipe.name} className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
            {/* Header */}
            <button
              onClick={() => setOpen(open === recipe.name ? null : recipe.name)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex-1">
                <div className="font-heading font-bold text-sm text-black">{recipe.name}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">{recipe.protein}g protein</span>
                  <span className="text-[10px] text-gray-400">{recipe.calories} cal</span>
                  <span className="text-[10px] text-gray-400">Prep {recipe.prepTime}</span>
                </div>
              </div>
              <span className="text-gray-300 text-lg ml-3" style={{ transform: open === recipe.name ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
            </button>

            {/* Expanded content */}
            {open === recipe.name && (
              <div className="border-t border-gray-50 px-4 pb-4 pt-3 space-y-4 animate-slide-up">
                {/* Macros */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Protein', val: `${recipe.protein}g`, color: '#07b0a4' },
                    { label: 'Carbs', val: `${recipe.carbs}g`, color: '#C8F53A' },
                    { label: 'Fat', val: `${recipe.fat}g`, color: '#FF6B9D' },
                    { label: 'Calories', val: recipe.calories, color: '#888' },
                  ].map(m => (
                    <div key={m.label} className="text-center p-2 rounded-2xl bg-gray-50 border border-gray-100">
                      <div className="font-heading font-extrabold text-sm" style={{ color: m.color }}>{m.val}</div>
                      <div className="text-[9px] text-gray-400 font-semibold uppercase tracking-wide">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Ingredients */}
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Ingredients · {recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</div>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0 mt-1.5" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Directions</div>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-[10px] font-bold text-teal-600 flex-shrink-0 mt-0.5">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
