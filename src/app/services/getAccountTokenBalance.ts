async function getAccountTokenBalance (accountId: string) {
  const apiKeyHedera = process.env.VALIDATION_CLOUD_KEY
  const url = `https://mainnet.hedera.validationcloud.io/v1/${apiKeyHedera}/api/v1/accounts/${accountId}`

  try {
    const response = await fetch(url, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })

    if (!response.ok) {
      console.error(`Error fetching account info: ${response.status} - ${response.statusText}`)
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    const tokens = data.balance.tokens

    interface Token {
      balance: number
    }

    // Filter tokens with balance greater than 0
    return tokens.filter((token: Token) => token.balance > 0)
  } catch (error) {
    console.error('Error fetching account info:', error)
    throw error
  }
}

export default getAccountTokenBalance
