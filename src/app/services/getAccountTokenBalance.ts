// Returns a list of up to 50 HTS & NFT with the balances holded by an account Id

async function getAccountTokenBalance (accountId: string) {
  const url = `https://mainnet-public.mirrornode.hedera.com/api/v1/accounts/${accountId}/tokens`

  try {
    console.log('Fetching account info...')
    const response = await fetch(url)
    console.log('Response:', response)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    const tokens = data.tokens
    return tokens
  } catch (error) {
    console.error('Error fetching account info:', error)
    throw error // Optionally handle or rethrow the error
  }
}

export default getAccountTokenBalance
