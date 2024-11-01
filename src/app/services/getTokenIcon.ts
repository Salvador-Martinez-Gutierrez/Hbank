const getTokenIcon = async (tokenId: string): Promise<string> => {
  try {
    // First try the Davinci API
    const url = `https://s2.pics.davincigraph.io/api/v2/tokens/hedera/${encodeURIComponent(tokenId)}`
    const response = await fetch(url)

    if (!response.ok) {
      return '/NotFound.png'
    }

    const data = await response.json()
    const imgUrl: string = data.pic

    // Try to access the Arweave URL through a proxy
    const proxyUrl = `/api/proxy-image?url=${encodeURIComponent(imgUrl)}`
    return proxyUrl
  } catch (error) {
    console.error('Error fetching token icon:', error)
    return '/NotFound.png'
  }
}

export default getTokenIcon
