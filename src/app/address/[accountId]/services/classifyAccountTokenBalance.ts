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

interface ClassifiedHoldings {
  tokens: Token[]
  defi: Token[]
}

export const classifyAccountTokenBalance = cache(async (accountHoldings: TokenHolding[]): Promise<ClassifiedHoldings> => {
  const tokens: Token[] = []
  const defi: Token[] = []

  // Handle HBAR separately
  const hbarHolding = accountHoldings.find(holding => holding.token_id === 'HBAR')
  if (hbarHolding !== undefined) {
    tokens.push({
      token_id: 'HBAR',
      name: 'HBAR',
      symbol: 'HBAR',
      type: 'FUNGIBLE_COMMON',
      decimals: 8,
      balance: hbarHolding.balance
    })
  }

  // Process other tokens
  const otherHoldings = accountHoldings.filter(holding => holding.token_id !== 'HBAR')
  await Promise.all(otherHoldings.map(async (holding) => {
    try {
      const tokenData = await getTokenData(holding.token_id)

      if (tokenData.type === 'FUNGIBLE_COMMON') {
        const tokenInfo: Token = {
          token_id: holding.token_id,
          name: tokenData.name,
          symbol: tokenData.symbol,
          type: tokenData.type,
          balance: holding.balance,
          decimals: tokenData.decimals
        }
        if (tokenData.name.startsWith('ssLP') === true) {
          defi.push(tokenInfo)
        } else {
          tokens.push(tokenInfo)
        }
      }
    } catch (error) {
      console.error(`Error processing token ${holding.token_id}:`, error)
    }
  }))

  return { tokens, defi }
})
