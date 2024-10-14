import type { normalizedItem } from './TabNav'
import { getListedTokensSentx } from '@/app/services/getListedTokensSentx'
import { getListedTokensKabila } from '@/app/services/getListedTokensKabila'
import ListedItemsClient from './ListedItemsClient'
// import { WalletContext } from '@/app/context/WalletContext'

const updateListedItems = async (tokenId: string) => {
  const listedItemsSentx = await getListedTokensSentx(tokenId)
  const listedItemsKabila = await getListedTokensKabila(tokenId)
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

interface ListedItemsProps {
  tokenId: string
}

const ListedItems: React.FC<ListedItemsProps> = async ({ tokenId }) => {
  const updatedListedItems = await updateListedItems(tokenId)

  return (
    <ListedItemsClient updatedListedItems={updatedListedItems} tokenId={tokenId}/>
  )
}

export default ListedItems
