// components/ConnectWalletButton.js
'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/app/collections/components/ui/button'
import { HashConnect, HashConnectConnectionState } from 'hashconnect'
import type { SessionData } from 'hashconnect'
import { LedgerId } from '@hashgraph/sdk'
import { ProfileDropDownMenu } from './ProfileDropDownMenu'

const appMetadata = {
  name: 'Hbank App',
  description: 'The All-in-One Hub for Hedera Investors',
  icons: ['https://pbs.twimg.com/media/GWtnpkjWkAAGrMv?format=png&name=small'],
  url: 'https://hbank-mvp.vercel.app/'
}

const ConnectWalletButton = () => {
  const [pairingData, setPairingData] = useState<SessionData | null>(null)
  const [connectionStatus, setConnectionStatus] = useState(
    HashConnectConnectionState.Disconnected
  )
  const [hashconnect, setHashconnect] = useState<HashConnect | null>(null)

  const projectId: string | undefined = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

  if (typeof projectId === 'undefined') {
    throw new Error('WALLETCONNECT_PROJECT_ID is not defined in the environment variables.')
  }

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    // create the hashconnect instance
    const hashconnect = new HashConnect(
      LedgerId.MAINNET,
      projectId,
      appMetadata,
      true
    )

    // register events
    hashconnect.pairingEvent.on((newPairing) => {
      setPairingData(newPairing)
    })

    hashconnect.disconnectionEvent.on((data) => {
      setPairingData(null)
    })

    hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
      setConnectionStatus(connectionStatus)
    })

    // initialize
    await hashconnect.init()
    setHashconnect(hashconnect)
  }

  const disconnect = () => {
    hashconnect?.disconnect()
  }

  const connect = async () => {
    await hashconnect?.openPairingModal()
  }

  return (
    <div>
  {connectionStatus !== 'Paired'
    ? (
    <Button
      onClick={connect}
      className='bg-blue-500 hover:bg-blue-400'
    >
      <span className='mr-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-4'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3'
          />
        </svg>
      </span>
      <span>Login</span>
    </Button>
      )
    : (
    <div className='flex items-center justify-end gap-2'>
      <ProfileDropDownMenu
        pairingData={pairingData}
        disconnect={disconnect}
      />
    </div>
      )}
</div>
  )
}

export default ConnectWalletButton
