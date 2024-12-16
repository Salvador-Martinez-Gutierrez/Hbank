import { updateListedItems } from '../utils/listedItems'
import { ListingsPieChart } from './ListingsPieChart'
import ListingPriceDistributionChart from './ListingPriceDistributionChart'
import PriceResistanceChart from './PriceResistanceChart'
import Activity24h from './Activity24h'
import Activity7d from './Activity7d'
import Activity30d from './Activity30d'

interface OverviewProps {
  tokenId: string
}

const Overview: React.FC<OverviewProps> = async ({ tokenId }) => {
  const updatedListedItems = await updateListedItems(tokenId)

  return (
    <main className='pb-6'>
       <div className='flex flex-col sm:flex-row gap-4 w-full mb-4'>
         <div className='w-full sm:flex-1 bg-neutral-950 rounded-lg'>
           <Activity24h tokenId={tokenId} />
         </div>
         <div className='w-full sm:flex-1 bg-neutral-950 rounded-lg'>
           <Activity7d tokenId={tokenId} />
         </div>
         <div className='w-full sm:flex-1 bg-neutral-950 rounded-lg'>
           <Activity30d tokenId={tokenId} />
         </div>
      </div>

      <div className='bg-neutral-950 rounded-lg mb-6'>
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
      </div>
    </main>
  )
}

export default Overview
