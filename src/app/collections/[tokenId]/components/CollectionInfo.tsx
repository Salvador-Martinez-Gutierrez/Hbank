import Image from 'next/image'
import MarketData from './MarketData'
import updateFloorPrice from '@/app/services/updateFloorPrice'

interface CollectionInfoProps {
  tokenId: string
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

const CollectionInfo: React.FC<CollectionInfoProps> = async ({ tokenId }) => {
  const updatedCollections = await updateFloorPrice()
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
