import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { foodName, quantity, portion, cooked, imageBase64 } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ grams: 20, note: 'Add API key for accurate estimates' })
    }

    const Anthropic = (await import('@anthropic-ai/sdk')).default
    const client = new Anthropic({ apiKey })

    const textLines = [
      foodName && `Food: ${foodName}`,
      quantity && `Quantity: ${quantity}`,
      portion && `Portion size: ${portion}`,
      cooked && `Preparation: ${cooked}`,
    ].filter(Boolean).join('\n')

    const content: Parameters<typeof client.messages.create>[0]['messages'][0]['content'] = []

    if (imageBase64) {
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '')
      const mediaType = imageBase64.startsWith('data:image/png') ? 'image/png' as const : 'image/jpeg' as const
      content.push({ type: 'image', source: { type: 'base64', media_type: mediaType, data: base64Data } })
    }

    content.push({
      type: 'text',
      text: `${textLines ? textLines + '\n\n' : ''}Estimate the protein in grams for this meal. Use realistic average values. If there is a photo, use it to help your estimate. Return ONLY valid JSON: {"grams": 28, "note": "brief explanation max 10 words"}`,
    })

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 80,
      messages: [{ role: 'user', content }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
    const match = raw.match(/\{[\s\S]*\}/)
    const json = match ? JSON.parse(match[0]) : { grams: 20, note: 'rough estimate' }

    return NextResponse.json({ grams: Math.round(Number(json.grams) || 20), note: json.note || '' })
  } catch (err) {
    console.error('Protein estimate error:', err)
    return NextResponse.json({ grams: 20, note: 'Rough estimate — try again' })
  }
}
