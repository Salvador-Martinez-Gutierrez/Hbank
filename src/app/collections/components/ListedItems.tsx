'use client'
import React, { useEffect } from 'react'
import NftCard from './NftCard'

const ListedItems = ({ updatedListedItems, tokenId }) => {
  // Client-side auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload()
    }, 900000)

    return () => { clearInterval(interval) }
  }, [])

  return (
    <main className='pb-8 px-4 lg:px-8 xl:px-16'>
      <hr className="pb-4 border-t-1 border-zinc-800 my-2"/>
      {updatedListedItems && updatedListedItems.length > 0 ? (
          <div className="grid h-fit w-full max-w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
            {updatedListedItems.map(token => (
              <NftCard key={token.listingId} token={token} tokenId={tokenId} />
            ))}
          </div>
      ) : (
        <p>There are no listed items...</p>
      )}
    </main>
  )
}

export default ListedItems
