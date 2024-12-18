'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useWallet, useWatchTransactionReceipt } from '@buidlerlabs/hashgraph-react-wallets'
import { Transaction } from '@hashgraph/sdk'
import type { Signer } from '@hashgraph/sdk'
import listNFT from '@/app/collections/services/listNft'

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

interface ListNftModalProps {
  onClose: () => void
  onSuccess: (price: number) => void
  token: ExtendedNFT
  tokenId: string
  connectedAccountId: string | null
  royalty: number
}

const ListNftModal = ({ onClose, onSuccess, token, tokenId, connectedAccountId, royalty }: ListNftModalProps) => {
  const [price, setPrice] = useState('')
  const [isExecuting, setIsExecuting] = useState(false)
  const [fees, setFees] = useState<{ royalties: number, marketFee: number, youReceive: number } | null>(null)
  const wallet = useWallet()
  const signer = wallet.signer as Signer
  const { watch } = useWatchTransactionReceipt()

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (Number(value) > 0 && !isNaN(Number(value)))) {
      setPrice(value)
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

  const handleListClick = async () => {
    if (Number(price) > 0 && connectedAccountId !== null) {
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
                onSuccess(Number(price))
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
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-neutral-950 items-center w-[90%] sm:max-w-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle className='text-white text-center text-2xl'>
            List your Item
          </DialogTitle>
        </DialogHeader>
        <div className="w-full space-y-2">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-white mb-1">Price</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white z-10">
                ℏ
              </span>
              <Input
                type="number"
                id="price"
                className="pl-8 pr-4 py-2 bg-neutral-800 text-white"
                placeholder="Enter price in HBAR"
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
          <div className="grid gap-4 py-2">
            <button
              className='h-10 px-6 bg-blue-500 text-white rounded-lg disabled:bg-gray-400'
              onClick={handleListClick}
              disabled={isExecuting || price === '' || Number(price) <= 0}
            >
              {isExecuting ? 'Listing...' : 'List NFT'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ListNftModal
