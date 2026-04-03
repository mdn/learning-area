import { NextResponse } from 'next/server'
import { COACH_TONE_SYSTEM_PROMPT } from '@/lib/challengeData'

export async function POST(req: Request) {
  try {
    const { question, dayNum, participantName, participantEmail, questionId } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'AI not configured' }, { status: 503 })
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey })

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: COACH_TONE_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: `${participantName} is on Day ${dayNum} of the challenge and asks: "${question}"` }],
    })

    const answer = message.content[0].type === 'text' ? message.content[0].text : ''

    // Save to Supabase
    const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (supaUrl && supaKey) {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supaUrl, supaKey)
        await supabase.from('questions').upsert({
          id: questionId,
          participant_name: participantName,
          participant_email: participantEmail || '',
          question,
          day_num: dayNum,
          ai_draft: answer,
          status: 'pending',
        })
      } catch (dbErr) {
        console.error('Supabase save error:', dbErr)
      }
    }

    // Email admin
    const resendKey = process.env.RESEND_API_KEY
    const adminEmail = process.env.ADMIN_EMAIL
    if (resendKey && adminEmail) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
          to: adminEmail,
          subject: `New question from ${participantName} — Day ${dayNum}`,
          html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto"><div style="background:#07b0a4;color:white;padding:20px;border-radius:12px 12px 0 0"><h2 style="margin:0">New Participant Question 💬</h2></div><div style="background:#f9f9f9;padding:20px;border-radius:0 0 12px 12px;border:1px solid #eee;border-top:none"><p><strong>From:</strong> ${participantName} (${participantEmail}) · Day ${dayNum}</p><div style="background:#fff;border-left:3px solid #07b0a4;padding:12px 16px;border-radius:0 8px 8px 0;margin:12px 0"><p style="margin:0">${question}</p></div><p><strong>AI Draft:</strong></p><div style="background:#f0fdfb;border:1px solid #07b0a4;border-radius:8px;padding:12px 16px"><p style="margin:0">${answer}</p></div><p style="margin-top:16px"><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/questions" style="background:linear-gradient(135deg,#07b0a4,#C8F53A);color:#000;font-weight:bold;text-decoration:none;padding:10px 20px;border-radius:50px;display:inline-block">Review in Dashboard →</a></p></div></div>`,
        })
      } catch (emailErr) {
        console.error('Email failed:', emailErr)
      }
    }

    return NextResponse.json({ answer })
  } catch (err) {
    console.error('AI answer error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
