async function getAccountTokenBalance (accountId: string) {
  const apiKeyHedera = process.env.VALIDATION_CLOUD_KEY
  const url = `https://mainnet.hedera.validationcloud.io/v1/${apiKeyHedera}/api/v1/accounts/${accountId}`
  try {
    console.log('Fetching account info...')
    const response = await fetch(url)
    console.log('Response:', response)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    const tokens = data.balance.tokens
    return tokens
  } catch (error) {
    console.error('Error fetching account info:', error)
    throw error // Optionally handle or rethrow the error
  }
}

export default getAccountTokenBalance
