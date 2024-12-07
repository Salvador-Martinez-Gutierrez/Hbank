interface TokenVolumeData {
  timestampSeconds: number
  tokenId: string
  price: string
  liquidity: string
  volume: string
}

const getFungibleVolume = async (tokenId: string): Promise<number> => {
  const url = `https://api.saucerswap.finance/tokens/daily/${tokenId}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 300
      }
    })

    if (!response.ok) {
      throw new Error(`Error fetching fungible volume: ${response.statusText}`)
    }

    const data: TokenVolumeData[] = await response.json()

    // Convert volume string to number before returning
    return Number(data[0].volume)
  } catch (error) {
    console.error('Error in getFungibleVolume:', error)
    throw error
  }
}

export default getFungibleVolume
