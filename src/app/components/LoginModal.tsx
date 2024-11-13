'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import KabilaLoginButton from './KabilaLoginButton'
import HashpackLoginButton from './HashpackLoginButton'
import WalletConnectLoginButton from './WalletConnectLoginButton'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const handleSuccess = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-xl bg-neutral-950 items-center w-[90%] sm:max-w-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <DialogHeader>
          <DialogTitle
            className='text-white text-center text-2xl'
          >
            Connect Wallet
          </DialogTitle>
          <DialogDescription
            className='text-center text-lg'
          >
            Select a wallet to connect to Hbank
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="hidden sm:block">
            <HashpackLoginButton onSuccess={handleSuccess} />
          </div>
          <div className="hidden sm:block">
            <KabilaLoginButton onSuccess={handleSuccess} />
          </div>
          <WalletConnectLoginButton onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginModal
