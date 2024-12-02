import { getAccountNftsByTokenId } from '@/app/address/[accountId]/nft-analytics/[tokenId]/services/getAccountNftsByTokenId'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET (request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const accountId = searchParams.get('accountId')
  const tokenId = searchParams.get('tokenId')

  if (accountId === null || tokenId === null) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const nfts = await getAccountNftsByTokenId(accountId, tokenId)
    return NextResponse.json({ nfts })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch NFTs' }, { status: 500 })
  }
}
