import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface SeeMoreFungibleAnalyticsProps {
  accountId: string
}

export default function SeeMoreFungibleAnalytics ({ accountId }: SeeMoreFungibleAnalyticsProps) {
  return (
    <Link href={`/address/${accountId}/fungible-analytics`} passHref>
      <Button
        className='bg-neutral-900 hover:bg-neutral-800 inline-flex cursor-pointer justify-start mt-4 px-16 py-2 text-gray-300 text-sm border border-gray-300'
      >
        See More
      </Button>
    </Link>
  )
}
