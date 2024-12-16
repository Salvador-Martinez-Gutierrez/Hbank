import getActivitySentx from '@/app/services/getActivitySentx'

type TimeFrame = '24h' | '7d' | '30d'

export async function calculateListingsSentx (tokenId: string, timeFrame: TimeFrame): Promise<number> {
  const now = new Date()
  console.log('Current time:', now.toISOString())

  const timeFrameInMs = {
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000
  }

  const startTime = new Date(now.getTime() - timeFrameInMs[timeFrame])

  let listingsSentx = 0
  let page = 1
  let shouldContinue = true

  while (shouldContinue) {
    const activities = await getActivitySentx({
      tokenId,
      page
    })

    if (activities === null || activities.length === 0) break

    for (const activity of activities) {
      const activityDate = new Date(activity.saleDate)

      if (isNaN(activityDate.getTime())) {
        console.warn('Invalid date encountered:', activity.saleDate)
        continue
      }

      if (activityDate < startTime) {
        shouldContinue = false
        break
      }

      if (activity.saletype === 'Listed') {
        listingsSentx++
      }
    }

    page++
  }

  console.log(`Total Sentx listings counted (${timeFrame}):`, listingsSentx)
  return listingsSentx
}
