interface TokenData {
  decimals: number
  icon?: string
  id: string
  name: string
  price: string
  priceUsd: number
  symbol: string
  dueDiligenceComplete: boolean
  isFeeOnTransferToken: boolean
  description: string
  website: string
  sentinelReport: string | null
  twitterHandle: string
  timestampSecondsLastListingChange: number
}

export interface LpTokenData {
  id: number
  contractId: string
  lpToken: {
    decimals: number
    id: string
    name: string
    symbol: string
    priceUsd: string
  }
  lpTokenReserve: string
  tokenA: TokenData
  tokenReserveA: string
  tokenB: TokenData
  tokenReserveB: string
}

export default async function getLpTokenData (tokenId: string): Promise<LpTokenData | null> {
  const url = 'https://api.saucerswap.finance/pools/known'
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const pools = await response.json() as LpTokenData[]

    const matchingPool = pools.find(pool => pool.lpToken.id === tokenId)

    if (typeof matchingPool !== 'undefined') {
      return matchingPool
    }

    // If no matching pool is found, return null instead of throwing an error
    return null
  } catch (error) {
    console.error('Error fetching LP token data:', error)
    return null
  }
}
