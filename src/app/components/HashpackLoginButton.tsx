'use client'

import { Button } from '@/app/collections/components/ui/button'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import Image from 'next/image'

interface HashpackLoginButtonProps {
  onSuccess: () => void
}

const HashpackLoginButton = ({ onSuccess }: HashpackLoginButtonProps) => {
  const { connect } = useWallet(HashpackConnector)

  const handleConnect = async () => {
    try {
      await connect()
      onSuccess()
      // ⚠️ SOLUCION MOMENTANEA PARA SINCRONIZAR CONTEXTO
      window.location.reload()
    } catch (error) {
      console.error('Failed to connect with Hashpack:', error)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      className="bg-blue-500 hover:bg-blue-600 w-full flex items-center justify-center gap-0"
    >
      <Image
        src="/hashpack-wallet.png"
        alt="Hashpack Wallet"
        width={32}
        height={32}
      />
      Hashpack
    </Button>
  )
}

export default HashpackLoginButton
