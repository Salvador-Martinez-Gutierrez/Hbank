import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  try {
    const { tokenAddress, serialNumber, userAddress, price } = await req.json()
    const affiliateKeySentx = process.env.AFFILIATE_API_KEY_SENTX
    const url = `https://api.sentx.io/v1/affiliate/market/listnft?apikey=${affiliateKeySentx}`

    const body = {
      token_address: tokenAddress,
      serial_number: serialNumber,
      user_address: userAddress,
      price
    }

    console.log('Sending request to SentX API:', { url, body })

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SentX API error:', response.status, errorText)
      throw new Error(`SentX API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: unknown) {
    console.error('Detailed error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json({ error: 'Failed to list NFT', details: errorMessage }, { status: 500 })
  }
}
