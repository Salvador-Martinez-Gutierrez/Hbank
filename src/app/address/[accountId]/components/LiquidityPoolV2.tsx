/*
'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'

const LiquidityPoolV2 = ({ positionsV2, hbarPrice }) => {
  console.log('V2 POSITION', positionsV2)

  return (
    <div className="bg-neutral-950 mx-4 mb-8">
      <h3 className='text-lg'>
          V2 Pool
      </h3>
      <div className='justify-center items-center text-center pb-8'>
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-zinc-950'>
              <TableHead className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>Pool</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Supplied</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Rewards</TableHead>
              <TableHead className='flex-grow text-right whitespace-nowrap'>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {positionsV2.map((position, index) => (
              <React.Fragment key={index}>
                <TableRow className="hover:bg-zinc-800">
                  <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
                    {`${position.token0.symbol} + ${position.token1.symbol}`}
                  </TableCell>
                  <TableCell className='flex-grow text-right whitespace-nowrap'></TableCell>
                  <TableCell className='flex-grow text-right whitespace-nowrap'>
                    {position.tokensOwed0} {position.token0.symbol}
                  </TableCell>
                  <TableCell className='flex-grow text-right whitespace-nowrap'>
                    {position.liquidity}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-zinc-800">
                  <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'></TableCell>
                  <TableCell className='flex-grow text-right whitespace-nowrap'></TableCell>
                  <TableCell className='flex-grow text-right whitespace-nowrap'>
                    {position.tokensOwed1} {position.token1.symbol}
                  </TableCell>
                  <TableCell className='flex-grow text-right whitespace-nowrap'></TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default LiquidityPoolV2
*/
