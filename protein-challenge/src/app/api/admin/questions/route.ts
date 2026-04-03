import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json([])

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    // Map snake_case → camelCase for the frontend
    const mapped = (data || []).map((q: Record<string, unknown>) => ({
      id: q.id,
      participantName: q.participant_name,
      participantEmail: q.participant_email,
      question: q.question,
      dayNum: q.day_num,
      aiDraft: q.ai_draft,
      finalAnswer: q.final_answer,
      status: q.status,
      createdAt: q.created_at,
      sentAt: q.sent_at,
    }))
    return NextResponse.json(mapped)
  } catch (err) {
    console.error('Questions fetch error:', err)
    return NextResponse.json([])
  }
}
