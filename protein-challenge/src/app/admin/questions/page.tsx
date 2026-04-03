'use client'

import { useState, useEffect } from 'react'
import { type AdminQuestion } from '@/lib/store'
import Link from 'next/link'

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<AdminQuestion[]>([])
  const [authed, setAuthed] = useState(false)
  const [editing, setEditing] = useState<Record<string, string>>({})
  const [sending, setSending] = useState<Record<string, boolean>>({})
  const [sentMap, setSentMap] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const a = sessionStorage.getItem('glpc_admin_auth')
    if (a === 'true') { setAuthed(true); fetchQuestions() }
    else { window.location.href = '/admin' }
  }, [])

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/questions')
      if (res.ok) setQuestions(await res.json())
    } catch {}
    setLoading(false)
  }

  const sendAnswer = async (q: AdminQuestion) => {
    const finalAnswer = editing[q.id] ?? q.aiDraft ?? ''
    if (!finalAnswer.trim()) return
    setSending(prev => ({ ...prev, [q.id]: true }))

    try {
      await fetch('/api/admin/send-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: q.id,
          participantEmail: q.participantEmail,
          participantName: q.participantName,
          question: q.question,
          answer: finalAnswer,
        }),
      })
      setSentMap(prev => ({ ...prev, [q.id]: true }))
      await fetchQuestions()
    } catch {}
    setSending(prev => ({ ...prev, [q.id]: false }))
  }

  const pending = questions.filter(q => q.status === 'pending')
  const sent = questions.filter(q => q.status === 'sent')

  if (!authed) return null

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-white border-b border-gray-100 shadow-sm px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-xs text-gray-400 hover:text-gray-600">← Dashboard</Link>
            <span className="text-gray-200">|</span>
            <h1 className="font-heading font-bold text-sm text-black">Q&A Queue</h1>
          </div>
          <button onClick={fetchQuestions} className="text-xs text-teal-600 font-semibold hover:underline">
            {loading ? 'Loading…' : '↻ Refresh'}
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        {pending.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="font-heading font-bold text-base text-black">Needs Your Reply</h2>
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
            </div>
            <div className="space-y-4">
              {pending.map(q => (
                <div key={q.id} className="bg-white rounded-3xl border border-orange-100 shadow-card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-sm text-black">{q.participantName}</div>
                      <div className="text-xs text-gray-400">{q.participantEmail} · {new Date(q.createdAt).toLocaleString()}</div>
                    </div>
                    <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-xl border border-orange-100">Pending</span>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-3 mb-3">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Their question</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{q.question}</p>
                  </div>

                  {q.aiDraft && !editing[q.id] && (
                    <div className="bg-teal-50 border border-teal-100 rounded-2xl p-3 mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">AI Draft</div>
                        <button onClick={() => setEditing(p => ({ ...p, [q.id]: q.aiDraft || '' }))}
                          className="text-[10px] text-teal-500 font-semibold hover:underline">Edit this →</button>
                      </div>
                      <p className="text-xs text-teal-700 leading-relaxed">{q.aiDraft}</p>
                    </div>
                  )}

                  <div className="mb-3">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                      Your answer {editing[q.id] ? '(editing)' : q.aiDraft ? '(or write your own)' : ''}
                    </div>
                    <textarea
                      value={editing[q.id] ?? q.aiDraft ?? ''}
                      onChange={e => setEditing(p => ({ ...p, [q.id]: e.target.value }))}
                      rows={4}
                      placeholder="Type your personalised response here..."
                      className="w-full text-sm border border-gray-100 rounded-2xl px-4 py-3 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors resize-none leading-relaxed placeholder:text-gray-300"
                    />
                  </div>

                  <button
                    onClick={() => sendAnswer(q)}
                    disabled={!((editing[q.id] ?? q.aiDraft ?? '').trim()) || sending[q.id]}
                    className="w-full py-3 rounded-2xl font-heading font-bold text-black text-sm disabled:opacity-40 transition-all"
                    style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
                  >
                    {sending[q.id] ? 'Sending…' : sentMap[q.id] ? '✓ Sent!' : '📨 Send to Participant'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {sent.length > 0 && (
          <div>
            <h2 className="font-heading font-bold text-base text-black mb-3">Already Answered ✓</h2>
            <div className="space-y-3">
              {sent.map(q => (
                <div key={q.id} className="bg-white rounded-3xl border border-gray-100 shadow-card p-4 opacity-75">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-xs text-black">{q.participantName}</div>
                    <span className="text-xs font-bold text-teal-500 bg-teal-50 px-2 py-0.5 rounded-full">Answered</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{q.question}</p>
                  <div className="bg-teal-50 rounded-xl p-2.5">
                    <p className="text-xs text-teal-700 leading-relaxed">{q.finalAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && questions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">💬</div>
            <div className="font-heading font-bold text-lg text-black mb-1">No questions yet</div>
            <div className="text-sm text-gray-400">Questions from participants will appear here once they start asking</div>
          </div>
        )}
      </div>
    </div>
  )
}
