import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const name = searchParams.get('name')
  const pin = searchParams.get('pin')
  if (!name || !pin) return NextResponse.json({ error: 'Missing params' }, { status: 400 })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return NextResponse.json({ error: 'DB not configured' })

  try {
    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(url, key)
    const id = name.trim().toLowerCase().replace(/\s+/g, '') + '-' + pin
    const { data } = await supabase
      .from('participants')
      .select('state')
      .eq('id', id)
      .single()
    if (!data) return NextResponse.json({ error: 'Not found' })
    return NextResponse.json({ state: data.state })
  } catch {
    return NextResponse.json({ error: 'Not found' })
  }
}
