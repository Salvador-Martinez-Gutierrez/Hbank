interface Token {
  decimals: number
  id: string
  name: string
  price: string
  priceUsd: number
  symbol: string
}

interface LpPosition {
  token0: Token
  token1: Token
  tickUpper: number
  tickLower: number
  liquidity: string
  tokensOwed0: string
  tokensOwed1: string
}

const getV2LpPositions = async (accountId: string): Promise<LpPosition[]> => {
  console.log('getV2LpPositions function called')
  const url = `https://api.saucerswap.finance/v2/nfts/${accountId}/positions`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Response received. Status:', response.status)

    if (!response.ok) {
      throw new Error(`Error fetching LP positions: ${response.statusText}`)
    }

    const data = await response.json()

    return data.map((position: any) => ({
      token0: {
        decimals: position.token0.decimals,
        id: position.token0.id,
        name: position.token0.name,
        price: position.token0.price,
        priceUsd: position.token0.priceUsd,
        symbol: position.token0.symbol
      },
      token1: {
        decimals: position.token1.decimals,
        id: position.token1.id,
        name: position.token1.name,
        price: position.token1.price,
        priceUsd: position.token1.priceUsd,
        symbol: position.token1.symbol
      },
      tickUpper: position.tickUpper,
      tickLower: position.tickLower,
      liquidity: position.liquidity,
      tokensOwed0: position.tokensOwed0,
      tokensOwed1: position.tokensOwed1
    }))
  } catch (error) {
    console.error('Error in getV2LpPositions:', error)
    throw error
  }
}

export default getV2LpPositions
