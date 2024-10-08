export default async function checkTokenAssociation (accountId: string, tokenId: string) {
  try {
    const response = await fetch(`/api/checkTokenAssociation?accountId=${accountId}&tokenId=${tokenId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    return data.isAssociated
  } catch (error) {
    console.error('Error checking token association:', error)
    throw error
  }
}
