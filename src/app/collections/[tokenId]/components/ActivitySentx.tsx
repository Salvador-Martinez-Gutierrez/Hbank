'use client'
import { useState, useEffect } from 'react'
import type { SentxActivityType } from '@/app/services/getActivitySentx'
import { Button } from '@/app/collections/components/ui/button'
import { Badge } from '@/app/collections/components/ui/badge'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'

interface SentxActivityProps {
  tokenId: string
}

interface ErrorResponse {
  message?: string
}

const SentxActivity: React.FC<SentxActivityProps> = ({ tokenId }) => {
  const [activity, setActivity] = useState<SentxActivityType[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchActivity = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/getActivitySentx?tokenId=${tokenId}&page=${page}`)

        if (!response.ok) {
          const errorData: ErrorResponse = await response.json().catch(() => ({}))
          throw new Error(errorData.message ?? `HTTP error! status: ${response.status}`)
        }

        const data: SentxActivityType[] = await response.json()
        setActivity(prevActivity => [...prevActivity, ...data])
      } catch (error) {
        console.error('Error fetching activity:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch activity')
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivity()
  }, [tokenId, page])

  if (error !== null) {
    return (
      <div className="text-red-500 flex items-center gap-2 border-2 border-red-800 rounded-md p-3 mt-6">
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!isLoading && activity.length === 0) {
    return (
      <div className="text-grey-500 flex items-center gap-2 border-2 border-zinc-800 rounded-md p-3 mt-6">
        <p>No activity found for this NFT Collection in the Sentx Market.</p>
      </div>
    )
  }

  return (
    <main className="w-full">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className='hover:bg-neutral-900 bg-neutral-900 sticky z-10'>
              <TableHead>NFT</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity.map((item, index) => (
              <TableRow key={index} className='hover:bg-neutral-800 cursor-pointer'>
                <TableCell className="whitespace-nowrap">
                  <div className='flex flex-col overflow-hidden'>
                    <span className="font-medium">{item.collectionName}</span>
                    <span className="text-muted-foreground text-sm">#{item.nftSerialId}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant='secondary'
                    className={`uppercase ${
                      item.saletype.toLowerCase() === 'sold'
                        ? 'border-green-500 text-green-500 bg-transparent'
                        : item.saletype.toLowerCase() === 'order'
                          ? 'border-blue-500 text-blue-500 bg-transparent'
                            : item.saletype.toLowerCase() === 'offer'
                            ? 'border-blue-200 text-blue-200 bg-transparent'
                              : item.saletype.toLowerCase() === 'offer rejected'
                              ? 'border-red-500 text-red-500 bg-transparent'
                                : 'border-white text-white bg-transparent'
                    }`}
                  >
                    {item.saletype === 'sale' ? 'Sold' : item.saletype}
                  </Badge>
                </TableCell>
                <TableCell className="text-left whitespace-nowrap">
                  {item.salePriceSymbol === 'HBAR' ? `${item.salePrice}ℏ` : item.salePrice}
                </TableCell>
                <TableCell className="whitespace-nowrap truncate text-left">
                  <Link
                    href={`/address/${item.sellerAddress}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {item.sellerAddress}
                  </Link>
                </TableCell>
                <TableCell className="whitespace-nowrap truncate text-left">
                  <Link
                    href={`/address/${item.buyerAddress}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {item.buyerAddress}
                  </Link>
                </TableCell>
                <TableCell className="whitespace-nowrap text-left">
                  {new Date(item.saleDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col items-center mt-4">
        {isLoading && (
          <div className="mb-4">
            <strong>Loading...</strong>
          </div>
        )}

        {!isLoading && (
          <Button
            onClick={() => { setPage(page + 1) }}
            className='bg-neutral-900 hover:bg-neutral-800 inline-flex cursor-pointer justify-start my-4 px-16 py-2 text-gray-300 text-sm border border-gray-300'
          >
            Load More
          </Button>
        )}
      </div>
    </main>
  )
}

export default SentxActivity
