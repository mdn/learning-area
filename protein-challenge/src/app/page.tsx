'use client'

import { useEffect, useState, useRef } from 'react'
import { loadState, saveState, type ParticipantState } from '@/lib/store'
import { PRESET_AVATARS } from '@/lib/gamification'
import ChallengeApp from '@/components/ChallengeApp'

function syncToSupabase(s: ParticipantState) {
  if (!s.pin || !s.name) return
  fetch('/api/participant/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: s.name, pin: s.pin, state: s }),
  }).catch(() => {})
}

export default function Home() {
  const [state, setState] = useState<ParticipantState | null>(null)
  const [step, setStep] = useState<'name' | 'avatar'>('name')

  // Signup fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('avatar_1')
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState('')
  const [avatarType, setAvatarType] = useState<'preset' | 'upload'>('preset')
  const fileRef = useRef<HTMLInputElement>(null)

  // Login mode (returning user on new device)
  const [loginMode, setLoginMode] = useState(false)
  const [loginName, setLoginName] = useState('')
  const [loginPin, setLoginPin] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Debounced sync timer
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const s = loadState()
    if (!s.setupComplete && s.pin && s.name) {
      // New device — no local progress, try loading from Supabase
      fetch(`/api/participant/login?name=${encodeURIComponent(s.name)}&pin=${s.pin}`)
        .then(r => r.json())
        .then(data => {
          if (data.state) {
            const remote = data.state as ParticipantState
            saveState(remote)
            setState(remote)
          } else {
            setState(s)
          }
        })
        .catch(() => setState(s))
    } else {
      // Has local state — use it as source of truth (avoids overwriting recent changes)
      setState(s)
    }
  }, [])

  const handleStateChange = (s: ParticipantState) => {
    saveState(s)
    setState(s)
    if (s.pin) {
      if (syncTimer.current) clearTimeout(syncTimer.current)
      syncTimer.current = setTimeout(() => syncToSupabase(s), 3000)
    }
  }

  if (state === null) return null

  if (state.setupComplete) {
    return <ChallengeApp initialState={state} onStateChange={handleStateChange} />
  }

  // ── LOGIN FORM (returning user on new device) ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loginName.trim() || !/^\d{4}$/.test(loginPin)) {
      setLoginError('Enter your name and 4-digit PIN')
      return
    }
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch(`/api/participant/login?name=${encodeURIComponent(loginName.trim())}&pin=${loginPin}`)
      const data = await res.json()
      if (data.state) {
        saveState(data.state)
        setState(data.state)
      } else {
        setLoginError("Couldn't find an account with that name and PIN. Check your details and try again.")
      }
    } catch {
      setLoginError('Something went wrong. Try again.')
    }
    setLoginLoading(false)
  }

  if (loginMode) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full max-w-sm">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="58" r="32" fill="#1A1A1A"/>
                  <circle cx="50" cy="58" r="26" fill="#0A0A0A"/>
                  <ellipse cx="43" cy="46" rx="7" ry="5" fill="rgba(255,255,255,0.12)" transform="rotate(-20 43 46)"/>
                  <rect x="37" y="12" width="26" height="18" rx="13" fill="#1A1A1A"/>
                  <rect x="42" y="16" width="16" height="10" rx="8" fill="#0A0A0A"/>
                </svg>
              </div>
              <div>
                <div className="font-heading font-bold text-sm tracking-widest uppercase text-black">GRIND LAB</div>
                <div className="font-heading text-xs tracking-[0.2em] uppercase text-gray-500">FITNESS</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6">
              <h1 className="font-heading font-bold text-xl text-black mb-1">Welcome back! 👋</h1>
              <p className="text-xs text-gray-400 mb-5">Enter your name and PIN to pick up where you left off.</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Your first name</label>
                  <input
                    type="text"
                    value={loginName}
                    onChange={e => setLoginName(e.target.value)}
                    placeholder="e.g. Jessica"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-teal-400 focus:outline-none font-medium text-black placeholder:text-gray-300 transition-colors bg-white text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">4-digit PIN</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={loginPin}
                    onChange={e => setLoginPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="e.g. 1234"
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-teal-400 focus:outline-none font-medium text-black placeholder:text-gray-300 transition-colors bg-white text-base text-center tracking-widest"
                  />
                </div>
                {loginError && <p className="text-xs text-red-400">{loginError}</p>}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-4 rounded-2xl font-heading font-bold text-black text-base disabled:opacity-50 transition-all"
                  style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
                >
                  {loginLoading ? 'Loading…' : 'Log In →'}
                </button>
              </form>

              <button
                onClick={() => setLoginMode(false)}
                className="w-full mt-4 text-xs text-gray-400 hover:text-gray-600 text-center"
              >
                ← New here? Sign up instead
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── WELCOME FLOW ──
  const handleNameNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    if (!/^\d{4}$/.test(pin)) {
      setPinError('Please enter exactly 4 digits')
      return
    }
    setPinError('')
    setStep('avatar')
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setUploadedUrl(ev.target?.result as string)
      setAvatarType('upload')
      setUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const handleStart = () => {
    const newState: ParticipantState = {
      ...loadState(),
      name: name.trim(),
      email: email.trim(),
      pin: pin.trim(),
      avatarType,
      avatarId: selectedAvatar,
      avatarUrl: uploadedUrl || undefined,
      setupComplete: true,
      currentView: 'day-1',
      notifications: [{
        id: 'welcome',
        type: 'welcome',
        title: `Welcome to the challenge, ${name.trim().split(' ')[0]}! 🎉`,
        message: "You just made a powerful decision. Over the next 7 days, we're going to make protein feel simple. Start with Day 1 — no pressure, just awareness. I'm cheering for you!! 💙",
        read: false,
        createdAt: new Date().toISOString(),
      }],
    }
    saveState(newState)
    syncToSupabase(newState)
    setState(newState)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #07b0a4, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #C8F53A, transparent)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative max-w-lg mx-auto px-6 pt-12 pb-8">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="50" cy="95" rx="32" ry="5" fill="#e0e0e0"/>
                <ellipse cx="50" cy="93" rx="28" ry="4" fill="#ccc"/>
                <circle cx="50" cy="58" r="32" fill="#1A1A1A"/>
                <circle cx="50" cy="58" r="26" fill="#0A0A0A"/>
                <ellipse cx="43" cy="46" rx="7" ry="5" fill="rgba(255,255,255,0.12)" transform="rotate(-20 43 46)"/>
                <rect x="37" y="12" width="26" height="18" rx="13" fill="#1A1A1A"/>
                <rect x="42" y="16" width="16" height="10" rx="8" fill="#0A0A0A"/>
              </svg>
            </div>
            <div>
              <div className="font-heading font-bold text-sm tracking-widest uppercase text-black leading-none">GRIND LAB</div>
              <div className="font-heading text-xs tracking-[0.2em] uppercase text-gray-500">FITNESS</div>
            </div>
          </div>

          {/* Hero text */}
          <div className="mb-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-teal-100">
              <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse-soft inline-block" />
              7-Day Challenge · Free · Starts April 13
            </div>
            <h1 className="font-heading font-extrabold text-4xl leading-tight text-black mb-3">
              The Protein<br />
              <span className="gradient-text">Jumpstart</span><br />
              Challenge
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              For busy women 30+ who are done guessing and ready to feel the difference. 7 days. Free. Built for real life.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {['🎯 Daily guided tasks', '🏆 Earn XP & unlock rewards', '💬 Ask your assistant', '📊 Track your protein', '🔐 Save progress on any device'].map(f => (
              <span key={f} className="text-xs bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1.5 text-gray-600 font-medium">{f}</span>
            ))}
          </div>

          {/* SIGN UP FORM */}
          {step === 'name' ? (
            <form onSubmit={handleNameNext} className="space-y-4 animate-slide-up">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Your first name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Jessica"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-teal-400 focus:outline-none font-medium text-black placeholder:text-gray-300 transition-colors bg-white text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jessica@email.com"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-teal-400 focus:outline-none font-medium text-black placeholder:text-gray-300 transition-colors bg-white text-base"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Create a 4-digit PIN</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={e => { setPin(e.target.value.replace(/\D/g, '').slice(0, 4)); setPinError('') }}
                  placeholder="e.g. 1234"
                  required
                  className="w-full px-4 py-3 rounded-2xl border-2 border-gray-100 focus:border-teal-400 focus:outline-none font-medium text-black placeholder:text-gray-300 transition-colors bg-white text-base text-center tracking-widest"
                />
                {pinError ? (
                  <p className="text-xs text-red-400 mt-1">{pinError}</p>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">You&apos;ll use this to log in on any device</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-2xl font-heading font-bold text-black text-base tracking-wide transition-all hover:shadow-teal-lg active:scale-95"
                style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
              >
                Next — Pick My Avatar →
              </button>
              <button
                type="button"
                onClick={() => setLoginMode(true)}
                className="w-full text-xs text-gray-400 hover:text-teal-600 text-center py-2 transition-colors"
              >
                Already joined? Log in with your PIN →
              </button>
            </form>
          ) : (
            <div className="animate-slide-up space-y-5">
              <div>
                <p className="font-heading font-bold text-lg text-black mb-1">Choose your avatar, {name.split(' ')[0]}! ✨</p>
                <p className="text-xs text-gray-400">You can upload a photo or pick a preset. Earn items as you complete each day.</p>
              </div>

              {/* Upload option */}
              <div
                onClick={() => fileRef.current?.click()}
                className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${avatarType === 'upload' ? 'border-teal-400 bg-teal-50' : 'border-dashed border-gray-200 hover:border-teal-300'}`}
              >
                {uploading ? (
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center animate-pulse">📷</div>
                ) : uploadedUrl ? (
                  <img src={uploadedUrl} alt="Your photo" className="w-12 h-12 rounded-xl object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-2xl">📸</div>
                )}
                <div>
                  <div className="font-semibold text-sm text-black">{uploadedUrl ? 'Your photo uploaded! ✓' : 'Upload your own photo'}</div>
                  <div className="text-xs text-gray-400">We&apos;ll style it into your challenge avatar</div>
                </div>
                {avatarType === 'upload' && <span className="ml-auto text-teal-500">✓</span>}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />

              {/* Preset avatars */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">— or choose a preset —</p>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_AVATARS.map(av => (
                    <button
                      key={av.id}
                      onClick={() => { setSelectedAvatar(av.id); setAvatarType('preset'); setUploadedUrl('') }}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1 text-2xl transition-all border-2 ${selectedAvatar === av.id && avatarType === 'preset' ? 'border-teal-400 shadow-teal scale-105' : 'border-transparent hover:border-teal-200'}`}
                      style={{ background: av.bg }}
                    >
                      {av.emoji}
                      <span className="text-xs font-semibold" style={{ color: av.accent, fontSize: '9px' }}>{av.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStart}
                className="w-full py-4 rounded-2xl font-heading font-bold text-black text-base tracking-wide transition-all hover:shadow-teal-lg active:scale-95"
                style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
              >
                🚀 Start My Challenge!
              </button>
            </div>
          )}

          {/* Social proof */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['💪', '🌟', '🔥', '🦋'].map((e, i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center text-xs">{e}</div>
              ))}
            </div>
            <p className="text-xs text-gray-400 leading-tight">Join women who are finally making protein work for their real life</p>
          </div>
        </div>
      </div>

      {/* What you get section */}
      <div className="bg-black text-white py-12 px-6">
        <div className="max-w-lg mx-auto">
          <h2 className="font-heading font-bold text-2xl mb-6">What happens inside 👇</h2>
          <div className="space-y-4">
            {[
              { day: 'Day 1', title: 'The Protein Wake-Up Call', desc: 'See exactly where protein is missing — no judgment, just data', color: '#07b0a4' },
              { day: 'Day 2', title: 'Set Your Protein Standard', desc: 'One simple number you can actually remember and hit', color: '#07b0a4' },
              { day: 'Day 3', title: 'Fix Breakfast First', desc: 'Choose your go-to high-protein breakfast. Make it automatic.', color: '#C8F53A' },
              { day: 'Day 4', title: 'Build Protein-First Meals', desc: 'The formula that works at home, restaurants, and on the road', color: '#FF6B9D' },
              { day: 'Day 5', title: 'Busy Day Backup Plan', desc: 'Stop letting chaotic days derail your progress', color: '#07b0a4' },
              { day: 'Day 6', title: 'Prep Without Overwhelm', desc: '20 minutes of prep that carry you through the whole week', color: '#07b0a4' },
              { day: 'Day 7', title: 'Lock In the Habit', desc: 'Leave with a plan that fits your real life — forever', color: '#C8F53A' },
            ].map(item => (
              <div key={item.day} className="flex gap-4 items-start">
                <div className="w-14 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ background: item.color + '22', color: item.color }}>
                  {item.day}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{item.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black border-t border-white/5 py-6 text-center">
        <p className="text-xs text-gray-600">© 2026 Grind Lab Fitness · Built with 💙 for women who show up</p>
      </div>
    </div>
  )
}
