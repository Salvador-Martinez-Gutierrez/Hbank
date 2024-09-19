'use client'

import { Button } from '@/app/collections/components/ui/button'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'

interface WalletConnectLoginButtonProps {
  onSuccess: () => void
}

const WalletConnectLoginButton = ({ onSuccess }: WalletConnectLoginButtonProps) => {
  const { connect } = useWallet(HWCConnector)

  const handleConnect = async () => {
    try {
      await connect()
      onSuccess()
    } catch (error) {
      console.error('Failed to connect with WalletConnect:', error)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      className="bg-blue-500 hover:bg-blue-600 w-full"
    >
      Connect with WalletConnect
    </Button>
  )
}

export default WalletConnectLoginButton
