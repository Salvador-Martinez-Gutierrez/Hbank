import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

async function checkTokenAssociation (accountId: string, tokenId: string) {
  const apiKeyHedera = process.env.VALIDATION_CLOUD_KEY
  const url = `https://mainnet.hedera.validationcloud.io/v1/${apiKeyHedera}/api/v1/accounts/${accountId}`

  try {
    console.log(`Fetching account info for accountId: ${accountId}`)
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    })

    if (!response.ok) {
      console.error(`Error fetching account info: ${response.status} - ${response.statusText}`)
      console.error('Response body:', await response.text())
      throw new Error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`)
    }

    const data = await response.json()
    const isAssociated = data.balance.tokens.some((token: { token_id: string }) => token.token_id === tokenId)

    return isAssociated
  } catch (error) {
    console.error('Error in checkTokenAssociation:', error)
    throw error
  }
}

export async function GET (request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const accountId = searchParams.get('accountId')
    const tokenId = searchParams.get('tokenId')

    if (accountId === null || tokenId === null) {
      return NextResponse.json({ error: 'Missing accountId or tokenId' }, { status: 400 })
    }

    const isAssociated = await checkTokenAssociation(accountId, tokenId)
    return NextResponse.json({ isAssociated })
  } catch (error) {
    console.error('Detailed error in GET route:', error)
    return NextResponse.json({ error })
  }
}
