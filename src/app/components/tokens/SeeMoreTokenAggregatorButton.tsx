import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

export default function SeeMoreTokenAggregatorButton () {
  return (
    <Link href="/tokens" passHref>
      <Button
        className='bg-neutral-900 hover:bg-neutral-800 inline-flex cursor-pointer justify-start mt-4 px-16 py-2 text-gray-300 text-sm border border-gray-300'
      >
        See More
      </Button>
    </Link>
  )
}
