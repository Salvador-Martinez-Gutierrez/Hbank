import React from 'react'
import { getAccountNftsByTokenId } from '../services/getAccountNftsByTokenId'
import NftGalleryByTokenIdClient from './NftGalleryByTokenIdClient'
import { fetchNftMetadata } from '../services/fetchNftMetadata'
import { getListedTokensSentx } from '@/app/services/getListedTokensSentx'
import { getListedTokensKabila } from '@/app/services/getListedTokensKabila'
import type { normalizedItem } from '../../../../../collections/[tokenId]/components/TabNav'
import { getNftRoyalties } from '../services/getNftRoyalties'

interface NonFungibleTokenGalleryProps {
  accountId: string
  tokenId: string
}

interface ExtendedNFT {
  name: string
  imageUrl: string
  serial_number: string
  isListed: boolean
  price?: string | number
  listingId?: number | string
  marketplace?: string
  account_id: string
  created_timestamp: string
  delegating_spender: string | null
  deleted: boolean
  metadata: string
  modified_timestamp: string
  token_id: string
}

interface SentxItem {
  marketplaceListingId: number
  nftexid: number
  serialId: string
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
  serialNumber: string
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

const updateListedItems = async (tokenId: string) => {
  const listedItemsSentx = await getListedTokensSentx(tokenId)
  const listedItemsKabila = await getListedTokensKabila(tokenId)
  // Normalize data from the first API (Sentx)
  const normalizedSentx = listedItemsSentx.map((item: SentxItem) => ({
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
  const normalizedKabila = listedItemsKabila.map((item: KabilaItem) => ({
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

const NonFungibleTokenGallery: React.FC<NonFungibleTokenGalleryProps> = async ({ accountId, tokenId }) => {
  const nfts = await getAccountNftsByTokenId(accountId, tokenId)
  const updatedListedItems = await updateListedItems(tokenId)
  const royalty: number = await getNftRoyalties(tokenId)

  const extendedNfts: ExtendedNFT[] = await Promise.all(
    nfts.map(async (nft) => {
      const { name, imageUrl } = await fetchNftMetadata(nft.metadata)
      const listedItem = updatedListedItems.find(item => item.serialNumber === nft.serial_number)

      if (listedItem !== null && listedItem !== undefined) {
        return {
          ...nft,
          name,
          imageUrl,
          isListed: true,
          price: listedItem.price,
          listingId: listedItem.listingId,
          marketplace: listedItem.marketplace
        }
      } else {
        return { ...nft, name, imageUrl, isListed: false }
      }
    })
  )

  // Sort the extendedNfts array to display listed NFTs first
  const sortedNfts = extendedNfts.sort((a, b) => {
    if (a.isListed && !b.isListed) return -1
    if (!a.isListed && b.isListed) return 1
    return 0
  })

  return (
    <>
       <NftGalleryByTokenIdClient nfts={sortedNfts} accountId={accountId} tokenId={tokenId} royalty={royalty}/>
    </>
  )
}

export default NonFungibleTokenGallery
