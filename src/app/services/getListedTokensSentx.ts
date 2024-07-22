export const getListedTokensSentx = async (tokenId: string) => {
  try {
    const apiKeySentx = process.env.API_KEY_SENTX
    const cacheBuster = new Date().getTime() // Adding cache-busting query parameter
    const url = `https://api.sentx.io/v1/public/market/listings?apikey=${apiKeySentx}&token=${tokenId}&_=${cacheBuster}`

    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()

    return data.marketListings
  } catch (error) {
    console.error('Error fetching data:', error)
    return null // Returning null in case of an error
  }
}
