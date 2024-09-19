import React, { Suspense } from 'react'
import ListedItems from './ListedItems'
import ListedItemsSkeleton from './ListedItemsSkeleton'
import Holders from './Holders'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/collections/components/ui/tabs'
import { getListedTokensSentx } from '@/app/services/getListedTokensSentx'
import { getListedTokensKabila } from '@/app/services/getListedTokensKabila'

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

interface TabNavProps {
  tokenId: string
}

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

const TabNav: React.FC<TabNavProps> = async ({ tokenId }) => {
  const updatedListedItems = await updateListedItems(tokenId)
  return (
    <section>
        <Tabs defaultValue="listings" className="w-full">
          <div className="flex justify-center w-full py-4 border-b-2 border-zinc-800">
            <TabsList className="w-full md:w-[400px] bg-neutral-950">
              <TabsTrigger
                className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="listings"
              >
                Listings
              </TabsTrigger>
              <TabsTrigger
                className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="holders"
              >
                Holders
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="listings">
            <div className="px-4 lg:px-8 xl:px-16">
              <Suspense fallback={<ListedItemsSkeleton />}>
                <ListedItems updatedListedItems={updatedListedItems} tokenId={tokenId} />
              </Suspense>
            </div>
          </TabsContent>
          <TabsContent value="holders">
            <div className="justify-center items-center text-center pt-6 pb-8 px-4 lg:px-8 xl:px-16">
              <Holders tokenId={tokenId} />
            </div>
          </TabsContent>
        </Tabs>
    </section>
  )
}

export default TabNav
