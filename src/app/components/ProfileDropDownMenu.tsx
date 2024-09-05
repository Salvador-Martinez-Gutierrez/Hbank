import { Button } from '@/app/collections/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { SessionData } from 'hashconnect'

interface ProfileDropDownMenuProps {
  pairingData: SessionData | null
  disconnect: () => void // Function type for disconnect
}

export function ProfileDropDownMenu ({ pairingData, disconnect }: ProfileDropDownMenuProps) {
  // Redirects to my portfolio
  const redirectToPortfolio = () => {
    const accountId = pairingData?.accountIds[0]
    window.location.href = `/address/${accountId}`
  }
  // Redirects to wallet-tracker
  const redirectToWalletTracker = () => {
    window.location.href = '/wallet-tracker'
  }
  // Redirects to profile collections
  const redirectToCollections = () => {
    window.location.href = '/collections'
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
          <Button
            className='bg-blue-500 hover:bg-blue-500'>
              <span className='pr-1'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-5'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z' />
                </svg>
              </span>
              {pairingData?.accountIds[0]}
              <span className='pl-1'>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed">
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                </svg>
              </span>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black w-56 mx-4 lg:mx-8 xl:mx-16">
        <DropdownMenuGroup>
        <Button
            onClick={redirectToPortfolio}
            className='bg-black hover:bg-zinc-800 p-4 mb-1 w-full inline-flex cursor-pointer justify-start'>
              <span className='mr-3'>
                <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='#ffffff' viewBox='0 0 256 256'>
                  <path d='M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM128,24a8,8,0,0,0-8,8v91.82L41.19,169.73a8,8,0,0,0-2.87,11A104,104,0,1,0,128,24Zm0,192a88.47,88.47,0,0,1-71.49-36.68l75.52-44a8,8,0,0,0,4-6.92V40.36A88,88,0,0,1,128,216Z'></path>
                </svg>
              </span>
              <span>
                My Portfolio
              </span>
        </Button>
        <Button
            onClick={redirectToWalletTracker}
            className='bg-black hover:bg-zinc-800 p-4 mb-1 w-full inline-flex cursor-pointer justify-start'>
              <span className='mr-2'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
              </svg>
              </span>
              <span>
                Wallet Tracker
              </span>
        </Button>
        <Button
            onClick={redirectToCollections}
            className='bg-black hover:bg-zinc-800 p-4 mb-1 w-full inline-flex cursor-pointer justify-start'>
              <span className='mr-2'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/>
              </svg>
              </span>
              <span>
                NFT Market
              </span>
        </Button>
        <Button
          onClick={disconnect}
          className='bg-black hover:bg-zinc-800 p-4 w-full inline-flex cursor-pointer justify-start'>
            <span className='mr-3'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='size-5 text-red-700'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9' />
               </svg>
            </span>
            <span
              className='text-red-700'>
               Disconnect
            </span>
        </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
