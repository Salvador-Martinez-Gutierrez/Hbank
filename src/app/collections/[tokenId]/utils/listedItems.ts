import { getListedTokensSentx } from '@/app/services/getListedTokensSentx'
import { getListedTokensKabila } from '@/app/services/getListedTokensKabila'

export interface SentxItem {
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

export interface KabilaItem {
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

export interface NormalizedItem {
  listingId: string
  serialNumber: string
  price: number
  sellerId: string
  metadataCid: string
  imageCid: string
  name: string
  createdAt: string
  marketplace: 'Sentx' | 'Kabila'
}

export const updateListedItems = async (tokenId: string): Promise<NormalizedItem[]> => {
  const listedItemsSentx = await getListedTokensSentx(tokenId)
  const listedItemsKabila = await getListedTokensKabila(tokenId)

  const normalizedSentx = listedItemsSentx.map((item: SentxItem) => ({
    listingId: item.marketplaceListingId.toString(),
    serialNumber: item.serialId,
    price: item.salePrice,
    sellerId: item.sellerAccount,
    metadataCid: item.nftMetadata,
    imageCid: item.nftImage,
    name: item.nftName,
    createdAt: item.listingDate,
    marketplace: 'Sentx'
  }))

  const normalizedKabila = listedItemsKabila.map((item: KabilaItem) => ({
    listingId: item._id,
    serialNumber: item.serialNumber,
    price: item.price,
    sellerId: item.sellerId,
    metadataCid: item.metadataCid,
    imageCid: item.imageCid,
    name: item.name,
    createdAt: item.createdAt,
    marketplace: 'Kabila'
  }))

  const combinedListedItems = [...normalizedSentx, ...normalizedKabila]
  return combinedListedItems.sort((a, b) => a.price - b.price)
}
