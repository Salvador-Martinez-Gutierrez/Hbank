import React from 'react'
import CollectionInfo from '../components/CollectionInfo'
import updateFloorPrice from '@/app/services/updateFloorPrice'
import TabNav from '../components/TabNav'
import { fetchOwnersData } from '@/app/services/fetchOwnersData'
import { fetchListedTokensSentx } from '@/app/services/fetchListedTokensSentx'
import { fetchListedTokensKabila } from '@/app/services/fetchListedTokensKabila'

interface SentxItem {
  marketplaceListingId: number
  nftexid: number
  serialId: number
  sellerAccount: string
  isAvailableForPurchase: number
  salePrice: number
  listingDate: string
  affiliateid: null
  nftName: string
  nftTokenAddress: string
  nftSerialId: number
  nftImage: string
  nftImageType: string
  nftMetadata: string
  nftexplorerCollectionId: number
}

interface KabilaItem {
  _id: string
  tokenId: string
  serialNumber: number
  price: number
  currency: string
  sellerId: string
  metadataCid: string
  imageCid: string
  imageType: string
  name: string
  description: string
  createdAt: string
  status: string
  statusDate: string
}

export interface normalizedItem {
  listingId: string
  serialNumber: number
  price: number
  metadataCid: string
  imageCid: string
  name: string
  createdAt: string
  marketplace: string
}

const updateListedItems = async (tokenId: string) => {
  const listedItemsSentx = await fetchListedTokensSentx(tokenId)
  const listedItemsKabila = await fetchListedTokensKabila(tokenId)
  // Normalize data from the first API (Sentx)
  const normalizedSentx = await listedItemsSentx.map((item: SentxItem) => ({
    listingId: item.marketplaceListingId,
    serialNumber: item.serialId,
    price: item.salePrice,
    metadataCid: item.nftMetadata,
    imageCid: item.nftImage,
    name: item.nftName,
    createdAt: item.listingDate,
    marketplace: 'Sentx'
  }))

  // Normalize data from the second API (Kabila)
  const normalizedKabila = await listedItemsKabila.map((item: KabilaItem) => ({
    listingId: item._id,
    serialNumber: item.serialNumber,
    price: item.price,
    metadataCid: item.metadataCid,
    imageCid: item.imageCid,
    name: item.name,
    createdAt: item.createdAt,
    marketplace: 'Kabila'
  }))

  // Combine normalized data from both APIs
  const combinedListedItems = [...normalizedSentx, ...normalizedKabila]

  // Sort combined items by price from lower to higher
  const sortedListedItems: normalizedItem [] = combinedListedItems.sort((a, b) => a.price - b.price)

  return sortedListedItems
}

interface Params {
  tokenId: string
}

const Collection = async ({ params }: { params: Params }) => {
  const tokenId: string = params.tokenId
  const updatedListedItems = await updateListedItems(tokenId)
  const updatedCollections = await updateFloorPrice()
  const ownersList = await fetchOwnersData(tokenId)

  return (
    <main className='bg-neutral-900 text-neutral-200 min-h-screen'>
      <CollectionInfo tokenId={tokenId} updatedCollections={updatedCollections} />
      <TabNav updatedListedItems={updatedListedItems} ownersList={ownersList} tokenId={tokenId} />
    </main>
  )
}

export default Collection
