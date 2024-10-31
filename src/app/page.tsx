import React from 'react'
import TabMain from './components/TabMain'
import Link from 'next/link'

const Home = async () => {
  return (
    <main className="bg-neutral-900 text-neutral-200 flex flex-col ">
      <div className='flex flex-col text-center pb-8'>
        <h1 className='mt-20 text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold px-8 pb-4 md:px-4 lg:px-24 xl:px-28'>
          Manage your Hedera Investments like a Pro
        </h1>
        <h2 className='text-lg sm:text-xl md:text-2xl lg:text-xl text-muted-foreground max-w-[450px] md:max-w-[900px] mx-auto'>
          Trade, track your Portfolio and find new investment opportunities on the Hashgraph.
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-10 px-4 w-full max-w-[300px] mx-auto">
        <Link href="/wallet-tracker" className="bg-black p-2 w-full aspect-square rounded-lg flex flex-col items-center justify-center text-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
          <span className="flex justify-center">
            <svg xmlns='http://www.w3.org/2000/svg' width='42' height='42' fill='#ffffff' viewBox='0 0 256 256'>
              <path d='M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62ZM128,24a8,8,0,0,0-8,8v91.82L41.19,169.73a8,8,0,0,0-2.87,11A104,104,0,1,0,128,24Zm0,192a88.47,88.47,0,0,1-71.49-36.68l75.52-44a8,8,0,0,0,4-6.92V40.36A88,88,0,0,1,128,216Z'></path>
            </svg>
          </span>
          <span>Portfolio Tracker</span>
        </Link>
        <Link href="/collections" className="bg-black p-2 w-full aspect-square rounded-lg flex flex-col items-center justify-center text-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-transform hover:scale-105">
          <span className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width='42' height='42' viewBox="0 -960 960 960" fill="#e8eaed">
              <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z"/>
            </svg>
          </span>
          <span>Marketplace Aggregator</span>
        </Link>
      </div>
      <div className='justify-center items-center text-center px-4 pb-8 lg:px-8 xl:px-16'>
        <TabMain />
      </div>
    </main>
  )
}

export default Home
