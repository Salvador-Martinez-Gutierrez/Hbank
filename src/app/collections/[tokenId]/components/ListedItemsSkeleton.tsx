import { Skeleton } from '@/components/ui/skeleton'

export default function NFTCardSkeleton () {
  const ITEMS_PER_PAGE = 14 // Adjust this number as needed

  return (
    <div className="bg-neutral-900 p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
        {Array(ITEMS_PER_PAGE).fill(0).map((_, index) => (
          <div key={index} className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
            <div className="relative">
              <Skeleton className="w-full aspect-square" />
              <div className="absolute top-2 right-2">
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <Skeleton className="h-8 w-full rounded-md bg-neutral-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
