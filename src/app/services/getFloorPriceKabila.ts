export async function getFloorPriceKabila (tokenId: string): Promise<number | null> {
  try {
    const url = `https://labs.kabila.app/api/marketplace/manager/nft-collections?tokenIds=${tokenId}&fields=tokenId,minPrice`

    const response = await fetch(url, {
      next: {
        revalidate: 300 // 5 minutes cache
      }
    })

    // Check if response is not OK (non-2xx status code)
    if (!response.ok) {
      console.error(`Error fetching Kabila Floor Price: ${response.status} - ${response.statusText}`)
      throw new Error('Error fetching Kabila Floor Price')
    }

    const data = await response.json()

    // If the data is empty or has an unexpected structure, handle it
    if (data.length === 0) {
      console.warn(`No valid floor price found for tokenId: ${tokenId}`)
      return null // Return null if no price is found
    }

    return data[0].minPrice
  } catch (error) {
    // Log the error with more context and return null
    console.error(`Error fetching Kabila Floor Price for tokenId: ${tokenId}`, error)
    return null // Return null in case of an error
  }
}
