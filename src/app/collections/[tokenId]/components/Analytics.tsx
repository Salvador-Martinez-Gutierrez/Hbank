import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/collections/components/ui/tabs'
import Holders from './Holders'
import Overview from './Overview'
// import ActivitySentx from './ActivitySentx'
// import ActivityKabila from './ActivityKabila'
import { Suspense } from 'react'
import { Badge } from '@/components/ui/badge'

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
            value="holders"
          >
            Holders
          </TabsTrigger>
          <TabsTrigger
            className="w-full bg-neutral-950 data-[state=active]:bg-neutral-950 text-gray-500 data-[state=active]:text-gray-500 relative cursor-not-allowed pointer-events-none"
            value="trends"
          >
            <span>Trends</span>
            <Badge
              variant="default"
              className="bg-blue-500 hover:bg-blue-500 text-white absolute top-[-4px] md:right-[-8px] right-[6px] transform translate-x-1/2 -translate-y-1/2"
            >
              Soon
            </Badge>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="overview">
        <Suspense fallback="Loading...">
          <Overview tokenId={tokenId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="holders">
        <Suspense fallback="Loading...">
          <Holders tokenId={tokenId}/>
        </Suspense>
      </TabsContent>
      <TabsContent value="trends">
        <Suspense fallback="Loading...">
          <p>Trends</p>
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

export default Analytics
