'use client'

import { Button } from '@/app/collections/components/ui/button'
import { useWallet } from '@buidlerlabs/hashgraph-react-wallets'
import { HashpackConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import ProfileDropDownMenu from './ProfileDropDownMenu'

const ConnectWalletButton = () => {
  const { isConnected, connect, disconnect } = useWallet(HashpackConnector)

  const handleConnect = () => {
    connect()
  }

  const handleDisconnect = () => {
    disconnect()
  }

  return (
    <div>
      {isConnected
        ? (
        <div>
          <ProfileDropDownMenu disconnect={handleDisconnect}/>
        </div>
          )
        : (
        <div>
          <Button
            className='bg-blue-500 hover:bg-blue-500'
            onClick={handleConnect}>Login</Button>
        </div>
          )}
    </div>
  )
}

export default ConnectWalletButton
