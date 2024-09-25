interface LpTokenData {
  id: string
  lpToken: {
    id: string
    name: string
    symbol: string
    priceUsd: number
  }
  tokenA: {
    id: string
    symbol: string
    address: string
    priceUsd: number
  }
  tokenB: {
    id: string
    symbol: string
    address: string
    priceUsd: number
  }
  totalLiquidity: string
  apr: string
}

const getLpTokenDataByPoolId = async (poolId: number | null): Promise<LpTokenData> => {
  console.log('getLpTokenDataByPoolId function called')
  const url = `https://api.saucerswap.finance/pools/${poolId}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Response received. Status:', response.status)

    if (!response.ok) {
      throw new Error(`Error fetching LP token data: ${response.statusText}`)
    }

    const data: LpTokenData = await response.json()
    return data
  } catch (error) {
    console.error('Error in getLpTokenDataByPoolId:', error)
    throw error
  }
}

export default getLpTokenDataByPoolId
