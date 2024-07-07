'use client'
import React, { useEffect, useState } from 'react'
import collections from '../collectionsData/collections'
import Link from 'next/link'
import type { TokenData } from '../collectionsData/collections'
import CollectionAvatar from './Avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface TopCollectionsProps {
  updatedCollections: Record<string, TokenData>
}

// Utility function to format numbers with commas
const formatNumber = (number: number) => {
  return number.toLocaleString('en-US')
}

const TopCollectionsTable: React.FC<TopCollectionsProps> = ({ updatedCollections }) => {
  const [sortOrderByFloorPrice, setSortOrderByFloorPrice] = useState<'asc' | 'desc'>('asc')
  const [sortOrderByMarketCap, setSortOrderByMarketCap] = useState<'asc' | 'desc'>('asc')
  const [sortOrderByFDV, setSortOrderByFDV] = useState<'asc' | 'desc'>('asc')

  // Client-side auto-refresh every 15 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload()
    }, 900000)

    return () => { clearInterval(interval) }
  }, [])

  // Toggle sort order by floor price
  const toggleSortOrderByFloorPrice = () => {
    setSortOrderByFloorPrice(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))
  }

  // Sort collections by floor price
  const sortedCollectionsByFloorPrice = Object.entries(updatedCollections).sort(([, a], [, b]) => {
    if (sortOrderByFloorPrice === 'asc') {
      return a.floorPrice - b.floorPrice
    } else {
      return b.floorPrice - a.floorPrice
    }
  })

  // Toggle sort order by marketcap
  //const toggleSortOrderByMarketCap = () => {
  //  setSortOrderByMarketCap(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))
  //}

  // Sort collections by marketcap
  // const sortedCollectionsByMarketCap = Object.entries(updatedCollections).sort(([, a], [, b]) => {
  //  if (sortOrderByMarketCap === 'asc') {
  //    return a.floorPrice - b.floorPrice
  //  } else {
  //    return b.floorPrice - a.floorPrice
  //  }
  // })

  // Toggle sort order by FDV
  //const toggleSortOrderByFDV = () => {
  //  setSortOrderByFDV(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'))
  //}

  // Sort collections by FDV
  //const sortedCollectionsByFDV = Object.entries(updatedCollections).sort(([, a], [, b]) => {
  //  if (sortOrderByFDV === 'asc') {
  //    return a.floorPrice - b.floorPrice
  //  } else {
  //    return b.floorPrice - a.floorPrice
  //  }
  //})

  return (
    <Table className='min-h-screen'>
      <TableHeader>
        <TableRow className='hover:bg-zink-800 bg-neutral-900 sticky z-10'>
          <TableHead>#</TableHead>
          <TableHead>Collection</TableHead>
          <TableHead className="text-right whitespace-nowrap relative">
            <button onClick={toggleSortOrderByFloorPrice} className="flex items-center justify-end space-x-1 w-full">
              <span>FloorPrice</span>
              {sortOrderByFloorPrice === 'asc' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          </TableHead>
          <TableHead className="text-right whitespace-nowrap relative">MarketCap</TableHead>
          <TableHead className="text-right whitespace-nowrap relative">FDV</TableHead>
          <TableHead className="text-right whitespace-nowrap">Minted Supply</TableHead>
          <TableHead className="text-right whitespace-nowrap">Max Supply</TableHead>
          <TableHead className="text-right whitespace-nowrap">Burnt Supply</TableHead>
          <TableHead className="text-right whitespace-nowrap">Royalties</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedCollectionsByFloorPrice.map(([tokenId, tokenData], index) => {
          const floorPrice = tokenData.floorPrice
          const mintedSupply = collections[tokenId].mintedSupply
          const maxSupply = collections[tokenId].maxSupply
          const burntSupply = collections[tokenId].burntSupply
          const marketCap = floorPrice * (mintedSupply - burntSupply)
          const FDV = floorPrice * (maxSupply - burntSupply)

          return (
            <TableRow key={tokenId}>
              <TableCell className="font-medium text-left whitespace-nowrap">{index + 1}</TableCell>
              <TableCell className='whitespace-nowrap truncate text-left'>
                <Link className='flex' target="_blank" href={`/collections/${tokenId}`}>
                  <CollectionAvatar url={collections[tokenId].url} />
                  <div className="flex flex-col ml-2 overflow-hidden">
                    <span className="truncate">{tokenData.name}</span>
                    <span className="text-muted-foreground text-sm truncate">{tokenId}</span>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">{`${formatNumber(floorPrice)} ℏ`}</TableCell>
              <TableCell className="font-medium text-right whitespace-nowrap">{`${formatNumber(marketCap)} ℏ`}</TableCell>
              <TableCell className="font-medium text-right whitespace-nowrap">{`${formatNumber(FDV)} ℏ`}</TableCell>
              <TableCell className="font-medium text-right whitespace-nowrap">{formatNumber(mintedSupply)}</TableCell>
              <TableCell className="font-medium text-right whitespace-nowrap">{formatNumber(maxSupply)}</TableCell>
              <TableCell className="font-medium text-right whitespace-nowrap">{formatNumber(burntSupply)}</TableCell>
              <TableCell className="font-medium text-right whitespace-nowrap">{`${formatNumber(collections[tokenId].royalties)}%`}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TopCollectionsTable
