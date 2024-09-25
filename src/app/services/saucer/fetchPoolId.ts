interface Farm {
  id: number
  poolId: number
  sauceEmissions: number
  hbarEmissions: number
  staked: string
}

const fetchPoolId = async (id: number): Promise<number | null> => {
  console.log('fetchPoolId function called with id:', id)
  const url = 'https://api.saucerswap.finance/farms'

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Response received. Status:', response.status)

    if (!response.ok) {
      throw new Error(`Error fetching farms: ${response.statusText}`)
    }

    const farms: Farm[] = await response.json()
    const farm = farms.find(farm => farm.id === id)

    if (farm !== undefined && farm !== null) {
      return farm.poolId
    } else {
      console.log(`No farm found with id: ${id}`)
      return null
    }
  } catch (error) {
    console.error('Error in fetchPoolId:', error)
    throw error
  }
}

export default fetchPoolId
