import React from 'react'
import Image from 'next/image'
import type { Token } from '../page'
import SeeMoreNftAnalytics from './SeeMoreNftAnalytics'
import getNftMetadata from '../../../services/mirror-node/getNftMetadata'
import getNftImageCid from '@/app/services/mirror-node/getNftImageCid'

interface NonFungibleTokenGalleryProps {
  tokenHoldingsExtended: Token[]
  showTopFour?: boolean
  accountId: string // Add this prop
}

const NonFungibleTokenGallery: React.FC<NonFungibleTokenGalleryProps> = async ({ tokenHoldingsExtended, showTopFour, accountId }) => {
  const filteredTokens = tokenHoldingsExtended
    .filter(token => typeof token.price !== 'undefined' && token.price > 0 && token.type === 'NON_FUNGIBLE_UNIQUE')
    .sort((a, b) => (b.balance * (b.price ?? 0)) - (a.balance * (a.price ?? 0)))

  const displayTokens = showTopFour === true ? filteredTokens.slice(0, 4) : filteredTokens
  console.log('TOKENS', displayTokens)

  const totalValue = filteredTokens.reduce((acc, token) => acc + (token.balance * (token.price ?? 0)), 0)

  return (
    <section className="bg-neutral-950 rounded-2xl mx-4 lg:mx-8 xl:mx-16 mb-8">
      <div className='flex justify-start items-center pt-8 pb-2 mx-4'>
        {showTopFour === true
          ? (
          <>
          <h2 className='text-2xl font-bold'>NFTs</h2>
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
      <div className={`${showTopFour === true ? 'flex overflow-x-auto' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 p-4`}>
        {displayTokens.map(async (token) => {
          const metadata: string = await getNftMetadata(accountId, token.token_id)
          console.log('Metadata', metadata)
          let decodedMetadata = atob(metadata)
          console.log('DecodedMetadata', decodedMetadata)

          if (decodedMetadata.startsWith('ipfs://')) {
            decodedMetadata = `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${decodedMetadata.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
          } else if (decodedMetadata.startsWith('ar://')) {
            decodedMetadata = `https://arweave.net/${decodedMetadata.replace('ar://', '')}`
          }

          const imageCid = await getNftImageCid(decodedMetadata)
          // Determine the URL for the NFT Image based on the imageCid format
          let imageUrl = '/path/to/default/image.jpg' // Default image

          if (typeof imageCid === 'string') {
            if (imageCid.startsWith('ipfs://')) {
              imageUrl = `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${imageCid.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
            } else if (imageCid.startsWith('ar://')) {
              imageUrl = `https://arweave.net/${imageCid.replace('ar://', '')}`
            } else if (imageCid.startsWith('hcs://')) {
              // Handle hcs:// URLs if possible; otherwise, use a default image or handle accordingly
              imageUrl = '/path/to/default/hcs/image.jpg'
            }
          }

          console.log('URL', imageUrl)

          return (
            <div key={token.token_id} className={`bg-zinc-800 rounded-lg p-4 flex flex-col ${showTopFour === true ? 'min-w-[270px] mr-4' : ''}`}>
              <div className="relative w-full aspect-square mb-2">
                <Image
                  src={imageUrl}
                  alt={token.name !== null && token.name !== undefined && token.name.trim() !== '' ? token.name : `NFT ${token.token_id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="mt-auto">
                <h3 className="text-lg font-semibold truncate">{token.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{token.token_id}</p>
                <p className="text-sm">Balance: {token.balance.toFixed(0)}</p>
                <p className="text-sm">Price: ${(token.price ?? 0).toFixed(4)}</p>
                <p className="text-sm font-semibold">Value: ${(token.balance * (token.price ?? 0)).toFixed(4)}</p>
              </div>
            </div>
          )
        })}
      </div>
      {showTopFour === true && displayTokens.length >= 4 && (
        <div className="mt-4 text-center pb-8">
          <SeeMoreNftAnalytics accountId={accountId} />
        </div>
      )}
    </section>
  )
}

export default NonFungibleTokenGallery
