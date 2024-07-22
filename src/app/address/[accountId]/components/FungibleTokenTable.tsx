'use client'
import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'
import Link from 'next/link'
import CollectionAvatar from '@/app/components/Avatar'
import getTokenIcon from '@/app/services/getTokenIcon'
import type { Token } from '../page'

interface FungibleTokenTableProps {
  tokenHoldingsExtended: Token[]
}

const FungibleTokenTable: React.FC<FungibleTokenTableProps> = ({ tokenHoldingsExtended }) => {
  const [icons, setIcons] = useState<Record<string, string>>({})

  useEffect(() => {
    const fetchIcons = async () => {
      const newIcons: Record<string, string> = {}
      for (const token of tokenHoldingsExtended) {
        if (token.type === 'FUNGIBLE_COMMON') {
          try {
            const iconUrl = await getTokenIcon(token.token_id)
            newIcons[token.token_id] = iconUrl
          } catch (error) {
            console.error(`Failed to fetch icon for token ${token.token_id}`, error)
          }
        }
      }
      setIcons(newIcons)
    }

    fetchIcons()
  }, [tokenHoldingsExtended])

  const totalValue = tokenHoldingsExtended
    .filter(token => token.type === 'FUNGIBLE_COMMON' && token.price != null && token.price > 0)
    .reduce((acc, token) => {
      // Ensure that token.price is a valid number
      const price = token.price ?? 0 // Default to 0 if price is undefined or null
      return acc + (token.balance * price)
    }, 0)

  return (
    <section>
      <div className='flex justify-start items-center mx-4 md:mx-4 lg:mx-8 xl:mx-16 pt-8 pb-2'>
        <h2 className='text-2xl font-bold'>
          Assets
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
      {tokenHoldingsExtended
        .filter(token => token.price !== null && typeof token.price !== 'undefined' && token.type === 'FUNGIBLE_COMMON')
        .map((token) => (
          <TableRow key={token.token_id}>
            <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
              <Link className='flex' target='_blank' href={`/collections/${token.token_id}`}>
                <CollectionAvatar url={icons[token.token_id]} />
                <div className='flex flex-col ml-2 overflow-hidden'>
                  <span className='truncate'>{token.name}</span>
                  <span className='text-muted-foreground text-sm truncate'>{token.token_id}</span>
                </div>
              </Link>
            </TableCell>
            <TableCell className='flex-grow text-right whitespace-nowrap'>{(token.balance).toFixed(4)}</TableCell>
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

export default FungibleTokenTable