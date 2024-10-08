import { Suspense } from 'react'
import FungibleTokenTable from './components/FungibleTokenTable'
import NonFungibleTokenGallery from './components/NonFungibleTokenGallery'
import DefiTable from './components/DefiTable'
import BurgerMenu from './components/BurgerButton'
import getAccountTokenBalance from './services/getAccountTokenBalance'
import getHbarPrice from '../../services/saucer/getHbarPrice'

interface Params {
  accountId: string
}

const Portfolio = async ({ params }: { params: Params }) => {
  const accountId: string = params.accountId
  const accountHoldings = await getAccountTokenBalance(accountId)

  // Get HBAR price
  const currentTime = Math.floor(Date.now() / 1000)
  const hbarPrice = await getHbarPrice(currentTime - 60, currentTime)

  return (
    <div className='min-h-[calc(100vh-200px)] bg-neutral-900 text-neutral-200'>
     <header className='flex flex-col justify-start items-start text-left pb-8 md:text-left md:items-start md:justify-start'>
        <div className='flex items-center w-full px-4 md:px-4 lg:px-8 xl:px-16 pt-8 pb-2'>
          <div className='md:hidden'>
            <BurgerMenu accountId={accountId} />
          </div>
          <h2 className='text-3xl font-bold'>
            Dashboard
          </h2>
        </div>
     </header>
     <div className='pb-8'>
      <Suspense fallback={<div>Loading fungible tokens...</div>}>
        <FungibleTokenTable accountHoldings={accountHoldings} hbarPrice={hbarPrice} accountId={accountId} showTopFour={true}/>
      </Suspense>
      <Suspense fallback={<div>Loading non-fungible tokens...</div>}>
        <NonFungibleTokenGallery accountHoldings={accountHoldings} hbarPrice={hbarPrice} accountId={accountId} showTopFour={true} />
      </Suspense>
      <Suspense fallback={<div>Loading DeFi tokens...</div>}>
        <DefiTable accountHoldings={accountHoldings} accountId={accountId} showTopFour={true}/>
      </Suspense>
     </div>
    </div>
  )
}

export default Portfolio
