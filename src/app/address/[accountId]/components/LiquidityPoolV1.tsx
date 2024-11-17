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

interface TokenData {
  decimals: number
  icon?: string
  id: string
  name: string
  price: string
  priceUsd: number
  symbol: string
  dueDiligenceComplete: boolean
  isFeeOnTransferToken: boolean
  description: string
  website: string
  sentinelReport: string | null
  twitterHandle: string
  timestampSecondsLastListingChange: number
}

interface LpTokenData {
  id: string
  name: string
  symbol: string
  priceUsd: string
  decimals: number
}

interface LpTokensData {
  id: number
  contractId: string
  lpToken: LpTokenData
  lpTokenReserve: string
  tokenA: TokenData
  tokenReserveA: string
  tokenB: TokenData
  tokenReserveB: string
}

interface DefiToken {
  token_id: string
  name: string
  symbol: string
  type: string
  balance: number
  decimals: number
  lpTokensData: LpTokensData | undefined
}

interface LiquidityPoolV1Props {
  defi: DefiToken[]
}

const LiquidityPoolV1: React.FC<LiquidityPoolV1Props> = async ({ defi }) => {
  return (
    <div className="bg-neutral-950 mx-4">
      <h3 className='text-lg mb-2 ml-4'>
          V1 Pools
      </h3>
      <div className='justify-center items-center text-center pb-8'>
        {defi.length === 0
          ? (
          <div className="rounded-2xl bg-neutral-800 p-4">
            <p>No pools found</p>
          </div>
            )
          : (
              defi.map(async (token, index) => {
                if (token.lpTokensData === null || token.lpTokensData === undefined) {
                  return null
                }

                const poolValue = Number(token.balance) * Number(token.lpTokensData.lpToken.priceUsd) * 1e-8
                const amountTokenA = poolValue * 0.5 / token.lpTokensData.tokenA.priceUsd
                const amountTokenB = poolValue * 0.5 / token.lpTokensData.tokenB.priceUsd
                const iconTokenA = await getTokenIcon(token.lpTokensData.tokenA.id)
                const iconTokenB = await getTokenIcon(token.lpTokensData.tokenB.id)

                return (
              <div key={index} className="rounded-2xl bg-neutral-800 p-2 mb-4">
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
                        {token.symbol.replace(' - ', ' + ')}
                      </TableCell>
                      <TableCell className='flex-grow text-right whitespace-nowrap'>
                        <div className='flex flex-row justify-end items-center'>
                          <CollectionAvatar url={iconTokenA ?? '/NotFound.png'} />
                          <span className='ml-2'>{amountTokenA.toFixed(2)} {token.lpTokensData?.tokenA.symbol}</span>
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
                          <span className='ml-2'>{amountTokenB.toFixed(2)} {token.lpTokensData?.tokenB.symbol}</span>
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

export default LiquidityPoolV1
