export default async function buyNFT (tokenAddress: string, serialNumber: number, userAddress: string, price: number) {
  try {
    const response = await fetch('/api/buyNft', {
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
      throw new Error('Error buying NFT')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}
