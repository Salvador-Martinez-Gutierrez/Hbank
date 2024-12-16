import type { NormalizedActivity } from './get30DaysActivity'

export interface TraderStats {
  accountId: string
  count: number
  averagePrice: number
}

export const calculateListingStats = (activities: NormalizedActivity[]): TraderStats[] => {
  const listingStats = activities
    .filter(activity => activity.type === 'LISTING')
    .reduce<Record<string, { count: number, totalPrice: number }>>(
    (acc, activity) => {
      const sellerId = activity.sellerId
      if (acc[sellerId] === undefined) {
        acc[sellerId] = { count: 0, totalPrice: 0 }
      }
      acc[sellerId].count += 1
      acc[sellerId].totalPrice += activity.price
      return acc
    }, {})

  return Object.entries(listingStats)
    .map(([accountId, { count, totalPrice }]) => ({
      accountId,
      count,
      averagePrice: totalPrice / count
    }))
    .sort((a, b) => b.count - a.count)
}
