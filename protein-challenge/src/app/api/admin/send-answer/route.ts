import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { participantEmail, participantName, question, answer } = await req.json()

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      return NextResponse.json({ ok: true, note: 'Email not configured — answer saved in app only' })
    }

    const { Resend } = await import('resend')
    const resend = new Resend(resendKey)

    await resend.emails.send({
      from: process.env.FROM_EMAIL || 'coach@grindlabfitness.com',
      to: participantEmail,
      subject: `Your coach answered your question! 💬 — Grind Lab Fitness`,
      html: `
        <div style="font-family:'DM Sans',sans-serif;max-width:600px;margin:0 auto;background:#FAFAFA;padding:20px">
          <div style="background:linear-gradient(135deg,#07b0a4,#058f85);color:white;padding:24px;border-radius:16px 16px 0 0;text-align:center">
            <h2 style="margin:0;font-size:20px">💬 Your Coach Replied!</h2>
          </div>
          <div style="background:white;padding:24px;border-radius:0 0 16px 16px;border:1px solid #eee;border-top:none">
            <p style="color:#555;font-size:14px">Hey ${participantName}! 👋</p>
            <p style="color:#555;font-size:14px">You asked:</p>
            <div style="background:#f9f9f9;border-left:3px solid #07b0a4;padding:12px 16px;border-radius:0 8px 8px 0;margin:12px 0;font-size:14px;color:#333;font-style:italic">
              "${question}"
            </div>
            <p style="color:#555;font-size:14px">Your coach says:</p>
            <div style="background:#f0fdfb;border:1px solid #07b0a4;border-radius:12px;padding:16px;font-size:14px;color:#333;line-height:1.7">
              ${answer}
            </div>
            <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;text-align:center">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display:inline-block;background:linear-gradient(135deg,#07b0a4,#C8F53A);color:#000;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:50px;font-size:14px">
                Continue My Challenge →
              </a>
            </div>
            <p style="text-align:center;color:#bbb;font-size:11px;margin-top:16px">
              Grind Lab Fitness · 7-Day Protein Jumpstart Challenge
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Send answer email error:', err)
    return NextResponse.json({ error: 'Email failed' }, { status: 500 })
  }
}
