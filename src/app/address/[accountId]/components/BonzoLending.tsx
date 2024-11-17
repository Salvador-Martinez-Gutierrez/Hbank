import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'
import getTokenIcon from '@/app/services/getTokenIcon'
import CollectionAvatar from '@/app/components/collections/CollectionAvatar'
import type { LendingData } from '../services/getBonzoLendingData'

interface BonzoLendingProps {
  lendingData: LendingData | undefined
}

const BonzoLending: React.FC<BonzoLendingProps> = ({ lendingData }) => {
  return (
    <div className="bg-neutral-950 mx-4">
      <h3 className='text-lg mb-2 ml-4'>
        Lending
      </h3>
      <div className='justify-center items-center text-center pb-8'>
        {lendingData === undefined || lendingData?.positions.length === 0
          ? (
          <div className="rounded-2xl bg-neutral-800 p-4">
            <p>No pools found</p>
          </div>
            )
          : (
          <div className="rounded-2xl bg-neutral-800 p-2">
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-neutral-800'>
                  <TableHead className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>Pool</TableHead>
                  <TableHead className='flex-grow text-right whitespace-nowrap'>APY</TableHead>
                  <TableHead className='flex-grow text-right whitespace-nowrap'>Supplied</TableHead>
                  <TableHead className='flex-grow text-right whitespace-nowrap'>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lendingData.positions.map(async (position, index) => {
                  const tokenIcon = await getTokenIcon(position.tokenId)
                  return (
                    <TableRow key={index} className="hover:bg-neutral-800">
                      <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
                        <div className="flex items-center gap-2">
                          {position.asset}
                        </div>
                      </TableCell>
                      <TableCell className='flex-grow text-right whitespace-nowrap'>
                        {Number(position.apy).toFixed(2)}%
                      </TableCell>
                      <TableCell className='flex-grow text-right whitespace-nowrap'>
                        <div className="flex items-center justify-end gap-2">
                          <CollectionAvatar url={tokenIcon ?? '/NotFound.png'}/>
                          {Number(position.tokenAmount).toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell className='flex-grow text-right whitespace-nowrap'>
                        ${Number(position.valueUsd).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
            )}
      </div>
    </div>
  )
}

export default BonzoLending
