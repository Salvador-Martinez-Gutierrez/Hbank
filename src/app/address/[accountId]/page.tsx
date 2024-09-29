import FungibleTokenTable from './components/FungibleTokenTable'
import NonFungibleTokenTable from './components/NonFungibleTokenGallery'
import DefiTable from './components/DefiTable'
import BurgerMenu from './components/BurgerButton'
import getAccountTokenBalance from './services/getAccountTokenBalance'
import { classifyAccountTokenBalance } from './services/classifyAccountTokenBalance'
import getHbarPrice from '../../services/saucer/getHbarPrice'
import { getPricedTokens, getPricedNFTs } from './services/getPricedTokens'
import getLpTokensData from './services/getLpTokenData'
import fetchFarms from '@/app/services/saucer/fetchFarms'
import fetchPoolId from '@/app/services/saucer/fetchPoolId'
import getLpTokenDataByPoolId from '@/app/services/saucer/getLpTokenDataByPoolId'

interface Params {
  accountId: string
}

const Portfolio = async ({ params }: { params: Params }) => {
  const accountId: string = params.accountId
  const accountHoldings = await getAccountTokenBalance(accountId)
  const { tokens, nfts, defi } = await classifyAccountTokenBalance(accountHoldings)

  // Get HBAR price
  const currentTime = Math.floor(Date.now() / 1000)
  const hbarPrice = await getHbarPrice(currentTime - 60, currentTime)

  // Get priced tokens and NFTs
  const tokensWithPrice = await getPricedTokens(tokens, hbarPrice)
  const nftsWithPrice = await getPricedNFTs(nfts, hbarPrice)

  // DEFI
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

  // Calculate separate totals
  const tokensTotalValue = tokensWithPrice.reduce((total, token) =>
    total + (token.balance * Math.pow(10, -(token.decimals ?? 0)) * (token.priceUsd ?? 0)), 0
  )

  const nftsTotalValue = nftsWithPrice.reduce((total, nft) =>
    total + (nft.balance * Math.pow(10, -(nft.decimals ?? 0)) * (nft.priceUsd ?? 0)), 0
  )

  const poolTotalValue = defiWithPrice.reduce((total, defi) =>
    total + (defi.poolValue), 0
  )

  const totalWorth = tokensTotalValue + nftsTotalValue + poolTotalValue + farmsTotalValue

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
        <label className='text-lg text-muted-foreground w-full max-w-[420px] md:max-w-[800px] px-4 md:px-4 lg:px-8 xl:px-16'>
          Total Worth:
        </label>
        <p className='text-2xl font-bold w-full max-w-[420px] md:max-w-[800px] px-4 md:px-4 lg:px-8 xl:px-16'>
          ${totalWorth.toFixed(2)}
        </p>
     </header>
     <div className='pb-8'>
      <FungibleTokenTable tokens={tokensWithPrice} accountId={accountId} showTopFour={true}/>
      <NonFungibleTokenTable nfts={nftsWithPrice} accountId={accountId} showTopFour={true} />
      <DefiTable defi={defiWithPrice} poolTotalValue={poolTotalValue} farmsTotalValue={farmsTotalValue} accountId={accountId}/>
     </div>
    </div>
  )
}

export default Portfolio
