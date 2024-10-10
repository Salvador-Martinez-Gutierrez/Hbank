import React from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'
import { getOwnersData } from '@/app/services/getOwnersData'

interface Owners {
  account: string
  balance: number
  decimals: number
  rank: number
  pct: number
}

interface HoldersProps {
  tokenId: string
}

const Holders: React.FC<HoldersProps> = async ({ tokenId }) => {
  const ownersList: Owners[] = await getOwnersData(tokenId)

  return (
    <Table>
      <TableHeader>
        <TableRow className='hover:bg-neutral-900 bg-neutral-900 sticky z-10'>
          <TableHead>Rank</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead className="text-right whitespace-nowrap">Balance</TableHead>
          <TableHead className="text-right whitespace-nowrap">Ownership Share</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ownersList.map((owner) => {
          const { rank, account, balance, pct } = owner

          return (
            <TableRow key={account} className='hover:bg-neutral-800 cursor-pointer'>
              <TableCell className="font-medium text-left whitespace-nowrap p-0">
                <Link href={`/address/${account}`} className="block w-full h-full p-4">
                  {rank}
                </Link>
              </TableCell>
              <TableCell className='whitespace-nowrap truncate text-left p-0'>
                <Link href={`/address/${account}`} className="block w-full h-full p-4">
                  {account}
                </Link>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap p-0">
                <Link href={`/address/${account}`} className="block w-full h-full p-4">
                  {balance}
                </Link>
              </TableCell>
              <TableCell className="font-medium text-right whitespace-nowrap p-0">
                <Link href={`/address/${account}`} className="block w-full h-full p-4">
                  {(pct * 100).toFixed(2)}%
                </Link>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default Holders
