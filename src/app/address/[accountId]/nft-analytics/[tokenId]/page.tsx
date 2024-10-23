import { Suspense } from 'react'
import BurgerMenu from '../../components/BurgerButton'
import NftGalleryByTokenId from './components/NftGalleryByTokenId'
import NonFungibleTokenGallerySkeleton from '../../components/NonFungibleTokenGallerySkeleton'
import { WalletProvider } from '../../../../context/WalletContext'

interface NftHoldedProps {
  params: {
    accountId: string
    tokenId: string
  }
}

const NftHolded = async ({ params }: NftHoldedProps) => {
  const { accountId, tokenId } = params

  return (
    <div className='min-h-[calc(100vh-200px)] bg-neutral-900 text-neutral-200'>
      <div className='flex items-center w-full px-4 md:px-4 lg:px-8 xl:px-16 pt-8 pb-2'>
        <div className='md:hidden'>
          <BurgerMenu accountId={accountId} />
        </div>
        <h2 className='text-3xl font-bold'>
          NFTs
        </h2>
      </div>
      <Suspense fallback={<NonFungibleTokenGallerySkeleton showTopFour = {false}/>}>
        <WalletProvider>
          <NftGalleryByTokenId accountId={accountId} tokenId={tokenId}/>
        </WalletProvider>
      </Suspense>
    </div>
  )
}

export default NftHolded
