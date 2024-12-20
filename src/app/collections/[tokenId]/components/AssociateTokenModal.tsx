'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useWallet, useAccountId, useWatchTransactionReceipt, useBalance } from '@buidlerlabs/hashgraph-react-wallets'
import { TokenAssociateTransaction } from '@hashgraph/sdk'
import type { Signer } from '@hashgraph/sdk'

interface AssociateTokenModalProps {
  onClose: () => void
  tokenId: string
  onSuccess: (isBalanceSufficient: boolean) => void
  price?: string | number
}

const AssociateTokenModal = ({ onClose, tokenId, onSuccess, price }: AssociateTokenModalProps) => {
  const wallet = useWallet()
  const signer = wallet.signer as Signer
  const { data: accountId }: { data: string } = useAccountId()
  const [isAssociating, setIsAssociating] = useState(false)
  const { watch } = useWatchTransactionReceipt()
  const { data: balance } = useBalance()

  const handleAssociate = async () => {
    setIsAssociating(true)
    try {
      const transaction = new TokenAssociateTransaction()
        .setAccountId(accountId)
        .setTokenIds([tokenId])

      const signTx = await transaction.freezeWithSigner(signer)
      const txResponse = await signTx.executeWithSigner(signer)

      watch(txResponse.transactionId.toString(), {
        onSuccess: (transaction) => {
          onClose()
          if (price !== undefined) {
            const isBalanceSufficient = balance.value > price
            onSuccess(isBalanceSufficient)
          }
          return transaction
        },
        onError: (transaction, error) => {
          console.log('Association failed')
          onClose()
          return transaction
        }
      })
    } catch (e) {
      console.error(e)
    } finally {
      setIsAssociating(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-neutral-950 items-center w-[90%] sm:max-w-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle className='text-white text-center text-2xl'>
            Associate Token Id
          </DialogTitle>
          <DialogDescription className='text-center text-lg'>
            You need to associate this token Id with your account to be able to buy it
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <button
            className='h-10 px-4 bg-green-600 text-white rounded-lg disabled:bg-gray-400'
            onClick={handleAssociate}
            disabled={isAssociating}
          >
            {isAssociating ? 'Associating...' : 'Associate Token'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AssociateTokenModal
