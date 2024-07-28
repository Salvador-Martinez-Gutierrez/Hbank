import collections from '../collectionsData/collections'
import type { TokenData } from '../collectionsData/collections'
import { getFloorPriceSentx } from './getFloorPriceSentx'
import { getFloorPriceKabila } from './getFloorPriceKabila'

const updateFloorPrice = async (): Promise<Record<string, TokenData>> => {
  const updatedCollections: Record<string, TokenData> = { ...collections }

  const cacheBuster = new Date().getTime() // Unique cache-busting timestamp

  const updatePromises = Object.entries(updatedCollections).map(async ([tokenId, tokenData]) => {
    try {
      // Modify the URLs inside the fetch functions to include cacheBuster
      const floorPriceSentx: number | null = await getFloorPriceSentx(`${tokenId}&_=${cacheBuster}`)
      const floorPriceKabila: number | null = await getFloorPriceKabila(`${tokenId}&_=${cacheBuster}`)

      if (floorPriceSentx === null) {
        tokenData.floorPrice = floorPriceKabila
      } else if (floorPriceKabila === null) {
        tokenData.floorPrice = floorPriceSentx
      } else if (typeof floorPriceKabila === 'number' && typeof floorPriceSentx === 'number') {
        tokenData.floorPrice = Math.min(floorPriceSentx, floorPriceKabila)
      }
    } catch (error) {
      console.error(`Failed to update floor price for tokenId ${tokenId}:`, error)
    }
  })

  await Promise.all(updatePromises)

  return updatedCollections
}

export default updateFloorPrice
