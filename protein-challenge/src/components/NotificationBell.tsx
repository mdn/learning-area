'use client'
import { useState } from 'react'
import { type Notification } from '@/lib/store'

interface Props {
  notifications: Notification[]
  onRead: (id: string) => void
}

export default function NotificationBell({ notifications, onRead }: Props) {
  const [open, setOpen] = useState(false)
  const unread = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-teal-50 hover:border-teal-200 transition-colors"
      >
        <span className="text-base">🔔</span>
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-bounce-in">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-card-hover border border-gray-100 z-50 overflow-hidden animate-slide-up">
            <div className="px-4 py-3 border-b border-gray-50 flex items-center justify-between">
              <span className="font-heading font-bold text-sm text-black">Notifications</span>
              {unread > 0 && <span className="text-xs text-teal-500 font-semibold">{unread} new</span>}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="px-4 py-6 text-center text-gray-400 text-sm">All clear! 🎉</div>
              ) : (
                [...notifications].reverse().map(n => (
                  <div
                    key={n.id}
                    onClick={() => { onRead(n.id); setOpen(false) }}
                    className={`px-4 py-3 border-b border-gray-50 cursor-pointer hover:bg-teal-50 transition-colors ${!n.read ? 'bg-teal-50/50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">{n.type === 'achievement' ? '🏆' : n.type === 'answer' ? '💬' : n.type === 'welcome' ? '🎉' : n.type === 'congrats' ? '🌟' : '📌'}</span>
                      <div>
                        <div className="font-semibold text-xs text-black">{n.title}</div>
                        <div className="text-xs text-gray-500 leading-relaxed mt-0.5">{n.message}</div>
                        <div className="text-[10px] text-gray-300 mt-1">{new Date(n.createdAt).toLocaleDateString()}</div>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0 mt-1" />}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
