import getNftImageCid from '../../../../../services/mirror-node/getNftImageCid'

export async function fetchNftMetadata (metadata: string): Promise<{ name: string, imageUrl: string }> {
  // Process the metadata to get the imageCid
  let decodedMetadata = atob(metadata)
  if (decodedMetadata.startsWith('ipfs://')) {
    decodedMetadata = `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${decodedMetadata.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
  } else if (decodedMetadata.startsWith('ar://')) {
    decodedMetadata = `https://arweave.net/${decodedMetadata.replace('ar://', '')}`
  }

  try {
    const cid: string = await getNftImageCid(decodedMetadata)
    const response = await fetch(decodedMetadata)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    console.log(data)
    return {
      name: data.name,
      imageUrl: cid
    }
  } catch (error) {
    console.error(`Error fetching metadata from ${decodedMetadata}:`, error)
    return { name: 'Unknown', imageUrl: '' }
  }
}
