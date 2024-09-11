import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface NftAnalyticsButtonProps {
  accountId: string
}

export default function NftAnalyticsButton ({ accountId }: NftAnalyticsButtonProps) {
  return (
    <Link href={`/address/${accountId}/nft-analytics`} passHref>
      <Button
        className='bg-black hover:bg-zinc-700 w-28 inline-flex cursor-pointer justify-start'
      >
        <span>
          NFTs
        </span>
      </Button>
    </Link>
  )
}
