import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface FungibleButtonProps {
  accountId: string
}

export default function FungibleButton ({ accountId }: FungibleButtonProps) {
  return (
    <Link href={`/address/${accountId}/fungible-analytics`} passHref>
      <Button
        className='bg-black hover:bg-zinc-700 w-28 inline-flex cursor-pointer justify-start'
      >
        <span>
          Fungible
        </span>
      </Button>
    </Link>
  )
}
