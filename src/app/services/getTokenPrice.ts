// Returns the price of a HTS by tokenId
const getTokenPrice = async (tokenId: string): Promise<{ priceUsd: number, price: number }> => {
  const url = `https://api.saucerswap.finance/tokens/${tokenId}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error: ${tokenId}`)
    }

    const data = await response.json()
    return {
      priceUsd: data.priceUsd,
      price: data.price
    }
  } catch (error) {
    console.error(`Error fetching token data: ${tokenId}`, error)
    return {
      priceUsd: 0,
      price: 0
    }
  }
}

export default getTokenPrice
