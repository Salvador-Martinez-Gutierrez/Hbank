'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useWallet, useWatchTransactionReceipt } from '@buidlerlabs/hashgraph-react-wallets'
import { Transaction } from '@hashgraph/sdk'
import type { Signer } from '@hashgraph/sdk'

async function confirmUnlistingToMarketProvider (saleVerificationCode: string) {
  const response = await fetch('/api/unlistNftSuccess', {
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

interface UnlistNftModalProps {
  isOpen: boolean
  onClose: () => void
  result: UnlistResult | null
  onSuccess: () => void
}

const UnlistNftModal = ({ isOpen, onClose, result, onSuccess }: UnlistNftModalProps) => {
  const [isExecuting, setIsExecuting] = useState(false)
  const wallet = useWallet()
  const signer = wallet.signer as Signer
  const { watch } = useWatchTransactionReceipt()

  const handleExecuteUnlist = async () => {
    setIsExecuting(true)
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
              console.log('Attempting to confirm unlisting with code:', result.saleVerificationCode)
              const confirmationResult = confirmUnlistingToMarketProvider(result.saleVerificationCode)
              console.log('Unlist confirmation result OG:', confirmationResult)
            } else {
              console.log('No saleVerificationCode provided, skipping confirmation')
            }
            onClose()
            onSuccess()
            return transaction
          },
          onError: (transaction, error) => {
            // do stuff
            console.error('Transaction failed.')
            return transaction
          }
        })
      } catch (error) {
        console.error('Error during NFT unlisting transaction:', error)
      }
    } else {
      console.error('Transaction preparation failed:', result)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-neutral-950 items-center w-[90%] sm:max-w-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle className='text-white text-center text-2xl'>
            Execute Unlisting
          </DialogTitle>
          <DialogDescription className='text-center text-lg'>
            {status}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <button
            className='h-10 px-4 bg-red-600 text-white rounded-lg disabled:bg-gray-400'
            onClick={handleExecuteUnlist}
            disabled={isExecuting}
          >
            {isExecuting ? 'Unlisting NFT...' : 'Unlist NFT'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UnlistNftModal