'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Slash } from 'lucide-react'
import Link from 'next/link'
import CopyableTokenId from '@/app/components/CopyableTokenId'

interface CollectionBreadCrumbProps {
  tokenId: string
}

const CollectionBreadCrumb: React.FC<CollectionBreadCrumbProps> = ({ tokenId }) => {
  return (
    <Breadcrumb className='pt-8 px-4 lg:px-8 xl:px-16'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/collections" className="text-base text-white hover:text-white hover:underline">Collections</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <CopyableTokenId tokenId={tokenId} className="text-base text-white" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default CollectionBreadCrumb
