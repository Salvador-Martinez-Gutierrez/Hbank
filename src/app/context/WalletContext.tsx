'use client'
import { createContext, useContext } from 'react'
import { HWBridgeProvider } from '@buidlerlabs/hashgraph-react-wallets'
import { HashpackConnector, KabilaConnector } from '@buidlerlabs/hashgraph-react-wallets/connectors'
import { HederaTestnet } from '@buidlerlabs/hashgraph-react-wallets/chains'

const WalletContext = createContext(null)

const metadata = {
  name: ' Hbank dApp',
  description: 'The All-In-One Hubb for Hedera Investors',
  icons: ['https://pbs.twimg.com/media/GWtnpkjWkAAGrMv?format=png&name=small'],
  url: window.location.href
}

export function WalletProvider ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <HWBridgeProvider
      metadata={metadata}
      projectId={'eb3e42580d8e325d52e2edd599b9c567'}
      connectors={[HashpackConnector, KabilaConnector]}
      chains={[HederaTestnet]}
      strategies={[]} // Add this line
    >
      <WalletContext.Provider value={null}>
        {children}
      </WalletContext.Provider>
    </HWBridgeProvider>
  )
}

export const useWalletContext = () => useContext(WalletContext)
