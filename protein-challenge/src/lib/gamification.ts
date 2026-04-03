export interface Level {
  num: number
  title: string
  minXP: number
  maxXP: number
  color: string
  emoji: string
}

export const LEVELS: Level[] = [
  { num: 1, title: 'Protein Rookie',    minXP: 0,   maxXP: 99,  color: '#888',     emoji: '🌱' },
  { num: 2, title: 'Fuel Seeker',       minXP: 100, maxXP: 249, color: '#07b0a4',  emoji: '💧' },
  { num: 3, title: 'Protein Warrior',   minXP: 250, maxXP: 449, color: '#0ecfc1',  emoji: '⚡' },
  { num: 4, title: 'Power Player',      minXP: 450, maxXP: 699, color: '#C8F53A',  emoji: '🔥' },
  { num: 5, title: 'Protein Champion',  minXP: 700, maxXP: 9999,color: '#FFD700',  emoji: '🏆' },
]

export const XP_REWARDS = {
  checklistItem: 10,
  mealLogged: 5,
  reflectionCompleted: 20,
  dayCompleted: 50,
  facebookPost: 50,
  questionAsked: 5,
  goalHit: 25,
  streak3: 30,
  streak7: 100,
}

export const PRESET_AVATARS = [
  { id: 'avatar_1', emoji: '🧘‍♀️', name: 'Zen', bg: '#f0fdfb', accent: '#07b0a4' },
  { id: 'avatar_2', emoji: '💪', name: 'Power', bg: '#fff0f8', accent: '#FF6B9D' },
  { id: 'avatar_3', emoji: '🌟', name: 'Star', bg: '#fffde7', accent: '#C8F53A' },
  { id: 'avatar_4', emoji: '🦋', name: 'Free', bg: '#f3e5f5', accent: '#ab47bc' },
  { id: 'avatar_5', emoji: '🔥', name: 'Fire', bg: '#fff3e0', accent: '#FF9A3C' },
  { id: 'avatar_6', emoji: '💎', name: 'Diamond', bg: '#e3f2fd', accent: '#1e88e5' },
  { id: 'avatar_7', emoji: '🌸', name: 'Bloom', bg: '#fce4ec', accent: '#e91e63' },
  { id: 'avatar_8', emoji: '⚡', name: 'Bolt', bg: '#f9fbe7', accent: '#827717' },
]

export function getLevelFromXP(xp: number): Level {
  return LEVELS.findLast(l => xp >= l.minXP) ?? LEVELS[0]
}

export function getXPProgressInLevel(xp: number): number {
  const level = getLevelFromXP(xp)
  const range = level.maxXP - level.minXP
  const progress = xp - level.minXP
  return Math.min(100, Math.round((progress / range) * 100))
}

export function getXPToNextLevel(xp: number): number {
  const level = getLevelFromXP(xp)
  if (level.num === LEVELS.length) return 0
  return level.maxXP - xp + 1
}
