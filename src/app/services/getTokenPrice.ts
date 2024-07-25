// Returns the price of a HTS by tokenId
const getTokenPrice = async (tokenId: string): Promise<number> => {
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
    const priceUsd: number = data.priceUsd
    return priceUsd
  } catch (error) {
    console.error(`Error fetching token data: ${tokenId}`, error)
    return 0
  }
}

export default getTokenPrice
