async function getAccountHbarBalance (accountId: string): Promise<number> {
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
    console.log('Account Info:', data)

    // Extract balance and convert to desired format
    const hbarBalance = data.balance.balance
    const formattedBalance = (hbarBalance * Math.pow(10, -8)).toFixed(2)

    return parseFloat(formattedBalance)
  } catch (error) {
    console.error('Error fetching account info:', error)
    throw error // Optionally handle or rethrow the error
  }
}

export default getAccountHbarBalance
