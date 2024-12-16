import Traders30d from './Traders30d'
import Traders7d from './Traders7d'
import Traders24h from './Traders24h'
import { get30DaysActivity } from '../utils/get30DaysActivity'
import type { NormalizedActivity } from '../utils/get30DaysActivity'

interface TrendsProps {
  tokenId: string
}

const get7DaysActivity = async (activity30d: NormalizedActivity[]) => {
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  return activity30d.filter(activity => {
    const activityDate = new Date(activity.date)
    return activityDate >= sevenDaysAgo
  })
}

const get24HoursActivity = async (activity30d: NormalizedActivity[]) => {
  const twentyFourHoursAgo = new Date()
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

  return activity30d.filter(activity => {
    const activityDate = new Date(activity.date)
    return activityDate >= twentyFourHoursAgo
  })
}

const Trends: React.FC<TrendsProps> = async ({ tokenId }) => {
  const activity30d = await get30DaysActivity(tokenId)
  const activity7d = await get7DaysActivity(activity30d)
  const activity24h = await get24HoursActivity(activity30d)
  console.log('30 DAY ACTIVITY', activity30d)
  return (
    <div className='flex flex-col xl:flex-row gap-4 w-full pb-6'>
      <div className='w-full xl:w-1/3'>
        <div className='text-lg font-medium text-neutral-100 mb-2 text-center'>
          Last 24h
        </div>
        <div className='bg-neutral-950 rounded-lg p-4'>
          <Traders24h activity24h={activity24h} />
        </div>
      </div>

      <div className='w-full xl:w-1/3'>
        <div className='text-lg font-medium text-neutral-100 mb-2 text-center'>
          Last 7 days
        </div>
        <div className='bg-neutral-950 rounded-lg p-4'>
          <Traders7d activity7d={activity7d} />
        </div>
      </div>

      <div className='w-full xl:w-1/3'>
        <div className='text-lg font-medium text-neutral-100 mb-2 text-center'>
          Last 30 days
        </div>
        <div className='bg-neutral-950 rounded-lg p-4'>
          <Traders30d activity30d={activity30d} />
        </div>
      </div>
    </div>
  )
}

export default Trends
