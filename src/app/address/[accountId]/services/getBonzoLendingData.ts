interface BalanceInfo {
  tiny_token: string
  token_display: string
  hbar_tinybar: string
  hbar_display: string
  usd_wad: string
  usd_display: string
  usd_abbreviated: string
}

interface Reserve {
  id: number
  name: string
  symbol: string
  decimals: number
  atoken_balance: BalanceInfo
  supply_apy: number
  price_usd_display: string
  hts_address: string
}

interface BonzoApiResponse {
  reserves: Reserve[]
  user_credit: {
    total_supply: BalanceInfo
  }
}

export interface LendingPosition {
  asset: string
  tokenAmount: string
  valueUsd: string
  apy: number
  tokenId: string
}

export interface LendingData {
  totalValueUsd: number
  totalValueHbar: number
  positions: LendingPosition[]
}

export default async function getBonzoLendingData (accountId: string): Promise<LendingData | undefined> {
  const url = `https://bonzo-data-api-eceac9d8a2aa.herokuapp.com/Dashboard/${accountId}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json() as BonzoApiResponse

    // Convert string values to numbers by removing currency symbols and parsing
    const totalValueUsd = parseFloat(data.user_credit.total_supply.usd_display.replace('$', '').replace(',', ''))
    const totalValueHbar = parseFloat(data.user_credit.total_supply.hbar_display.replace('ℏ', '').replace(',', ''))

    // Get individual lending positions
    const positions = data.reserves
      .filter(reserve => {
        // Filter only positions where user has supplied tokens
        const balance = parseFloat(reserve.atoken_balance.token_display)
        return balance > 0
      })
      .map(reserve => ({
        asset: reserve.symbol,
        tokenAmount: reserve.atoken_balance.token_display,
        valueUsd: reserve.atoken_balance.usd_display,
        apy: reserve.supply_apy,
        tokenId: reserve.hts_address
      }))

    return {
      totalValueUsd,
      totalValueHbar,
      positions
    }
  } catch (error) {
    console.error('Error fetching Bonzo lending data:', error)
    return undefined
  }
}
