import { tokens } from '../../tokensData/tokens'
import type { FungibleData } from '../../tokensData/tokens'
import getFungibleVolume from './getFungibleVolume'

const updateFungibleVolume = async (): Promise<Record<string, FungibleData>> => {
  try {
    const updatedTokens = { ...tokens }

    await Promise.all(
      Object.keys(updatedTokens).map(async (tokenId) => {
        try {
          const vol = await getFungibleVolume(tokenId)
          updatedTokens[tokenId] = {
            ...updatedTokens[tokenId],
            vol
          }
        } catch (error) {
          console.error(`Error fetching volume for token ${tokenId}:`, error)
        }
      })
    )

    return updatedTokens
  } catch (error) {
    console.error('Error updating fungible volumes:', error)
    throw error
  }
}

export default updateFungibleVolume
