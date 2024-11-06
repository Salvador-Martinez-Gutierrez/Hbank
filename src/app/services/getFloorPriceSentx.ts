export async function getFloorPriceSentx (tokenId: string): Promise<number | null> {
  try {
    const apiKeySentx = process.env.API_KEY_SENTX
    const url = `https://api.sentx.io/v1/public/market/floor?apikey=${apiKeySentx}&token=${tokenId}`

    const response = await fetch(url, {
      next: {
        revalidate: 300 // 5 minutes cache
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
