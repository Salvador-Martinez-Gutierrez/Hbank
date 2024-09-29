import React from 'react'
// import getV2LpPositions from '@/app/services/saucer/getV2LpPositions'
// import LiquidityPoolV2 from './LiquidityPoolV2'
import LiquidityPoolV1 from './LiquidityPoolV1'
import LiquidityFarmsV1 from './LiquidityFarmsV1'
import CollectionAvatar from '@/app/components/collections/CollectionAvatar'
import getTokenIcon from '@/app/services/getTokenIcon'

interface LpTokenData {
  id: string
  name: string
  symbol: string
  priceUsd: string
  decimals: number
}

interface TokenData {
  decimals: number
  icon?: string
  id: string
  name: string
  price: string
  priceUsd: number
  symbol: string
  dueDiligenceComplete: boolean
  isFeeOnTransferToken: boolean
  description: string
  website: string
  sentinelReport: string | null
  twitterHandle: string
  timestampSecondsLastListingChange: number
}

interface LpTokensData {
  id: number
  contractId: string
  lpToken: LpTokenData
  lpTokenReserve: string
  tokenA: TokenData
  tokenReserveA: string
  tokenB: TokenData
  tokenReserveB: string
}

interface DefiToken {
  token_id: string
  name: string
  symbol: string
  type: string
  balance: number
  decimals: number
  lpTokensData: LpTokensData | undefined
}

interface FungibleDefiTableProps {
  defi: DefiToken[]
  accountId: string
  poolTotalValue: number
  farmsTotalValue: number
}

const DefiTable: React.FC<FungibleDefiTableProps> = async ({ defi, accountId, poolTotalValue, farmsTotalValue }) => {
  const saucerIcon = await getTokenIcon('0.0.731861')
  // const positionsV2 = await getV2LpPositions(accountId)
  const totalValue = poolTotalValue + farmsTotalValue

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center mx-4 pt-8 pb-2'>
        <h2 className='text-2xl font-bold'>
          DeFi
        </h2>
        <span className='text-2xl semibold pl-2'>
          {`$${totalValue.toFixed(4)}`}
        </span>
      </div>
      <div className='flex justify-start items-center mx-4 pt-10 mb-6'>
        <CollectionAvatar url={saucerIcon ?? '/NotFound.png'} />
        <h3 className='text-xl font-bold ml-2'>
          SaucerSwap
        </h3>
      </div>
        <LiquidityPoolV1 defi={defi} accountId={accountId}/>
        <LiquidityFarmsV1 accountId={accountId} />
        {/* <LiquidityPoolV2 positionsV2={positionsV2} hbarPrice={hbarPrice}/> */}
    </section>
  )
}

export default DefiTable
