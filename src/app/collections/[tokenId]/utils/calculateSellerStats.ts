import type { NormalizedActivity } from './get30DaysActivity'
import type { TraderStats } from './calculateListingStats'

export const calculateSellerStats = (activities: NormalizedActivity[]): TraderStats[] => {
  const sellerStats = activities
    .filter(activity => activity.type === 'SALE')
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

  return Object.entries(sellerStats)
    .map(([accountId, { count, totalPrice }]) => ({
      accountId,
      count,
      averagePrice: totalPrice / count
    }))
    .sort((a, b) => b.count - a.count)
}
