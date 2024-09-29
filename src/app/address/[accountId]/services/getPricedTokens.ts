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

export async function getPricedNFTs (nfts: Token[], hbarPrice: number): Promise<Token[]> {
  return await Promise.all(nfts.map(async (nft) => {
    let price = null
    let priceUsd = 0
    const priceKabila = await getFloorPriceKabila(nft.token_id)
    const priceSentx = await getFloorPriceSentx(nft.token_id)

    if (priceSentx === null && priceKabila !== null) {
      price = priceKabila
      priceUsd = priceKabila * hbarPrice
    } else if (priceKabila === null && priceSentx !== null) {
      price = priceSentx
      priceUsd = priceSentx * hbarPrice
    } else if (typeof priceKabila === 'number' && typeof priceSentx === 'number') {
      price = Math.min(priceSentx, priceKabila)
      priceUsd = price * hbarPrice
    }

    return { ...nft, price, priceUsd }
  }))
}
