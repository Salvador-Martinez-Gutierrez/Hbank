import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

export default function MarketAggregatorButton () {
  return (
    <Link href="/collections" passHref>
      <Button
        className='bg-black hover:bg-zinc-800 inline-flex cursor-pointer justify-start'
      >
        Marketplace
      </Button>
    </Link>
  )
}
