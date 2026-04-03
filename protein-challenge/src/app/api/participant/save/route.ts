import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, pin, state } = await req.json()
    if (!name || !pin) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) return NextResponse.json({ ok: true })

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, key)
    const id = name.trim().toLowerCase().replace(/\s+/g, '') + '-' + pin
    await supabase.from('participants').upsert({
      id,
      name: name.trim(),
      pin,
      state,
      updated_at: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Save participant error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
