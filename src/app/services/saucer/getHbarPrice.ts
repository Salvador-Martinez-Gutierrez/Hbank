// Return the record of Hbar price in $ for a given time interval

const getHbarPrice = async (fromUnixSeconds: number, toUnixSeconds: number): Promise<number> => {
  try {
    const baseUrl = 'https://api.saucerswap.finance'
    const url = `${baseUrl}/stats/hbarHistoricalPrices?from=${fromUnixSeconds}&to=${toUnixSeconds}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }
    const data = await response.json()
    const latestPrice: number = data[0].price
    return latestPrice
  } catch (error) {
    console.error('Error fetching HBAR price data:', error)
    throw error
  }
}

export default getHbarPrice
