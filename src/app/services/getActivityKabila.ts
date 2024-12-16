export interface KabilaActivity {
  tokenId: string
  serialNumber: number
  name: string
  imageCid: string
  imageType: string
  activityType: string
  subactivityType: string
  price: number
  currency: string
  buyerId: string
  sellerId: string
  createdAt: string
  rank: number
}

export default async function getActivityKabila (tokenId: string, skip: number, limit: number): Promise<KabilaActivity[] | null> {
  try {
    const url = `https://labs.kabila.app/api/marketplace/analytics/activity?tokenId=${tokenId}&timeRange=30d&skip=${skip}&limit=${limit}&format=JSONEachRow&fields=tokenId,serialNumber,name,imageCid,imageType,activityType,subactivityType,price,currency,buyerId,sellerId,createdAt,rank`

    const response = await fetch(url, {
      next: {
        revalidate: 300
      }
    })

    if (!response.ok) {
      console.error(`Error fetching Kabila Activity: ${response.status} - ${response.statusText}`)
      throw new Error('Error fetching Kabila Activity')
    }

    const data = await response.json()

    // If the data is empty, handle it
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`No activity found in Kabila for tokenId: ${tokenId}`)
      return null
    }

    return data
  } catch (error) {
    console.error(`Error fetching Kabila Activity for tokenId: ${tokenId}`, error)
    return null
  }
}
