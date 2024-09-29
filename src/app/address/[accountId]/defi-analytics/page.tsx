import DefiTable from '../components/DefiTable'
import BurgerMenu from '../components/BurgerButton'
import { classifyAccountTokenBalance } from '../services/classifyAccountTokenBalance'
import getAccountTokenBalance from '@/app/address/[accountId]/services/getAccountTokenBalance'
import getLpTokensData from '../services/getLpTokenData'
import fetchFarms from '@/app/services/saucer/fetchFarms'
import fetchPoolId from '@/app/services/saucer/fetchPoolId'
import getLpTokenDataByPoolId from '@/app/services/saucer/getLpTokenDataByPoolId'

interface DefiAnalyticsProps {
  params: {
    accountId: string
  }
}

const DefiAnalytics = async ({ params }: DefiAnalyticsProps) => {
  const accountId = params.accountId

  const accountHoldings = await getAccountTokenBalance(accountId)
  const { defi } = await classifyAccountTokenBalance(accountHoldings)

  const defiWithPrice = await Promise.all(
    defi.map(async (defiItem) => {
      const lpTokensData = await getLpTokensData(defiItem.token_id)
      const poolValue = Number(defiItem.balance) * Number(lpTokensData?.lpToken.priceUsd) * Math.pow(10, -Number(defiItem.decimals))
      return { ...defiItem, lpTokensData, poolValue }
    })
  )

  const farms = await fetchFarms(accountId)

  // Calculate farms total value
  const farmsTotalValue = await farms.reduce(async (accPromise, farm) => {
    const acc = await accPromise
    const poolId = await fetchPoolId(farm.id)
    const lpData = await getLpTokenDataByPoolId(poolId)
    const farmValue = Number(farm.total) * Number(lpData.lpToken.priceUsd) * 1e-8
    return acc + farmValue
  }, Promise.resolve(0))

  const poolTotalValue = defiWithPrice.reduce((total, defi) =>
    total + (defi.poolValue), 0
  )

  return (
    <div className='min-h-[calc(100vh-200px)] bg-neutral-900 text-neutral-200'>
      <div className='flex items-center w-full px-4 md:px-4 lg:px-8 xl:px-16 pt-0 md:pt-8 pb-2'>
        <div className='md:hidden'>
          <BurgerMenu accountId={accountId} />
        </div>
        <h2 className='text-3xl font-bold'>
          DeFi
        </h2>
      </div>
      <DefiTable defi={defiWithPrice} accountId={accountId} poolTotalValue={poolTotalValue} farmsTotalValue={farmsTotalValue} />
    </div>
  )
}

export default DefiAnalytics
