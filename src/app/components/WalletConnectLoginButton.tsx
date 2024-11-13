'use client'

import { Button } from '@/app/collections/components/ui/button'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'
import { HWCConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import Image from 'next/image'

interface WalletConnectLoginButtonProps {
  onSuccess: () => void
}

const WalletConnectLoginButton = ({ onSuccess }: WalletConnectLoginButtonProps) => {
  const { connect } = useWallet(HWCConnector)

  const handleConnect = async () => {
    try {
      await connect()
      onSuccess()
      // ⚠️ SOLUCION MOMENTANEA PARA SINCRONIZAR CONTEXTO
      window.location.reload()
    } catch (error) {
      console.error('Failed to connect with WalletConnect:', error)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      className="bg-blue-500 hover:bg-blue-600 w-full flex items-center justify-center gap-2"
    >
      <Image
        src="/wallet-connect-logo.png"
        alt="WalletConnect"
        width={24}
        height={24}
      />
      WalletConnect
    </Button>
  )
}

export default WalletConnectLoginButton
