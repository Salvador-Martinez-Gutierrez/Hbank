export default async function getOffersSentx ({ token }: { token: string }) {
  const apiKeySentx = process.env.API_KEY_SENTX
  const url = `https://api.sentx.io/v1/public/market/offers?apikey=${apiKeySentx}&token=${token}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: {
        revalidate: 300
      }
    })

    const responseText = await response.text()
    console.log('Raw response:', responseText)

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText} - ${responseText}`)
    }

    // Parse the text response as JSON
    const data = JSON.parse(responseText)
    const offers = data.response
    return offers
  } catch (error) {
    console.error('Failed to fetch offers:', error)
    if (error instanceof Error) {
      console.error('Error message:', error.message)
    }
    return null
  }
}
