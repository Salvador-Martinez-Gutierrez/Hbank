import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface DefiAnalyticsButtonProps {
  accountId: string
  isActive: boolean
}

export default function DefiAnalyticsButton ({ accountId, isActive }: DefiAnalyticsButtonProps) {
  return (
    <Link href={`/address/${accountId}/defi-analytics`} passHref>
      <Button
        className={`hover:bg-neutral-800 inline-flex cursor-pointer justify-start items-center p-0 pr-2 ${
          isActive ? 'bg-neutral-800' : ''
        }`}
      >
        <span className='flex items-center'>
          <svg className='ml-0' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed">
            <path d="M361-80q-14 0-24.5-7.5T322-108L220-440H80v-80h170q13 0 23.5 7.5T288-492l66 215 127-571q3-14 14-23t25-9q14 0 25 8.5t14 22.5l87 376 56-179q4-13 14.5-20.5T740-680q13 0 23 7t15 19l50 134h52v80h-80q-13 0-23-7t-15-19l-19-51-65 209q-4 13-15 21t-25 7q-14-1-24-9.5T601-311l-81-348-121 548q-3 14-13.5 22T361-80Z"/>
          </svg>
          <span className='text-lg ml-2'>DeFi</span>
        </span>
      </Button>
    </Link>
  )
}
