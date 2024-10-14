import React from 'react'

interface NonFungibleTokenGallerySkeletonProps {
  showTopFour: boolean
}

export default function NonFungibleTokenGallerySkeleton ({ showTopFour }: NonFungibleTokenGallerySkeletonProps) {
  const displayTokens = showTopFour ? Array(4).fill(null) : Array(12).fill(null)

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center pt-8 pb-2 mx-4'>
        <div className="h-8 bg-neutral-800 rounded w-24 animate-pulse"></div>
        <div className="h-8 bg-neutral-800 rounded w-32 ml-2 animate-pulse"></div>
      </div>
      <div className={`p-4 ${showTopFour ? 'flex overflow-x-auto gap-4' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'}`}>
        {displayTokens.map((_, index) => (
          <div key={index} className={`bg-zinc-800 rounded-lg p-2 flex flex-col ${showTopFour ? 'min-w-[270px]' : ''}`}>
            <div className="relative w-full aspect-square mb-2">
              <div className="absolute inset-0 bg-neutral-700 rounded-lg animate-pulse"></div>
              <div className="absolute top-1 right-1 z-10 w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                <div className="w-4 h-4 bg-neutral-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="mt-auto">
              <div className={`h-5 bg-neutral-700 rounded w-3/4 mb-1 animate-pulse ${showTopFour ? 'h-5' : 'h-4'}`}></div>
              <div className={`h-4 bg-neutral-700 rounded w-1/2 mb-2 animate-pulse ${showTopFour ? 'h-4' : 'h-3'}`}></div>
              <div className='flex mb-1'>
                <div className={`h-4 bg-neutral-700 rounded w-1/3 animate-pulse ${showTopFour ? 'h-4' : 'h-3'}`}></div>
                <div className={`h-4 bg-neutral-700 rounded w-1/4 ml-1 animate-pulse ${showTopFour ? 'h-4' : 'h-3'}`}></div>
              </div>
              <div className={`h-5 bg-neutral-700 rounded w-2/3 animate-pulse ${showTopFour ? 'h-5' : 'h-4'}`}></div>
            </div>
          </div>
        ))}
      </div>
      {showTopFour && (
        <div className="mt-4 text-center pb-8">
          <div className="h-10 bg-neutral-800 rounded w-40 mx-auto animate-pulse"></div>
        </div>
      )}
    </section>
  )
}
