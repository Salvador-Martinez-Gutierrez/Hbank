const getNftImageCid = async (metadataUrl: string) => {
  try {
    const response = await fetch(metadataUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch metadata: ${response.statusText}`)
    }

    const metadata = await response.json()
    return metadata.image
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return null
  }
}

export default getNftImageCid
