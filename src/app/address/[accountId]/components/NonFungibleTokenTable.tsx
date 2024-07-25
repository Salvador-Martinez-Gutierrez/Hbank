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
import CollectionAvatar from '@/app/components/Avatar'
import type { Token } from '../page'

interface FungibleTokenTableProps {
  tokenHoldingsExtended: Token[]
}

const NonFungibleTokenTable: React.FC<FungibleTokenTableProps> = ({ tokenHoldingsExtended }) => {
  const totalValue = tokenHoldingsExtended
    .filter(token => typeof token.price !== 'undefined' && token.price > 0 && token.type === 'NON_FUNGIBLE_UNIQUE')
    .reduce((acc, token) => {
      // Ensure that token.price is a valid number
      const price = token.price ?? 0 // Default to 0 if price is undefined or null
      return acc + (token.balance * price)
    }, 0)

  return (
    <section>
      <div className='flex justify-start items-center mx-4 md:mx-4 lg:mx-8 xl:mx-16 pt-8 pb-2'>
        <h2 className='text-2xl font-bold'>
          NFTs
        </h2>
        <span className='text-2xl semibold pl-2'>
          {`$${totalValue.toFixed(4)}`}
        </span>
      </div>
      <div className='justify-center items-center text-center px-4 pb-8 lg:px-8 xl:px-16'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-zinc-800 bg-neutral-900 sticky z-10'>
              <TableHead className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>Name</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Balance</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Price</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokenHoldingsExtended.filter(token => typeof token.price !== 'undefined' && token.price > 0 && token.type === 'NON_FUNGIBLE_UNIQUE').map((token) => (
              <TableRow key={token.token_id}>
                <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
                  <div className='flex'>
                    <CollectionAvatar url = {'/NFT.png'}/>
                    <div className='flex flex-col ml-2 overflow-hidden'>
                      <span className='truncate'>{token.name}</span>
                      <span className='text-muted-foreground text-sm truncate'>{token.token_id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>{token.balance.toFixed(0)}</TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>{`$${(token.price ?? 0).toFixed(4)}`}</TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>{`$${(token.balance * (token.price ?? 0)).toFixed(4)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}

export default NonFungibleTokenTable
