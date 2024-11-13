import { NextResponse } from 'next/server'

export async function GET (
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const apiKey = process.env.VALIDATION_CLOUD_KEY

  if (apiKey === null || apiKey === undefined) {
    return NextResponse.json(false)
  }

  try {
    const response = await fetch(
      `https://mainnet.hedera.validationcloud.io/v1/${apiKey}/api/v1/accounts/${id}`
    )

    const data = await response.json()

    // Explicitly check if data.account exists and is not null/undefined
    return NextResponse.json(data.account !== null && data.account !== undefined)
  } catch (error) {
    console.error('Error checking account:', error)
    return NextResponse.json(false)
  }
}
