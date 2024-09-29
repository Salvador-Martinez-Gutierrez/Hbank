import FungibleTokenTable from '../components/FungibleTokenTable'
import getAccountTokenBalance from '../services/getAccountTokenBalance'
import { classifyAccountTokenBalance } from '../services/classifyAccountTokenBalance'
import { getPricedTokens } from '../services/getPricedTokens'
import getHbarPrice from '../../../services/saucer/getHbarPrice'
import BurgerMenu from '../components/BurgerButton'

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
  const { tokens } = await classifyAccountTokenBalance(accountHoldings)

  // Get HBAR price
  const currentTime = Math.floor(Date.now() / 1000)
  const hbarPrice = await getHbarPrice(currentTime - 60, currentTime)

  // Get priced tokens and NFTs
  const tokensWithPrice = await getPricedTokens(tokens, hbarPrice)

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
      <FungibleTokenTable tokens = { tokensWithPrice } accountId={accountId} showTopFour={false}/>
    </div>
  )
}

export default FungibleAnalytics
