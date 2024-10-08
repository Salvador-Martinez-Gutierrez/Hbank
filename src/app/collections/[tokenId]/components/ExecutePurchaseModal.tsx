'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useWallet, useWatchTransactionReceipt } from '@buidlerlabs/hashgraph-react-wallets'
import { Transaction } from '@hashgraph/sdk'
import type { Signer } from '@hashgraph/sdk'

async function confirmPurchaseToMarketProvider (saleVerificationCode: string) {
  const response = await fetch('/api/buyNftSuccess', {
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

interface PurchaseResult {
  success: boolean
  transBase64?: {
    data: Uint8Array
  }
  saleVerificationCode?: string
}

interface ExecutePurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  result: PurchaseResult
}

const ExecutePurchaseModal = ({ isOpen, onClose, result }: ExecutePurchaseModalProps) => {
  const [status, setStatus] = useState<string>('Ready to execute purchase')
  const [isExecuting, setIsExecuting] = useState(false)
  const wallet = useWallet()
  const signer = wallet.signer as Signer
  const { watch } = useWatchTransactionReceipt()

  const handleExecutePurchase = async () => {
    setIsExecuting(true)
    if (result.success && result.transBase64 !== null && result.transBase64 !== undefined) {
      setStatus('Transaction prepared. Executing...')
      try {
        const transactionString = Buffer.from(result.transBase64.data).toString('base64')
        console.log('Transaction string:', transactionString)

        // Decode the transaction
        const transaction = Transaction.fromBytes(Buffer.from(transactionString, 'base64'))
        console.log('Transaction decoded successfully', transaction)

        const transactionResponse = await transaction.executeWithSigner(signer)

        watch(transactionResponse.transactionId.toString(), {
          onSuccess: (transaction) => {
            console.log('Transaction confirmed successful')
            console.log('Sale verification code:', result.saleVerificationCode)

            setStatus('Purchase complete. Confirming with market provider...')

            if (result.saleVerificationCode !== undefined) {
              console.log('Attempting to confirm purchase with code:', result.saleVerificationCode)
              const confirmationResult = confirmPurchaseToMarketProvider(result.saleVerificationCode)
              console.log('Purchase confirmation result OG:', confirmationResult)
              setStatus('Purchase confirmed with market provider.')
            } else {
              console.log('No saleVerificationCode provided, skipping confirmation')
              setStatus('Purchase completed, but no verification code for confirmation.')
            }
            onClose()
            return transaction
          },
          onError: (transaction, error) => {
            // do stuff
            console.error('Transaction failed.')
            setStatus('Purchase failed:')
            return transaction
          }
        })
      } catch (error) {
        console.error('Error during NFT purchase transaction:', error)
        if (error instanceof Error) {
          setStatus(`Error: ${error.message}`)
        } else {
          setStatus('An unexpected error occurred during the purchase transaction. Please try again.')
        }
      }
    } else {
      console.error('Transaction preparation failed:', result)
      setStatus('Error preparing the transaction. Please try again.')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-neutral-950 items-center w-[90%] sm:max-w-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle className='text-white text-center text-2xl'>
            Execute Purchase
          </DialogTitle>
          <DialogDescription className='text-center text-lg'>
            {status}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <button
            className='h-10 px-4 bg-blue-600 text-white rounded-lg disabled:bg-gray-400'
            onClick={handleExecutePurchase}
            disabled={isExecuting}
          >
            {isExecuting ? 'Executing Purchase...' : 'Execute Purchase'}
          </button>
          <button
            className='h-10 px-4 bg-gray-600 text-white rounded-lg'
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExecutePurchaseModal
