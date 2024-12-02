import React from 'react'
import OffersClient from './OffersClient'
// import { getOffers } from '@/app/services/getOffers'
import getOffersKabila from '@/app/services/getOffersKabila'
import getOffersSentx from '@/app/services/getOffersSentx'

interface KabilaOffer {
  _id: string
  buyerId: string
  tokenId: string
  price: number
  currency: string
  marketplace: string
  nftCollection: {
    name: string
    ImageCid?: string
  }
}

interface OffersProps {
  tokenId: string
}

const Offers: React.FC<OffersProps> = async ({ tokenId }) => {
  const kabilaOffers: KabilaOffer[] | null = await getOffersKabila([tokenId])
  const sentxOffers = await getOffersSentx({ token: tokenId })

  console.log('OFFERS SENTX for', tokenId, sentxOffers)

  return (
    <OffersClient offers={kabilaOffers} />
  )
}

export default Offers
