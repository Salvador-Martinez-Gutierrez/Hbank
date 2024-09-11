/*
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { HashConnect } from 'hashconnect'
import { LedgerId } from '@hashgraph/sdk'
import type { AccountId, Transaction } from '@hashgraph/sdk'

interface WalletContextProps {
  isConnected: boolean
  accountIds: string[]
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  signTransaction: (accountIdForSigning: AccountId, trans: Transaction) => Promise<any>
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined)

const appMetadata = {
  name: 'Hbank App',
  description: 'The All-in-One Hub for Hedera Investors',
  icons: ['https://example.com/dapp-logo.png'],
  url: window.location.origin
}

const projectId = 'eb3e42580d8e325d52e2edd599b9c567'

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [hashconnect, setHashconnect] = useState<HashConnect | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [accountIds, setAccountIds] = useState<string[]>([])

  useEffect(() => {
    // Initialize HashConnect and listen to events
    const initializeHashConnect = async () => {
      const hc = new HashConnect(LedgerId.TESTNET, projectId, appMetadata, true)
      await hc.init()
      setHashconnect(hc)

      const handlePairing = () => {
        setAccountIds(hc.connectedAccountIds.map((id) => id.toString()))
        setIsConnected(true)
      }

      hc.pairingEvent.on(handlePairing)
      hc.disconnectionEvent.on(() => {
        setIsConnected(false)
        setAccountIds([])
      })
    }

    initializeHashConnect()
  }, [])

  const connectWallet = async () => {
    if (hashconnect) {
      await hashconnect.openPairingModal()
    }
  }

  const disconnectWallet = () => {
    if (hashconnect) {
      hashconnect.disconnect()
      setIsConnected(false)
      setAccountIds([])
    }
  }

  const signTransaction = async (accountId: AccountId, trans: Transaction) => {
    if (!hashconnect) throw new Error('HashConnect is not initialized.')
    if (!accountIds.includes(accountId.toString())) throw new Error('Account is not connected.')
    return await hashconnect.signTransaction(accountId, trans)
  }

  return (
    <WalletContext.Provider value={{ isConnected, accountIds, connectWallet, disconnectWallet, signTransaction }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) throw new Error('useWallet must be used within WalletProvider')
  return context
}
*/
