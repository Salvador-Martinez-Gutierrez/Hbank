import { tokens } from '../../tokensData/tokens'
import type { FungibleData } from '../../tokensData/tokens'
import getFungiblePrices from './getFungiblePrices'

const updateFungiblePrices = async (): Promise<Record<string, FungibleData>> => {
  try {
    const fungiblePrices = await getFungiblePrices()
    const updatedTokens = { ...tokens }

    fungiblePrices.forEach(price => {
      if (Object.prototype.hasOwnProperty.call(updatedTokens, price.id)) {
        updatedTokens[price.id] = {
          ...updatedTokens[price.id],
          priceUsd: price.priceUsd,
          symbol: price.symbol,
          liquidityUsd: price.liquidityUsd,
          priceChangeHour: price.priceChangeHour,
          priceChangeDay: price.priceChangeDay,
          priceChangeWeek: price.priceChangeWeek
        }
      }
    })

    return updatedTokens
  } catch (error) {
    console.error('Error updating fungible prices:', error)
    throw error
  }
}

export default updateFungiblePrices
