import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'
import fetchPoolId from '@/app/services/saucer/fetchPoolId'
import getLpTokenDataByPoolId from '@/app/services/saucer/getLpTokenDataByPoolId'
import CollectionAvatar from '@/app/components/collections/CollectionAvatar'
import getTokenIcon from '@/app/services/getTokenIcon'

interface farmToken {
  id: number
  timestamp: string
  total: string
}

interface LiquidityFarmsV1Props {
  farms: farmToken[]
}

const LiquidityFarmsV1: React.FC<LiquidityFarmsV1Props> = async ({ farms }) => {
  return (
    <div className="bg-neutral-950 mx-4 mb-8">
      <h3 className='text-lg ml-4 mb-2'>
        V1 Farms
      </h3>
      <div className='justify-center items-center text-center pb-8'>
        {farms.length === 0
          ? (
          <div className="rounded-2xl bg-neutral-800 p-4">
            <p>No farms found</p>
          </div>
            )
          : (
              farms.map(async (farm, index) => {
                const poolId = await fetchPoolId(farm.id)
                const lpData = await getLpTokenDataByPoolId(poolId)
                const poolValue = Number(farm.total) * Number(lpData.lpToken.priceUsd) * 1e-8
                const amountTokenA = poolValue * 0.5 / Number(lpData.tokenA.priceUsd)
                const amountTokenB = poolValue * 0.5 / Number(lpData.tokenB.priceUsd)
                const iconTokenA = await getTokenIcon(lpData.tokenA.id)
                const iconTokenB = await getTokenIcon(lpData.tokenB.id)

                return (
              <div key={index} className="rounded-2xl bg-neutral-800 p-2">
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
                        {lpData.lpToken.symbol.replace(' - ', ' + ')}
                      </TableCell>
                      <TableCell className='flex-grow text-right whitespace-nowrap'>
                        <div className='flex flex-row justify-end items-center'>
                          <CollectionAvatar url={iconTokenA ?? '/NotFound.png'} />
                          <span className='ml-2'>{amountTokenA.toFixed(2)} {lpData.tokenA.symbol}</span>
                        </div>
                      </TableCell>
                      <TableCell className='flex-grow text-right whitespace-nowrap'>
                        ${poolValue.toFixed(3)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-neutral-800">
                      <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'></TableCell>
                      <TableCell className='flex-grow text-right whitespace-nowrap'>
                        <div className='flex flex-row justify-end items-center'>
                          <CollectionAvatar url={iconTokenB ?? '/NotFound.png'} />
                          <span className='ml-2'>{amountTokenB.toFixed(2)} {lpData.tokenB.symbol}</span>
                        </div>
                      </TableCell>
                      <TableCell className='flex-grow text-right whitespace-nowrap'></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
                )
              })
            )}
      </div>
    </div>
  )
}

export default LiquidityFarmsV1
