/*
import getFungibleData from './getFungibleData'
import { tokens } from '../../tokensData/tokens'
import type { FungibleData } from '../../tokensData/tokens'

const updateFungibleData = async (): Promise<Record<string, FungibleData>> => {
  const updatedTokens: Record<string, FungibleData> = { ...tokens }

  for (const [key, token] of Object.entries(updatedTokens)) {
    try {
      const tokenData = await getFungibleData(token.tokenId)

      // Update the token data with all available properties
      updatedTokens[key] = {
        ...token,
        decimals: tokenData.decimals,
        icon: tokenData.icon,
        name: tokenData.name,
        price: tokenData.price,
        priceUsd: tokenData.priceUsd,
        symbol: tokenData.symbol,
        dueDiligenceComplete: tokenData.dueDiligenceComplete,
        isFeeOnTransferToken: tokenData.isFeeOnTransferToken,
        description: tokenData.description,
        website: tokenData.website,
        sentinelReport: tokenData.sentinelReport,
        twitterHandle: tokenData.twitterHandle,
        timestampSecondsLastListingChange: tokenData.timestampSecondsLastListingChange
      }

      // console.log(`Updated token data for ${token.tokenId}:`, updatedTokens[key])
    } catch (error) {
      console.error(`Failed to update token data for ${token.tokenId}:`, error)
    }
  }

  return updatedTokens
}

export default updateFungibleData
*/
