import React from 'react'
// import getV2LpPositions from '@/app/services/saucer/getV2LpPositions'
// import LiquidityPoolV2 from './LiquidityPoolV2'
import LiquidityPoolV1 from './LiquidityPoolV1'
import LiquidityFarmsV1 from './LiquidityFarmsV1'
import CollectionAvatar from '@/app/components/collections/CollectionAvatar'
import getTokenIcon from '@/app/services/getTokenIcon'
import getLpTokensData from '../services/getLpTokenData'
import fetchFarms from '@/app/services/saucer/fetchFarms'
import fetchPoolId from '@/app/services/saucer/fetchPoolId'
import getLpTokenDataByPoolId from '@/app/services/saucer/getLpTokenDataByPoolId'
import { classifyAccountTokenBalance } from '../services/classifyAccountTokenBalance'

interface DefiToken {
  token_id: string
  balance: number
}

interface FungibleDefiTableProps {
  accountHoldings: DefiToken[]
  accountId: string
  showTopFour: boolean
}

const DefiTable: React.FC<FungibleDefiTableProps> = async ({ accountHoldings, accountId, showTopFour }) => {
  const { defi } = await classifyAccountTokenBalance(accountHoldings)
  const saucerIcon = await getTokenIcon('0.0.731861')
  // const positionsV2 = await getV2LpPositions(accountId)

  // DEFI
  const defiWithPrice = await Promise.all(
    defi.map(async (defiItem) => {
      const lpTokensData = await getLpTokensData(defiItem.token_id)
      const poolValue = Number(defiItem.balance) * Number(lpTokensData?.lpToken.priceUsd) * Math.pow(10, -Number(defiItem.decimals))
      return { ...defiItem, lpTokensData, poolValue }
    })
  )

  const poolTotalValue = defiWithPrice.reduce((total, defi) =>
    total + (defi.poolValue), 0
  )

  const farms = await fetchFarms(accountId)

  console.log('FARMS', farms)

  // Calculate farms total value
  const farmsTotalValue = await farms.reduce(async (accPromise, farm) => {
    const acc = await accPromise
    const poolId = await fetchPoolId(farm.id)
    const lpData = await getLpTokenDataByPoolId(poolId)
    const farmValue = Number(farm.total) * Number(lpData.lpToken.priceUsd) * 1e-8
    return acc + farmValue
  }, Promise.resolve(0))

  const totalValue = farmsTotalValue + poolTotalValue

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center mx-4 pt-8 pb-2'>
        {showTopFour
          ? (
          <>
            <h2 className='text-2xl font-bold'>DeFi</h2>
            <span className='text-2xl font-semibold pl-2'>${totalValue.toFixed(2)}</span>
          </>
            )
          : (
          <>
            <h3 className='text-2xl text-muted-foreground'>Total Worth:</h3>
            <span className='text-2xl font-semibold pl-2'>${totalValue.toFixed(2)}</span>
          </>
            )}
      </div>
      <div className='flex justify-start items-center mx-4 pt-10 mb-6'>
        <CollectionAvatar url={saucerIcon ?? '/NotFound.png'} />
        <h3 className='text-xl font-bold ml-2'>
          SaucerSwap
        </h3>
      </div>
      <LiquidityPoolV1 defi={defiWithPrice}/>
      <LiquidityFarmsV1 farms={farms} />
      {/* <LiquidityPoolV2 positionsV2={positionsV2} hbarPrice={hbarPrice}/> */}
    </section>
  )
}

export default DefiTable
