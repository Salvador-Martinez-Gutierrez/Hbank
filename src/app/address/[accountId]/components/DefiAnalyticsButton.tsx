import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface DefiAnalyticsButtonProps {
  accountId: string
}

export default function DefiAnalyticsButton ({ accountId }: DefiAnalyticsButtonProps) {
  return (
    <Link href={`/address/${accountId}/defi-analytics`} passHref>
      <Button
        className='bg-black hover:bg-zinc-700 w-28 inline-flex cursor-pointer justify-start'
      >
        <span>
          DeFi
        </span>
      </Button>
    </Link>
  )
}
