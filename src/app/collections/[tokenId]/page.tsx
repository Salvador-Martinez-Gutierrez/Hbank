import React, { Suspense } from 'react'
import CollectionInfo from './components/CollectionInfo'
import CollectionInfoSkeleton from './components/CollectionInfoSkeleton'
import CollectionBreadCrumb from './components/CollectionBreadCrumb'
import TabNav from './components/TabNav'

interface Params {
  tokenId: string
}

const Collection = async ({ params }: { params: Params }) => {
  const tokenId: string = params.tokenId

  return (
    <main className='bg-neutral-900 text-neutral-200 min-h-screen'>
      <CollectionBreadCrumb tokenId={tokenId}/>
      <Suspense fallback={<CollectionInfoSkeleton/>}>
        <CollectionInfo tokenId={tokenId} />
      </Suspense>
        <TabNav tokenId={tokenId} />
    </main>
  )
}

export default Collection
