import collections from '../collectionsData/collections'
import type { TokenData } from '../collectionsData/collections'
import Link from 'next/link'
import CollectionAvatar from './Avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'

interface TopCollectionsProps {
  updatedCollections: Record<string, TokenData>
  variant?: 'simple' | 'advanced' // Prop para el modo de rendering
}

// Utility function to format numbers with commas
const formatNumber = (number: number) => {
  return number.toLocaleString('en-US')
}

const TopCollectionsTable: React.FC<TopCollectionsProps> = ({ updatedCollections, variant }) => {
  const getInfoByTokenId = (tokenId: string) => {
    const tokenData = updatedCollections[tokenId]
    if (tokenData !== undefined) {
      return {
        url: tokenData.url,
        name: tokenData.name,
        floorPrice: tokenData.floorPrice,
        // vol30d: tokenData.vol30d,
        maxSupply: tokenData.maxSupply,
        mintedSupply: tokenData.mintedSupply,
        burntSupply: tokenData.burntSupply,
        royalties: tokenData.royalties
      }
    } else {
      return {
        url: '',
        name: '',
        floorPrice: null,
        // vol30d: null,
        maxSupply: undefined,
        mintedSupply: undefined,
        burntSupply: undefined,
        royalties: 0
      }
    }
  }

  // Sort collections by MarketCap in descending order
  const sortedCollections = Object.entries(updatedCollections).sort(([tokenIdA], [tokenIdB]) => {
    const tokenInfoA = getInfoByTokenId(tokenIdA)
    const tokenInfoB = getInfoByTokenId(tokenIdB)

    const floorPriceA = tokenInfoA.floorPrice ?? 0
    const mintedSupplyA = collections[tokenIdA]?.mintedSupply ?? 0
    const burntSupplyA = collections[tokenIdA]?.burntSupply ?? 0
    const marketCapA = floorPriceA * (mintedSupplyA - burntSupplyA)

    const floorPriceB = tokenInfoB.floorPrice ?? 0
    const mintedSupplyB = collections[tokenIdB]?.mintedSupply ?? 0
    const burntSupplyB = collections[tokenIdB]?.burntSupply ?? 0
    const marketCapB = floorPriceB * (mintedSupplyB - burntSupplyB)

    return marketCapB - marketCapA // Sort descending
  })

  // Limitar las filas a las primeras 5 si el modo es simple
  const displayedCollections = variant === 'simple' ? sortedCollections.slice(0, 5) : sortedCollections

  return (
    <Table className={`mx-auto ${variant === 'simple' ? 'max-w-[450px] md:max-w-[1100px]' : ''}`}>
      <TableHeader>
        <TableRow className='hover:bg-neutral-900 bg-neutral-900 sticky z-10'>
          <TableHead>#</TableHead>
          <TableHead>Collection</TableHead>
          <TableHead className='text-right whitespace-nowrap relative'>Floor Price</TableHead>
          {/* <TableHead className='text-right whitespace-nowrap relative'>Vol 30d</TableHead> */}
          <TableHead className='text-right whitespace-nowrap relative'>MarketCap</TableHead>
          <TableHead className='text-right whitespace-nowrap relative'>FDV</TableHead>
          {/* Conditionally render FDV and Royalties columns */}
          {variant !== 'simple' && (
            <>
              <TableHead className='text-right whitespace-nowrap'>Minted Supply</TableHead>
              <TableHead className='text-right whitespace-nowrap'>Max Supply</TableHead>
              <TableHead className='text-right whitespace-nowrap'>Burnt Supply</TableHead>
              <TableHead className='text-right whitespace-nowrap'>Royalties</TableHead>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayedCollections.map(([tokenId, tokenData], index) => {
          const tokenInfo = getInfoByTokenId(tokenId)
          const floorPrice = tokenInfo.floorPrice ?? 0
          // const vol30d = tokenInfo.vol30d ?? 0
          const mintedSupply = collections[tokenId].mintedSupply
          const maxSupply = collections[tokenId].maxSupply
          const burntSupply = collections[tokenId].burntSupply
          const marketCap = floorPrice * (mintedSupply - burntSupply)
          const FDV = floorPrice * (maxSupply - burntSupply)

          return (
            <TableRow key={tokenId} className='hover:bg-neutral-800'>
              <TableCell className='font-medium text-left whitespace-nowrap'>{index + 1}</TableCell>
              <TableCell className='whitespace-nowrap truncate text-left'>
                <Link className='flex' href={`/collections/${tokenId}`} prefetch>
                  <CollectionAvatar url={collections[tokenId].url} />
                  <div className='flex flex-col ml-2 overflow-hidden'>
                    <span className='truncate'>{tokenData.name}</span>
                    <span className='text-muted-foreground text-sm truncate'>{tokenId}</span>
                  </div>
                </Link>
              </TableCell>
              <TableCell className='text-right whitespace-nowrap'>{`${formatNumber(floorPrice)} ℏ`}</TableCell>
              {/* <TableCell className='text-right whitespace-nowrap'>{`${formatNumber(vol30d)} ℏ`}</TableCell> */}
              <TableCell className='font-medium text-right whitespace-nowrap'>{`${formatNumber(marketCap)} ℏ`}</TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap'>{`${formatNumber(FDV)} ℏ`}</TableCell>
              {/* Conditionally render FDV and other columns */}
              {variant !== 'simple' && (
                <>
                  <TableCell className='font-medium text-right whitespace-nowrap'>{formatNumber(mintedSupply)}</TableCell>
                  <TableCell className='font-medium text-right whitespace-nowrap'>{formatNumber(maxSupply)}</TableCell>
                  <TableCell className='font-medium text-right whitespace-nowrap'>{formatNumber(burntSupply)}</TableCell>
                  <TableCell className='font-medium text-right whitespace-nowrap'>{`${formatNumber(collections[tokenId].royalties)}%`}</TableCell>
                </>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TopCollectionsTable
