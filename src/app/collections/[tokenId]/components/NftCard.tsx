'use client'
import Image from 'next/image'
import SerialBadge from './Badge'
import type { normalizedItem } from './TabNav'
import buyNFT from '@/app/collections/services/buyNft'
import { useState, useEffect } from 'react'
import LoginModal from '@/app/components/LoginModal'
import AssociateTokenModal from './AssociateTokenModal'
import { useAccountId, useWallet, useBalance } from '@buidlerlabs/hashgraph-react-wallets'
import ExecutePurchaseModal from './ExecutePurchaseModal'

interface NftCardProps {
  token: normalizedItem
  tokenId: string
  isTokenAssociated: boolean | null
}

const NftCard: React.FC<NftCardProps> = ({ token, tokenId, isTokenAssociated }) => {
  const [status, setStatus] = useState<string | null>(null)
  const { data: accountId }: { data: string } = useAccountId()
  const { isConnected } = useWallet()
  const { data: balance } = useBalance()
  const [purchaseResult, setPurchaseResult] = useState()

  useEffect(() => {
    setStatus(`Account: ${accountId}`)
  }, [accountId])

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false)
  const [isExecutePurchaseModalOpen, setIsExecutePurchaseModalOpen] = useState(false)

  const handleBuyClick = async () => {
    if (token.marketplace === 'Sentx') {
      if (!isConnected) {
        setIsLoginModalOpen(true)
      } else if (isTokenAssociated === false) {
        setIsAssociateModalOpen(true)
      } else {
        if (balance.value > token.price) {
          setStatus('Token is associated and balance is sufficient. Initiating purchase...')
          try {
            const result = await buyNFT(tokenId, token.serialNumber, accountId, token.price)
            setPurchaseResult(result)
            setIsExecutePurchaseModalOpen(true)
          } catch (error) {
            console.error('Error buying NFT:', error)
            setStatus('Error occurred while preparing purchase. Please try again.')
          }
        } else {
          setStatus(`Insufficient balance: ${balance.value}. You need ${token.price} ℏ to make this purchase.`)
        }
      }
    } else if (token.marketplace === 'Kabila') {
      // Existing Kabila logic
      const modifiedTokenId = tokenId.slice(4)
      window.open(`https://market.kabila.app/en/collections/${modifiedTokenId}`, '_blank')
    }
  }

  // Determine the URL for the NFT Image based on the imageCid format
  let imageUrl = '/path/to/default/image.jpg' // Default image

  if (token.imageCid.startsWith('ipfs://')) {
    imageUrl = `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${token.imageCid.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
  } else if (token.imageCid.startsWith('ar://')) {
    imageUrl = `https://arweave.net/${token.imageCid.replace('ar://', '')}`
  } else if (token.imageCid.startsWith('hcs://')) {
    // Handle hcs:// URLs if possible; otherwise, use a default image or handle accordingly
    imageUrl = '/path/to/default/hcs/image.jpg'
  }

  const marketUrl = token.marketplace === 'Kabila' ? '/KabilaLogo.jpg' : '/SentxLogo.png'

  return (
    <>
      <div className='overflow-hidden rounded-xl bg-card text-card-foreground shadow-md group relative flex cursor-pointer flex-col shadow-custom'>
        <div className='relative'>
          <div className='absolute top-1 right-1 z-1 w-8 h-8 rounded-full overflow-hidden'>
            <Image
              src={marketUrl}
              alt={token.marketplace}
              width={100}
              height={100}
              className='w-full h-auto overflow-hidden'
            />
          </div>
          <Image
            src={imageUrl}
            alt={token.name}
            width={100}
            height={100}
            className='w-full h-auto overflow-hidden'
          />
        </div>
        <div className='p-2'>
          <div className='flex justify-between text-sm'>
            <SerialBadge serialId={token.serialNumber}/>
            <span className='text-base'>{`${token.price} ℏ`}</span>
          </div>
        </div>
        <button
          className='h-8 mx-1 mb-1 bg-green-500 text-white rounded-lg'
          onClick={handleBuyClick}
        >
          Buy
        </button>
          <div className='p-2 mt-2 bg-gray-100 rounded'>
            <p>{status}</p>
          </div>
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => { setIsLoginModalOpen(false) }}
      />
      <AssociateTokenModal
        isOpen={isAssociateModalOpen}
        onClose={() => { setIsAssociateModalOpen(false) }}
        tokenId={tokenId}
      />
      <ExecutePurchaseModal
        isOpen={isExecutePurchaseModalOpen}
        onClose={() => { setIsExecutePurchaseModalOpen(false) }}
        result={purchaseResult}
      />
    </>
  )
}

export default NftCard
