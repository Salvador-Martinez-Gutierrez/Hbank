'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Slash } from 'lucide-react'
import { useState } from 'react'

interface CollectionBreadCrumbProps {
  tokenId: string
}

const CollectionBreadCrumb: React.FC<CollectionBreadCrumbProps> = ({ tokenId }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyTokenId = () => {
    navigator.clipboard.writeText(tokenId)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 2000)
  }

  return (
    <Breadcrumb className='pt-8 px-4 lg:px-8 xl:px-16'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/collections" className="text-base text-white hover:text-white hover:underline">Collections</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <BreadcrumbLink
                  onClick={handleCopyTokenId}
                  className='text-base text-white hover:text-white hover:underline cursor-pointer flex items-center'
                >
                  {tokenId}
                  {copied && (
                    <span className="ml-2 inline-block">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4ade80" className="no-underline">
                        <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/>
                      </svg>
                    </span>
                  )}
                </BreadcrumbLink>
              </TooltipTrigger>
              <TooltipContent className='bg-black text-white p-1 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'>
                <p>Copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default CollectionBreadCrumb
