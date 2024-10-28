export const getListedTokensKabila = async (tokenId: string) => {
  try {
    const cacheBuster = new Date().getTime()
    const url = `https://labs.kabila.app/api/marketplace/manager/nft-items?tokenIds=${tokenId}&orderBy=price&orderDir=ASC&_=${cacheBuster}`

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
    return data
  } catch (error) {
    console.error('Error fetching token listings:', error instanceof Error ? error.message : 'Unknown error')
    return []
  }
}
