import React from 'react'
import updateFloorPrice from './services/updateFloorPrice'
import TabMain from './components/TabMain'

const Home = async () => {
  const updatedCollections = await updateFloorPrice()
  return (
    <main className="bg-neutral-900 text-neutral-200 flex flex-col ">
      <div className='flex flex-col text-center pb-8'>
        <h1 className='mt-20 text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold px-8 pb-4 md:px-4 lg:px-24 xl:px-28'>
          The All-in-One Hub for Hedera Investors
        </h1>
        <h2 className='text-lg sm:text-xl md:text-2xl lg:text-xl text-muted-foreground max-w-[450px] md:max-w-[900px] mx-auto'>
          Trade, track your Portfolio and find new investment opportunities on the Hashgraph.
        </h2>
      </div>
      <div className='justify-center items-center text-center px-4 pb-8 lg:px-8 xl:px-16'>
        <TabMain updatedCollections={updatedCollections}/>
      </div>
    </main>
  )
}

export default Home
