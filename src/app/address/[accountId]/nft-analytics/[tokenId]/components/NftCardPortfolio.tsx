'use client'
import Image from 'next/image'
import SerialBadge from '@/app/collections/[tokenId]/components/Badge'
import buyNFT from '@/app/collections/services/buyNft'
import { useState, useCallback } from 'react'
import LoginModal from '@/app/components/LoginModal'
import AssociateTokenModal from '@/app/collections/[tokenId]/components/AssociateTokenModal'
import { useWallet, useBalance } from '@buidlerlabs/hashgraph-react-wallets'
import ExecutePurchaseModal from '@/app/collections/[tokenId]/components/ExecutePurchaseModal'
import InsufficientFundsModal from '@/app/collections/[tokenId]/components/InsufficientFundsModal'
import SuccessfulPurchaseModal from '@/app/collections/[tokenId]/components/SuccessfulPurchaseModal'
import ListNftModal from './ListNftModal'
import SuccessfulListModal from './SuccessfulListModal'
import ManageNftModal from './ManageNftModal'

interface ExtendedNFT {
  name: string
  imageUrl: string
  serial_number: string
  isListed: boolean
  price?: string | number
  listingId?: number | string
  marketplace?: string
}

interface NftCardPortfolioProps {
  token: ExtendedNFT
  tokenId: string
  isTokenAssociated: boolean | null
  connectedAccountId: string | null
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

const NftCardPortfolio: React.FC<NftCardPortfolioProps> = ({ token, tokenId, connectedAccountId, isOwner, isTokenAssociated, royalty }) => {
  const { isConnected } = useWallet()
  const { data: balance } = useBalance()
  const [isInsufficientFundsModalOpen, setIsInsufficientFundsModalOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false)
  const [isExecutePurchaseModalOpen, setIsExecutePurchaseModalOpen] = useState(false)
  const [isSuccessfulPurchaseModal, setIsSuccessfulPurchaseModal] = useState(false)
  const [isSuccessfulListModal, setIsSuccessfulListModal] = useState(false)
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResult | null>(null)
  const [isListModalOpen, setIsListModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [localToken, setLocalToken] = useState(token)
  const [isPurchased, setIsPurchased] = useState(false)

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
    if (token.price !== undefined && balance.value > token.price && connectedAccountId !== null) {
      try {
        const result: PurchaseResult = await buyNFT(tokenId, token.serial_number, connectedAccountId, token.price)
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

  const handleListSuccess = useCallback((price: number) => {
    setLocalToken(prevToken => ({
      ...prevToken,
      isListed: true,
      price,
      marketplace: 'Sentx'
    }))
    setIsSuccessfulListModal(true)
  }, [])

  const handleUnlistSuccess = useCallback(() => {
    setLocalToken(prevToken => ({
      ...prevToken,
      isListed: false,
      price: undefined,
      marketplace: undefined
    }))
  }, [])

  const handleUpdateSuccess = useCallback((price: number) => {
    setLocalToken(prevToken => ({
      ...prevToken,
      price,
      marketplace: 'Sentx'
    }))
  }, [])

  // Determine the URL for the NFT Image based on the imageCid format
  let imageUrl = '/path/to/default/image.jpg'

  if (typeof token.imageUrl === 'string') {
    if (token.imageUrl.startsWith('ipfs://')) {
      imageUrl = `https://cyan-certain-partridge-419.mypinata.cloud/ipfs/${token.imageUrl.replace('ipfs://', '')}?pinataGatewayToken=CpSGmN7ulVRyThI-BuiHKuSCJSH9bFSxuVW2lXNac1d895Eeb2vHACSgKPD84Inq`
    } else if (token.imageUrl.startsWith('ar://')) {
      imageUrl = `https://arweave.net/${token.imageUrl.replace('ar://', '')}`
    } else if (token.imageUrl.startsWith('hcs://')) {
      imageUrl = '/path/to/default/hcs/image.jpg'
    }
  }

  const marketUrl = token.marketplace === 'Kabila' ? '/KabilaLogo.jpg' : '/SentxLogo.png'

  const handleButtonClick = () => {
    if (isOwner) {
      if (localToken.isListed) {
        setIsManageModalOpen(true)
      } else {
        setIsListModalOpen(true)
      }
    } else {
      if (localToken.isListed) {
        handleBuyClick()
      }
    }
  }

  return (
    <>
      {!isPurchased && (
        <div className='overflow-hidden rounded-xl bg-card text-card-foreground shadow-md group relative flex cursor-pointer flex-col shadow-custom'>
          <div className='relative w-full pb-[100%]'>
            {localToken.isListed && localToken.marketplace !== undefined && (
              <div className='absolute top-1 right-1 z-10 w-8 h-8 rounded-full overflow-hidden'>
                <Image
                  src={marketUrl}
                  alt={localToken.marketplace}
                  width={100}
                  height={100}
                  className='w-full h-auto'
                />
              </div>
            )}
            <Image
              src={imageUrl}
              alt={localToken.name}
              fill
              className='absolute top-0 left-0 w-full h-full object-cover'
            />
          </div>
          <div className='p-2'>
            <div className='flex justify-between text-sm'>
              <SerialBadge serialId={localToken.serial_number}/>
              {localToken.isListed && <span className='text-base font-semibold'>{`${localToken.price} ℏ`}</span>}
            </div>
          </div>
          <button
            onClick={handleButtonClick}
            className={`h-8 mx-1 mb-1 text-white rounded-lg ${
              isOwner
                ? ('bg-blue-500')
                : (localToken.isListed ? 'bg-green-500' : 'bg-gray-500')
            }`}
          >
            {isOwner
              ? (localToken.isListed ? 'Manage Listing' : 'List')
              : (localToken.isListed ? 'Buy' : 'Unlisted')}
          </button>
        </div>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => { setIsLoginModalOpen(false) }}
      />
      <AssociateTokenModal
        isOpen={isAssociateModalOpen}
        onClose={() => { setIsAssociateModalOpen(false) }}
        tokenId={tokenId}
        onSuccess={handleAssociateSuccess}
        price={token.price}
      />
      <ExecutePurchaseModal
        isOpen={isExecutePurchaseModalOpen}
        onClose={() => { setIsExecutePurchaseModalOpen(false) }}
        result={purchaseResult}
        onSuccess={handlePurchaseSuccess}
      />
      <InsufficientFundsModal
        isOpen={isInsufficientFundsModalOpen}
        onClose={() => { setIsInsufficientFundsModalOpen(false) }}
        requiredAmount={token.price}
      />
      <SuccessfulPurchaseModal
        isOpen={isSuccessfulPurchaseModal}
        onClose={() => { setIsSuccessfulPurchaseModal(false) }}
      />
      <ListNftModal
        isOpen={isListModalOpen}
        onClose={() => { setIsListModalOpen(false) }}
        connectedAccountId={connectedAccountId}
        token={localToken}
        tokenId={tokenId}
        onSuccess={handleListSuccess}
        royalty={royalty}
      />
      <SuccessfulListModal
        isOpen={isSuccessfulListModal}
        onClose={() => { setIsSuccessfulListModal(false) }}
      />
      <ManageNftModal
        isOpen={isManageModalOpen}
        onClose={() => { setIsManageModalOpen(false) }}
        onUnlistSucces={handleUnlistSuccess}
        onUpdateSuccess={handleUpdateSuccess}
        token={localToken}
        tokenId={tokenId}
        connectedAccountId={connectedAccountId}
        royalty={royalty}
      />
    </>
  )
}

export default NftCardPortfolio
