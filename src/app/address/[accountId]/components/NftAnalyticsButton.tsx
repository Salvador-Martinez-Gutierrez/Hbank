import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface NftAnalyticsButtonProps {
  accountId: string
  isActive: boolean
}

export default function NftAnalyticsButton ({ accountId, isActive }: NftAnalyticsButtonProps) {
  return (
    <Link href={`/address/${accountId}/nft-analytics`} passHref>
      <Button
        className={`hover:bg-neutral-800 inline-flex cursor-pointer justify-start items-center p-0 pr-2 ${
          isActive ? 'bg-neutral-800' : ''
        }`}
      >
        <span className='flex items-center'>
          <svg className='ml-0' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed">
            <path d="M360-400h400L622-580l-92 120-62-80-108 140Zm-40 160q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/>
          </svg>
          <span className='text-lg ml-2'>NFTs</span>
        </span>
      </Button>
    </Link>
  )
}
