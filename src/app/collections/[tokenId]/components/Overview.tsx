import { updateListedItems } from '../utils/listedItems'
import { ListingsPieChart } from './ListingsPieChart'
import ListingPriceDistributionChart from './ListingPriceDistributionChart'

interface OverviewProps {
  tokenId: string
}

const Overview: React.FC<OverviewProps> = async ({ tokenId }) => {
  const updatedListedItems = await updateListedItems(tokenId)

  return (
    <main className='bg-neutral-950 rounded-lg'>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <ListingsPieChart updatedListedItems={updatedListedItems}/>
        </div>
        <div className="w-full sm:w-1/2">
          <ListingPriceDistributionChart updatedListedItems={updatedListedItems}/>
        </div>
      </div>
    </main>
  )
}

export default Overview
