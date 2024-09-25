import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface DashboardButtonProps {
  accountId: string
  isActive: boolean
}

export default function DashboardButton ({ accountId, isActive }: DashboardButtonProps) {
  return (
    <Link href={`/address/${accountId}`} passHref>
      <Button
        className={`hover:bg-neutral-800 inline-flex cursor-pointer justify-start items-center p-0 pr-2 ${
          isActive ? 'bg-neutral-800' : ''
        }`}
      >
        <span className='flex items-center'>
          <svg className='ml-0' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#e8eaed">
            <path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/>
          </svg>
          <span className='text-lg ml-2'>Dashboard</span>
        </span>
      </Button>
    </Link>
  )
}
