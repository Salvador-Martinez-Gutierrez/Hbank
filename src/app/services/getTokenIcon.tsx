const getTokenIcon = async (tokenId: string) => {
  try {
    // Construct the URL for the API request
    const url = `https://s2.pics.davincigraph.io/api/v2/tokens/hedera/${encodeURIComponent(tokenId)}`
    // Fetch data from the API
    const response = await fetch(url)
    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }
    // Parse the JSON response
    const data = await response.json()

    // Return the 'pic' field from the response
    return data.pic
  } catch (error) {
    console.error('Error fetching token icon:', error)
    throw error // Re-throw the error after logging it
  }
}

export default getTokenIcon
