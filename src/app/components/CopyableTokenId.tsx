import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useState } from 'react'

interface CopyableTokenIdProps {
  tokenId: string
  className?: string
}

const CopyableTokenId: React.FC<CopyableTokenIdProps> = ({ tokenId, className = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopyTokenId = () => {
    navigator.clipboard.writeText(tokenId)
    setCopied(true)
    setTimeout(() => { setCopied(false) }, 2000)
  }

  return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopyTokenId}
              className={`hover:underline cursor-pointer flex items-center ${className}`}
            >
              {tokenId}
              {copied && (
                <span className="ml-2 inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#4ade80" className="no-underline">
                    <path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/>
                  </svg>
                </span>
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent className='bg-black text-white p-1 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]'>
            <p>Copy</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
  )
}

export default CopyableTokenId
