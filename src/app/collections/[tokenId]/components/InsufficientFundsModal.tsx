'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { useBalance } from '@buidlerlabs/hashgraph-react-wallets'

interface InsufficientFundsModalProps {
  isOpen: boolean
  onClose: () => void
  requiredAmount?: string | number
}

const InsufficientFundsModal: React.FC<InsufficientFundsModalProps> = ({ isOpen, onClose, requiredAmount }) => {
  const { data: balance } = useBalance()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-neutral-950 items-center w-[90%] sm:max-w-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle className='text-white text-center text-2xl flex items-center justify-center'>
            <span role="img" aria-label="warning" className="mr-2">⚠️</span>
            Insufficient Funds
          </DialogTitle>
          <DialogDescription className='text-center text-lg'>
            Your current balance is insufficient for this purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="text-white text-center">
            Your balance: {balance?.value ?? 'Loading...'} ℏ<br />
            Required amount: {requiredAmount} ℏ
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default InsufficientFundsModal
