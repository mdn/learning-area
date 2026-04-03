'use client'

import { useState, useEffect } from 'react'
import { type AdminQuestion } from '@/lib/store'
import Logo from '@/components/Logo'

export default function AdminPage() {
  const [questions, setQuestions] = useState<AdminQuestion[]>([])
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState<Record<string, string>>({})
  const [sending, setSending] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const a = sessionStorage.getItem('glpc_admin_auth')
      if (a === 'true') { setAuthed(true); fetchQuestions() }
    }
  }, [])

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/questions')
      if (res.ok) setQuestions(await res.json())
    } catch {}
    setLoading(false)
  }

  const login = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASS || 'grindlab2024')) {
      sessionStorage.setItem('glpc_admin_auth', 'true')
      setAuthed(true)
      fetchQuestions()
    } else {
      setError('Wrong password')
    }
  }

  const sendAnswer = async (q: AdminQuestion) => {
    const answer = editing[q.id] ?? q.aiDraft ?? ''
    if (!answer.trim()) return
    setSending(prev => ({ ...prev, [q.id]: true }))
    try {
      await fetch('/api/admin/send-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: q.id, answer }),
      })
      await fetchQuestions()
    } catch {}
    setSending(prev => ({ ...prev, [q.id]: false }))
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-[#FAFAFA]">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center"><Logo size="md" /></div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-6">
            <h1 className="font-heading font-bold text-xl text-black mb-1">Dashboard</h1>
            <p className="text-xs text-gray-400 mb-5">Enter your admin password</p>
            <form onSubmit={login} className="space-y-4">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Admin password"
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:outline-none focus:border-teal-300 text-sm" />
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button type="submit" className="w-full py-3 rounded-2xl font-heading font-bold text-black text-sm"
                style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}>Enter →</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const pending = questions.filter(q => q.status === 'pending')
  const answered = questions.filter(q => q.status === 'sent')

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <button onClick={fetchQuestions} className="text-xs text-gray-400 hover:text-gray-600">{loading ? 'Loading…' : '↻ Refresh'}</button>
            <button onClick={() => { sessionStorage.removeItem('glpc_admin_auth'); setAuthed(false) }} className="text-xs text-gray-400 hover:text-gray-600">Sign out</button>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <h1 className="font-heading font-extrabold text-xl text-black">
          Q&amp;A Dashboard
          {pending.length > 0 && <span className="ml-2 text-sm font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">{pending.length} pending</span>}
        </h1>

        {/* Pending questions */}
        {pending.length > 0 && (
          <div className="space-y-4">
            {pending.map(q => (
              <div key={q.id} className="bg-white rounded-3xl border border-orange-100 shadow-card p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-black">{q.participantName}</div>
                    <div className="text-xs text-gray-400">{new Date(q.createdAt).toLocaleString()}</div>
                  </div>
                  <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-xl border border-orange-100">Pending</span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-3">
                  <p className="text-sm text-gray-700 leading-relaxed">{q.question}</p>
                </div>

                <textarea
                  value={editing[q.id] ?? q.aiDraft ?? ''}
                  onChange={e => setEditing(p => ({ ...p, [q.id]: e.target.value }))}
                  rows={4}
                  placeholder="Edit or write your reply..."
                  className="w-full text-sm border border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors resize-none leading-relaxed placeholder:text-gray-300"
                />

                <button
                  onClick={() => sendAnswer(q)}
                  disabled={!((editing[q.id] ?? q.aiDraft ?? '').trim()) || sending[q.id]}
                  className="w-full py-3 rounded-2xl font-heading font-bold text-black text-sm disabled:opacity-40 transition-all"
                  style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
                >
                  {sending[q.id] ? 'Saving…' : 'Save Answer ✓'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Answered questions */}
        {answered.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-heading font-bold text-sm text-gray-500 uppercase tracking-wide">Answered ({answered.length})</h2>
            {answered.map(q => (
              <div key={q.id} className="bg-white rounded-3xl border border-gray-100 shadow-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-xs text-black">{q.participantName}</div>
                  <span className="text-xs font-bold text-teal-500 bg-teal-50 px-2 py-0.5 rounded-full">Answered</span>
                </div>
                <p className="text-xs text-gray-500">{q.question}</p>
                <div className="bg-teal-50 rounded-xl p-2.5">
                  <p className="text-xs text-teal-700 leading-relaxed">{q.finalAnswer}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && questions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">💬</div>
            <div className="font-heading font-bold text-lg text-black mb-1">No questions yet</div>
            <div className="text-sm text-gray-400">Questions will appear here once participants start asking</div>
          </div>
        )}
      </div>
    </div>
  )
}
