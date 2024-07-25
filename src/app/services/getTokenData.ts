const getTokenData = async (tokenId: string): Promise<{ name: string, type: string, decimals: number }> => {
  const apiKeyHedera = process.env.VALIDATION_CLOUD_KEY
  const url = `https://mainnet.hedera.validationcloud.io/v1/${apiKeyHedera}/api/v1/tokens/${tokenId}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) { throw new Error(`Error fetching token data for ID: ${tokenId}`) }

    const data = await response.json()
    const { name, type, decimals } = data

    return {
      name,
      type,
      decimals: Number(decimals)
    }
  } catch (error) {
    console.error('Error fetching token data:', error)
    throw error // Optionally handle or rethrow the error
  }
}

export default getTokenData
