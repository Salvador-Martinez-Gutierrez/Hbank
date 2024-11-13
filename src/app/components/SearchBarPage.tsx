'use client'

import * as React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { useDebounce } from '../hooks/useDebounce'
import collections from '../collectionsData/collections'

const apps = [
  {
    name: 'Marketplace Aggregator',
    path: '/collections',
    icon: (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="26px" fill="#ffffff">
      <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/>
    </svg>
    )
  },
  {
    name: 'Portfolio Tracker',
    path: '/portfolio',
    icon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ffffff" viewBox="0 0 256 256">
      <path d="M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM128,24a8,8,0,0,0-8,8v91.82L41.19,169.73a8,8,0,0,0-2.87,11A104,104,0,1,0,128,24Zm0,192a88.47,88.47,0,0,1-71.49-36.68l75.52-44a8,8,0,0,0,4-6.92V40.36A88,88,0,0,1,128,216Z"></path>
    </svg>
    )
  }
]

export function SearchBarPage () {
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [validAccounts, setValidAccounts] = useState(false)
  const [matchingCollections, setMatchingCollections] = useState<string[]>([])
  const [matchingApps, setMatchingApps] = useState(apps)

  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    setIsLoading(true)

    if (debouncedSearch.length === 0) {
      const allCollectionIds = Object.keys(collections)
      const shuffledCollections = allCollectionIds
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)

      setMatchingCollections(shuffledCollections)
      setMatchingApps(apps)
      setValidAccounts(false)
      setIsLoading(false)
      return
    }

    const matches = Object.keys(collections).filter(tokenId =>
      tokenId.includes(debouncedSearch) ||
      collections[tokenId].name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    setMatchingCollections(matches)

    const filteredApps = apps.filter(app =>
      app.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    setMatchingApps(filteredApps)

    const checkAccount = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/check-account/${debouncedSearch}`)
        const valid: boolean = await response.json()
        console.log('Valid accounts:', valid, debouncedSearch)
        setValidAccounts(valid)
      } catch (error) {
        console.error('Error checking account:', error)
        setValidAccounts(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAccount()
  }, [debouncedSearch])

  // Keyboard shortcut handler: Ctrl+k
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => { document.removeEventListener('keydown', down) }
  }, [])

  return (
    <>
      <button
        onClick={() => { setOpen(true) }}
        className="flex items-center justify-between h-10 sm:w-64 w-10 sm:px-3 sm:py-2 text-sm text-left text-muted-foreground bg-black sm:bg-zinc-800 rounded-md focus:outline-none"
      >
        <span className="hidden sm:inline">Search...</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed" className="sm:hidden">
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
        </svg>
        <p className="hidden sm:flex text-sm text-muted-foreground ml-12">
          <kbd className="bg-neutral-950 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">Ctrl</span>K
          </kbd>
        </p>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type a Collection, Account Id, Token Id..."
          value={search}
          onValueChange={setSearch}
        />
        <CommandList className="bg-neutral-950 text-white">
          {/* Renders when no result are found or while loading */}
          <CommandEmpty>
            {isLoading
              ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
                )
              : (
                  'No results found.'
                )}
          </CommandEmpty>
          {/* Renders NFT Collections */}
          {matchingCollections.length > 0 && (
          <CommandGroup heading="Collections">
            {matchingCollections.map(tokenId => (
              <CommandItem
                key={tokenId}
                value={collections[tokenId].name}
                onSelect={() => { setOpen(false) }}
              >
                <Link href={`/collections/${tokenId}`} className="w-full flex items-center">
                  <img
                    src={collections[tokenId].url}
                    alt={collections[tokenId].name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div className="flex flex-col">
                    <span className="text-white">{collections[tokenId].name}</span>
                    <span className="text-gray-400">{tokenId}</span>
                  </div>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          )}
          {/* Renders Acccounts */}
          {validAccounts && debouncedSearch !== '' && (
          <CommandGroup
            heading="Accounts"
            value="accounts"
          >
            <CommandItem value={debouncedSearch} onSelect={() => { setOpen(false) }}>
              <Link href={`/address/${debouncedSearch}`} className="w-full flex">
                <span className="pr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff">
                    <path d="M200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v100h-80v-100H200v560h560v-100h80v100q0 33-23.5 56.5T760-120H200Zm320-160q-33 0-56.5-23.5T440-360v-240q0-33 23.5-56.5T520-680h280q33 0 56.5 23.5T880-600v240q0 33-23.5 56.5T800-280H520Zm280-80v-240H520v240h280Zm-160-60q25 0 42.5-17.5T700-480q0-25-17.5-42.5T640-540q-25 0-42.5 17.5T580-480q0 25 17.5 42.5T640-420Z"/>
                  </svg>
                </span>
                <span className="text-white">{debouncedSearch}</span>
              </Link>
            </CommandItem>
          </CommandGroup>
          )}
          {/* Renders App Links */}
          {matchingApps.length > 0 && (
            <CommandGroup heading="Apps">
              {matchingApps.map(app => (
                <CommandItem key={app.path} asChild onSelect={() => { setOpen(false) }}>
                  <Link href={app.path} className="w-full">
                    <span className="">{app.icon}</span>
                    <span className="text-white">{app.name}</span>
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
