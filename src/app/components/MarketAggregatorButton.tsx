import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface MarketAggregatorButtonProps {
  active?: boolean
}

export default function MarketAggregatorButton ({ active }: MarketAggregatorButtonProps) {
  return (
    <Link href="/collections" passHref>
      <Button
        className={`${active === true ? 'bg-zinc-800' : 'bg-black'} hover:bg-zinc-800 inline-flex cursor-pointer justify-start`}
      >
        Marketplace
      </Button>
    </Link>
  )
}
