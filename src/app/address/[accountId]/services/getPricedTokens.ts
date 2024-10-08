import getTokenPrice from '../../../services/getTokenPrice'
import { getFloorPriceKabila } from '@/app/services/getFloorPriceKabila'
import { getFloorPriceSentx } from '@/app/services/getFloorPriceSentx'

interface Token {
  token_id: string
  name: string
  symbol: string
  type: string
  balance: number
  decimals?: number
  price?: number
  priceUsd?: number
}

export async function getPricedTokens (tokens: Token[], hbarPrice: number): Promise<Token[]> {
  return await Promise.all(tokens.map(async (token) => {
    let priceUsd
    if (token.token_id === 'HBAR') {
      priceUsd = hbarPrice
    } else {
      priceUsd = await getTokenPrice(token.token_id)
    }
    return { ...token, priceUsd }
  }))
}

interface Token {
  token_id: string
  name: string
  symbol: string
  type: string
  balance: number
  price?: number
  priceUsd?: number
}
/*
interface AggregatedNft {
  token_id: string
  balance: number
  nfts: Nft[]
}
*/
export async function getPricedNFTs (nfts: Token[], hbarPrice: number) {
  const pricedNFTs = await Promise.all(nfts.map(async (nft) => {
    let price = null
    let priceUsd = 0
    const priceKabila = await getFloorPriceKabila(nft.token_id)
    const priceSentx = await getFloorPriceSentx(nft.token_id)

    if (typeof priceKabila === 'number' && typeof priceSentx === 'number') {
      price = Math.min(priceSentx, priceKabila)
      priceUsd = price * hbarPrice
    } else if (priceKabila === null && priceSentx !== null) {
      price = priceSentx
      priceUsd = priceSentx * hbarPrice
    } else if (priceSentx === null && priceKabila !== null) {
      price = priceKabila
      priceUsd = priceKabila * hbarPrice
    }

    return { ...nft, price, priceUsd }
  }))

  // Filter out NFTs with a price of 0
  return pricedNFTs.filter(nft => nft.price !== 0 && nft.priceUsd !== 0)
}
