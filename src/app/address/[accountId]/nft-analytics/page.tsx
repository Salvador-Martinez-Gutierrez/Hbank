import NonFungibleTokenGallery from '../components/NonFungibleTokenGallery'
import getAccountTokenBalance from '../services/getAccountTokenBalance'
import getHbarPrice from '../../../services/saucer/getHbarPrice'
import { classifyAccountTokenBalance } from '../services/classifyAccountTokenBalance'
import { getPricedNFTs } from '../services/getPricedTokens'
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

const NftAnalytics = async ({ params }: NftAnalyticsProps) => {
  const { accountId } = params

  const accountHoldings = await getAccountTokenBalance(accountId)
  const { nfts } = await classifyAccountTokenBalance(accountHoldings)

  // Get HBAR price
  const currentTime = Math.floor(Date.now() / 1000)
  const hbarPrice = await getHbarPrice(currentTime - 60, currentTime)

  // Get priced NFTs
  const nftsWithPrice = await getPricedNFTs(nfts, hbarPrice)

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
      <NonFungibleTokenGallery nfts = { nftsWithPrice } accountId={accountId} showTopFour={false} />
    </div>
  )
}

export default NftAnalytics
