import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/app/collections/components/ui/table'

interface TopCollectionsSkeletonProps {
  variant?: 'simple' | 'advanced'
}

export default function Component ({ variant = 'advanced' }: TopCollectionsSkeletonProps) {
  const rowCount = variant === 'simple' ? 5 : 10
  const columnCount = variant === 'simple' ? 5 : 9

  return (
    <Table className={`mx-auto ${variant === 'simple' ? 'max-w-[450px] md:max-w-[1100px]' : ''}`}>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800 bg-neutral-900 sticky z-10">
          {Array.from({ length: columnCount }).map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-4 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from({ length: columnCount }).map((_, colIndex) => (
              <TableCell key={colIndex} className={colIndex === 1 ? 'w-[200px]' : ''}>
                {colIndex === 1
                  ? (
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-3 w-[100px]" />
                    </div>
                  </div>
                    )
                  : (
                  <Skeleton className="h-4 w-full" />
                    )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
