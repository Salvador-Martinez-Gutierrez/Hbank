interface SaucerSwapToken {
  id: string
  symbol: string
  priceUsd: number
  liquidityUsd: number
  priceChangeHour: number
  priceChangeDay: number
  priceChangeWeek: number
}

interface Token {
  token_id: string
  name: string
  symbol: string
  type: string
  balance: number
  decimals?: number
  price?: number
  priceUsd?: number
}

export async function getTokensWithPriceChange (tokensWithPrice: Token[]) {
  try {
    // Fetch price changes from SaucerSwap
    const response = await fetch('https://api.saucerswap.finance/tokens/default')
    const saucerSwapTokens: SaucerSwapToken[] = await response.json()

    // Create a map for faster lookups
    const priceChangeMap = new Map(
      saucerSwapTokens.map(token => [token.id, token])
    )

    // Merge the data
    return tokensWithPrice.map(token => {
      // Special handling: if token_id is 'HBAR', look up using '0.0.1456986'
      const lookupId = token.token_id === 'HBAR' ? '0.0.1456986' : token.token_id
      const priceData = priceChangeMap.get(lookupId)

      return {
        ...token,
        priceChangeHour: priceData?.priceChangeHour ?? 0,
        priceChangeDay: priceData?.priceChangeDay ?? 0,
        priceChangeWeek: priceData?.priceChangeWeek ?? 0
      }
    })
  } catch (error) {
    console.error('Error fetching price changes:', error)
    // Return original array with zero values for price changes if fetch fails
    return tokensWithPrice.map(token => ({
      ...token,
      priceChangeHour: 0,
      priceChangeDay: 0,
      priceChangeWeek: 0
    }))
  }
}
