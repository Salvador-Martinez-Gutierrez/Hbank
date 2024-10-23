import React from 'react'
import HoldersClient from './HoldersClient'
import { getOwnersData } from '@/app/services/getOwnersData'

interface Owners {
  account: string
  balance: number
  decimals: number
  rank: number
  pct: number
}

interface HoldersProps {
  tokenId: string
}

const Holders: React.FC<HoldersProps> = async ({ tokenId }) => {
  const ownersList: Owners[] = await getOwnersData(tokenId)

  return (
    <HoldersClient ownersList={ownersList} tokenId={tokenId} />
  )
}

export default Holders
