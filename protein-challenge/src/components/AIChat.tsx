'use client'

import { useState } from 'react'
import { type ParticipantState, type Question, addAdminQuestion } from '@/lib/store'
import { XP_REWARDS } from '@/lib/gamification'

interface Props {
  state: ParticipantState
  dayNum: number
  onStateChange: (s: ParticipantState) => void
}

export default function AIChat({ state, dayNum, onStateChange }: Props) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const questions = state.questions || []
  const answered = questions.filter(q => q.status === 'answered')
  const pending = questions.filter(q => q.status === 'pending')

  const sendQuestion = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setLoading(true)
    setError('')

    const id = `q-${Date.now()}`
    const newQ: Question = {
      id,
      question: q,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    // Add to admin queue
    addAdminQuestion({
      id,
      participantName: state.name,
      participantEmail: state.email,
      question: q,
      status: 'pending',
      createdAt: new Date().toISOString(),
    })

    const updated: ParticipantState = {
      ...state,
      xp: state.xp + XP_REWARDS.questionAsked,
      questions: [...questions, newQ],
    }
    onStateChange(updated)

    // Try AI answer
    try {
      const res = await fetch('/api/ai/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, dayNum, participantName: state.name, questionId: id }),
      })
      if (res.ok) {
        const { answer } = await res.json()
        const finalQ: Question = { ...newQ, aiDraft: answer, finalAnswer: answer, status: 'answered', answeredAt: new Date().toISOString() }
        const withAnswer: ParticipantState = {
          ...updated,
          questions: updated.questions.map(x => x.id === id ? finalQ : x),
          notifications: [...updated.notifications, {
            id: `answer-${id}`,
            type: 'answer',
            title: 'Your coach answered! 💬',
            message: answer.slice(0, 100) + '...',
            read: false,
            createdAt: new Date().toISOString(),
          }],
        }
        onStateChange(withAnswer)
      }
    } catch {
      // Question queued for coach, no AI response
    }
    setLoading(false)
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-xl flex-shrink-0">💬</div>
        <div className="flex-1">
          <div className="font-heading font-bold text-sm text-black">Ask Your Coach</div>
          <div className="text-xs text-gray-400">Get a personal answer in the challenge app</div>
        </div>
        {pending.length > 0 && (
          <span className="bg-pink text-white text-[10px] font-bold px-2 py-1 rounded-full">{pending.length} pending</span>
        )}
        <span className="text-gray-300 text-lg" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
      </button>

      {open && (
        <div className="border-t border-gray-50 px-4 pb-4 animate-slide-up">
          {/* Previous Q&As */}
          {questions.length > 0 && (
            <div className="space-y-3 mb-4 mt-3 max-h-64 overflow-y-auto">
              {[...questions].reverse().map(q => (
                <div key={q.id} className="space-y-2">
                  {/* Question bubble */}
                  <div className="flex justify-end">
                    <div className="bg-teal-500 text-white text-xs rounded-2xl rounded-br-sm px-3 py-2.5 max-w-[85%] leading-relaxed">
                      {q.question}
                    </div>
                  </div>
                  {/* Answer bubble */}
                  {q.finalAnswer ? (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2 max-w-[90%]">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">GL</div>
                        <div className="bg-gray-50 border border-gray-100 text-gray-700 text-xs rounded-2xl rounded-bl-sm px-3 py-2.5 leading-relaxed">
                          {q.finalAnswer}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start pl-9">
                      <div className="bg-gray-50 border border-gray-100 text-gray-400 text-xs rounded-2xl px-3 py-2.5 italic flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        <span>Coach is responding...</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2 mt-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendQuestion()}
              placeholder="Ask anything about protein, meals, the challenge..."
              className="flex-1 text-xs border border-gray-100 rounded-2xl px-3 py-2.5 bg-gray-50 focus:outline-none focus:border-teal-300 focus:bg-white transition-colors placeholder:text-gray-300"
              disabled={loading}
            />
            <button
              onClick={sendQuestion}
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-2xl font-bold text-xs text-black disabled:opacity-40 transition-all flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #07b0a4, #C8F53A)' }}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          <p className="text-[10px] text-gray-300 mt-2 text-center">Questions go to your coach for review · +{XP_REWARDS.questionAsked} XP for asking</p>
        </div>
      )}
    </div>
  )
}
