export default async function listNFT (tokenAddress: string, serialNumber: string, userAddress: string, price: string) {
  try {
    const response = await fetch('/api/listNft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokenAddress,
        serialNumber,
        userAddress,
        price
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Error listing NFT: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}
