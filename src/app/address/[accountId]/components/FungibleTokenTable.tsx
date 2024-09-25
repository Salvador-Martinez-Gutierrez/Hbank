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
import CollectionAvatar from '@/app/components/collections/CollectionAvatar'
import getTokenIcon from '@/app/services/getTokenIcon'
import type { Token } from '../page'
import SeeMoreFungibleAnalytics from './SeeMoreFungibleAnalytics'

interface FungibleTokenTableProps {
  tokenHoldingsExtended: Token[]
  showTopFour?: boolean // Add this prop
  accountId: string
}

const FungibleTokenTable: React.FC<FungibleTokenTableProps> = ({ tokenHoldingsExtended, showTopFour, accountId }) => {
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

  const filteredTokens = tokenHoldingsExtended
    .filter(token => token.price !== null && typeof token.price !== 'undefined' && token.price > 0 && token.type === 'FUNGIBLE_COMMON')
    .sort((a, b) => (b.balance * (b.price ?? 0)) - (a.balance * (a.price ?? 0)))

  const displayTokens = showTopFour === true ? filteredTokens.slice(0, 4) : filteredTokens

  const totalValue = filteredTokens.reduce((acc, token) => acc + (token.balance * (token.price ?? 0)), 0)

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center mx-4 pt-8 pb-2'>
        {showTopFour === true
          ? (
          <>
          <h2 className='text-2xl font-bold'>Tokens</h2>
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
      <div className='justify-center items-center text-center px-4 pb-8'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-zinc-950'>
              <TableHead className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>Name</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Balance</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Price</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTokens.map((token) => (
              <TableRow key={token.token_id} className="hover:bg-zinc-800">
                <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
                  <div className='flex'>
                    <CollectionAvatar url={icons[token.token_id] ?? '/NotFound.png'} />
                    <div className='flex flex-col ml-2 overflow-hidden'>
                      <span className='truncate'>{token.name}</span>
                      <span className='text-muted-foreground text-sm truncate'>{token.token_id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>{(token.balance).toFixed(4)}</TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>{`$${(token.price ?? 0).toFixed(4)}`}</TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>{`$${(token.balance * (token.price ?? 0)).toFixed(4)}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showTopFour === true && displayTokens.length >= 4 && (
          <div className="mt-4 text-center">
           <SeeMoreFungibleAnalytics accountId={accountId}/>
          </div>
        )}
      </div>
    </section>
  )
}

export default FungibleTokenTable
