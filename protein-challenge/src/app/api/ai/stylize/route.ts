import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { imageBase64, name } = await req.json()
    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ description: `${name}'s personalised avatar` })
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey })

    // Strip data URL prefix for the API
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '')
    const mediaType = imageBase64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg'

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 120,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64Data },
            },
            {
              type: 'text',
              text: `This is ${name}'s challenge profile photo. Write a short, warm, empowering avatar description for her in 2 sentences max. Make it feel like a superheroine character card. Focus on strength, energy, and who she\'s becoming — not just appearance. Keep it under 30 words and make her feel amazing about herself.`,
            },
          ],
        },
      ],
    })

    const description = message.content[0].type === 'text' ? message.content[0].text : `${name} — Protein Champion in the making.`
    return NextResponse.json({ description })
  } catch (err) {
    console.error('Stylize error:', err)
    return NextResponse.json({ description: 'A warrior on her protein journey.' })
  }
}
