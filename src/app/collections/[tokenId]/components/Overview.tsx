import { updateListedItems } from '../utils/listedItems'
import { ListingsPieChart } from './ListingsPieChart'
import ListingPriceDistributionChart from './ListingPriceDistributionChart'
import PriceResistanceChart from './PriceResistanceChart'

interface OverviewProps {
  tokenId: string
}

const Overview: React.FC<OverviewProps> = async ({ tokenId }) => {
  const updatedListedItems = await updateListedItems(tokenId)

  return (
    <main className='bg-neutral-950 rounded-lg'>
      <div className="flex flex-col sm:flex-row flex-wrap min-[999px]:flex-nowrap gap-4">
        <div className="w-full sm:w-[calc(50%-0.5rem)] min-[999px]:w-1/3">
          <ListingsPieChart updatedListedItems={updatedListedItems}/>
        </div>
        <div className="w-full sm:w-[calc(50%-0.5rem)] min-[999px]:w-1/3">
          <ListingPriceDistributionChart updatedListedItems={updatedListedItems}/>
        </div>
        <div className="w-full sm:w-full min-[999px]:w-1/3">
          <PriceResistanceChart updatedListedItems={updatedListedItems}/>
        </div>
      </div>
    </main>
  )
}

export default Overview
