import { cache } from 'react'

interface RoyaltyFee {
  amount: {
    denominator: number
    numerator: number
  }
  collector_account_id: string
  fallback_fee: {
    amount: number
    denominating_token_id: string | null
  }
}

interface TokenInfo {
  custom_fees: {
    royalty_fees: RoyaltyFee[]
  }
}

export const getNftRoyalties = cache(async (tokenId: string): Promise<number> => {
  const apiKey = process.env.VALIDATION_CLOUD_KEY
  const url = `https://mainnet.hedera.validationcloud.io/v1/${apiKey}/api/v1/tokens/${tokenId}`

  try {
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    })

    if (!response.ok) {
      console.error(`Error fetching token info: ${response.status} - ${response.statusText}`)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: TokenInfo = await response.json()

    if (data.custom_fees.royalty_fees.length > 0) {
      const royalties = data.custom_fees.royalty_fees[0]
      const royaltyFee = (royalties.amount.numerator / royalties.amount.denominator)
      return royaltyFee
    }

    return 0 // Return 0 if no royalty fees are found
  } catch (error) {
    console.error('Error fetching token info:', error)
    throw error
  }
})
