import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'

export default function DefiTableSkeleton () {
  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center mx-4 pt-8 pb-2'>
        <div className="h-8 bg-neutral-800 rounded w-24 animate-pulse"></div>
        <div className="h-8 bg-neutral-800 rounded w-32 ml-2 animate-pulse"></div>
      </div>
      <div className='flex justify-start items-center mx-4 pt-10 mb-6'>
        <div className="w-10 h-10 bg-neutral-800 rounded-full animate-pulse"></div>
        <div className="h-6 bg-neutral-800 rounded w-32 ml-2 animate-pulse"></div>
      </div>
      <div className="bg-neutral-950 mx-4 mb-8">
        <div className='h-6 bg-neutral-800 rounded w-24 mb-2 ml-4 animate-pulse'></div>
        <div className='justify-center items-center text-center pb-8'>
            <div className="rounded-2xl bg-neutral-800 p-2 mb-4">
              <Table>
                <TableHeader>
                  <TableRow className='hover:bg-neutral-800'>
                    <TableHead className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>Pool</TableHead>
                    <TableHead className='flex-grow text-right whitespace-nowrap'>Supplied</TableHead>
                    <TableHead className='flex-grow text-right whitespace-nowrap'>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-neutral-800">
                    <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
                      <div className="h-5 bg-neutral-700 rounded w-24 animate-pulse"></div>
                    </TableCell>
                    <TableCell className='flex-grow text-right whitespace-nowrap'>
                      <div className='flex flex-row justify-end items-center'>
                        <div className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse"></div>
                        <div className="h-5 bg-neutral-700 rounded w-24 ml-2 animate-pulse"></div>
                      </div>
                    </TableCell>
                    <TableCell className='flex-grow text-right whitespace-nowrap'>
                      <div className="h-5 bg-neutral-700 rounded w-20 ml-auto animate-pulse"></div>
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-neutral-800">
                    <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'></TableCell>
                    <TableCell className='flex-grow text-right whitespace-nowrap'>
                      <div className='flex flex-row justify-end items-center'>
                        <div className="w-10 h-10 bg-neutral-700 rounded-full animate-pulse"></div>
                        <div className="h-5 bg-neutral-700 rounded w-24 ml-2 animate-pulse"></div>
                      </div>
                    </TableCell>
                    <TableCell className='flex-grow text-right whitespace-nowrap'></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
        </div>
      </div>
    </section>
  )
}
