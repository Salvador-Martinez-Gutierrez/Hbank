import type { NormalizedActivity } from '../utils/get30DaysActivity'
import { calculateListingStats } from '../utils/calculateListingStats'
import { calculateSellerStats } from '../utils/calculateSellerStats'
import { calculateBuyerStats } from '../utils/calculateBuyerStats'
import { ListersTable } from './ListersTable'
import { SellersTable } from './SellersTable'
import { BuyersTable } from './BuyersTable'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Traders7dProps {
  activity7d: NormalizedActivity[]
}

const Traders7d: React.FC<Traders7dProps> = ({ activity7d }) => {
  const listingStats = calculateListingStats(activity7d)
  const sellerStats = calculateSellerStats(activity7d)
  const buyerStats = calculateBuyerStats(activity7d)

  const EmptyMessage = ({ text }: { text: string }) => (
    <div className="text-grey-500 flex items-center gap-2 border-2 border-zinc-800 rounded-md p-3 mt-6">
      <p>{text}</p>
    </div>
  )

  return (
    <Tabs defaultValue="buyers" className="w-full p-2">
      <TabsList className="grid w-full grid-cols-3 bg-zinc-900">
        <TabsTrigger
          value="buyers"
          className="w-full data-[state=active]:bg-zinc-700 text-zinc-400 data-[state=active]:text-zinc-100">
            Buyers
        </TabsTrigger>
        <TabsTrigger value="sellers"
          className="w-full data-[state=active]:bg-zinc-700 text-zinc-400 data-[state=active]:text-zinc-100">
            Sellers
        </TabsTrigger>
        <TabsTrigger value="listers"
          className="w-full data-[state=active]:bg-zinc-700 text-zinc-400 data-[state=active]:text-zinc-100">
            Listers
        </TabsTrigger>
      </TabsList>
      <div className="h-[400px] overflow-y-auto scrollbar-hide">
        <TabsContent value="buyers">
          {buyerStats.length > 0
            ? (<BuyersTable buyerStats={buyerStats} />
              )
            : (
            <EmptyMessage text="No buying activity in the last 7 days." />
              )}
        </TabsContent>
        <TabsContent value="sellers">
          {sellerStats.length > 0
            ? (
            <SellersTable sellerStats={sellerStats} />
              )
            : (
            <EmptyMessage text="No selling activity in the last 7 days." />
              )}
        </TabsContent>
        <TabsContent value="listers">
          {listingStats.length > 0
            ? (<ListersTable listingStats={listingStats} />
              )
            : (
            <EmptyMessage text="No listing activity in the last 7 days." />
              )}
        </TabsContent>
      </div>
    </Tabs>
  )
}

export default Traders7d
