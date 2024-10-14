import FungibleTokenTable from '../components/FungibleTokenTable'
import FungibleTokenTableSkeleton from '../components/FungibleTokenTableSkeleton'
import getAccountTokenBalance from '../services/getAccountTokenBalance'
import getHbarPrice from '../../../services/saucer/getHbarPrice'
import BurgerMenu from '../components/BurgerButton'
import { Suspense } from 'react'

interface FungibleAnalyticsProps {
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

const FungibleAnalytics = async ({ params }: FungibleAnalyticsProps) => {
  const { accountId } = params

  const accountHoldings = await getAccountTokenBalance(accountId)

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
          Tokens
        </h2>
      </div>
      <Suspense fallback={<FungibleTokenTableSkeleton showTopFour = {false}/>}>
        <FungibleTokenTable accountHoldings={accountHoldings} hbarPrice={hbarPrice} accountId={accountId} showTopFour={false}/>
      </Suspense>
    </div>
  )
}

export default FungibleAnalytics
