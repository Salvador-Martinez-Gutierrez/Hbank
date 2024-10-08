import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST (req: NextRequest) {
  try {
    const { tokenAddress, serialNumber, userAddress, price } = await req.json()
    const affiliateKeySentx = process.env.AFFILIATE_API_KEY_SENTX
    const url = `https://api.sentx.io/v1/affiliate/market/buynft?apikey=${affiliateKeySentx}`

    const body = {
      token_address: tokenAddress,
      serial_number: serialNumber,
      user_address: userAddress,
      price
    }

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
      throw new Error('Error buying NFT')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to buy NFT' }, { status: 500 })
  }
}
