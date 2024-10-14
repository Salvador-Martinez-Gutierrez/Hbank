import React, { Suspense } from 'react'
import ListedItems from './ListedItems'
import ListedItemsSkeleton from './ListedItemsSkeleton'
import Holders from './Holders'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/collections/components/ui/tabs'
import { WalletProvider } from '../../../context/WalletContext'

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

interface TabNavProps {
  tokenId: string
}

const TabNav: React.FC<TabNavProps> = async ({ tokenId }) => {
  return (
    <section>
        <Tabs defaultValue="listings" className="w-full">
          <div className="flex justify-center w-full py-4 border-b-2 border-zinc-800 px-4 lg:px-8 xl:px-16">
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
                <WalletProvider>
                  <ListedItems tokenId={tokenId} />
                </WalletProvider>
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
