import React, { Suspense } from 'react'
import ListedItems from './ListedItems'
import ListedItemsSkeleton from './ListedItemsSkeleton'
import Activity from './Activity'
import Analytics from './Analytics'
import Holdings from './Holdings'
import Offers from './Offers'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/collections/components/ui/tabs'
import { WalletProvider } from '../../../context/WalletContext'

export interface NormalizedItem {
  listingId: string
  serialNumber: string
  price: number
  sellerId: string
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
    <section className="pb-[76px] sm:pb-0">
        <Tabs defaultValue="listings" className="w-full">
          <div className="hidden sm:flex justify-center w-full py-4 border-b-2 border-zinc-800 px-4 lg:px-8 xl:px-16">
            <TabsList className="w-full md:w-[600px] bg-neutral-950">
              <TabsTrigger
                className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="listings"
              >
                Listings
              </TabsTrigger>
              <TabsTrigger
                className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="offers"
              >
                Offers
              </TabsTrigger>
              <TabsTrigger
                className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="activity"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger
                className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="holdings"
              >
                Holdings
              </TabsTrigger>
              <TabsTrigger
                className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="analytics"
              >
                Analytics
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-neutral-950 sm:hidden z-50">
            <TabsList className="w-full grid grid-cols-5 bg-transparent gap-0">
              <TabsTrigger
                className="flex flex-col items-center px-1 data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="listings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/>
                </svg>
                <span className="text-sm">Listings</span>
              </TabsTrigger>
              <TabsTrigger
                className="flex flex-col items-center py-3 px-1 data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="offers"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M475-160q4 0 8-2t6-4l328-328q12-12 17.5-27t5.5-30q0-16-5.5-30.5T817-607L647-777q-11-12-25.5-17.5T591-800q-15 0-30 5.5T534-777l-11 11 74 75q15 14 22 32t7 38q0 42-28.5 70.5T527-522q-20 0-38.5-7T456-550l-75-74-175 175q-3 3-4.5 6.5T200-435q0 8 6 14.5t14 6.5q4 0 8-2t6-4l136-136 56 56-135 136q-3 3-4.5 6.5T285-350q0 8 6 14t14 6q4 0 8-2t6-4l136-135 56 56-135 136q-3 2-4.5 6t-1.5 8q0 8 6 14t14 6q4 0 7.5-1.5t6.5-4.5l136-135 56 56-136 136q-3 3-4.5 6.5T454-180q0 8 6.5 14t14.5 6Zm-1 80q-37 0-65.5-24.5T375-166q-34-5-57-28t-28-57q-34-5-56.5-28.5T206-336q-38-5-62-33t-24-66q0-20 7.5-38.5T149-506l232-231 131 131q2 3 6 4.5t8 1.5q9 0 15-5.5t6-14.5q0-4-1.5-8t-4.5-6L398-777q-11-12-25.5-17.5T342-800q-15 0-30 5.5T285-777L144-635q-9 9-15 21t-8 24q-2 12 0 24.5t8 23.5l-58 58q-17-23-25-50.5T40-590q2-28 14-54.5T87-692l141-141q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l11 11 11-11q24-23 53.5-35t60.5-12q31 0 60.5 12t52.5 35l169 169q23 23 35 53t12 61q0 31-12 60.5T873-437L545-110q-14 14-32.5 22T474-80Zm-99-560Z"/>
                </svg>
                <span className="text-sm">Offers</span>
              </TabsTrigger>
              <TabsTrigger
                className="flex flex-col items-center py-3 px-1 data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="holdings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/>
                </svg>
                <span className="text-sm">Holdings</span>
              </TabsTrigger>
              <TabsTrigger
                className="flex flex-col items-center py-3 px-1 data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="activity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M480-80 360-642l-88 402H80v-80h128l113-520h79l122 572 78-332h80l72 280h128v80H690l-48-188-82 348h-80Z"/>
                </svg>
                <span className="text-sm">Activity</span>
              </TabsTrigger>
              <TabsTrigger
                className="flex flex-col items-center py-3 px-1 data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
                value="analytics"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M280-280h80v-280h-80v280Zm160 0h80v-400h-80v400Zm160 0h80v-160h-80v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
                </svg>
                <span className="text-sm">Analytics</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <WalletProvider>
            <TabsContent value="listings">
              <div className="px-4 lg:px-8 xl:px-16">
                <Suspense fallback={<ListedItemsSkeleton />}>
                    <ListedItems tokenId={tokenId} />
                </Suspense>
              </div>
            </TabsContent>
            <TabsContent value="offers">
              <div className="px-4 lg:px-8 xl:px-16">
                  <Offers tokenId={tokenId}/>
              </div>
            </TabsContent>
            <TabsContent value="holdings">
              <div className="px-4 lg:px-8 xl:px-16">
              <Holdings tokenId={tokenId}/>
              </div>
            </TabsContent>
            <TabsContent value="activity">
              <div className="px-4 lg:px-8 xl:px-16">
                <Activity tokenId={tokenId}/>
              </div>
            </TabsContent>
            <TabsContent value="analytics">
              <div className="px-4 lg:px-8 xl:px-16">
                <Analytics tokenId={tokenId} />
              </div>
            </TabsContent>
          </WalletProvider>
        </Tabs>
    </section>
  )
}

export default TabNav
