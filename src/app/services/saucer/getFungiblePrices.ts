interface TokenPrice {
  id: string
  symbol: string
  priceUsd: number
  liquidityUsd: number
  priceChangeHour: number
  priceChangeDay: number
  priceChangeWeek: number
}

const getFungiblePrices = async (): Promise<TokenPrice[]> => {
  console.log('getFungiblePrices function called')
  const url = 'https://api.saucerswap.finance/tokens/default'
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Response received. Status:', response.status)

    if (!response.ok) {
      throw new Error(`Error fetching fungible prices: ${response.statusText}`)
    }

    const data: TokenPrice[] = await response.json()

    return data
  } catch (error) {
    console.error('Error in getFungiblePrices:', error)
    throw error
  }
}

export default getFungiblePrices
