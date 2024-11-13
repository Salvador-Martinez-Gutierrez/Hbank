import collections from '../collectionsData/collections'
import type { TokenData } from '../collectionsData/collections'
import { getFloorPriceSentx } from './getFloorPriceSentx'
import { getFloorPriceKabila } from './getFloorPriceKabila'

const updateFloorPrice = async (): Promise<Record<string, TokenData>> => {
  const updatedCollections: Record<string, TokenData> = { ...collections }

  const updatePromises = Object.entries(updatedCollections).map(async ([tokenId, tokenData]) => {
    try {
      const floorPriceSentx: number | null = await getFloorPriceSentx(tokenId)
      const floorPriceKabila: number | null = await getFloorPriceKabila(tokenId)

      if (floorPriceSentx === null) {
        tokenData.floorPrice = floorPriceKabila
      } else if (floorPriceKabila === null) {
        tokenData.floorPrice = floorPriceSentx
      } else if (typeof floorPriceKabila === 'number' && typeof floorPriceSentx === 'number') {
        tokenData.floorPrice = Math.min(floorPriceSentx, floorPriceKabila)
      } else if (floorPriceKabila === null && floorPriceSentx === null) {
        tokenData.floorPrice = null
      }
    } catch (error) {
      console.error(`Failed to update floor price for tokenId ${tokenId}:`, error)
    }
  })

  await Promise.all(updatePromises)

  return updatedCollections
}

export default updateFloorPrice
