import DefiTable from '../components/DefiTable'
import BurgerMenu from '../components/BurgerButton'
import getAccountTokenBalance from '@/app/address/[accountId]/services/getAccountTokenBalance'

interface DefiAnalyticsProps {
  params: {
    accountId: string
  }
}

const DefiAnalytics = async ({ params }: DefiAnalyticsProps) => {
  const accountId = params.accountId

  const accountHoldings = await getAccountTokenBalance(accountId)

  return (
    <div className='min-h-[calc(100vh-200px)] bg-neutral-900 text-neutral-200'>
      <div className='flex items-center w-full px-4 md:px-4 lg:px-8 xl:px-16 pt-8 pb-2'>
        <div className='md:hidden'>
          <BurgerMenu accountId={accountId} />
        </div>
        <h2 className='text-3xl font-bold'>
          DeFi
        </h2>
      </div>
      <DefiTable accountHoldings={accountHoldings} accountId={accountId} showTopFour={false} />
    </div>
  )
}

export default DefiAnalytics
