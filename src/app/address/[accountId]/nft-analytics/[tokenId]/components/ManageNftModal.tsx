'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/app/collections/components/ui/button'
import { Input } from '@/components/ui/input'
import UnlistNftModal from './UnlistNftModal'
import SuccessfulUnlistModal from './SuccessfulUnlistModal'
import unlistNFT from '@/app/collections/services/unlistNFT'
import listNFT from '@/app/collections/services/listNft'
import { useWallet, useWatchTransactionReceipt } from '@buidlerlabs/hashgraph-react-wallets'
import { Transaction } from '@hashgraph/sdk'
import type { Signer } from '@hashgraph/sdk'
import SuccessfulUpdateModal from './SuccessfulUpdateModal'

async function confirmListingToMarketProvider (saleVerificationCode: string) {
  console.log('Executing confirmListingToMarketProvider')
  const response = await fetch('/api/listNftSuccess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      saleVerificationCode
    })
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

interface ExtendedNFT {
  name: string
  imageUrl: string
  serial_number: string
  isListed: boolean
  price?: string | number
  listingId?: number | string
  marketplace?: string
}

interface ManageNftModalProps {
  onClose: () => void
  onUnlistSucces: () => void
  onUpdateSuccess: (price: number) => void
  token: ExtendedNFT
  tokenId: string
  connectedAccountId: string | null
  royalty: number
}

interface UnlistResult {
  signingAcct: null
  transBytes: {
    type: string
    data: number[]
  }
  receipt: null
  success: boolean
  apimessage: string
  transid: null
  isOwner: boolean
  isGranted: boolean
  requiresAllowanceApprove: boolean
  saleVerificationCode: string
  spender: string
  requiresPingBack: boolean
}

interface ListResult {
  success: boolean
  apimessage: string
  price: string
  user_address: string
  serial_number: string
  token_address: string
  sentient_db_nftid: number
  requiresAllowanceApprove: boolean
  requiresPingBack: boolean
  spender: string
  saleVerificationCode: string
  memo: string
  transBytes: {
    type: string
    data: number[]
  }
}

const ManageNftModal: React.FC<ManageNftModalProps> = ({ onClose, onUnlistSucces, onUpdateSuccess, token, royalty, tokenId, connectedAccountId }) => {
  const [unlistResult, setUnlistResult] = useState<UnlistResult | null>(null)
  const [isUnlistModalOpen, setIsUnlistModalOpen] = useState(false)
  const [isSuccessfulUnlistModal, setIsSuccessfulUnlistModal] = useState(false)
  const [isSuccessfulUpdateModal, setIsSuccessfulUpdateModal] = useState(false)
  const [price, setPrice] = useState(token.price?.toString())
  const [fees, setFees] = useState<{ royalties: number, marketFee: number, youReceive: number } | null>(null)
  const [isPriceChanged, setIsPriceChanged] = useState(false)
  const [isExecuting, setIsExecuting] = useState(false)
  const wallet = useWallet()
  const signer = wallet.signer as Signer
  const { watch } = useWatchTransactionReceipt()

  const handleUnlistClick = async () => {
    if (token.marketplace === 'Sentx') {
      await executeUnlist()
    } else if (token.marketplace === 'Kabila') {
      // Existing Kabila logic
      const modifiedTokenId = tokenId.slice(4)
      window.open(`https://market.kabila.app/en/collections/${modifiedTokenId}`, '_blank')
    }
  }

  const executeUnlist = async () => {
    // Check sufficient hbar for fees
    if (connectedAccountId !== null) {
      try {
        const result: UnlistResult = await unlistNFT(tokenId, token.serial_number, connectedAccountId)
        setUnlistResult(result)
        setIsUnlistModalOpen(true)
      } catch (error) {
        console.error('Error unlisting NFT:', error)
      }
    }
  }

  const handleUnlistSuccess = () => {
    onClose()
    onUnlistSucces()
    setIsSuccessfulUnlistModal(true)
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (Number(value) > 0 && !isNaN(Number(value)))) {
      setPrice(value)
      setIsPriceChanged(value !== token.price?.toString())
      if (value !== '') {
        const numericPrice = Number(value)
        const royalties = numericPrice * royalty
        const marketFee = numericPrice * 0.02
        const youReceive = numericPrice - royalties - marketFee
        setFees({ royalties, marketFee, youReceive })
      } else {
        setFees(null)
      }
    }
  }

  const handleUpdateListing = async () => {
    if (price !== undefined && Number(price) > 0 && connectedAccountId !== null) {
      setIsExecuting(true)
      try {
        const result: ListResult = await listNFT(tokenId, token.serial_number, connectedAccountId, price)
        if (result !== null && result.success) {
          try {
            const transactionString = Buffer.from(result.transBytes.data).toString('base64')
            console.log('Transaction string:', transactionString)

            // Decode the transaction
            const transaction = Transaction.fromBytes(Buffer.from(transactionString, 'base64'))
            console.log('Transaction decoded successfully', transaction)

            const transactionResponse = await transaction.executeWithSigner(signer)

            watch(transactionResponse.transactionId.toString(), {
              onSuccess: (transaction) => {
                console.log('Transaction confirmed successful')
                console.log('Sale verification code:', result.saleVerificationCode)

                if (result.saleVerificationCode !== undefined) {
                  console.log('Attempting to confirm listing with code:', result.saleVerificationCode)
                  const confirmationResult = confirmListingToMarketProvider(result.saleVerificationCode)
                  console.log('Listing confirmation result OG:', confirmationResult)
                } else {
                  console.log('No saleVerificationCode provided, skipping confirmation')
                }
                onClose()
                onUpdateSuccess(Number(price))
                setIsSuccessfulUpdateModal(true)
                return transaction
              },
              onError: (transaction, error) => {
                // do stuff
                console.error('Transaction failed.')
                return transaction
              }
            })
          } catch (error) {
            console.error('Error during NFT listing transaction:', error)
          }
        } else {
          console.error('Transaction preparation failed:', result)
        }
      } catch (error) {
        console.error('Error listing NFT:', error)
      }
    }
  }

  return (
    <>
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-neutral-950 items-center w-[90%] sm:max-w-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle className='text-white text-center text-2xl'>
            Manage Listing
          </DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-4 py-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-white mb-1">Update listing price</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white z-10">
                ℏ
              </span>
              <Input
                type="number"
                id="price"
                className="pl-8 pr-4 py-2 bg-neutral-800 text-white"
                value={price}
                onChange={handlePriceChange}
                min="0"
                step="any"
              />
            </div>
          </div>
          {fees !== null && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Collection Royalties ({(royalty * 100).toFixed(2)}%)</span>
                <span>{fees.royalties.toFixed(2)} ℏ</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Market Fee (2.00%)</span>
                <span>{fees.marketFee.toFixed(2)} ℏ</span>
              </div>
              <div className="flex justify-between text-white font-semibold">
                <span>You Receive:</span>
                <span>{fees.youReceive.toFixed(2)} ℏ</span>
              </div>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button
              variant="outline"
              className='h-10 px-6 bg-transparent text-red-500 border border-red-500 rounded-lg hover:bg-red-400 hover:text-white'
              onClick={handleUnlistClick}
            >
              Unlist
            </Button>
            <Button
              className='h-10 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={handleUpdateListing}
              disabled={isExecuting || price === undefined || Number(price) <= 0 || !isPriceChanged}
            >
              {isExecuting ? 'Updating Listing...' : 'Update Listing'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {isUnlistModalOpen && (
      <UnlistNftModal
        onClose={() => { setIsUnlistModalOpen(false) }}
        result={unlistResult}
        onSuccess={handleUnlistSuccess}
      />
    )}

    {isSuccessfulUnlistModal && (
      <SuccessfulUnlistModal
        onClose={() => { setIsSuccessfulUnlistModal(false) }}
      />
    )}

    {isSuccessfulUpdateModal && (
      <SuccessfulUpdateModal
        onClose={() => { setIsSuccessfulUpdateModal(false) }}
      />
    )}
    </>
  )
}

export default ManageNftModal
