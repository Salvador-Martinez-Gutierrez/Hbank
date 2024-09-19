'use client'
import React, { useState, useEffect } from 'react'
import updateFungiblePrice from '../../services/saucer/updateFungiblePrices'
import Link from 'next/link'
import TokenAvatar from './TokenAvatar'
import getTokenIcon from '@/app/services/getTokenIcon'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'

interface TopTokensProps {
  variant?: 'simple' | 'advanced'
}

const formatNumber = (number: number | string | null) => {
  if (number === null) return '0'
  const num = typeof number === 'string' ? parseFloat(number) : number
  if (isNaN(num)) return '0'

  if (num < 1) {
    const significantDigits = num.toFixed(20).match(/^-?\d*\.?0*\d{0,3}/)[0]
    return parseFloat(significantDigits).toString()
  }

  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatPercentage = (value: number | string | null) => {
  if (value === null) return '0.00%'
  const num = typeof value === 'string' ? parseFloat(value) : value
  return isNaN(num) ? '0.00%' : `${num.toFixed(2)}%`
}

const formatLiquidity = (value: number | string | null) => {
  if (value === null) return '$0'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '$0'

  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`
  } else if (num >= 1000) {
    return `$${(num / 1000).toFixed(2)}K`
  } else {
    return `$${num.toFixed(2)}`
  }
}

const TopTokensTable: React.FC<TopTokensProps> = async ({ variant }) => {
  const [icons, setIcons] = useState<Record<string, string>>({})
  const updatedTokenData = await updateFungiblePrice()
  const tokens = Object.entries(updatedTokenData)
  const displayedTokens = variant === 'simple' ? tokens.slice(0, 5) : tokens

  useEffect(() => {
    const fetchIcons = async () => {
      const newIcons: Record<string, string> = {}
      for (const [tokenId] of displayedTokens) {
        try {
          const iconUrl = await getTokenIcon(tokenId)
          newIcons[tokenId] = iconUrl
        } catch (error) {
          console.error(`Failed to fetch icon for token ${tokenId}`, error)
        }
      }
      setIcons(newIcons)
    }

    fetchIcons()
  }, [displayedTokens])

  return (
    <Table className={`mx-auto ${variant === 'simple' ? 'max-w-[450px] md:max-w-[1100px]' : ''}`}>
      <TableHeader>
        <TableRow className='hover:bg-neutral-900 bg-neutral-900 sticky z-10'>
          <TableHead>#</TableHead>
          <TableHead>Token</TableHead>
          <TableHead className='text-right'>1h %</TableHead>
          <TableHead className='text-right'>24h %</TableHead>
          <TableHead className='text-right'>7d %</TableHead>
          <TableHead className='text-right'>Price (USD)</TableHead>
          <TableHead className='text-right'>Liquidity (USD)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayedTokens.map(([tokenId, tokenData], index) => (
          <TableRow key={tokenId} className='hover:bg-neutral-800'>
            <TableCell className='font-medium text-left whitespace-nowrap'>{index + 1}</TableCell>
            <TableCell className='whitespace-nowrap truncate text-left'>
              <Link className='flex' href={`/tokens/${tokenId}`} prefetch>
                <TokenAvatar url={icons[tokenId] ?? '/NotFound.png' } size="sm" />
                <div className='flex flex-col ml-2 overflow-hidden'>
                  <span className='truncate'>{tokenData.symbol}</span>
                  <span className='text-muted-foreground text-sm truncate'>{tokenData.id}</span>
                </div>
              </Link>
            </TableCell>
            <TableCell className={`text-right whitespace-nowrap ${parseFloat(tokenData.priceChangeHour) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(tokenData.priceChangeHour)}
            </TableCell>
            <TableCell className={`text-right whitespace-nowrap ${parseFloat(tokenData.priceChangeDay) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(tokenData.priceChangeDay)}
            </TableCell>
            <TableCell className={`text-right whitespace-nowrap ${parseFloat(tokenData.priceChangeWeek) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {formatPercentage(tokenData.priceChangeWeek)}
            </TableCell>
            <TableCell className='text-right whitespace-nowrap'>{`$${formatNumber(tokenData.priceUsd)}`}</TableCell>
            <TableCell className='text-right whitespace-nowrap'>{formatLiquidity(tokenData.liquidityUsd)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TopTokensTable
