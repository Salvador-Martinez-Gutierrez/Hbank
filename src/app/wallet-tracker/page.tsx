'use client'

import WalletChecker from './components/WalletChecker'

const WalletTrackerHome = () => {
  return (
    <main className='bg-neutral-900 text-neutral-200 h-[calc(100vh-200px)] flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center text-center pb-8'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-8 pb-4 md:px-4 lg:px-24 xl:px-28'>
          Easily track your Hedera Portfolio
        </h1>
        <h2 className='text-lg px-4 sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground w-full max-w-[420px] md:max-w-[800px] md:px-4 lg:px-8 xl:px-16'>
          Introduce a valid Account ID and discover the value of all the assets it holds
        </h2>
      </div>
      <WalletChecker showButton={true} />
    </main>
  )
}

export default WalletTrackerHome
