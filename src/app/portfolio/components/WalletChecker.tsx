'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation' // Use the correct import for App Router
import { Button } from '@/app/collections/components/ui/button'
import ErrorAlertModal from './ErrorAlertModal'

interface WalletCheckerProps {
  showButton: boolean
}

const WalletChecker = ({ showButton }: WalletCheckerProps) => {
  const router = useRouter() // Ensure it's called in a proper context
  const [accountId, setAccountId] = useState('')
  const [error, setError] = useState('')

  const isValidAccountId = (accountId: string): boolean => {
    const hederaAccountIdPattern = /^\d+\.\d+\.\d+$/
    return hederaAccountIdPattern.test(accountId)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (isValidAccountId(accountId)) {
      setError('')
      router.push(`/address/${accountId}`) // Use router.push for navigation
    } else {
      setError('Invalid wallet address. Please enter a valid address.')
    }
  }

  return (
    <div className='w-full max-w-md px-4'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col max-w-md'
      >
          <input
            type="text"
            value={accountId}
            onChange={(e) => { setAccountId(e.target.value) }}
            className='items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-sm text-white placeholder:text-muted-foreground bg-zinc-800'
            placeholder={showButton ? 'Ex. 0.0.1234567' : 'Search Account ID...'}
          />
          {showButton && (
          <Button
            type="submit"
            variant='secondary'
            className="mt-2 border border-white w-full"
          >
            Search Wallet
          </Button>
          )}
      </form>
      {error !== '' && <ErrorAlertModal/>}
    </div>
  )
}

export default WalletChecker
