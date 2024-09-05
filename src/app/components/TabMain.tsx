'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/app/collections/components/ui/tabs'
import TopCollectionsTable from './TopCollectionsTable'
import SeeMoreMarketAggregatorButton from './SeeMoreMarketAggregatorButton'
import type { TokenData } from '../collectionsData/collections'
import { Badge } from '@/components/ui/badge'

interface TabMainProps {
  updatedCollections: Record<string, TokenData>
}

const TabMain: React.FC<TabMainProps> = ({ updatedCollections }) => {
  return (
    <>
      <div className="min-h-10 w-full px-4 lg:px-8 xl:px-16 mb-4">
        <Tabs defaultValue="account" className="w-full flex justify-center">
          <TabsList className="w-full md:w-[400px] bg-zinc-600 relative">
            <TabsTrigger
              className="w-full bg-zinc-800 data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
              value="NFTs"
            >
              NFTs
            </TabsTrigger>
            <TabsTrigger
              className="w-full bg-zinc-600 data-[state=active]:bg-zinc-600 text-gray-300 data-[state=active]:text-gray-300 relative"
              value="Coins"
              onMouseOver={(e) => {
                e.currentTarget.style.cursor = 'not-allowed'
              }}
              onClick={(e) => {
                e.preventDefault()
              }}
            >
              <span>Coins</span>
              <Badge
                variant="default"
                className="bg-blue-500 hover:bg-blue-500 text-gray-300 absolute top-[-4px] right-[-4px] transform translate-x-1/2 -translate-y-1/2"
              >
                Soon
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div>
        <div className="justify-center items-center text-center px-4 pb-8 lg:px-8 xl:px-16">
          <TopCollectionsTable updatedCollections={updatedCollections} variant="simple" />
          <SeeMoreMarketAggregatorButton />
        </div>
      </div>
    </>
  )
}

export default TabMain
