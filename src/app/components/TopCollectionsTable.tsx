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
} from '@/app/collections/components/ui/table'

interface TopCollectionsProps {
  updatedCollections: Record<string, TokenData>
}

// Utility function to format numbers with commas
const formatNumber = (number: number) => {
  return number.toLocaleString('en-US')
}

const TopCollectionsTable: React.FC<TopCollectionsProps> = ({ updatedCollections }) => {
  const getInfoByTokenId = (tokenId: string) => {
    // Check if the tokenId exists in collections
    const tokenData = updatedCollections[tokenId]
    if (tokenData !== undefined) {
    // Return the URL and name if the tokenId exists
      return {
        url: tokenData.url,
        name: tokenData.name,
        floorPrice: tokenData.floorPrice,
        maxSupply: tokenData.maxSupply,
        mintedSupply: tokenData.mintedSupply,
        burntSupply: tokenData.burntSupply,
        royalties: tokenData.royalties
      }
    } else {
      // Return undefined for both URL and name if the tokenId does not exist
      return {
        url: '',
        name: '',
        floorPrice: null,
        maxSupply: undefined,
        mintedSupply: undefined,
        burntSupply: undefined,
        royalties: 0
      }
    }
  }

  return (
    <Table className='min-h-screen'>
      <TableHeader>
        <TableRow className='hover:bg-zink-800 bg-neutral-900 sticky z-10'>
          <TableHead>#</TableHead>
          <TableHead>Collection</TableHead>
          <TableHead className='text-right whitespace-nowrap relative'>Floor Price</TableHead>
          <TableHead className='text-right whitespace-nowrap relative'>MarketCap</TableHead>
          <TableHead className='text-right whitespace-nowrap relative'>FDV</TableHead>
          <TableHead className='text-right whitespace-nowrap'>Minted Supply</TableHead>
          <TableHead className='text-right whitespace-nowrap'>Max Supply</TableHead>
          <TableHead className='text-right whitespace-nowrap'>Burnt Supply</TableHead>
          <TableHead className='text-right whitespace-nowrap'>Royalties</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(updatedCollections).map(([tokenId, tokenData], index) => {
          const tokenInfo = getInfoByTokenId(tokenId)
          const floorPrice = tokenInfo.floorPrice ?? 0
          const mintedSupply = collections[tokenId].mintedSupply
          const maxSupply = collections[tokenId].maxSupply
          const burntSupply = collections[tokenId].burntSupply
          const marketCap = floorPrice * (mintedSupply - burntSupply)
          const FDV = floorPrice * (maxSupply - burntSupply)

          return (
            <TableRow key={tokenId}>
              <TableCell className='font-medium text-left whitespace-nowrap'>{index + 1}</TableCell>
              <TableCell className='whitespace-nowrap truncate text-left'>
                <Link className='flex' target='_blank' href={`/collections/${tokenId}`}>
                  <CollectionAvatar url={collections[tokenId].url} />
                  <div className='flex flex-col ml-2 overflow-hidden'>
                    <span className='truncate'>{tokenData.name}</span>
                    <span className='text-muted-foreground text-sm truncate'>{tokenId}</span>
                  </div>
                </Link>
              </TableCell>
              <TableCell className='text-right whitespace-nowrap'>{`${formatNumber(floorPrice)} ℏ`}</TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap'>{`${formatNumber(marketCap)} ℏ`}</TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap'>{`${formatNumber(FDV)} ℏ`}</TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap'>{formatNumber(mintedSupply)}</TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap'>{formatNumber(maxSupply)}</TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap'>{formatNumber(burntSupply)}</TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap'>{`${formatNumber(collections[tokenId].royalties)}%`}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TopCollectionsTable
