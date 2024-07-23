import React from 'react'
import MarketAggregatorButton from './components/MarketAggregatorButton'
import AddressTrackerButton from './components/AddressTrackerButton'

const Home = async () => {
  return (
    <main className="bg-neutral-900 text-neutral-200 h-[calc(100vh-200px)] flex flex-col justify-center items-center">
      <div className='flex flex-col justify-center items-center text-center pb-8'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-8 pb-4 md:px-4 lg:px-24 xl:px-28'>
          The All-in-One Hub for Hedera Investors
        </h1>
        <h2 className='text-lg px-4 sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground w-full max-w-[420px] md:max-w-[800px] md:px-4 lg:px-8 xl:px-16'>
          Track your Portfolio and find new investment opportunities on the Hedera Hashgraph.
        </h2>
      </div>
      <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-2'>
        <AddressTrackerButton />
        <MarketAggregatorButton />
      </div>
    </main>
  )
}

export default Home
