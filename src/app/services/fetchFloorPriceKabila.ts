export const fetchFloorPriceKabila = async (tokenId: string) => {
  try {
    // Adding a cache-busting query parameter
    const cacheBuster = new Date().getTime()
    const url = `https://labs.kabila.app/api/marketplace/manager/nft-collections?tokenIds=${tokenId}&fields=tokenId,minPrice&_=${cacheBuster}`

    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })

    if (!response.ok) {
      throw new Error('Error fetching data')
    }

    const data = await response.json()

    if (data.length === 0) {
      throw new Error('No data returned')
    }

    return data[0].minPrice
  } catch (error) {
    console.error('Error:', error)
    return null // Returning null in case of an error
  }
}
