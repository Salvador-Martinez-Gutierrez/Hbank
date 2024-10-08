async function getAccountTokenBalance (accountId: string) {
  const apiKeyHedera = process.env.VALIDATION_CLOUD_KEY
  const url = `https://mainnet.hedera.validationcloud.io/v1/${apiKeyHedera}/api/v1/accounts/${accountId}?transactions=false`

  try {
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
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
    }

    // Create HBAR token object
    const hbarToken: Token = {
      token_id: 'HBAR',
      balance: balance.balance
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
