import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'
import getLpTokenData from '@/app/services/getLpTokenData'
import getTokenIcon from '@/app/services/getTokenIcon'
import type { Token } from '../page'
import CollectionAvatar from '@/app/components/collections/CollectionAvatar'
import type { LpTokenData } from '@/app/services/getLpTokenData'

// Define a new type that extends LpTokenData with the balance property
type LpTokenDataWithBalance = LpTokenData & { balance: number }

async function fetchLpTokensData (tokenHoldings: Token[]): Promise<LpTokenDataWithBalance[]> {
  const lpTokensData = await Promise.all(
    tokenHoldings.map(async (token) => {
      const data = await getLpTokenData(token.token_id)
      return data !== null ? { ...data, balance: token.balance } : null
    })
  )
  return lpTokensData.filter((token): token is LpTokenDataWithBalance => token !== null)
}

interface LiquidityPoolV1Props {
  tokenHoldings: Token[]
  accountId: string
}

const LiquidityPoolV1: React.FC<LiquidityPoolV1Props> = async ({ tokenHoldings }) => {
  const ssLPTokens = await fetchLpTokensData(tokenHoldings)

  return (
    <div className="bg-neutral-950 mx-4 mb-8">
      <h3 className='text-lg mb-2 ml-4'>
          V1 Pools
      </h3>
      <div className='justify-center items-center text-center pb-8'>
        {ssLPTokens.map(async (token, index) => {
          const poolValue = Number(token.balance) * Number(token.lpToken.priceUsd) * 1e-8
          const amountTokenA = poolValue * 0.5 / token.tokenA.priceUsd
          const amountTokenB = poolValue * 0.5 / token.tokenB.priceUsd
          const iconTokenA = await getTokenIcon(token.tokenA.id)
          const iconTokenB = await getTokenIcon(token.tokenB.id)

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
                      {token.lpToken.symbol.replace(' - ', ' + ')}
                    </TableCell>
                    <TableCell className='flex-grow text-right whitespace-nowrap'>
                      <div className='flex flex-row justify-end items-center'>
                        <CollectionAvatar url={iconTokenA ?? '/NotFound.png'} />
                        <span className='ml-2'>{amountTokenA.toFixed(2)} {token.tokenA.symbol}</span>
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
                        <span className='ml-2'>{amountTokenB.toFixed(2)} {token.tokenB.symbol}</span>
                      </div>
                    </TableCell>
                    <TableCell className='flex-grow text-right whitespace-nowrap'></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LiquidityPoolV1
