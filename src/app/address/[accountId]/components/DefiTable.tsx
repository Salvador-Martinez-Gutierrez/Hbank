import React from 'react'
import type { Token } from '../page'
// import getV2LpPositions from '@/app/services/saucer/getV2LpPositions'
// import LiquidityPoolV2 from './LiquidityPoolV2'
import LiquidityPoolV1 from './LiquidityPoolV1'
import LiquidityFarmsV1 from './LiquidityFarmsV1'
import CollectionAvatar from '@/app/components/collections/CollectionAvatar'
import getTokenIcon from '@/app/services/getTokenIcon'

interface FungibleTokenTableProps {
  tokenHoldings: Token[]
  accountId: string
  hbarPrice: number
}

const DefiTable: React.FC<FungibleTokenTableProps> = async ({ tokenHoldings, accountId, hbarPrice }) => {
  const saucerIcon = await getTokenIcon('0.0.731861')
  // const positionsV2 = await getV2LpPositions(accountId)

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center mx-4 pt-8 pb-2'>
        <h2 className='text-2xl font-bold'>
          DeFi
        </h2>
        {/* <span className='text-2xl semibold pl-2'>
          {`$${totalValue.toFixed(4)}`}
        </span> */}
      </div>
      <div className='flex justify-start items-center mx-4 pt-10 mb-6'>
        <CollectionAvatar url={saucerIcon ?? '/NotFound.png'} />
        <h3 className='text-xl font-bold ml-2'>
          SaucerSwap
        </h3>
      </div>
        <LiquidityPoolV1 tokenHoldings={tokenHoldings} accountId={accountId}/>
        <LiquidityFarmsV1 accountId={accountId} />
        {/* <LiquidityPoolV2 positionsV2={positionsV2} hbarPrice={hbarPrice}/> */}
    </section>
  )
}

export default DefiTable
