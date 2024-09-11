/*
'use client'

// components/ConnectWalletButton.tsx
import { Button } from '@/app/collections/components/ui/button'
import { useWallet } from '../context/WalletContext'

const ConnectWalletButton = () => {
  const { isConnected, connectWallet, disconnectWallet, accountIds } = useWallet()

  return (
    <div>
      {isConnected
        ? (
        <div>
          <Button onClick={disconnectWallet}>Disconnect</Button>
        </div>
          )
        : (
        <Button onClick={connectWallet}>Connect Wallet</Button>
          )}
    </div>
  )
}

export default ConnectWalletButton
*/
