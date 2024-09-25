// Passing the Account Id and Token Id

async function getNftMetadata (accountId: string, tokenId: string) {
  const apiKeyHedera = process.env.VALIDATION_CLOUD_KEY
  const url = `https://mainnet.hedera.validationcloud.io/v1/${apiKeyHedera}/api/v1/accounts/${accountId}/nfts?token.id=${tokenId}`

  try {
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })

    if (!response.ok) {
      console.error(`Error fetching account NFTs: ${response.status} - ${response.statusText}`)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    const nfts = data.nfts
    const metadata = nfts[0].metadata
    // Filter NFTs that are not deleted
    return metadata
  } catch (error) {
    console.error('Error fetching account NFTs:', error)
    throw error
  }
}

export default getNftMetadata
