import collections from '../collectionsData/collections'
import type { TokenData } from '../collectionsData/collections'
import { getVolumeSentx } from './getVolumeSentx'
import { getVolumeKabila } from './getVolumeKabila'

const updateVolume = async (): Promise<Record<string, TokenData>> => {
  const updatedCollections: Record<string, TokenData> = { ...collections }

  const updatePromises = Object.entries(updatedCollections).map(async ([tokenId, tokenData]) => {
    try {
      const volumeSentx: number = await getVolumeSentx(tokenId)
      const volumeKabila: number = await getVolumeKabila(tokenId)

      // Sum the volumes from both sources
      tokenData.volume30d = volumeSentx + volumeKabila
    } catch (error) {
      console.error(`Failed to update 30-day volume for tokenId ${tokenId}:`, error)
    }
  })

  await Promise.all(updatePromises)

  return updatedCollections
}

export default updateVolume
