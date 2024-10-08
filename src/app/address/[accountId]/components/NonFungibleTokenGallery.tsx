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
  console.log('NFTSSS', { nfts })
  const nftsWithPrice = await getPricedNFTs(nfts, hbarPrice)
  console.log('NFTSSS', { nftsWithPrice })

  const filteredTokens = nftsWithPrice
    .filter(token => token.balance * (token.priceUsd ?? 0) > 0)
    .sort((a, b) => (b.balance * (b.priceUsd ?? 0)) - (a.balance * (a.priceUsd ?? 0)))

  const totalValue = filteredTokens.reduce((acc, token) => acc + (token.balance * (token.priceUsd ?? 0)), 0)

  return (
    <NonFungibleTokenGalleryClient
      filteredTokens={filteredTokens}
      totalValue={totalValue}
      showTopFour={showTopFour}
      accountId={accountId}
    />
  )
}

export default NonFungibleTokenGallery
