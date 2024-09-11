import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface DashboardButtonProps {
  accountId: string
}

export default function DashboardButton ({ accountId }: DashboardButtonProps) {
  return (
    <Link href={`/address/${accountId}`} passHref>
      <Button
        className='bg-black hover:bg-zinc-700 w-28 inline-flex cursor-pointer justify-start'
      >
        <span>
          Dashboard
        </span>
      </Button>
    </Link>
  )
}
