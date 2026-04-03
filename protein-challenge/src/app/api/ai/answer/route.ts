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

    return NextResponse.json({ answer })
  } catch (err) {
    console.error('AI answer error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
