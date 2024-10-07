import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'
import CollectionAvatar from '@/app/components/collections/CollectionAvatar'
import getTokenIcon from '@/app/services/getTokenIcon'
import SeeMoreFungibleAnalytics from './SeeMoreFungibleAnalytics'
import { classifyAccountTokenBalance } from '../services/classifyAccountTokenBalance'
import { getPricedTokens } from '../services/getPricedTokens'

interface Token {
  token_id: string
  balance: number
}

interface FungibleTokenTableProps {
  accountHoldings: Token[]
  showTopFour?: boolean // Add this prop
  accountId: string
  hbarPrice: number
}

async function FungibleTokenTable ({ accountHoldings, showTopFour, accountId, hbarPrice }: FungibleTokenTableProps) {
  const { tokens } = await classifyAccountTokenBalance(accountHoldings)
  const tokensWithPrice = await getPricedTokens(tokens, hbarPrice)

  const tokenDataPromises = tokensWithPrice.map(async (token) => {
    const iconUrl = await getTokenIcon(token.token_id).catch(() => '/NotFound.png')
    // Add a fallback value of 0 for decimals if it's undefined
    const value = (token.balance * Math.pow(10, -(token.decimals ?? 0)) * (token.priceUsd ?? 0))
    return { ...token, iconUrl, value }
  })

  const tokensWithData = await Promise.all(tokenDataPromises)

  const filteredTokens = tokensWithData
    .sort((a, b) => b.value - a.value)

  const displayTokens = showTopFour === true ? filteredTokens.slice(0, 4) : filteredTokens

  const totalValue = filteredTokens.reduce((acc, token) => acc + token.value, 0)

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center mx-4 pt-8 pb-2'>
        {showTopFour === true
          ? (
          <>
          <h2 className='text-2xl font-bold'>Tokens</h2>
          <span className='text-2xl semibold pl-2'>{`$${totalValue.toFixed(4)}`}</span>
          </>
            )
          : (
          <>
            <h3 className='text-2xl text-muted-foreground'>Total Worth:</h3>
            <span className='text-2xl semibold pl-2'>{`$${totalValue.toFixed(4)}`}</span>
          </>
            )}
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
            {displayTokens.map((token) => (
              <TableRow key={token.token_id} className="hover:bg-zinc-800">
                <TableCell className='flex-1 min-w-[150px] max-w-[150px] text-left whitespace-nowrap'>
                  <div className='flex'>
                    <CollectionAvatar url={token.iconUrl ?? '/NotFound.png'} />
                    <div className='flex flex-col ml-2 overflow-hidden'>
                      <span className='truncate'>{token.name}</span>
                      <span className='text-muted-foreground text-sm truncate'>{token.token_id}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  {(token.balance * Math.pow(10, -(token.decimals ?? 0))).toFixed(4)}
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  {`$${(token.priceUsd ?? 0).toFixed(4)}`}
                </TableCell>
                <TableCell className='flex-grow text-right whitespace-nowrap'>
                  {`$${token.value.toFixed(4)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showTopFour === true && displayTokens.length >= 4 && (
          <div className="mt-4 text-center">
           <SeeMoreFungibleAnalytics accountId={accountId}/>
          </div>
        )}
      </div>
    </section>
  )
}

export default FungibleTokenTable
