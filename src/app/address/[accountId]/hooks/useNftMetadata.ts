import { useState, useEffect } from 'react'
import getNftImageCid from '@/app/services/mirror-node/getNftImageCid'

export default function useNftMetadata (accountId: string, tokenId: string) {
  const [metadata, setMetadata] = useState<string | null>(null)
  const [imageCid, setImageCid] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchMetadata () {
      try {
        const response = await fetch(`/api/nft-metadata?accountId=${accountId}&tokenId=${tokenId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch metadata')
        }
        const data = await response.json()
        const metadata: string = data.metadata
        setMetadata(metadata)

        // Process the metadata to get the imageCid
        let decodedMetadata = atob(metadata)
        if (decodedMetadata.startsWith('ipfs://')) {
          decodedMetadata = `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${decodedMetadata.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
        } else if (decodedMetadata.startsWith('ar://')) {
          decodedMetadata = `https://arweave.net/${decodedMetadata.replace('ar://', '')}`
        }

        const cid: string = await getNftImageCid(decodedMetadata)
        setImageCid(cid)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchMetadata()
  }, [accountId, tokenId])

  return { metadata, imageCid, isLoading, error }
}
