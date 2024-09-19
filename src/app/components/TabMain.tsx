import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/collections/components/ui/tabs'
import TopCollectionsTable from './collections/TopCollectionsTable'
// import TopTokensTable from './tokens/TopTokensTable'
import SeeMoreMarketAggregatorButton from './collections/SeeMoreMarketAggregatorButton'
// import SeeMoreTokenAggregatorButton from './tokens/SeeMoreTokenAggregatorButton'
import { Badge } from '@/components/ui/badge'

const TabMain = () => {
  return (
    <section>
      <div className="min-h-10 w-full px-4 lg:px-8 xl:px-16 mb-4">
        <Tabs defaultValue="NFTs" className="w-full">
          <TabsList className="w-full md:w-[400px] bg-neutral-950 relative">
            <TabsTrigger
              value="NFTs"
              className="w-full data-[state=active]:bg-zinc-800 text-gray-300 data-[state=active]:text-white"
            >
              NFTs
            </TabsTrigger>
            <TabsTrigger
              className="w-full bg-neutral-950 data-[state=active]:bg-neutral-950 text-gray-500 data-[state=active]:text-gray-500 relative cursor-not-allowed pointer-events-none"
              value="Coins"
            >
              <span>Coins</span>
              <Badge
                variant="default"
                className="bg-blue-500 hover:bg-blue-500 text-white absolute top-[-4px] right-[-4px] transform translate-x-1/2 -translate-y-1/2"
              >
                Soon
              </Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="NFTs">
            <div className="justify-center items-center text-center px-4 pb-8 lg:px-8 xl:px-16">
              <TopCollectionsTable variant="simple" />
              <SeeMoreMarketAggregatorButton />
            </div>
          </TabsContent>
         {/* <TabsContent value="Coins">
            <div className="justify-center items-center text-center px-4 pb-8 lg:px-8 xl:px-16">
              <TopTokensTable variant="simple"/>
              <SeeMoreTokenAggregatorButton />
            </div>
          </TabsContent> */}
        </Tabs>
      </div>
    </section>
  )
}

export default TabMain
