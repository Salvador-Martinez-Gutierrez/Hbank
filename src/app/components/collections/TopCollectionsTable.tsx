import collections from '../../collectionsData/collections'
import Link from 'next/link'
import CollectionAvatar from './CollectionAvatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'
import updateFloorPrice from '../../services/updateFloorPrice'
import update30dVolume from '../../services/update30dVolume'

export const revalidate = 300

interface TopCollectionsProps {
  variant?: 'simple' | 'advanced' // Prop para el modo de rendering
}

// Utility function to format numbers with commas
const formatNumber = (number: number) => {
  return number.toLocaleString('en-US')
}

const TopCollectionsTable: React.FC<TopCollectionsProps> = async ({ variant }) => {
  let updatedCollections = await updateFloorPrice()
  updatedCollections = await update30dVolume()

  const getInfoByTokenId = (tokenId: string) => {
    const tokenData = updatedCollections[tokenId]
    if (tokenData !== undefined) {
      return {
        url: tokenData.url,
        name: tokenData.name,
        floorPrice: tokenData.floorPrice,
        volume30d: tokenData.volume30d,
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
        volume30d: null,
        maxSupply: undefined,
        mintedSupply: undefined,
        burntSupply: undefined,
        royalties: 0
      }
    }
  }

  // Sort collections by Volume30d in descending order
  const sortedCollections = Object.entries(updatedCollections).sort(([tokenIdA], [tokenIdB]) => {
    const tokenInfoA = getInfoByTokenId(tokenIdA)
    const tokenInfoB = getInfoByTokenId(tokenIdB)

    const volumeA = tokenInfoA.volume30d ?? 0
    const volumeB = tokenInfoB.volume30d ?? 0

    return volumeB - volumeA // Sort descending
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
          <TableHead className='text-right whitespace-nowrap relative'>Vol 30d</TableHead>
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
          const volume30d = tokenInfo.volume30d ?? 0
          const mintedSupply = collections[tokenId].mintedSupply
          const maxSupply = collections[tokenId].maxSupply
          const burntSupply = collections[tokenId].burntSupply
          const marketCap = floorPrice * (mintedSupply - burntSupply)
          const FDV = floorPrice * (maxSupply - burntSupply)

          return (
            <TableRow
              key={tokenId}
              className='hover:bg-neutral-800 cursor-pointer group'
            >
              <TableCell className='font-medium text-left whitespace-nowrap p-0'>
                <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                  {index + 1}
                </Link>
              </TableCell>
              <TableCell className='whitespace-nowrap truncate text-left p-0'>
                <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                  <div className='flex'>
                    <CollectionAvatar url={collections[tokenId].url} />
                    <div className='flex flex-col ml-2 overflow-hidden'>
                      <span className='truncate'>{tokenData.name}</span>
                      <span className='text-muted-foreground text-sm truncate'>{tokenId}</span>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className='text-right whitespace-nowrap p-0'>
                <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                  {`${formatNumber(floorPrice)} ℏ`}
                </Link>
              </TableCell>
              <TableCell className='text-right whitespace-nowrap p-0'>
                <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                  {`${formatNumber(volume30d)} ℏ`}
                </Link>
              </TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap p-0'>
                <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                  {`${formatNumber(marketCap)} ℏ`}
                </Link>
              </TableCell>
              <TableCell className='font-medium text-right whitespace-nowrap p-0'>
                <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                  {`${formatNumber(FDV)} ℏ`}
                </Link>
              </TableCell>
              {/* Conditionally render FDV and other columns */}
              {variant !== 'simple' && (
                <>
                  <TableCell className='font-medium text-right whitespace-nowrap p-0'>
                    <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                      {formatNumber(mintedSupply)}
                    </Link>
                  </TableCell>
                  <TableCell className='font-medium text-right whitespace-nowrap p-0'>
                    <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                      {formatNumber(maxSupply)}
                    </Link>
                  </TableCell>
                  <TableCell className='font-medium text-right whitespace-nowrap p-0'>
                    <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                      {formatNumber(burntSupply)}
                    </Link>
                  </TableCell>
                  <TableCell className='font-medium text-right whitespace-nowrap p-0'>
                    <Link href={`/collections/${tokenId}`} className="block w-full h-full p-4">
                      {`${formatNumber(collections[tokenId].royalties)}%`}
                    </Link>
                  </TableCell>
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
