'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import SeeMoreNftAnalytics from './SeeMoreNftAnalytics'
import useNftMetadata from '../hooks/useNftMetadata'
import Link from 'next/link'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Tokens {
  token_id: string
  balance: number
  name?: string
  price?: number | null
  priceUsd?: number
  netPrice?: number
  netPriceUsd?: number
  royalties?: number
}

interface NonFungibleTokenGalleryClientProps {
  filteredTokens: Tokens[] // Replace 'any' with the actual token type
  showTopFour: boolean
  accountId: string
  totalValueUsd: number
  totalValue: number
  totalNetValueUsd: number
  totalNetValue: number
}

const NonFungibleTokenGalleryClient: React.FC<NonFungibleTokenGalleryClientProps> = ({ filteredTokens, showTopFour, accountId, totalValueUsd, totalValue, totalNetValueUsd, totalNetValue }) => {
  const [showUsd, setShowUsd] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)
  const [priceCalculation, setPriceCalculation] = useState<'floor' | 'net'>('floor')
  const displayTokens = showTopFour ? filteredTokens.slice(0, 4) : filteredTokens

  const toggleCurrency = () => { setShowUsd(!showUsd) }
  // CHANGE PRICE CALCULATION METHOD
  const togglePriceCalculation = () => {
    setPriceCalculation(prev => prev === 'floor' ? 'net' : 'floor')
  }

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center pt-8 pb-2 mx-4'>
        {showTopFour
          ? (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className='text-2xl font-bold'>NFTs by</h2>
              <Select
                value={priceCalculation}
                onValueChange={(value: 'floor' | 'net') => { togglePriceCalculation() }}
              >
                <SelectTrigger className="w-[140px] bg-zinc-900 border-black">
                  <SelectValue>
                    {priceCalculation === 'floor' ? 'Floor Price' : 'Net Price'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="floor" className="text-white">Floor Price</SelectItem>
                  <SelectItem value="net" className="text-white">Net Floor Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <TooltipProvider>
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <span
                    className='text-2xl semibold pl-2 cursor-pointer transition-colors'
                    onClick={toggleCurrency}
                    onMouseEnter={() => { setShowTooltip(true) }}
                    onMouseLeave={() => { setShowTooltip(false) }}
                  >
                    {showUsd
                      ? `$${(priceCalculation === 'floor' ? totalValueUsd : totalNetValueUsd).toFixed(2)}`
                      : `${(priceCalculation === 'floor' ? totalValue : totalNetValue).toFixed(2)}ℏ`
                    }
                  </span>
                </TooltipTrigger>
                <TooltipContent className='bg-black text-white p-1 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'>
                  <p>{showUsd ? 'View in ℏ' : 'View in $'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
            )
          : (
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className='text-lg text-muted-foreground '>
                  Total Worth by
              </span>
              <Select
                value={priceCalculation}
                onValueChange={(value: 'floor' | 'net') => { togglePriceCalculation() }}
              >
                <SelectTrigger className="w-[140px] bg-zinc-900 border-black">
                  <SelectValue>
                    {priceCalculation === 'floor' ? 'Floor Price' : 'Net Price'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="floor" className="text-white">Floor Price</SelectItem>
                  <SelectItem value="net" className="text-white">Net Floor Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
              <TooltipProvider>
                <Tooltip open={showTooltip}>
                  <TooltipTrigger asChild>
                    <span
                      className='text-2xl font-semibold cursor-pointer transition-colors'
                      onClick={toggleCurrency}
                      onMouseEnter={() => { setShowTooltip(true) }}
                      onMouseLeave={() => { setShowTooltip(false) }}
                    >
                      {showUsd
                        ? `$${(priceCalculation === 'floor' ? totalValueUsd : totalNetValueUsd).toFixed(2)}`
                        : `${(priceCalculation === 'floor' ? totalValue : totalNetValue).toFixed(2)}ℏ`
                      }
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className='bg-black text-white p-1 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'>
                    <p>{showUsd ? 'View in ℏ' : 'View in $'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
          </div>
            )}
      </div>
      <div className={`p-4 ${showTopFour ? 'flex overflow-x-auto gap-4' : 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'}`}>
        {displayTokens.map((token) => {
          const { imageCid, isLoading, error } = useNftMetadata(accountId, token.token_id)
          if (error !== null && error !== undefined) return <div key={token.token_id}>Error loading metadata</div>

          let imageUrl = '/path/to/default/image.jpg'

          if (typeof imageCid === 'string') {
            if (imageCid.startsWith('ipfs://')) {
              imageUrl = `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${imageCid.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
            } else if (imageCid.startsWith('ar://')) {
              imageUrl = `https://arweave.net/${imageCid.replace('ar://', '')}`
            } else if (imageCid.startsWith('hcs://')) {
              imageUrl = '/path/to/default/hcs/image.jpg'
            }
          }

          return (
            <Link
              href={`/address/${accountId}/nft-analytics/${token.token_id}`}
              key={token.token_id}
              className={`bg-zinc-800 rounded-lg p-2 flex flex-col ${showTopFour ? 'min-w-[270px]' : ''} hover:bg-zinc-700 transition-colors duration-200`}
            >
              <div className="relative w-full aspect-square mb-2">
                {isLoading
                  ? (
                  <div className="w-full h-full bg-neutral-700 rounded-lg animate-pulse" />
                    )
                  : (
                  <Image
                    src={imageUrl}
                    alt={token.name !== null && token.name !== undefined && token.name.trim() !== '' ? token.name : `NFT ${token.token_id}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg object-cover"
                  />
                    )}
                <div className="absolute top-1 right-1 z-10 w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{token.balance.toFixed(0)}</span>
                </div>
              </div>
              <div className="mt-auto">
                <h3 className={`font-semibold truncate ${showTopFour ? 'text-sm' : 'text-xs'}`}>{token.name}</h3>
                <p className={`text-muted-foreground truncate mb-2 ${showTopFour ? 'text-xs' : 'text-[0.75rem]'}`}>{token.token_id}</p>
                <div className="bg-zinc-700 rounded-md p-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-zinc-400">
                      {priceCalculation === 'floor' ? 'FP:' : 'Net FP:'}
                    </span>
                    <span className="text-xs font-semibold">
                      {showUsd
                        ? `$${(priceCalculation === 'floor'
                            ? (token.priceUsd ?? 0)
                            : (token.netPriceUsd ?? 0)
                          ).toFixed(2)}`
                        : `${(priceCalculation === 'floor'
                            ? (token.price ?? 0)
                            : (token.netPrice ?? 0)
                          ).toFixed(2)} ℏ`
                      }
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-zinc-400">Total:</span>
                    <span className="text-xs font-semibold">
                      {showUsd
                        ? `$${(token.balance * (priceCalculation === 'floor'
                            ? (token.priceUsd ?? 0)
                            : (token.netPriceUsd ?? 0)
                          )).toFixed(2)}`
                        : `${(token.balance * (priceCalculation === 'floor'
                            ? (token.price ?? 0)
                            : (token.netPrice ?? 0)
                          )).toFixed(2)} ℏ`
                      }
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      {showTopFour && filteredTokens.length > 4 && (
        <div className="mt-4 text-center pb-8">
          <SeeMoreNftAnalytics accountId={accountId} />
        </div>
      )}
    </section>
  )
}

export default NonFungibleTokenGalleryClient
