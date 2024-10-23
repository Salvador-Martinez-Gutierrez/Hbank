import { cache } from 'react'

interface Nft {
  account_id: string
  created_timestamp: string
  delegating_spender: string | null
  deleted: boolean
  metadata: string
  modified_timestamp: string
  serial_number: string
  spender_id: string | null
  token_id: string
}

interface ApiResponse {
  nfts: Nft[]
  links?: {
    next: string | null
  }
}

export const getAccountNftsByTokenId = cache(async (accountId: string, tokenId: string): Promise<Nft[]> => {
  const apiKey = process.env.VALIDATION_CLOUD_KEY
  const baseUrl = `https://mainnet.hedera.validationcloud.io/v1/${apiKey}`
  let url: string | null = `${baseUrl}/api/v1/accounts/${accountId}/nfts?token.id=${tokenId}`
  const allNfts: Nft[] = []

  try {
    while (url !== null) {
      const response = await fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache'
        }
      })

      if (!response.ok) {
        console.error(`Error fetching NFT info: ${response.status} - ${response.statusText}`)
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()
      allNfts.push(...data.nfts)

      url = data.links?.next !== null ? `${baseUrl}${data.links?.next}` : null
    }

    return allNfts
  } catch (error) {
    console.error('Error fetching NFT info:', error)
    throw error
  }
})
