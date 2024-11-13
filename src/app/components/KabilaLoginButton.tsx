'use client'

import { Button } from '@/app/collections/components/ui/button'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'
import { KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import Image from 'next/image'

interface KabilaLoginButtonProps {
  onSuccess: () => void
}

const KabilaLoginButton = ({ onSuccess }: KabilaLoginButtonProps) => {
  const { connect } = useWallet(KabilaConnector)

  const handleConnect = async () => {
    try {
      await connect()
      onSuccess()
      // ⚠️ SOLUCION MOMENTANEA PARA SINCRONIZAR CONTEXTO
      window.location.reload()
    } catch (error) {
      console.error('Failed to connect with Kabila:', error)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      className="bg-blue-500 hover:bg-blue-600 w-full flex items-center justify-center gap-2"
    >
      <Image
        src="/kabila-wallet.png"
        alt="Kabila Wallet"
        width={22}
        height={22}
      />
      Kabila
    </Button>
  )
}

export default KabilaLoginButton
