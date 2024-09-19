/* import type { FungibleData } from '../../tokensData/tokens'

const getFungibleData = async (tokenId: string): Promise<FungibleData | undefined> => {
  try {
    const baseUrl = 'https://api.saucerswap.finance'
    const url = `${baseUrl}/tokens/${tokenId}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data: FungibleData = await response.json()

    const result = {
      tokenId: data.id,
      decimals: Number(data.decimals),
      icon: data.icon,
      name: data.name,
      price: data.price,
      priceUsd: data.priceUsd,
      symbol: data.symbol,
      dueDiligenceComplete: data.dueDiligenceComplete,
      isFeeOnTransferToken: data.isFeeOnTransferToken,
      description: data.description,
      website: data.website,
      sentinelReport: data.sentinelReport,
      twitterHandle: data.twitterHandle,
      timestampSecondsLastListingChange: data.timestampSecondsLastListingChange
    }

    return result
  } catch (error) {
    console.error('Error fetching token data:', error)
    // Handle error
  }
}

export default getFungibleData */
