import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { questionId, participantEmail, participantName, question, answer } = await req.json()

    // Update Supabase
    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supaUrl && supaKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supaUrl, supaKey)
        await supabase.from('questions').update({
          final_answer: answer,
          status: 'sent',
          sent_at: new Date().toISOString(),
        }).eq('id', questionId)
      } catch (dbErr) {
        console.error('Supabase update error:', dbErr)
      }
    }

    // Email participant
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      return NextResponse.json({ ok: true, note: 'Email not configured' })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(resendKey)
    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: participantEmail,
      subject: `Your coach answered your question! 💬 — Grind Lab Fitness`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#FAFAFA;padding:20px"><div style="background:linear-gradient(135deg,#07b0a4,#058f85);color:white;padding:24px;border-radius:16px 16px 0 0;text-align:center"><h2 style="margin:0">💬 Your Coach Replied!</h2></div><div style="background:white;padding:24px;border-radius:0 0 16px 16px;border:1px solid #eee;border-top:none"><p style="color:#555">Hey ${participantName}! 👋 You asked:</p><div style="background:#f9f9f9;border-left:3px solid #07b0a4;padding:12px 16px;border-radius:0 8px 8px 0;margin:12px 0;font-style:italic">"${question}"</div><p style="color:#555">Your coach says:</p><div style="background:#f0fdfb;border:1px solid #07b0a4;border-radius:12px;padding:16px;line-height:1.7">${answer}</div><div style="margin-top:24px;text-align:center"><a href="${process.env.NEXT_PUBLIC_APP_URL}" style="background:linear-gradient(135deg,#07b0a4,#C8F53A);color:#000;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:50px;display:inline-block">Continue My Challenge →</a></div></div></div>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Send answer error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
