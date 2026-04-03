'use client'

import { useState, useEffect } from 'react'
import { loadAdminQuestions, type AdminQuestion } from '@/lib/store'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function AdminPage() {
  const [questions, setQuestions] = useState<AdminQuestion[]>([])
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const a = sessionStorage.getItem('glpc_admin_auth')
      if (a === 'true') { setAuthed(true); setQuestions(loadAdminQuestions()) }
    }
  }, [])

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple client-side check — in production use server-side auth
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASS || 'grindlab2024')) {
      sessionStorage.setItem('glpc_admin_auth', 'true')
      setAuthed(true)
      setQuestions(loadAdminQuestions())
    } else {
      setError('Wrong password')
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#FAFAFA]">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center"><Logo size="md" /></div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6">
            <h1 className="font-heading font-bold text-xl text-black mb-1">Coach Dashboard</h1>
            <p className="text-xs text-gray-400 mb-5">Enter your admin password to continue</p>
            <form onSubmit={login} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:border-teal-300 text-sm"
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button type="submit" className="w-full py-3 rounded-2xl font-heading font-bold text-black text-sm" style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}>
                Enter Dashboard →
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const pending = questions.filter(q => q.status === 'pending')
  const sent = questions.filter(q => q.status === 'sent')

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <Link href="/admin/questions" className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-100 hover:bg-teal-100 transition-colors">
              Q&A Queue {pending.length > 0 && `(${pending.length})`}
            </Link>
            <button
              onClick={() => { sessionStorage.removeItem('glpc_admin_auth'); setAuthed(false) }}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-black">Coach Dashboard 👋</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor your challenge participants, answer questions, and track engagement.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: questions.length, label: 'Total Questions', icon: '💬', color: '#07b0a4' },
            { val: pending.length, label: 'Awaiting Reply', icon: '⏳', color: '#FF9A3C' },
            { val: sent.length, label: 'Answered', icon: '✅', color: '#07b0a4' },
            { val: new Set(questions.map(q => q.participantEmail)).size, label: 'Active Participants', icon: '👩', color: '#FF6B9D' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-3xl border border-gray-100 shadow-card p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-heading font-extrabold text-2xl" style={{ color: s.color }}>{s.val}</div>
              <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pending questions preview */}
        {pending.length > 0 && (
          <div className="bg-white rounded-3xl border border-orange-100 shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-heading font-bold text-sm text-black">⏳ Questions Needing Your Reply</div>
              <Link href="/admin/questions" className="text-xs text-teal-600 font-semibold hover:underline">View all →</Link>
            </div>
            <div className="space-y-3">
              {pending.slice(0, 3).map(q => (
                <div key={q.id} className="p-3 rounded-2xl bg-orange-50 border border-orange-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-orange-600">{q.participantName}</span>
                    <span className="text-[10px] text-gray-400">{new Date(q.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">{q.question}</p>
                  {q.aiDraft && (
                    <div className="mt-2 p-2.5 rounded-xl bg-teal-50 border border-teal-100">
                      <div className="text-[10px] font-bold text-teal-600 mb-1">AI Draft</div>
                      <p className="text-xs text-teal-700 leading-relaxed">{q.aiDraft}</p>
                    </div>
                  )}
                </div>
              ))}
              {pending.length > 3 && (
                <Link href="/admin/questions" className="block text-center text-xs text-teal-600 font-semibold py-2 hover:underline">
                  +{pending.length - 3} more questions →
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Quick tips */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-5">
          <div className="font-heading font-bold text-sm text-black mb-3">📌 Daily Coach Checklist</div>
          <div className="space-y-2">
            {[
              'Check Q&A queue and reply to all pending questions',
              'Post a check-in message in the Facebook group',
              'Personally DM 3-5 engaged participants',
              'Note who\'s most engaged — potential 1:1 coaching leads',
              'Celebrate wins publicly in the group',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-xs text-gray-600 p-2.5 rounded-xl bg-gray-50">
                <div className="w-5 h-5 rounded-full border-2 border-gray-200 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-xs text-gray-300 pb-4">Grind Lab Fitness · Admin Dashboard · {new Date().getFullYear()}</div>
      </div>
    </div>
  )
}
