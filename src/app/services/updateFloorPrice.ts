import collections from '../collectionsData/collections'
import type { TokenData } from '../collectionsData/collections'
import { getFloorPriceSentx } from './getFloorPriceSentx'
import { getFloorPriceKabila } from './getFloorPriceKabila'
// import getVol30day from './getVol30day'

const updateFloorPrice = async (): Promise<Record<string, TokenData>> => {
  const updatedCollections: Record<string, TokenData> = { ...collections }

  const updatePromises = Object.entries(updatedCollections).map(async ([tokenId, tokenData]) => {
    try {
      // Modify the URLs inside the fetch functions to include cacheBuster
      const floorPriceSentx: number | null = await getFloorPriceSentx(`${tokenId}`)
      const floorPriceKabila: number | null = await getFloorPriceKabila(`${tokenId}`)
      // const vol30d: number = await getVol30day(tokenId)
      if (floorPriceSentx === null) {
        tokenData.floorPrice = floorPriceKabila
      } else if (floorPriceKabila === null) {
        tokenData.floorPrice = floorPriceSentx
      } else if (typeof floorPriceKabila === 'number' && typeof floorPriceSentx === 'number') {
        tokenData.floorPrice = Math.min(floorPriceSentx, floorPriceKabila)
      }
      // Update the tokenData with the 30-day volume
      // tokenData.vol30d = vol30d
    } catch (error) {
      console.error(`Failed to update floor price for tokenId ${tokenId}:`, error)
    }
  })

  await Promise.all(updatePromises)

  return updatedCollections
}

export default updateFloorPrice
