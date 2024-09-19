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
          const rank = owner.rank
          const account = owner.account
          const balance = owner.balance
          const pct = owner.pct

          return (
            <TableRow key={account}>
              <TableCell className="font-medium text-left whitespace-nowrap">{rank}</TableCell>
              <TableCell className='whitespace-nowrap truncate text-left'>
                <Link className='flex hover:text-black hover:underline' target='_blank' href={`/address/${account}`}>
                  {account}
                </Link>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">{balance}</TableCell>
              <TableCell className="font-medium text-right whitespace-nowrap">{(pct * 100).toFixed(2)}%</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default Holders
