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
import SeeMoreFungibleAnalytics from './SeeMoreFungibleAnalytics'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'

interface Token {
  token_id: string
  balance: number
  decimals?: number
  priceUsd?: number
  priceHbar?: number
  priceChangeHour?: number
  priceChangeDay?: number
  priceChangeWeek?: number
  name?: string
  symbol?: string
  type?: string
  valueUsd: number
  iconUrl?: string
}

interface FungibleTokenTableClientProps {
  filteredTokens: Token[]
  showTopFour?: boolean
  accountId: string
  totalValueUsd: number
  totalValue: number
  hbarPrice: number
}

function FungibleTokenTableClient ({ filteredTokens, showTopFour, accountId, totalValueUsd, totalValue, hbarPrice }: FungibleTokenTableClientProps) {
  const [showUsd, setShowUsd] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tokensWithIcons, setTokensWithIcons] = useState<Token[]>([])

  useEffect(() => {
    const fetchTokenIcons = async () => {
      const updatedTokens = await Promise.all(
        filteredTokens.map(async (token) => {
          const iconUrl = await getTokenIcon(token.token_id)
          return { ...token, iconUrl }
        })
      )
      setTokensWithIcons(updatedTokens)
    }

    fetchTokenIcons()
  }, [filteredTokens])

  const displayTokens = showTopFour === true ? tokensWithIcons.slice(0, 4) : tokensWithIcons

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center mx-4 pt-8 pb-2'>
        {showTopFour === true
          ? (
          <>
            <h2 className='text-2xl font-bold'>Tokens</h2>
            <TooltipProvider>
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <span
                    className='text-2xl semibold pl-2 cursor-pointer transition-colors'
                    onClick={() => { setShowUsd(!showUsd) }}
                    onMouseEnter={() => { setShowTooltip(true) }}
                    onMouseLeave={() => { setShowTooltip(false) }}
                  >
                    {showUsd
                      ? `$${totalValueUsd.toFixed(4)}`
                      : `${totalValue.toFixed(4)}ℏ`}
                  </span>
                </TooltipTrigger>
                <TooltipContent className='bg-black text-white p-1 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'>
                  <p>{showUsd ? 'View in ℏ' : 'View in $'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
            )
          : (
          <>
            <h3 className='text-2xl text-muted-foreground'>Total Worth:</h3>
            <TooltipProvider>
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <span
                    className='text-2xl semibold pl-2 cursor-pointer transition-colors'
                    onClick={() => { setShowUsd(!showUsd) }}
                    onMouseEnter={() => { setShowTooltip(true) }}
                    onMouseLeave={() => { setShowTooltip(false) }}
                  >
                    {showUsd
                      ? `$${totalValueUsd.toFixed(4)}`
                      : `${totalValue.toFixed(4)}ℏ`}
                  </span>
                </TooltipTrigger>
                <TooltipContent className='bg-black text-white p-1 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'>
                  <p>{showUsd ? 'View in ℏ' : 'View in $'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
            )}
      </div>
      <div className='justify-center items-center text-center px-4 pb-8'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-zinc-950'>
              <TableHead className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>Name</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Balance</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>1h %</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>24h %</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>7d %</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Price</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayTokens.map((token) => (
              <TableRow key={token.token_id} className="hover:bg-zinc-800">
                <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
                  <div className='flex'>
                    <CollectionAvatar url={token.iconUrl ?? '/NotFound.png'} />
                    <div className='flex flex-col ml-2 overflow-hidden'>
                      <span className='truncate'>{token.name}</span>
                      <span className='text-muted-foreground text-sm truncate'>{token.token_id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  {(token.balance * Math.pow(10, -(token.decimals ?? 0))).toFixed(4)}
                </TableCell>
                <TableCell className={`flex-grow text-right whitespace-nowrap ${showUsd && Number(token.priceChangeHour) > 0 ? 'text-green-500' : showUsd && Number(token.priceChangeHour) < 0 ? 'text-red-500' : ''}`}>
                  {showUsd ? `${token.priceChangeHour?.toFixed(2)}%` : 'N/A'}
                </TableCell>
                <TableCell className={`flex-grow text-right whitespace-nowrap ${showUsd && Number(token.priceChangeDay) > 0 ? 'text-green-500' : showUsd && Number(token.priceChangeDay) < 0 ? 'text-red-500' : ''}`}>
                  {showUsd ? `${token.priceChangeDay?.toFixed(2)}%` : 'N/A'}
                </TableCell>
                <TableCell className={`flex-grow text-right whitespace-nowrap ${showUsd && Number(token.priceChangeWeek) > 0 ? 'text-green-500' : showUsd && Number(token.priceChangeWeek) < 0 ? 'text-red-500' : ''}`}>
                  {showUsd ? `${token.priceChangeWeek?.toFixed(2)}%` : 'N/A'}
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  {showUsd
                    ? <span>{`$${(token.priceUsd ?? 0).toFixed(4)}`}</span>
                    : <span>{`${(token.priceHbar ?? 0).toFixed(4)}ℏ`}</span>
                  }
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  {showUsd
                    ? `$${token.valueUsd.toFixed(4)}`
                    : `${(token.valueUsd / hbarPrice).toFixed(4)}ℏ`
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showTopFour === true && displayTokens.length > 4 && (
          <div className="mt-4 text-center">
            <SeeMoreFungibleAnalytics accountId={accountId}/>
          </div>
        )}
      </div>
    </section>
  )
}

export default FungibleTokenTableClient
