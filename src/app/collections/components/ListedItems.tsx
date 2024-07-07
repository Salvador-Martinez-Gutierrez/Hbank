'use client'

import React, { useEffect, useState } from 'react'
import NftCard from './NftCard'
import { Button } from "@/components/ui/button"

const ITEMS_PER_PAGE = 30

const ListedItems = ({ updatedListedItems, tokenId }) => {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)

  // Client-side auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload()
    }, 900000)

    return () => { clearInterval(interval) }
  }, [])

  const loadMoreItems = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + ITEMS_PER_PAGE)
  }

  return (
    <main className='pb-12 px-4 lg:px-8 xl:px-16'>
      {updatedListedItems && updatedListedItems.length > 0 ? (
        <>
          <div className="grid h-fit w-full max-w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
            {updatedListedItems.slice(0, visibleItems).map(token => (
              <NftCard key={token.listingId} token={token} tokenId={tokenId} />
            ))}
          </div>
          {visibleItems < updatedListedItems.length && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={loadMoreItems}
                className="bg-gray-500 text-white hover:bg-gray-600"
                >
                  Load More
              </Button>
            </div>
          )}
        </>
      ) : (
        <p>There are no listed items...</p>
      )}
    </main>
  )
}

export default ListedItems
