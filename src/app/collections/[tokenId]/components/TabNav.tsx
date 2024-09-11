'use client'

import React, { useState, Suspense } from 'react'
import ListedItems from './ListedItems'
import ListedItemsSkeleton from './ListedItemsSkeleton'
import Holders from './Holders'
import { Tabs, TabsList, TabsTrigger } from '@/app/collections/components/ui/tabs'
import type { normalizedItem } from '../page'

interface Owner {
  account: string
  balance: number
  decimals: number
  rank: number
  pct: number
}

interface TabNavProps {
  updatedListedItems: normalizedItem []
  ownersList: Owner[]
  tokenId: string
}

const TabNav: React.FC<TabNavProps> = ({ updatedListedItems, ownersList, tokenId }) => {
  const [showHolders, setShowHolders] = useState(false)
  return (
    <>
    <div className="min-h-10 w-full py-4 px-4 lg:px-8 xl:px-16 mb-8 border-b-2 border-zinc-800">
      <Tabs defaultValue="account" className="w-full flex justify-center">
        <TabsList className="w-full md:w-[400px] bg-zinc-600">
          <TabsTrigger
            className={`w-full ${!showHolders ? 'bg-zinc-800' : 'bg-zinc-600'} data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white`}
            value="listings"
            onClick={() => { setShowHolders(false) }}>Listings</TabsTrigger>
          <TabsTrigger
            className={`w-full ${showHolders ? 'bg-zinc-800' : 'bg-zinc-600'} data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white`}
            value="holders"
            onClick={() => { setShowHolders(true) }}>Holders</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
    <div>
      {showHolders
        ? (
      <div className='justify-center items-center text-center px-4 pb-8 lg:px-8 xl:px-16'>
        <Holders ownersList={ownersList} />
      </div>
          )
        : (
          <Suspense fallback={<ListedItemsSkeleton/>}>
            <ListedItems updatedListedItems={updatedListedItems} tokenId={tokenId} />
          </Suspense>
          )}
</div>
  </>
  )
}

export default TabNav
