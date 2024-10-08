'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

interface SuccessfulPurchaseModalProps {
  isOpen: boolean
  onClose: () => void
}

const SuccessfulPurchaseModal: React.FC<SuccessfulPurchaseModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-neutral-950 items-center w-[90%] sm:max-w-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle className='text-white text-center text-2xl flex items-center justify-center'>
            <span role="img" aria-label="celebration" className="mr-2">🎉</span>
            Purchase Successful!
          </DialogTitle>
          <DialogDescription className='text-center text-lg'>
            Congratulations! You have successfully purchased the NFT.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessfulPurchaseModal
