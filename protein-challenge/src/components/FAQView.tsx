'use client'
import { useState } from 'react'
import { loadAdminQuestions } from '@/lib/store'

export default function FAQView() {
  const [search, setSearch] = useState('')
  const allAnswered = loadAdminQuestions().filter(q => q.status === 'sent' && q.finalAnswer)
  const faqs = search.trim()
    ? allAnswered.filter(q =>
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        (q.finalAnswer || '').toLowerCase().includes(search.toLowerCase())
      )
    : allAnswered

  return (
    <div className="animate-slide-up px-4 pt-6 pb-6 space-y-4">
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-black">Coach Q&amp;A 💬</h2>
        <p className="text-xs text-gray-400 mt-1">Real questions from the challenge — answered by your coach.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm">🔍</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-9 pr-4 py-3 rounded-2xl border border-gray-100 bg-white text-sm focus:outline-none focus:border-teal-300 transition-colors placeholder:text-gray-300"
        />
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">💬</div>
          <div className="font-heading font-bold text-lg text-black mb-1">
            {search ? 'No results found' : 'No answered questions yet'}
          </div>
          <div className="text-sm text-gray-400 leading-relaxed">
            {search
              ? 'Try a different search term'
              : "Questions you ask your coach will appear here once answered. Be the first to ask!"}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map(q => (
            <div key={q.id} className="bg-white rounded-3xl border border-gray-100 shadow-card overflow-hidden">
              {/* Question */}
              <div className="px-4 pt-4 pb-3 border-b border-gray-50">
                <div className="flex items-start gap-2">
                  <span className="text-lg flex-shrink-0">🙋‍♀️</span>
                  <p className="text-sm font-semibold text-black leading-relaxed">{q.question}</p>
                </div>
              </div>
              {/* Answer */}
              <div className="px-4 py-3 bg-teal-50/50">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 mt-0.5">GL</div>
                  <p className="text-sm text-gray-700 leading-relaxed">{q.finalAnswer}</p>
                </div>
              </div>
              {/* Meta */}
              <div className="px-4 py-2 flex items-center justify-between">
                <span className="text-[10px] text-gray-300">
                  {q.sentAt ? new Date(q.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                </span>
                <span className="text-[10px] font-semibold text-teal-500 bg-teal-50 px-2 py-0.5 rounded-full">Coach answered ✓</span>
              </div>
            </div>
          ))}
          <p className="text-center text-xs text-gray-300 pt-2">{faqs.length} answered question{faqs.length !== 1 ? 's' : ''}</p>
        </div>
      )}
    </div>
  )
}
