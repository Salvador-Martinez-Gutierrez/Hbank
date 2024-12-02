'use client'
import React from 'react'
import { useAccountId } from '@buidlerlabs/hashgraph-react-wallets'
import { useRouter } from 'next/navigation'

interface HoldingsProps {
  tokenId: string
}

const Holdings: React.FC<HoldingsProps> = ({ tokenId }) => {
  const { data: connectedAccountId }: { data: string | null } = useAccountId()
  const [hasNfts, setHasNfts] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const fetchNftStatus = async () => {
      if (connectedAccountId !== null) {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/getAccountNftsByTokenId?accountId=${connectedAccountId}&tokenId=${tokenId}`)
          if (!response.ok) throw new Error('Failed to fetch NFTs')
          const data = await response.json()
          setHasNfts(data.nfts.length > 0)
        } catch (error) {
          console.error('Error fetching NFTs:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchNftStatus()
  }, [connectedAccountId, tokenId])

  if (isLoading) {
    return (
      <div className="text-grey-500 flex items-center gap-2 border-2 border-zinc-800 rounded-md p-3 mt-6">
        <p>Loading your NFT holdings...</p>
      </div>
    )
  }

  if (connectedAccountId !== undefined && connectedAccountId !== null) {
    if (hasNfts) {
      router.push(`/address/${connectedAccountId}/nft-analytics/${tokenId}`)
      return null
    } else {
      return (
        <div className="text-grey-500 flex items-center gap-2 border-2 border-zinc-800 rounded-md p-3 mt-6">
          <p>Account {connectedAccountId} is currently holding 0 NFTs from this collection.</p>
        </div>
      )
    }
  } else if (connectedAccountId === null || connectedAccountId === undefined) {
    return (
      <div className="text-yellow-500 flex items-center gap-2 border-2 border-zinc-800 rounded-md p-3 mt-6">
        <span>⚠️</span>
        <span>You need to login to see your NFT holdings.</span>
      </div>
    )
  }
}

export default Holdings
