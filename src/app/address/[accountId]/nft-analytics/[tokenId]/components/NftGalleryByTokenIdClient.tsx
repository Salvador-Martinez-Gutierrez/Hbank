'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/app/collections/components/ui/button'
import Link from 'next/link'
import NftCardPortfolio from './NftCardPortfolio'
import { useAccountId } from '@buidlerlabs/hashgraph-react-wallets'
import checkTokenAssociation from '@/app/collections/services/checkTokenAssociation'
import CopyableTokenId from '@/app/components/CopyableTokenId'

interface ExtendedNFT {
  name: string
  imageUrl: string
  serial_number: string
  isListed: boolean
  price?: string | number
  listingId?: number | string
  marketplace?: string
}

interface NftGalleryByTokenIdClientProps {
  accountId: string
  tokenId: string
  nfts: ExtendedNFT[]
  royalty: number
}

const ITEMS_PER_PAGE = 20

const NftGalleryByTokenIdClient: React.FC<NftGalleryByTokenIdClientProps> = ({ nfts, accountId, tokenId, royalty }) => {
  const { data: connectedAccountId }: { data: string | null } = useAccountId()
  const isOwner = accountId === connectedAccountId
  const [isTokenAssociated, setIsTokenAssociated] = useState<boolean | null>(null)
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)

  const loadMoreItems = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + ITEMS_PER_PAGE)
  }

  useEffect(() => {
    const checkAssociation = async () => {
      if (typeof accountId === 'string') {
        const result: boolean = await checkTokenAssociation(accountId, tokenId)
        setIsTokenAssociated(result)
      }
    }

    checkAssociation()
  }, [accountId, connectedAccountId])

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8 pb-4">
      <div className='flex items-center pt-8 pb-2 mx-4'>
        <Link href="/address/[accountId]/nft-analytics" as={`/address/${accountId}/nft-analytics`} className='mr-4 p-2 border border-neutral-600 text-white rounded-md hover:bg-neutral-800 hover:border-neutral-500 hover:text-neutral-300 transition-colors duration-200'>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </Link>
        <div>
          <h2 className='text-xl font-bold'>{nfts[0].name}</h2>
          <CopyableTokenId tokenId={tokenId} className='text-sm text-gray-400' />
        </div>
      </div>
      <div className={'p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'}>
        {nfts.slice(0, visibleItems).map((token) => (
          <NftCardPortfolio
            key={token.serial_number}
            token={token}
            isOwner={isOwner}
            tokenId={tokenId}
            connectedAccountId={connectedAccountId}
            isTokenAssociated={isTokenAssociated}
            royalty={royalty}
          />
        ))}
      </div>
      {visibleItems < nfts.length && (
            <div className="flex justify-center">
              <Button
                onClick={loadMoreItems}
                className='bg-neutral-900 hover:bg-neutral-800 inline-flex cursor-pointer justify-start mt-4 px-16 py-2 text-gray-300 text-sm border border-gray-300'
                >
                  Load More
              </Button>
            </div>
      )}
    </section>
  )
}

export default NftGalleryByTokenIdClient
