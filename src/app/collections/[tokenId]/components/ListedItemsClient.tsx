'use client'

import React, { useEffect, useState } from 'react'
import NftCard from './NftCard'
import { Button } from '@/app/collections/components/ui/button'
import type { normalizedItem } from './TabNav'
import checkTokenAssociation from '@/app/collections/services/checkTokenAssociation'
// import { WalletContext } from '@/app/context/WalletContext'
import { useAccountId } from '@buidlerlabs/hashgraph-react-wallets'

const ITEMS_PER_PAGE = 20

interface ListedItemsProps {
  updatedListedItems: normalizedItem[]
  tokenId: string
  royalty: number
}

const ListedItemsClient: React.FC<ListedItemsProps> = ({ updatedListedItems, tokenId, royalty }) => {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const { data: accountId }: { data: string | null } = useAccountId()
  const [isTokenAssociated, setIsTokenAssociated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAssociation = async () => {
      if (typeof accountId === 'string') {
        const result: boolean = await checkTokenAssociation(accountId, tokenId)
        setIsTokenAssociated(result)
      }
    }

    checkAssociation()
  }, [accountId, checkTokenAssociation])

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
    <main className='pb-8 pt-6'>
          <div className="grid h-fit w-full max-w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
            {updatedListedItems.slice(0, visibleItems).map(token => {
              const isOwner = accountId === token.sellerId
              return (
                <NftCard
                  key={token.listingId}
                  token={token}
                  isOwner={isOwner}
                  tokenId={tokenId}
                  accountId={accountId}
                  isTokenAssociated={isTokenAssociated}
                  royalty={royalty}
                />
              )
            })}
          </div>
          {visibleItems < updatedListedItems.length && (
            <div className="flex justify-center mt-4">
              <Button
                onClick={loadMoreItems}
                className='bg-neutral-900 hover:bg-neutral-800 inline-flex cursor-pointer justify-start mt-4 px-16 py-2 text-gray-300 text-sm border border-gray-300'
                >
                  Load More
              </Button>
            </div>
          )}
    </main>
  )
}

export default ListedItemsClient
