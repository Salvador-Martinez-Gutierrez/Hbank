export const getFloorPriceSentx = async (tokenId: string) => {
  try {
    const apiKeySentx = process.env.API_KEY_SENTX
    const cacheBuster = new Date().getTime() // Unique cache-busting timestamp
    const url = `https://api.sentx.io/v1/public/market/floor?apikey=${apiKeySentx}&token=${tokenId}&_=${cacheBuster}`

    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache' // Ensure no caching
      }
    })

    if (!response.ok) {
      throw new Error('Error fetching data')
    }

    const data = await response.json()
    return data.floor
  } catch (error) {
    console.error('Error:', error)
    return null // Returning null in case of an error
  }
}
