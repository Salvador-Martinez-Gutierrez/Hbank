import getActivityKabila from '@/app/services/getActivityKabila'
import type { KabilaActivity } from '@/app/services/getActivityKabila'
import getActivitySentx from '@/app/services/getActivitySentx'
import type { SentxActivityType } from '@/app/services/getActivitySentx'

export interface NormalizedActivity {
  date: string
  type: 'SALE' | 'LISTING'
  price: number
  buyerId: string | null | ''
  sellerId: string
  serialNumber: number
  source: 'kabila' | 'sentx'
}

async function fetchAllKabilaActivity (tokenId: string, startTime: Date): Promise<KabilaActivity[]> {
  const activities: KabilaActivity[] = []
  let skip = 0
  const limit = 100
  let shouldContinue = true

  while (shouldContinue) {
    const batch = await getActivityKabila(tokenId, skip, limit)
    if (batch === null || batch.length === 0) break

    for (const activity of batch) {
      const [datePart, timePart] = activity.createdAt.split(' ')
      const activityDate = new Date(`${datePart}T${timePart}Z`)

      if (activityDate < startTime) {
        shouldContinue = false
        break
      }

      activities.push(activity)
    }

    skip += limit
  }

  return activities
}

async function fetchAllSentxActivity (tokenId: string, startTime: Date): Promise<SentxActivityType[]> {
  const activities: SentxActivityType[] = []
  let page = 1
  let shouldContinue = true

  while (shouldContinue) {
    const batch = await getActivitySentx({ tokenId, page })
    if (batch === null || batch.length === 0) break

    for (const activity of batch) {
      const activityDate = new Date(activity.saleDate)

      if (isNaN(activityDate.getTime())) {
        console.warn('Invalid date encountered:', activity.saleDate)
        continue
      }

      if (activityDate < startTime) {
        shouldContinue = false
        break
      }

      activities.push(activity)
    }

    page++
  }

  return activities
}

export async function get30DaysActivity (tokenId: string): Promise<NormalizedActivity[]> {
  const now = new Date()
  const startTime = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))

  try {
    const [kabilaActivities, sentxActivities] = await Promise.all([
      fetchAllKabilaActivity(tokenId, startTime),
      fetchAllSentxActivity(tokenId, startTime)
    ])

    const normalizedActivities: NormalizedActivity[] = [
      // Normalize Kabila activities
      ...kabilaActivities
        .filter(activity => activity.subactivityType !== 'PRICE_UPDATED')
        .map(activity => ({
          date: activity.createdAt,
          type: activity.activityType === 'LISTING' ? 'LISTING' : 'SALE' as 'LISTING' | 'SALE',
          price: activity.price,
          buyerId: activity.buyerId,
          sellerId: activity.sellerId,
          serialNumber: activity.serialNumber,
          source: 'kabila' as const
        })),
      // Normalize Sentx activities
      ...sentxActivities
        .filter(activity => !['Order', 'Offer'].includes(activity.saletype))
        .map(activity => ({
          date: activity.saleDate,
          type: (activity.saletype === 'Listed'
            ? 'LISTING'
            : 'SALE') as 'LISTING' | 'SALE',
          price: activity.salePrice,
          buyerId: activity.buyerAddress,
          sellerId: activity.sellerAddress,
          serialNumber: activity.nftSerialId,
          source: 'sentx' as const
        }))
    ]

    // Sort by date string, most recent first
    return normalizedActivities.sort((a, b) => {
      const dateA = new Date(a.date.replace(' ', 'T') + 'Z')
      const dateB = new Date(b.date.replace(' ', 'T') + 'Z')
      return dateB.getTime() - dateA.getTime()
    })
  } catch (error) {
    console.error('Error fetching 30 days activity:', error)
    throw error
  }
}
