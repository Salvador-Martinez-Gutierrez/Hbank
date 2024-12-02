import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/collections/components/ui/tabs'
import ActivitySentx from './ActivitySentx'
import ActivityKabila from './ActivityKabila'
import { Suspense } from 'react'

interface ActivityProps {
  tokenId: string
}

const Activity: React.FC<ActivityProps> = async ({ tokenId }) => {
  return (
    <Tabs defaultValue="sentx" className="w-full">
      <div className="flex justify-center w-full py-4">
        <TabsList className="w-full md:w-[400px] bg-neutral-950">
          <TabsTrigger
            className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
            value="sentx"
          >
            Sentx
          </TabsTrigger>
          <TabsTrigger
            className="w-full data-[state=active]:bg-zinc-800 !text-white data-[state=active]:!text-white"
            value="kabila"
          >
            Kabila
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="sentx">
        <Suspense fallback="Loading...">
          <ActivitySentx tokenId={tokenId}/>
        </Suspense>
      </TabsContent>
      <TabsContent value="kabila">
        <Suspense fallback="Loading...">
          <ActivityKabila tokenId={tokenId}/>
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}

export default Activity
