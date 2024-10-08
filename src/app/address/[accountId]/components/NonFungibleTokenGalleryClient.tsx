'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import SeeMoreNftAnalytics from './SeeMoreNftAnalytics'
import useNftMetadata from '../hooks/useNftMetadata'
import { Button } from '@/app/collections/components/ui/button'

const ITEMS_PER_PAGE = 20

interface Tokens {
  token_id: string
  balance: number
  name?: string
  price?: number
  priceUsd?: number
}

interface NonFungibleTokenGalleryClientProps {
  filteredTokens: Tokens[] // Replace 'any' with the actual token type
  totalValue: number
  showTopFour: boolean
  accountId: string
}

const NonFungibleTokenGalleryClient: React.FC<NonFungibleTokenGalleryClientProps> = ({ filteredTokens, totalValue, showTopFour, accountId }) => {
  const [visibleItems, setVisibleItems] = useState(showTopFour ? 4 : ITEMS_PER_PAGE)

  const loadMoreItems = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + ITEMS_PER_PAGE)
  }

  const displayTokens = filteredTokens.slice(0, visibleItems)

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center pt-8 pb-2 mx-4'>
        {showTopFour
          ? (
          <>
            <h2 className='text-2xl font-bold'>NFTs</h2>
            <span className='text-2xl semibold pl-2'>{`$${totalValue.toFixed(4)}`}</span>
          </>
            )
          : (
          <>
            <h3 className='text-2xl text-muted-foreground'>Total Worth:</h3>
            <span className='text-2xl semibold pl-2'>{`$${totalValue.toFixed(4)}`}</span>
          </>
            )}
      </div>
      <div className={`${showTopFour ? 'flex overflow-x-auto' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7'} gap-4 p-4`}>
        {displayTokens.map((token) => {
          const { imageCid, isLoading, error } = useNftMetadata(accountId, token.token_id)
          if (isLoading) return <div key={token.token_id}>Loading...</div>
          if (error !== null && error !== undefined) return <div key={token.token_id}>Error loading metadata</div>

          let imageUrl = '/path/to/default/image.jpg'

          if (typeof imageCid === 'string') {
            if (imageCid.startsWith('ipfs://')) {
              imageUrl = `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${imageCid.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
            } else if (imageCid.startsWith('ar://')) {
              imageUrl = `https://arweave.net/${imageCid.replace('ar://', '')}`
            } else if (imageCid.startsWith('hcs://')) {
              imageUrl = '/path/to/default/hcs/image.jpg'
            }
          }

          return (
            <div key={token.token_id} className={`bg-zinc-800 rounded-lg p-4 flex flex-col ${showTopFour ? 'min-w-[270px] mr-4' : ''}`}>
              <div className="relative w-full aspect-square mb-2">
                <Image
                  src={imageUrl}
                  alt={token.name !== null && token.name !== undefined && token.name.trim() !== '' ? token.name : `NFT ${token.token_id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-semibold truncate">{token.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{token.token_id}</p>
                <p className="text-sm">Balance: {token.balance.toFixed(0)}</p>
                <p className="text-sm">Price: {(token.price ?? 0).toFixed(4)} ℏ</p>
                <p className="text-sm">Price: ${(token.priceUsd ?? 0).toFixed(4)}</p>
                <p className="text-sm font-semibold">Value: ${(token.balance * (token.priceUsd ?? 0)).toFixed(4)}</p>
              </div>
            </div>
          )
        })}
      </div>
      {!showTopFour && visibleItems < filteredTokens.length && (
        <div className="flex justify-center mt-4 pb-8">
          <Button
            onClick={loadMoreItems}
            className='bg-neutral-900 hover:bg-neutral-800 inline-flex cursor-pointer justify-start mt-4 px-16 py-2 text-gray-300 text-sm border border-gray-300'
          >
            Load More
          </Button>
        </div>
      )}
      {showTopFour && displayTokens.length >= 4 && (
        <div className="mt-4 text-center pb-8">
          <SeeMoreNftAnalytics accountId={accountId} />
        </div>
      )}
    </section>
  )
}

export default NonFungibleTokenGalleryClient
