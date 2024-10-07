import { cache } from 'react'
import NonFungibleTokenGallery from '../components/NonFungibleTokenGallery'
import getAccountTokenBalance from '../services/getAccountTokenBalance'
import getHbarPrice from '../../../services/saucer/getHbarPrice'
import { classifyAccountTokenBalance } from '../services/classifyAccountTokenBalance'
import BurgerMenu from '../components/BurgerButton'

interface NftAnalyticsProps {
  params: {
    accountId: string
  }
}

export interface Token {
  balance: number
  token_id: string
  name?: string
  type?: string
  price?: number
}

// Cached versions of the functions
const cachedGetAccountTokenBalance = cache(getAccountTokenBalance)
const cachedClassifyAccountTokenBalance = cache(classifyAccountTokenBalance)

const NftAnalytics = async ({ params }: NftAnalyticsProps) => {
  const { accountId } = params

  const accountHoldings = await cachedGetAccountTokenBalance(accountId)
  const { nfts } = await cachedClassifyAccountTokenBalance(accountHoldings)

  // Get HBAR price
  const currentTime = Math.floor(Date.now() / 1000)
  const hbarPrice = await getHbarPrice(currentTime - 60, currentTime)

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
      <NonFungibleTokenGallery nfts={nfts} hbarPrice={hbarPrice} accountId={accountId} showTopFour={false} />
    </div>
  )
}

export default NftAnalytics
