// Gets HBAR Price
export const fetchHbarPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=hedera-hashgraph&vs_currencies=usd')
    if (!response.ok) {
      throw new Error('Error al obtener los datos del servidor')
    }
    const data = await response.json()
    const price = data['hedera-hashgraph'].usd
    return price
  } catch (error) {
    console.error('Error:', error)
  }
}
