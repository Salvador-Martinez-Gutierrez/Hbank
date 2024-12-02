'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'
import { useAccountId } from '@buidlerlabs/hashgraph-react-wallets'

interface KabilaOffer {
  _id: string
  buyerId: string
  tokenId: string
  price: number
  currency: string
  marketplace: string
  nftCollection: {
    name: string
    ImageCid?: string
  }
}

interface OffersClientProps {
  offers: KabilaOffer [] | null
}

const OffersClient: React.FC<OffersClientProps> = ({ offers }) => {
  const { data: connectedAccountId }: { data: string | null } = useAccountId()

  return (
    <>
      <div className="text-yellow-500 flex items-center gap-2 border-2 border-zinc-800 rounded-md p-3 my-6">
        <span>⚠️</span>
        <span>Sentx offers are not being displayed yet, but I am working on it.</span>
      </div>

      {offers === null
        ? (
        <div className="text-neutral-500 border-2 border-zinc-800 rounded-md p-3 my-6">
          No offers found for this collection in the Kabila Market
        </div>
          )
        : (
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-neutral-900 bg-neutral-900 sticky z-10'>
              <TableHead>Price</TableHead>
              <TableHead>Buyer Id</TableHead>
              <TableHead>Marketplace</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers?.map((offer, index) => {
              const { price, buyerId } = offer
              const isCurrentAccount = buyerId === connectedAccountId

              return (
                <TableRow
                  key={`${buyerId}-${index}`}
                  className={'hover:bg-neutral-800 cursor-pointer'}
                >
                  <TableCell className="font-medium text-left whitespace-nowrap p-4">
                    {`${price} ℏ`}
                  </TableCell>
                  <TableCell className={`whitespace-nowrap truncate text-left p-4 ${isCurrentAccount ? 'text-blue-500' : ''}`}>
                    {buyerId}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-left p-4">
                    {offer.marketplace}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
          )}
    </>
  )
}

export default OffersClient
