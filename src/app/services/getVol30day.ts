interface UserVolumeResponse {
  userAddress: string
  thriveWallet: string | null
  volume: number
  highestBuy: number
  highestSale: number
  avgBuy: number
  avgSale: number
  buyCount: number
  saleCount: number
}

interface FetchVolumeData {
  success: boolean
  response: UserVolumeResponse[]
  page: number
  nextPage: number | null
  token: string
}

// Fetch volume data from the API with pagination support
const fetchVolume = async (tokenId: string, startDay: string, today: string, page: number): Promise<number> => {
  const apiKeySentx = process.env.API_KEY_SENTX
  const url = `https://api.sentx.io/v1/public/market/userVolume/?apikey=${apiKeySentx}&token=${tokenId}&dateFrom=${startDay}&dateTo=${today}&page=${page}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error fetching volume data for token: ${tokenId}, page: ${page}`)
    }

    const data: FetchVolumeData = await response.json()

    // Ensure data is in the expected structure
    if (!data.success || !Array.isArray(data.response)) {
      throw new Error(`Unexpected response format for token: ${tokenId}, page: ${page}`)
    }

    // Calculate total volume from the current page's response
    const totalVolume = data.response.reduce((acc: number, user: UserVolumeResponse) => acc + user.volume, 0)

    // Check if there's a next page and if it's a number
    if (typeof data.nextPage === 'number' && data.nextPage > 0) {
      return totalVolume + await fetchVolume(tokenId, startDay, today, data.nextPage)
    }

    return totalVolume
  } catch (error) {
    console.error(`Error fetching 30-day volume data: ${tokenId}, page: ${page}`, error)
    return 0 // Return 0 on error to ensure the total is not affected negatively
  }
}

// Calculate the aggregated volume for the past 30 days
const getVol30day = async (tokenId: string): Promise<number> => {
  const today = new Date().toISOString().split('T')[0] // Get today's date in 'YYYY-MM-DD' format
  const startDay = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Get the date 30 days ago

  return await fetchVolume(tokenId, startDay, today, 1) // Start fetching from page 1
}

export default getVol30day
