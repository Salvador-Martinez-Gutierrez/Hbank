'use client'
import Image from 'next/image'
import SerialBadge from './Badge'
import type { NormalizedItem } from './TabNav'
import buyNFT from '@/app/collections/services/buyNft'
import { useState, useCallback } from 'react'
import LoginModal from '@/app/components/LoginModal'
import AssociateTokenModal from './AssociateTokenModal'
import { useWallet, useBalance } from '@buidlerlabs/hashgraph-react-wallets'
import ExecutePurchaseModal from './ExecutePurchaseModal'
import InsufficientFundsModal from './InsufficientFundsModal'
import SuccessfulPurchaseModal from './SuccessfulPurchaseModal'
import ManageNftModal from '@/app/address/[accountId]/nft-analytics/[tokenId]/components/ManageNftModal'

interface NftCardProps {
  token: NormalizedItem
  tokenId: string
  isTokenAssociated: boolean | null
  accountId: string | null
  isOwner: boolean
  royalty: number
}

interface PurchaseResult {
  success: boolean
  transBase64?: {
    data: Uint8Array
  }
  saleVerificationCode?: string
}

const NftCard: React.FC<NftCardProps> = ({ token, tokenId, isTokenAssociated, accountId, isOwner, royalty }) => {
  const { isConnected } = useWallet()
  const { data: balance } = useBalance()
  const [isInsufficientFundsModalOpen, setIsInsufficientFundsModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false)
  const [isExecutePurchaseModalOpen, setIsExecutePurchaseModalOpen] = useState(false)
  const [isSuccessfulPurchaseModal, setIsSuccessfulPurchaseModal] = useState(false)
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResult | null>(null)
  const [isPurchased, setIsPurchased] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)

  const handleBuyClick = async () => {
    if (token.marketplace === 'Sentx') {
      if (!isConnected) {
        setIsLoginModalOpen(true)
      } else if (isTokenAssociated === false) {
        setIsAssociateModalOpen(true)
      } else {
        await executePurchase()
      }
    } else if (token.marketplace === 'Kabila') {
      // Existing Kabila logic
      const modifiedTokenId = tokenId.slice(4)
      window.open(`https://market.kabila.app/en/collections/${modifiedTokenId}`, '_blank')
    }
  }

  const executePurchase = async () => {
    if (balance?.value > token.price && accountId !== null) {
      try {
        const result: PurchaseResult = await buyNFT(tokenId, token.serialNumber, accountId, token.price)
        setPurchaseResult(result)
        setIsExecutePurchaseModalOpen(true)
      } catch (error) {
        console.error('Error buying NFT:', error)
      }
    } else {
      setIsInsufficientFundsModalOpen(true)
    }
  }

  const handleAssociateSuccess = (isBalanceSufficient: boolean) => {
    if (isBalanceSufficient) {
      executePurchase()
    } else {
      setIsInsufficientFundsModalOpen(true)
    }
  }

  const handlePurchaseSuccess = useCallback(() => {
    setIsPurchased(true)
    setIsSuccessfulPurchaseModal(true)
  }, [])

  const handleUnlistSuccess = useCallback(() => {
    setIsPurchased(true)
  }, [])

  const handleUpdateSuccess = useCallback((price: number) => {
    token.price = price
  }, [])

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

  const handleButtonClick = () => {
    if (isOwner) {
      setIsManageModalOpen(true)
    } else {
      handleBuyClick()
    }
  }

  return (
    <>
      {!isPurchased && (
        <div className='overflow-hidden rounded-xl bg-card text-card-foreground shadow-md group relative flex cursor-pointer flex-col shadow-custom'>
          <div className='relative w-full pb-[100%]'>
            <Image
              src={imageUrl}
              alt={token.name}
              width={100}
              height={100}
              className='absolute top-0 left-0 w-full h-full object-cover'
            />
            <div className='absolute top-1 right-1 z-20 w-8 h-8 rounded-full overflow-hidden shadow-md'>
              <Image
                src={marketUrl}
                alt={token.marketplace}
                width={32}
                height={32}
                className='w-full h-full object-cover'
              />
            </div>
          </div>
          <div className='p-2'>
            <div className='flex justify-between text-sm'>
              <SerialBadge serialId={token.serialNumber}/>
              <span className='text-base'>{`${token.price} ℏ`}</span>
            </div>
          </div>
          <button
            onClick={handleButtonClick}
            className={`h-8 mx-1 mb-1 text-white rounded-lg ${
              isOwner
                ? ('bg-blue-500')
                : ('bg-green-500')
            }`}
          >
            {isOwner
              ? ('Manage Listing')
              : ('Buy')
            }
          </button>
        </div>
      )}

      {isLoginModalOpen && (
        <LoginModal onClose={() => { setIsLoginModalOpen(false) }} />
      )}

      {isAssociateModalOpen && (
        <AssociateTokenModal
          onClose={() => { setIsAssociateModalOpen(false) }}
          tokenId={tokenId}
          onSuccess={handleAssociateSuccess}
          price={token.price}
        />
      )}

      {isExecutePurchaseModalOpen && (
        <ExecutePurchaseModal
          onClose={() => { setIsExecutePurchaseModalOpen(false) }}
          result={purchaseResult}
          onSuccess={handlePurchaseSuccess}
        />
      )}

      {isInsufficientFundsModalOpen && (
        <InsufficientFundsModal
          onClose={() => { setIsInsufficientFundsModalOpen(false) }}
          requiredAmount={token.price}
        />
      )}

      {isSuccessfulPurchaseModal && (
        <SuccessfulPurchaseModal
          onClose={() => { setIsSuccessfulPurchaseModal(false) }}
        />
      )}

      {isManageModalOpen && (
        <ManageNftModal
          onClose={() => { setIsManageModalOpen(false) }}
          onUnlistSucces={handleUnlistSuccess}
          onUpdateSuccess={handleUpdateSuccess}
          token={{
            ...token,
            imageUrl,
            serial_number: token.serialNumber,
            isListed: true
          }}
          tokenId={tokenId}
          connectedAccountId={accountId}
          royalty={royalty}
        />
      )}
    </>
  )
}

export default NftCard
