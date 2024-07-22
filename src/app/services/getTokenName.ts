// services/getTokenName.js

const getTokenName = async (tokenId: string) => {
  const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/tokens/${tokenId}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.name
  } catch (error) {
    console.error('Error fetching token type:', error)
    throw error // Optionally handle or rethrow the error
  }
}

export default getTokenName
