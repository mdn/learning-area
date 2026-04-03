import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { questionId, answer } = await req.json()

    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supaUrl && supaKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supaUrl, supaKey)
      await supabase.from('questions').update({
        final_answer: answer,
        status: 'sent',
        sent_at: new Date().toISOString(),
      }).eq('id', questionId)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Send answer error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
