import type { NormalizedActivity } from './get30DaysActivity'
import type { TraderStats } from './calculateListingStats'

export const calculateBuyerStats = (activities: NormalizedActivity[]): TraderStats[] => {
  const buyerStats = activities
    .filter(activity => activity.type === 'SALE' && activity.buyerId !== null)
    .reduce<Record<string, { count: number, totalPrice: number }>>(
    (acc, activity) => {
      const buyerId = activity.buyerId
      if (buyerId !== null) {
        if (acc[buyerId] === undefined) {
          acc[buyerId] = { count: 0, totalPrice: 0 }
        }
        acc[buyerId].count += 1
        acc[buyerId].totalPrice += activity.price
      }
      return acc
    }, {})

  return Object.entries(buyerStats)
    .map(([accountId, { count, totalPrice }]) => ({
      accountId,
      count,
      averagePrice: totalPrice / count
    }))
    .sort((a, b) => b.count - a.count)
}
