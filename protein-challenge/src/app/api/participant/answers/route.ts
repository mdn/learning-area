import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const ids = searchParams.get('ids')
  if (!ids) return NextResponse.json([])

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json([])

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, key)
    const { data, error } = await supabase
      .from('questions')
      .select('id, final_answer, status, sent_at')
      .in('id', ids.split(','))
      .eq('status', 'sent')
    if (error) throw error
    return NextResponse.json(
      (data || []).map((q: Record<string, unknown>) => ({
        id: q.id,
        finalAnswer: q.final_answer,
        status: q.status,
        sentAt: q.sent_at,
      }))
    )
  } catch (err) {
    console.error('Answers fetch error:', err)
    return NextResponse.json([])
  }
}
