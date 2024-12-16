// src/app/utils/calculateTotalListings.ts
import getActivityKabila from '@/app/services/getActivityKabila'
// import getActivitySentx from '@/app/services/getActivitySentx'

type TimeFrame = '24h' | '7d' | '30d'

export async function calculateListingsKabila (tokenId: string, timeFrame: TimeFrame): Promise<number> {
  const now = new Date()
  // Calculate time difference based on timeFrame
  const timeFrameInMs = {
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000
  }

  const startTime = new Date(now.getTime() - timeFrameInMs[timeFrame])

  let listingsKabila = 0
  let skip = 0
  const limit = 100
  let shouldContinue = true

  while (shouldContinue) {
    const activities = await getActivityKabila(tokenId, skip, limit)

    if (activities === null || activities.length === 0) break

    for (const activity of activities) {
      const [datePart, timePart] = activity.createdAt.split(' ')
      const activityDate = new Date(`${datePart}T${timePart}Z`)

      if (activityDate < startTime) {
        shouldContinue = false
        break
      }

      if (activity.activityType === 'LISTING' && activity.subactivityType === '') {
        listingsKabila++
      }
    }

    skip += limit
  }

  console.log(`Total Kabila listings counted (${timeFrame}):`, listingsKabila)
  return listingsKabila
}
