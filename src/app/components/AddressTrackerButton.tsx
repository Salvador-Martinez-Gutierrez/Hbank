import Link from 'next/link'
import { Button } from '@/app/collections/components/ui/button'

interface AddressTrackerButtonProps {
  isWalletCheckerHidden: boolean
  active?: boolean
}

export default function AddressTrackerButton ({ isWalletCheckerHidden, active }: AddressTrackerButtonProps) {
  return (
    <Link href="/wallet-tracker" passHref>
      <Button
        className={`${active === true ? 'bg-zinc-800' : 'bg-black'} hover:bg-zinc-800 ${isWalletCheckerHidden ? 'p-2' : 'ml-4 inline-flex justify-start'}`}
        aria-label="Portfolio Tracker"
      >
        {isWalletCheckerHidden
          ? (
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
            )
          : (
          <>
            <span>
              <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='#ffffff' viewBox='0 0 256 256'>
                <path d='M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM128,24a8,8,0,0,0-8,8v91.82L41.19,169.73a8,8,0,0,0-2.87,11A104,104,0,1,0,128,24Zm0,192a88.47,88.47,0,0,1-71.49-36.68l75.52-44a8,8,0,0,0,4-6.92V40.36A88,88,0,0,1,128,216Z'></path>
              </svg>
            </span>
            <span className='ml-2'>
              Portfolio Tracker
            </span>
          </>
            )}
      </Button>
    </Link>
  )
}
