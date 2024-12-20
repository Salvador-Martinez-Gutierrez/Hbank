import React from 'react'
import { getAccountNftBalance } from '../services/getAccountNftBalance'
import { getPricedNFTs } from '../services/getPricedTokens'
import NonFungibleTokenGalleryClient from './NonFungibleTokenGalleryClient'

interface Token {
  token_id: string
  balance: number
}

interface NonFungibleTokenGalleryProps {
  showTopFour: boolean
  accountId: string
  hbarPrice: number
  accountHoldings: Token[]
}

const NonFungibleTokenGallery: React.FC<NonFungibleTokenGalleryProps> = async ({ accountHoldings, showTopFour, accountId, hbarPrice }) => {
  const nfts = await getAccountNftBalance(accountHoldings)
  const nftsWithPrice = await getPricedNFTs(nfts, hbarPrice)

  const filteredTokens = nftsWithPrice
    .filter(token => token.balance * (token.priceUsd ?? 0) > 0)
    .sort((a, b) => (b.balance * (b.priceUsd ?? 0)) - (a.balance * (a.priceUsd ?? 0)))

  const totalValueUsd = filteredTokens.reduce((acc, token) => acc + (token.balance * (token.priceUsd ?? 0)), 0)
  const totalValue = filteredTokens.reduce((acc, token) => acc + (token.balance * (token.price ?? 0)), 0)
  const totalNetValueUsd = filteredTokens.reduce((acc, token) => acc + (token.balance * (token.netPriceUsd ?? 0)), 0)
  const totalNetValue = filteredTokens.reduce((acc, token) => acc + (token.balance * (token.netPrice ?? 0)), 0)

  return (
    <NonFungibleTokenGalleryClient
      filteredTokens={filteredTokens}
      totalValueUsd={totalValueUsd}
      totalValue={totalValue}
      totalNetValueUsd={totalNetValueUsd}
      totalNetValue={totalNetValue}
      showTopFour={showTopFour}
      accountId={accountId}
    />
  )
}

export default NonFungibleTokenGallery
