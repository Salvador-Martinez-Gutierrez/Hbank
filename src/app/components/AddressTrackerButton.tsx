'use client'

import { Button } from '@/app/collections/components/ui/button'

export default function MarketAggregatorButton () {
  const redirectToCollections = () => {
    window.location.href = '/wallet-tracker'
  }

  return (
    <Button
      onClick={redirectToCollections}
      variant='secondary'
      className='border border-white flex items-center space-x-2'
    >
      <span>
        <svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' fill='#000000' viewBox='0 0 256 256'>
          <path d='M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM128,24a8,8,0,0,0-8,8v91.82L41.19,169.73a8,8,0,0,0-2.87,11A104,104,0,1,0,128,24Zm0,192a88.47,88.47,0,0,1-71.49-36.68l75.52-44a8,8,0,0,0,4-6.92V40.36A88,88,0,0,1,128,216Z'></path>
        </svg>
      </span>
      <span>Portfolio Tracker</span>
    </Button>
  )
}