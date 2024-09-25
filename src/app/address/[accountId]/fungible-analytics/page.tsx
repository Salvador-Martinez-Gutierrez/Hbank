import FungibleTokenTable from '../components/FungibleTokenTable'
import getAccountHbarBalance from '../../../services/getAccountHbarBalance'
import getAccountTokenBalance from '../../../services/getAccountTokenBalance'
import getHbarPrice from '../../../services/saucer/getHbarPrice'
import getTokenData from '../../../services/getTokenData'
import getTokenPrice from '../../../services/getTokenPrice'
import { getFloorPriceKabila } from '../../../services/getFloorPriceKabila'
import { getFloorPriceSentx } from '../../../services/getFloorPriceSentx'
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

interface TokenWithDecimals extends Token {
  decimals: number
}

const FungibleAnalytics = async ({ params }: FungibleAnalyticsProps) => {
  const { accountId } = params

  const hbarBalance = await getAccountHbarBalance(accountId)

  let hbarPrice: number | undefined = 0

  async function fetchHbarPrice () {
    const getCurrentUnixTimestamp = () => Math.floor(Date.now() / 1000)
    const toTimestamp = getCurrentUnixTimestamp()
    const fromTimestamp = toTimestamp - 60
    try {
      hbarPrice = await getHbarPrice(fromTimestamp, toTimestamp)
    } catch (error) {
      console.error('Failed to fetch HBAR price', error)
    }
  }

  await fetchHbarPrice()

  // HBAR details
  const hbarDetails = {
    balance: hbarBalance,
    token_id: 'HBAR',
    name: 'HBAR',
    type: 'FUNGIBLE_COMMON',
    price: hbarPrice
  }

  // Gets HTS and NFT holdings and extracts the data
  const tokenHoldings: TokenWithDecimals[] = await getAccountTokenBalance(accountId)

  // Extend the object tokenHoldings by adding the name, type, and price properties
  const tokenHoldingsExtended = await Promise.all(
    tokenHoldings.filter(token => token.balance > 0).map(async (token) => {
      const { name, type, decimals } = await getTokenData(token.token_id)
      console.log(`Token ${token.token_id}: name=${name}, type=${type}, decimals=${decimals}`)
      let price = 0
      if (type === 'FUNGIBLE_COMMON') {
        price = await getTokenPrice(token.token_id)
      } else if (type === 'NON_FUNGIBLE_UNIQUE' && typeof hbarPrice !== 'undefined') {
        const priceKabila: number | null = await getFloorPriceKabila(token.token_id)
        const priceSentx: number | null = await getFloorPriceSentx(token.token_id)
        if (priceSentx === null && priceKabila !== null) {
          price = priceKabila * hbarPrice
        } else if (priceKabila === null && priceSentx !== null) {
          price = priceSentx * hbarPrice
        } else if (typeof priceKabila === 'number' && typeof priceSentx === 'number') {
          price = Math.min(priceSentx, priceKabila) * hbarPrice
        }
      }

      return {
        token_id: token.token_id,
        name,
        type,
        balance: (token.balance) * Math.pow(10, -decimals),
        price
      }
    })
  )

  // Add HBAR details to the tokenHoldingsExtended array
  tokenHoldingsExtended.unshift(hbarDetails)

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
      <FungibleTokenTable tokenHoldingsExtended = { tokenHoldingsExtended } accountId={accountId} showTopFour={false}/>
    </div>
  )
}

export default FungibleAnalytics
