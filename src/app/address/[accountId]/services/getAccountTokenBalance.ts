async function getAccountTokenBalance (accountId: string) {
  const apiKeyHedera = process.env.VALIDATION_CLOUD_KEY
  const url = `https://mainnet.hedera.validationcloud.io/v1/${apiKeyHedera}/api/v1/accounts/${accountId}?transactions=false`

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 500 // 5 minutes cache
      }
    })

    if (!response.ok) {
      console.error(`Error fetching account info: ${response.status} - ${response.statusText}`)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    const { balance } = data

    interface Token {
      token_id: string
      balance: number
      decimals?: number
      priceUsd?: number
      priceHbar?: number
      priceChangeHour?: number
      priceChangeDay?: number
      priceChangeWeek?: number
      name?: string
      symbol?: string
      type?: string
      valueUsd: number
      iconUrl?: string
    }

    // Create HBAR token object
    const hbarToken: Token = {
      token_id: 'HBAR',
      balance: balance.balance,
      valueUsd: 0
    }

    // Add HBAR token to the beginning of the tokens array
    const allTokens: Token[] = [hbarToken, ...balance.tokens]

    // Filter tokens with balance greater than 0
    return allTokens.filter((token: Token) => token.balance > 0)
  } catch (error) {
    console.error('Error fetching account info:', error)
    throw error
  }
}

export default getAccountTokenBalance
