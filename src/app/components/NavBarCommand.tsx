// NOT CURRENTLY IN USE
'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/app/collections/components/ui/button'
import { User, CreditCard } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

export default function NavBarCommand () {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isValidAccount, setIsValidAccount] = useState(false)
  const [accountId, setAccountId] = useState('')

  useEffect(() => {
    const down = (e) => {
      if (e.key === 's' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])

  const validateAccount = (searchQuery) => {
    // Example validation logic (replace with actual validation)
    if (searchQuery === '0.0.2992991') {
      setIsValidAccount(true)
      setAccountId(searchQuery)
    } else {
      setIsValidAccount(false)
    }
  }

  const redirectToAddress = () => {
    if (isValidAccount) {
      window.location.href = `/address/${accountId}`
    }
  }

  return (
    <>
      <Button
        className='text-sm text-muted-foreground bg-zinc-800'
        onClick={ () => { setOpen(true) } }
      >
        Search AccountId...
        <kbd className="ml-16 md:ml-32 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border-zinc-100 px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Ctrl</span>S
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Type an AccountId...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <CommandList>
          {searchQuery.length === 0 && <CommandEmpty>No results found.</CommandEmpty>}
          {searchQuery.length > 0 && !isValidAccount && (
            <CommandEmpty>Account does not exist.</CommandEmpty>
          )}
          {searchQuery.length > 0 && isValidAccount && (
            <CommandGroup heading='Account Id'>
              <CommandItem onSelect={redirectToAddress}>
                <User className='mr-2 h-4 w-4' />
                <span>{accountId}</span>
              </CommandItem>
            </CommandGroup>
          )}
          <CommandGroup heading='Links'>
            <CommandItem>
              <User className='mr-2 h-4 w-4' />
              <span>Home</span>
            </CommandItem>
            <CommandItem>
              <CreditCard className='mr-2 h-4 w-4' />
              <span>Marketplace</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
