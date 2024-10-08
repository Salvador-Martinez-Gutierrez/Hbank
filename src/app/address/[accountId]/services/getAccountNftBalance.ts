import { cache } from 'react'
import getTokenData from '../../../services/getTokenData'

interface TokenHolding {
  token_id: string
  balance: number
}

interface Token {
  token_id: string
  name: string
  symbol: string
  type: string
  balance: number
  decimals: number
  price?: number
  priceUsd?: number
}

export const getAccountNftBalance = cache(async (accountHoldings: TokenHolding[]): Promise<Token[]> => {
  const nfts: Token[] = []

  // Process all tokens
  await Promise.all(accountHoldings.map(async (holding) => {
    try {
      const tokenData = await getTokenData(holding.token_id)

      if (tokenData.type === 'NON_FUNGIBLE_UNIQUE' && tokenData.name !== 'SaucerSwap v2 Liquidity Position') {
        const tokenInfo: Token = {
          token_id: holding.token_id,
          name: tokenData.name,
          symbol: tokenData.symbol,
          type: tokenData.type,
          balance: holding.balance,
          decimals: tokenData.decimals
        }
        nfts.push(tokenInfo)
      }
    } catch (error) {
      console.error(`Error processing token ${holding.token_id}:`, error)
    }
  }))

  return nfts
})

/* interface Nft {
  account_id: string
  created_timestamp: string
  delegating_spender: string | null
  deleted: boolean
  metadata: string | null
  modified_timestamp: string
  serial_number: number
  spender: string | null
  token_id: string
}

interface AggregatedNft {
  token_id: string
  balance: number
  nfts: Nft[]
}

async function getAccountNftBalance (accountId: string): Promise<AggregatedNft[]> {
  const apiKeyHedera = process.env.VALIDATION_CLOUD_KEY
  const baseUrl = `https://mainnet.hedera.validationcloud.io/v1/${apiKeyHedera}`
  let url = `${baseUrl}/api/v1/accounts/${accountId}/nfts`
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

      const data = await response.json()
      allNfts.push(...data.nfts)

      url = data.links?.next ? `${baseUrl}${data.links.next}` : null
    }

    // Calculate balance for each NFT
    const nftBalances = allNfts.reduce((acc, nft) => {
      if (!acc[nft.token_id]) {
        acc[nft.token_id] = { token_id: nft.token_id, balance: 0, nfts: [] }
      }
      acc[nft.token_id].balance++
      acc[nft.token_id].nfts.push(nft)
      return acc
    }, {} as Record<string, AggregatedNft>)

    return Object.values(nftBalances)
  } catch (error) {
    console.error('Error fetching NFT info:', error)
    throw error
  }
}

export default getAccountNftBalance
*/
