export const fetchOwnersData = async (tokenId: string) => {
  try {
    const apiKeySentx = process.env.API_KEY_SENTX

    const response = await fetch(`https://api.sentx.io/v1/public/token/owners?apikey=${apiKeySentx}&token=${tokenId}&amount=10000`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.owners
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
