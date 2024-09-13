import React, { Suspense } from 'react'
import TopCollectionsTable from '../components/TopCollectionsTable'
import updateFloorPrice from '../services/updateFloorPrice'
import update30dVolume from '../services/update30dVolume'
import TopCollectionsTableSkeleton from '../components/TopCollectionsTableSkeleton'

const Collections = async () => {
  let updatedCollections = await updateFloorPrice()
  updatedCollections = await update30dVolume()
  return (
    <main className="bg-neutral-900 text-neutral-200">
      <div className='flex flex-col justify-center items-center text-center pb-8 md:text-left md:items-start md:justify-start'>
        <h1 className='text-3xl font-bold pt-8 px-8 pb-4 md:px-4 lg:px-8 xl:px-16'>
          Hedera NFT Marketplace Aggregator
        </h1>
        <h2 className= 'text-lg text-muted-foreground w-full max-w-[420px] md:max-w-[800px] px-4 md:px-4 lg:px-8 xl:px-16'>
          Track curated collection listings across major Hedera NFT markets.
        </h2>
      </div>
      <div className='justify-center items-center text-center px-4 pb-8 lg:px-8 xl:px-16'>
       <Suspense fallback={<TopCollectionsTableSkeleton/>}>
          <TopCollectionsTable updatedCollections={updatedCollections}/>
       </Suspense>
      </div>
    </main>
  )
}

export default Collections
