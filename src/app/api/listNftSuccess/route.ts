import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  try {
    const { saleVerificationCode } = await req.json()
    const affiliateKeySentx = process.env.AFFILIATE_API_KEY_SENTX
    const url = `https://api.sentx.io/v1/affiliate/market/listnftres?apikey=${affiliateKeySentx}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        saleVerificationCode
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const confirmationResult = await response.json()
    console.log('List confirmation result:', confirmationResult)
    return NextResponse.json(confirmationResult)
  } catch (error) {
    console.error('Error confirming listing to market provider:', error)
    return NextResponse.json({ error: 'Failed to confirm listing' }, { status: 500 })
  }
}
