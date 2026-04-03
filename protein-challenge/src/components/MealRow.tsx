'use client'
import { useState, useRef } from 'react'
import { type MealEntry } from '@/lib/store'

interface Props {
  meal: MealEntry
  onUpdate: (field: keyof MealEntry, value: string) => void
}

const PORTIONS = [
  { id: 'palm',    label: '1 palm',    emoji: '🤲', desc: '~3–4 oz' },
  { id: '2palms',  label: '2 palms',   emoji: '🙌', desc: '~6–8 oz' },
  { id: 'cup',     label: '1 cup',     emoji: '🥤', desc: 'full cup' },
  { id: 'halfcup', label: '½ cup',     emoji: '🫙', desc: 'half cup' },
  { id: 'fist',    label: '1 fist',    emoji: '👊', desc: '~1 cup'  },
  { id: 'plate',   label: 'Full plate',emoji: '🍽️', desc: 'large'   },
]

export default function MealRow({ meal, onUpdate }: Props) {
  const [open, setOpen] = useState(false)
  const [portion, setPortion] = useState('')
  const [cooked, setCooked] = useState<'cooked' | 'raw' | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [estimating, setEstimating] = useState(false)
  const [result, setResult] = useState<{ grams: number; note: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImageUrl(ev.target?.result as string)
      setOpen(true)
    }
    reader.readAsDataURL(file)
  }

  const estimate = async () => {
    if (!meal.food.trim() && !imageUrl) return
    setEstimating(true)
    setResult(null)
    try {
      const res = await fetch('/api/ai/estimate-protein', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          foodName: meal.food,
          portion: PORTIONS.find(p => p.id === portion)?.label || portion || null,
          cooked,
          imageBase64: imageUrl || null,
        }),
      })
      if (res.ok) setResult(await res.json())
    } catch {}
    setEstimating(false)
  }

  const confirm = () => {
    if (!result) return
    onUpdate('protein', String(result.grams))
    setOpen(false)
    setResult(null)
    setPortion('')
    setCooked(null)
    setImageUrl('')
  }

  const reset = () => {
    setOpen(false)
    setResult(null)
    setPortion('')
    setCooked(null)
    setImageUrl('')
  }

  return (
    <div className="space-y-2">
      {/* ── MEAL ROW ── */}
      <div className="flex items-center gap-2">
        <div className="w-16 text-xs font-semibold text-gray-400 flex-shrink-0">{meal.name}</div>

        <input
          type="text"
          value={meal.food}
          onChange={e => onUpdate('food', e.target.value)}
          placeholder="What did you eat?"
          className="flex-1 min-w-0 text-xs border border-gray-100 rounded-xl px-3 py-2 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors placeholder:text-gray-300"
        />

        {/* Photo */}
        <button
          onClick={() => fileRef.current?.click()}
          title="Upload meal photo"
          className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-sm hover:border-teal-300 hover:bg-teal-50 transition-colors flex-shrink-0"
        >
          📸
        </button>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />

        {/* Estimate / protein badge */}
        {meal.protein ? (
          <button
            onClick={() => setOpen(!open)}
            className="flex-shrink-0 flex items-center gap-1 bg-teal-50 border border-teal-100 rounded-xl px-2 py-1.5 text-xs font-bold text-teal-600 hover:bg-teal-100 transition-colors"
          >
            {meal.protein}g ✏️
          </button>
        ) : (
          <button
            onClick={() => setOpen(!open)}
            className="flex-shrink-0 text-xs font-bold py-1.5 px-2 rounded-xl transition-all whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)', color: '#000' }}
          >
            ✨ Est.
          </button>
        )}
      </div>

      {/* ── ESTIMATOR PANEL ── */}
      {open && (
        <div className="ml-[72px] bg-white rounded-2xl border border-teal-100 shadow-card p-3 space-y-3 animate-slide-up">

          {/* Photo preview */}
          {imageUrl && (
            <div className="flex items-center gap-3 p-2 bg-teal-50 rounded-xl">
              <img src={imageUrl} alt="meal" className="w-12 h-12 rounded-xl object-cover border border-teal-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-black">Photo added ✓</div>
                <div className="text-[10px] text-gray-400">AI will analyze your meal photo</div>
              </div>
              <button onClick={() => setImageUrl('')} className="text-gray-300 hover:text-gray-500 text-sm flex-shrink-0">✕</button>
            </div>
          )}

          {/* Portion */}
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">How much did you have?</div>
            <div className="grid grid-cols-3 gap-1.5">
              {PORTIONS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPortion(p.id)}
                  className={`flex flex-col items-center gap-0.5 py-2 px-1 rounded-xl border transition-all ${portion === p.id ? 'border-teal-400 bg-teal-50' : 'border-gray-100 hover:border-teal-200 bg-gray-50'}`}
                >
                  <span className="text-xl">{p.emoji}</span>
                  <span className="text-[10px] font-bold text-gray-700 leading-tight">{p.label}</span>
                  <span className="text-[9px] text-gray-400">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cooked / Raw */}
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Cooked or raw?</div>
            <div className="flex gap-2">
              {(['cooked', 'raw'] as const).map(opt => (
                <button
                  key={opt}
                  onClick={() => setCooked(opt)}
                  className={`flex-1 py-2 rounded-xl border text-xs font-semibold transition-all ${cooked === opt ? 'border-teal-400 bg-teal-50 text-teal-700' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-teal-200'}`}
                >
                  {opt === 'cooked' ? '🍳 Cooked' : '🥗 Raw / Fresh'}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="flex items-center justify-between gap-3 bg-teal-50 border border-teal-100 rounded-xl p-3 animate-bounce-in">
              <div>
                <div className="font-heading font-extrabold text-2xl text-teal-600">~{result.grams}g</div>
                <div className="text-[10px] text-gray-500 leading-tight">{result.note}</div>
              </div>
              <button
                onClick={confirm}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
              >
                Use this ✓
              </button>
            </div>
          )}

          {/* Estimate button */}
          {!result && (
            <button
              onClick={estimate}
              disabled={estimating || (!meal.food.trim() && !imageUrl)}
              className="w-full py-2.5 rounded-xl font-bold text-xs text-black disabled:opacity-40 transition-all"
              style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
            >
              {estimating ? '✨ Estimating...' : '✨ Estimate my protein'}
            </button>
          )}

          {/* Manual override + close */}
          <div className="flex items-center gap-2 pt-1 border-t border-gray-50">
            <span className="text-[10px] text-gray-300">Manual:</span>
            <input
              type="number"
              min={0} max={300}
              value={meal.protein}
              onChange={e => onUpdate('protein', e.target.value)}
              placeholder="0"
              className="w-14 text-xs border border-gray-100 rounded-lg px-2 py-1 text-center focus:outline-none focus:border-teal-300"
            />
            <span className="text-[10px] text-gray-300">g</span>
            <button onClick={reset} className="ml-auto text-[10px] text-gray-300 hover:text-gray-500">Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
