import collections from '../collectionsData/collections'
import type { TokenData } from '../collectionsData/collections'
import { fetchFloorPriceSentx } from './fetchFloorPriceSentx'
import { fetchFloorPriceKabila } from './fetchFloorPriceKabila'

const updateFloorPrice = async (): Promise<Record<string, TokenData>> => {
  const updatedCollections: Record<string, TokenData> = { ...collections }

  const cacheBuster = new Date().getTime() // Unique cache-busting timestamp

  const updatePromises = Object.entries(updatedCollections).map(async ([tokenId, tokenData]) => {
    try {
      // Modify the URLs inside the fetch functions to include cacheBuster
      const floorPriceSentx = await fetchFloorPriceSentx(`${tokenId}&_=${cacheBuster}`)
      const floorPriceKabila = await fetchFloorPriceKabila(`${tokenId}&_=${cacheBuster}`)

      tokenData.floorPrice = Math.min(floorPriceSentx, floorPriceKabila)
    } catch (error) {
      console.error(`Failed to update floor price for tokenId ${tokenId}:`, error)
    }
  })

  await Promise.all(updatePromises)

  return updatedCollections
}

export default updateFloorPrice
