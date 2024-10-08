import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import getNftMetadata from '@/app/services/mirror-node/getNftMetadata'

export async function GET (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const accountId = searchParams.get('accountId')
  const tokenId = searchParams.get('tokenId')

  if (accountId === null || tokenId === null) {
    return NextResponse.json({ error: 'Missing or empty accountId or tokenId' }, { status: 400 })
  }

  try {
    const metadata = await getNftMetadata(accountId, tokenId)
    return NextResponse.json({ metadata })
  } catch (error) {
    console.error('Error fetching NFT metadata:', error)
    return NextResponse.json({ error: 'Failed to fetch NFT metadata' }, { status: 500 })
  }
}
