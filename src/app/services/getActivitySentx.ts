interface PaymentToken {
  address: string | null
  symbol: string
  image: string
  htmlClass: string
}

export interface SentxActivityType {
  saletype: string
  saletypeSub?: string
  salePrice: number
  salePriceSymbol: string
  saleDate: string
  buyerAddress: string | null
  sellerAddress: string
  collectionName: string
  collectionTokenAddress: string
  nftName: string
  nftTokenAddress: string
  nftSerialId: number
  nftImage: string
  nftMetadata?: string
  listingUrl: string
  previousPrice?: number
  listingDate?: string
  dateFromNow?: string
  sellerNickname: string
  buyerNickname?: string
  pricechg?: number
  pricechglabel?: string
  paymentToken: PaymentToken
}

export default async function getActivitySentx ({
  tokenId,
  page
}: {
  tokenId: string
  page?: number
}): Promise<SentxActivityType[] | null> {
  const apiKeySentx = process.env.API_KEY_SENTX
  const url = `https://api.sentx.io/v1/public/market/activity?apikey=${apiKeySentx}&token=${tokenId}&page=${page}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 300
      }
    })

    const responseText = await response.text()

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText} - ${responseText}`)
    }

    // Parse the text response as JSON
    const data = JSON.parse(responseText)
    const activity = data.marketActivity
    return activity
  } catch (error) {
    console.error('Failed to fetch activity from Sentx:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }
    return null
  }
}
