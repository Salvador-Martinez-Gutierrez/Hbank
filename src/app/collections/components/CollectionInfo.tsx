import Image from 'next/image'
import MarketData from './MarketData'
import type { TokenData } from '../../collectionsData/collections'

interface CollectionInfoProps {
  tokenId: string
  updatedCollections: Record<string, TokenData>
}

export interface TokenInfo {
  url: string
  name: string
  floorPrice: number | null
  maxSupply: number | undefined
  mintedSupply: number | undefined
  burntSupply: number | undefined
  royalties: number
}

const CollectionInfo: React.FC<CollectionInfoProps> = ({ tokenId, updatedCollections }) => {
  const getInfoByTokenId = (tokenId: string): TokenInfo => {
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

  const tokenInfo = getInfoByTokenId(tokenId)

  return (
    <>
        <header className='pt-6 px-4 pb-4 flex items-center md:items-start lg:px-8 xl:px-16'>
          <Image
          src={tokenInfo.url}
          alt={tokenInfo.name}
          width={96}
          height={96}
          className='rounded-lg md:w-[112px] md:h-[112px]'
          />
          <div className='flex flex-col justify-center pl-4 md:flex-1 md:items-start '>
            <h1 className='text-lg font-semibold md:text-xl'>
              {tokenInfo.name}
            </h1>
            <span className='flex text-sm text-muted-foreground'>
              <svg className='mr-1' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z" fill='currentColor' fillRule='evenodd' clipRule='evenodd'></path></svg>
              {tokenId}
            </span>
          </div>
          <section className='w-screen overflow-scroll hidden md:overflow-visible md:flex md:flex-1 md:justify-end md:min-w-fit'>
            <MarketData tokenInfo={tokenInfo}/>
          </section>
        </header>
        <section className='w-screen overflow-scroll md:hidden'>
          <MarketData tokenInfo={tokenInfo}/>
        </section>
    </>
  )
}

export default CollectionInfo
