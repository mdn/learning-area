'use client'
import { useState, useRef } from 'react'
import { type ParticipantState, saveState } from '@/lib/store'
import { PRESET_AVATARS, getLevelFromXP, LEVELS } from '@/lib/gamification'
import { CHALLENGE_DAYS, FACEBOOK_BONUS_ITEM } from '@/lib/challengeData'

interface Props {
  state: ParticipantState
  onStateChange: (s: ParticipantState) => void
  onBack: () => void
}

export default function AvatarView({ state, onStateChange, onBack }: Props) {
  const [uploadedUrl, setUploadedUrl] = useState(state.avatarUrl || '')
  const [avatarType, setAvatarType] = useState<'preset'|'upload'>(state.avatarType)
  const [selectedPreset, setSelectedPreset] = useState(state.avatarId)
  const [stylizing, setStylizing] = useState(false)
  const [styleDesc, setStyleDesc] = useState(state.avatarStyleDescription || '')
  const fileRef = useRef<HTMLInputElement>(null)
  const level = getLevelFromXP(state.xp)
  const firstName = state.name.split(' ')[0]

  const currentPreset = PRESET_AVATARS.find(a => a.id === selectedPreset) || PRESET_AVATARS[0]
  const allItems = [
    ...CHALLENGE_DAYS.map(d => ({ ...d.rewardItem, unlocked: state.unlockedItems.includes(d.rewardItem.id) })),
    { ...FACEBOOK_BONUS_ITEM, unlocked: state.unlockedItems.includes('social_wings') },
  ]
  const unlockedItems = allItems.filter(i => i.unlocked)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const url = ev.target?.result as string
      setUploadedUrl(url)
      setAvatarType('upload')

      // Try to get style description from AI
      setStylizing(true)
      try {
        const res = await fetch('/api/ai/stylize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: url, name: firstName }),
        })
        if (res.ok) {
          const { description } = await res.json()
          setStyleDesc(description)
        }
      } catch {}
      setStylizing(false)
    }
    reader.readAsDataURL(file)
  }

  const save = () => {
    const updated: ParticipantState = {
      ...state,
      avatarType,
      avatarId: selectedPreset,
      avatarUrl: avatarType === 'upload' ? uploadedUrl : undefined,
      avatarStyleDescription: styleDesc || undefined,
    }
    onStateChange(updated)
    saveState(updated)
    onBack()
  }

  return (
    <div className="animate-slide-up px-4 pt-6 pb-6 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">←</button>
        <h2 className="font-heading font-extrabold text-xl text-black">Your Avatar 🦸‍♀️</h2>
      </div>

      {/* Avatar display card */}
      <div className="relative rounded-4xl overflow-hidden p-6 text-center" style={{ background: `linear-gradient(135deg, ${currentPreset.bg}, #f0fdfb)` }}>
        {/* Decorative ring */}
        <div className="relative inline-block mb-3">
          <div className="absolute inset-0 rounded-full animate-spin-slow opacity-20"
            style={{ background: 'conic-gradient(from 0deg, #07b0a4, #C8F53A, #FF6B9D, #07b0a4)', filter: 'blur(6px)', transform: 'scale(1.4)' }} />
          <div className="relative w-28 h-28 rounded-full border-4 bg-white overflow-hidden flex items-center justify-center text-6xl shadow-card-hover" style={{ borderColor: currentPreset.accent }}>
            {avatarType === 'upload' && uploadedUrl ? (
              <img src={uploadedUrl} alt={firstName} className="w-full h-full object-cover" />
            ) : (
              <span>{currentPreset.emoji}</span>
            )}
          </div>
        </div>

        {/* Name + level */}
        <div className="font-heading font-extrabold text-xl text-black">{state.name}</div>
        <div className="text-sm font-semibold mt-0.5" style={{ color: level.color }}>{level.emoji} {level.title}</div>
        <div className="text-xs text-gray-400 mt-0.5">{state.xp} XP · {unlockedItems.length} items collected</div>

        {/* Unlocked items row */}
        {unlockedItems.length > 0 && (
          <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
            {unlockedItems.map(item => (
              <div key={item.id} className="w-8 h-8 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center text-lg" title={item.name}>
                {item.emoji}
              </div>
            ))}
          </div>
        )}

        {/* Style description from AI */}
        {stylizing && (
          <div className="mt-3 text-xs text-teal-600 animate-pulse-soft">✨ Styling your avatar...</div>
        )}
        {styleDesc && !stylizing && (
          <div className="mt-3 text-xs text-gray-500 italic leading-relaxed bg-white/60 rounded-2xl px-3 py-2">{styleDesc}</div>
        )}
      </div>

      {/* Upload option */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
        <div className="font-heading font-bold text-sm text-black mb-3">📸 Upload Your Photo</div>
        <div
          onClick={() => fileRef.current?.click()}
          className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed cursor-pointer transition-all ${avatarType==='upload'&&uploadedUrl ? 'border-teal-300 bg-teal-50' : 'border-gray-200 hover:border-teal-200'}`}
        >
          {uploadedUrl ? (
            <img src={uploadedUrl} alt="Preview" className="w-12 h-12 rounded-xl object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl">📸</div>
          )}
          <div>
            <div className="font-semibold text-sm text-black">{uploadedUrl ? 'Photo uploaded ✓' : 'Tap to upload a selfie'}</div>
            <div className="text-xs text-gray-400 mt-0.5">We&apos;ll create a personalised avatar description for you</div>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </div>

      {/* Preset grid */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
        <div className="font-heading font-bold text-sm text-black mb-3">✨ Preset Avatars</div>
        <div className="grid grid-cols-4 gap-3">
          {PRESET_AVATARS.map(av => (
            <button
              key={av.id}
              onClick={() => { setSelectedPreset(av.id); setAvatarType('preset') }}
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 text-3xl transition-all border-2 ${selectedPreset === av.id && avatarType==='preset' ? 'border-teal-400 shadow-teal scale-105' : 'border-transparent hover:border-teal-200'}`}
              style={{ background: av.bg }}
            >
              {av.emoji}
              <span className="text-[9px] font-bold" style={{ color: av.accent }}>{av.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Locked items */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-4">
        <div className="font-heading font-bold text-sm text-black mb-1">🎒 Items to Earn</div>
        <p className="text-xs text-gray-400 mb-3">Complete each day to unlock items for your avatar</p>
        <div className="grid grid-cols-4 gap-2">
          {allItems.map(item => (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-1 p-2.5 rounded-2xl border text-center transition-all ${item.unlocked ? 'border-teal-200 bg-teal-50' : 'border-gray-100 bg-gray-50 opacity-50'}`}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-[9px] font-semibold text-gray-500 leading-tight">{item.name}</span>
              {!item.unlocked && <span className="text-[8px] text-gray-300">🔒 Locked</span>}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={save}
        className="w-full py-4 rounded-3xl font-heading font-extrabold text-black tracking-wide text-sm"
        style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
      >
        Save Avatar ✓
      </button>
    </div>
  )
}
