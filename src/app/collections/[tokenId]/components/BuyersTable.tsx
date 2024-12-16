import type { TraderStats } from '../utils/calculateListingStats'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface BuyersTableProps {
  buyerStats: TraderStats[]
}

export const BuyersTable: React.FC<BuyersTableProps> = ({ buyerStats }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className='hover:bg-neutral-950 bg-neutral-950 sticky z-10'>
          <TableHead>Account ID</TableHead>
          <TableHead>Count</TableHead>
          <TableHead className="text-right whitespace-nowrap">Avg Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {buyerStats.map((stat) => (
          <TableRow
            key={stat.accountId}
            className={'hover:bg-neutral-800 cursor-pointer'}
          >
            <TableCell className="font-medium text-left whitespace-nowrap p-0">
              <Link href={`/address/${stat.accountId}`} className="block w-full h-full p-4">
                {stat.accountId}
              </Link>
            </TableCell>
            <TableCell className="whitespace-nowrap p-0">
              <Link href={`/address/${stat.accountId}`} className="block w-full h-full p-4">
                {stat.count}
              </Link>
            </TableCell>
            <TableCell className="text-right whitespace-nowrap p-0">
              <Link href={`/address/${stat.accountId}`} className="block w-full h-full p-4">
                {stat.averagePrice.toFixed(2)}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
