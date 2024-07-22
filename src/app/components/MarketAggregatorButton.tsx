'use client'

import { Button } from '@/app/collections/components/ui/button'

export default function MarketAggregatorButton () {
  const redirectToCollections = () => {
    window.location.href = '/collections'
  }

  return (
    <Button
      onClick={redirectToCollections}
      className="border border-white hover:bg-zinc-800"
    >
      Marketplace Aggregator
    </Button>
  )
}
