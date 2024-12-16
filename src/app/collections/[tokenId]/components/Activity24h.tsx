import { calculateListingsKabila } from '../utils/calculateListingsKabila'
import { calculateListingsSentx } from '../utils/calculateListingsSentx'
import { calculateSalesKabila } from '../utils/calculateSalesKabila'
import { calculateSalesSentx } from '../utils/calculateSalesSentx'

interface ActivityProps {
  tokenId: string
}

const Activity24h: React.FC<ActivityProps> = async ({ tokenId }) => {
  const totalListingsKabila = await calculateListingsKabila(tokenId, '24h')
  const totalListingsSentx = await calculateListingsSentx(tokenId, '24h')
  const totalListings = totalListingsKabila + totalListingsSentx

  const totalSalesKabila = await calculateSalesKabila(tokenId, '24h')
  const totalSalesSentx = await calculateSalesSentx(tokenId, '24h')
  const totalSales = totalSalesKabila + totalSalesSentx

  return (
    <main className='bg-neutral-950 rounded-xl p-4'>
      <div className='flex flex-col gap-1 items-center'>
        <div className='flex items-center gap-1 text-neutral-300 text-sm mb-2'>
          Last 24h
        </div>

        <div className='grid grid-cols-2 w-full'>
          <div className='flex flex-col items-center gap-1'>
            <span className='text-2xl font-medium text-white'>{totalListings}</span>
            <span className='text-sm text-neutral-400'>Listings</span>
          </div>

          <div className='flex flex-col items-center gap-1 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-px before:h-12 before:bg-neutral-700'>
            <span className='text-2xl font-medium text-white'>{totalSales}</span>
            <span className='text-sm text-neutral-400'>Sales</span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Activity24h
