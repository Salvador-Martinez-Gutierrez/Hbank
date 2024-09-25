interface FarmTotal {
  id: number
  timestamp: string
  total: string
}

const fetchFarmTotals = async (accountId: string): Promise<FarmTotal[]> => {
  console.log('fetchFarmTotals function called')
  const url = `https://api.saucerswap.finance/farms/totals/${accountId}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Response received. Status:', response.status)

    if (!response.ok) {
      throw new Error(`Error fetching farm totals: ${response.statusText}`)
    }

    const data: FarmTotal[] = await response.json()
    // Filter the data to include only objects with total > 0
    return data.filter(farm => parseFloat(farm.total) > 0)
  } catch (error) {
    console.error('Error in fetchFarmTotals:', error)
    throw error
  }
}

export default fetchFarmTotals
