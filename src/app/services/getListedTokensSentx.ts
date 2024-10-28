export const getListedTokensSentx = async (tokenId: string) => {
  try {
    const apiKeySentx = process.env.API_KEY_SENTX
    if (apiKeySentx === null || apiKeySentx === undefined) {
      throw new Error('API key is not configured')
    }

    const cacheBuster = new Date().getTime()
    const url = `https://api.sentx.io/v1/public/market/listings?apikey=${apiKeySentx}&token=${tokenId}&_=${cacheBuster}`

    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`)
      return []
    }

    const data = await response.json()

    return data.marketListings
  } catch (error) {
    console.error('Error fetching token listings:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}
