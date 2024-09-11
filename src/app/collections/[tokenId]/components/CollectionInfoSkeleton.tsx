import { Skeleton } from '@/components/ui/skeleton'

export default function CollectionInfoSkeleton () {
  return (
    <div className="bg-neutral-900 text-neutral-200 p-4 md:p-6 2xl:p-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 2xl:gap-8">
        <div className="flex items-center gap-4 lg:gap-6">
          <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="w-full lg:w-auto mt-4 lg:mt-0 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 lg:gap-6 2xl:gap-8 min-w-max">
            {[
              'Floor Price',
              'Market Cap',
              'FDV',
              'Minted / Supply',
              'Burnt Supply',
              'Royalties'
            ].map((label) => (
              <div key={label} className="flex flex-col items-start">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
