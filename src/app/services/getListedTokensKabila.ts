export const getListedTokensKabila = async (tokenId: string) => {
  try {
    const cacheBuster = new Date().getTime() // Unique cache-busting timestamp
    const url = `https://labs.kabila.app/api/marketplace/manager/nft-items?tokenIds=${tokenId}&orderBy=price&orderDir=ASC&_=${cacheBuster}`

    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache' // Ensure no caching
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null // Returning null in case of an error
  }
}
