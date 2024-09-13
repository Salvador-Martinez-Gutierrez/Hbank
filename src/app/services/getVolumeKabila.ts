export const getVolumeKabila = async (tokenId: string) => {
  try {
    const cacheBuster = new Date().getTime()
    const url = `https://labs.kabila.app/api/marketplace/analytics/activity?tokenId=${tokenId}&timeRange=30d&activityType=SALE&skip=0&limit=500&format=JSONEachRow&fields=tokenId,serialNumber,name,imageCid,imageType,activityType,subactivityType,price,currency,buyerId,sellerId,createdAt,rank&_=${cacheBuster}`

    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })

    if (!response.ok) {
      console.error(`Error fetching Kabila Volume: ${response.status} - ${response.statusText}`)
      throw new Error('Error fetching Kabila Volume')
    }

    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No valid Kabila volume data found for tokenId: ${tokenId}`)
      return 0 // Return 0 if no data is found
    }

    // Aggregate the price values
    const totalVolume = data.reduce((sum, item) => {
      const price = typeof item.price === 'number' ? item.price : 0
      return sum + price
    }, 0)

    return totalVolume
  } catch (error) {
    console.error(`Error fetching Kabila Volume for tokenId: ${tokenId}`, error)
    return 0 // Return 0 in case of an error
  }
}
