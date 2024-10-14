import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'

interface FungibleTokenSkeletonProps {
  showTopFour: boolean
}

export default function FungibleTokenSkeleton ({ showTopFour }: FungibleTokenSkeletonProps) {
  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center mx-4 pt-8 pb-2'>
        <div className="h-8 bg-neutral-800 rounded w-24 animate-pulse"></div>
        <div className="h-8 bg-neutral-800 rounded w-32 ml-2 animate-pulse"></div>
      </div>
      <div className='justify-center items-center text-center px-4 pb-8'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-zinc-950'>
              <TableHead className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>Name</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Balance</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Price</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(showTopFour ? 4 : 8)].map((_, index) => (
              <TableRow key={index} className="hover:bg-zinc-800">
                <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
                  <div className='flex'>
                    <div className="w-10 h-10 bg-neutral-800 rounded-full animate-pulse"></div>
                    <div className='flex flex-col ml-2 overflow-hidden'>
                      <div className="h-4 bg-neutral-800 rounded w-24 animate-pulse"></div>
                      <div className="h-3 bg-neutral-800 rounded w-20 mt-1 animate-pulse"></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  <div className="h-4 bg-neutral-800 rounded w-16 ml-auto animate-pulse"></div>
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  <div className="h-4 bg-neutral-800 rounded w-20 ml-auto animate-pulse"></div>
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  <div className="h-4 bg-neutral-800 rounded w-24 ml-auto animate-pulse"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showTopFour && (
          <div className="mt-4 text-center">
            <div className="h-10 bg-neutral-800 rounded w-40 mx-auto animate-pulse"></div>
          </div>
        )}
      </div>
    </section>
  )
}
