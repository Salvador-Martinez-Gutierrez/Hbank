export default async function unlistNFT (tokenAddress: string, serialNumber: string, userAddress: string) {
  try {
    const response = await fetch('/api/unlistNft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tokenAddress,
        serialNumber,
        userAddress
      })
    })

    if (!response.ok) {
      throw new Error('Error unlisting NFT')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
