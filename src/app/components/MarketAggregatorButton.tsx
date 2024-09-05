'use client'

import { Button } from '@/app/collections/components/ui/button'

export default function MarketAggregatorButton () {
  const redirectToCollections = () => {
    window.location.href = '/collections'
  }

  return (
    <Button
      onClick={redirectToCollections}
      className='bg-black hover:bg-zinc-800 inline-flex cursor-pointer justify-start'>
      NFT Market
    </Button>
  )
}
