import { NextResponse } from 'next/server'
import getActivitySentx from '@/app/services/getActivitySentx'

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const tokenId = searchParams.get('tokenId')
  const page = searchParams.get('page')

  if (tokenId === null) {
    return NextResponse.json(
      { error: 'Token ID is required' },
      { status: 400 }
    )
  }

  try {
    const activity = await getActivitySentx({
      tokenId,
      page: page !== null && page !== '' ? parseInt(page) : undefined
    })

    return NextResponse.json(activity)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    )
  }
}
