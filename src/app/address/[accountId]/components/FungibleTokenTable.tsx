import React from 'react'
import { classifyAccountTokenBalance } from '../services/classifyAccountTokenBalance'
import { getPricedTokens } from '../services/getPricedTokens'
import { getTokensWithPriceChange } from '../services/getTokensWithPriceChange'
import FungibleTokenTableClient from './FungibleTokenTableClient'

interface Token {
  token_id: string
  balance: number
  decimals?: number
  priceUsd?: number
  priceHbar?: number
  priceChangeHour?: number
  priceChangeDay?: number
  priceChangeWeek?: number
  name?: string
  symbol?: string
  type?: string
  valueUsd: number
  iconUrl?: string
}

interface FungibleTokenTableProps {
  accountHoldings: Token[]
  showTopFour?: boolean
  accountId: string
  hbarPrice: number
}

async function FungibleTokenTable ({ accountHoldings, showTopFour, accountId, hbarPrice }: FungibleTokenTableProps) {
  const { tokens } = await classifyAccountTokenBalance(accountHoldings)
  const tokensWithPrice = await getPricedTokens(tokens, hbarPrice)
  const tokensWithPriceChanges = await getTokensWithPriceChange(tokensWithPrice)

  const tokenDataPromises = tokensWithPriceChanges.map(async (token) => {
    const valueUsd = (token.balance * Math.pow(10, -(token.decimals ?? 0)) * (token.priceUsd ?? 0))
    return { ...token, valueUsd }
  })

  const tokensWithData = await Promise.all(tokenDataPromises)
  const filteredTokens = tokensWithData
    .filter(token => token.valueUsd > 0.001)
    .sort((a, b) => b.valueUsd - a.valueUsd)

  const totalValueUsd = filteredTokens.reduce((acc, token) => acc + token.valueUsd, 0)
  const totalValue = filteredTokens.reduce((acc, token) => acc + (token.valueUsd / hbarPrice), 0)

  return (
    <FungibleTokenTableClient
      filteredTokens={filteredTokens}
      showTopFour={showTopFour}
      accountId={accountId}
      totalValueUsd={totalValueUsd}
      totalValue={totalValue}
      hbarPrice={hbarPrice}
    />
  )
}

export default FungibleTokenTable
