import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/collections/components/ui/tabs'
import Holders from './Holders'
import Overview from './Overview'
import Traders from './Traders'
// import ActivitySentx from './ActivitySentx'
// import ActivityKabila from './ActivityKabila'
import { Suspense } from 'react'

interface AnalyticsProps {
  tokenId: string
}

const Analytics: React.FC<AnalyticsProps> = async ({ tokenId }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <div className="flex justify-center w-full py-4">
        <TabsList className="w-full md:w-[400px] bg-neutral-950">
          <TabsTrigger
            className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
            value="overview"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
            value="traders"
          >
            Traders
          </TabsTrigger>
          <TabsTrigger
            className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
            value="holders"
          >
            Holders
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview">
        <Suspense fallback="Loading...">
          <Overview tokenId={tokenId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="traders">
        <Suspense fallback="Loading...">
          <Traders tokenId={tokenId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="holders">
        <Suspense fallback="Loading...">
          <Holders tokenId={tokenId}/>
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

export default Analytics
