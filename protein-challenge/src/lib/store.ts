'use client'

export interface MealEntry {
  name: string
  food: string
  protein: string
}

export interface DayState {
  completed: boolean
  meals: MealEntry[]
  checklist: boolean[]
  notes: string
  proteinTotal: number
  goalHit: boolean
  completedAt?: string
}

export interface Question {
  id: string
  question: string
  aiDraft?: string
  finalAnswer?: string
  status: 'pending' | 'answered'
  createdAt: string
  answeredAt?: string
}

export interface Notification {
  id: string
  type: 'achievement' | 'checkin' | 'answer' | 'welcome' | 'congrats'
  title: string
  message: string
  read: boolean
  createdAt: string
}

export interface ParticipantState {
  name: string
  email: string
  startDate: string
  proteinGoal: number
  avatarType: 'preset' | 'upload'
  avatarId: string
  avatarUrl?: string
  avatarStyleDescription?: string
  xp: number
  unlockedItems: string[]
  facebookPosted: boolean
  facebookBonusClaimed: boolean
  days: Record<number, DayState>
  questions: Question[]
  notifications: Notification[]
  currentView: string
  setupComplete: boolean
}

const STORAGE_KEY = 'glpc_v2'

const defaultMeals = (): MealEntry[] => [
  { name: 'Breakfast', food: '', protein: '' },
  { name: 'Lunch',     food: '', protein: '' },
  { name: 'Dinner',    food: '', protein: '' },
  { name: 'Snack 1',  food: '', protein: '' },
  { name: 'Snack 2',  food: '', protein: '' },
]

const defaultDay = (dayNum: number, checklistLen: number): DayState => ({
  completed: false,
  meals: defaultMeals(),
  checklist: new Array(checklistLen).fill(false),
  notes: '',
  proteinTotal: 0,
  goalHit: false,
})

const defaultState = (): ParticipantState => ({
  name: '',
  email: '',
  startDate: '2026-04-13',
  proteinGoal: 100,
  avatarType: 'preset',
  avatarId: 'avatar_1',
  xp: 0,
  unlockedItems: [],
  facebookPosted: false,
  facebookBonusClaimed: false,
  days: {},
  questions: [],
  notifications: [],
  currentView: 'welcome',
  setupComplete: false,
})

export function loadState(): ParticipantState {
  if (typeof window === 'undefined') return defaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}

export function saveState(state: ParticipantState): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function ensureDayState(state: ParticipantState, dayNum: number, checklistLen: number): ParticipantState {
  if (!state.days[dayNum]) {
    const newState = { ...state, days: { ...state.days, [dayNum]: defaultDay(dayNum, checklistLen) } }
    saveState(newState)
    return newState
  }
  return state
}

export function calcProteinTotal(meals: MealEntry[]): number {
  return meals.reduce((sum, m) => sum + (parseFloat(m.protein) || 0), 0)
}

// Admin store (for demo — in production this would be Supabase)
export interface AdminQuestion {
  id: string
  participantName: string
  participantEmail: string
  question: string
  aiDraft?: string
  finalAnswer?: string
  status: 'pending' | 'approved' | 'sent'
  createdAt: string
  sentAt?: string
}

const ADMIN_KEY = 'glpc_admin_v1'

export function loadAdminQuestions(): AdminQuestion[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(ADMIN_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function saveAdminQuestions(questions: AdminQuestion[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(ADMIN_KEY, JSON.stringify(questions))
}

export function addAdminQuestion(q: AdminQuestion): void {
  const all = loadAdminQuestions()
  saveAdminQuestions([...all, q])
}
