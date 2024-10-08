'use client'
import { createContext, useEffect, useState } from 'react'
import { HWBridgeProvider } from '@buidlerlabs/hashgraph-react-wallets'
import { HWCConnector, HashpackConnector, KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { HederaMainnet } from '@buidlerlabs/hashgraph-react-wallets/chains'

export const WalletContext = createContext(null)

interface Metadata {
  name: string
  description: string
  icons: string[]
  url: string
}

export function WalletProvider ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [metadata, setMetadata] = useState<Metadata | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMetadata({
        name: 'Hbank dApp',
        description: 'The All-In-One Hubb for Hedera Investors',
        icons: ['https://pbs.twimg.com/media/GWtnpkjWkAAGrMv?format=png&name=small'],
        url: window.location.href
      })
    }
  }, [])

  if (metadata === null) {
    return null
  }

  return (
    <HWBridgeProvider
      metadata={metadata}
      projectId={'eb3e42580d8e325d52e2edd599b9c567'}
      connectors={[HWCConnector, HashpackConnector, KabilaConnector]}
      chains={[HederaMainnet]}
      strategies={[]}
    >
      <WalletContext.Provider value={null}>
        {children}
      </WalletContext.Provider>
    </HWBridgeProvider>
  )
}
