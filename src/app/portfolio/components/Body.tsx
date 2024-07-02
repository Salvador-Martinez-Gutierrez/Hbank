import React from 'react'
import { createServerClient } from '@supabase/ssr'

import { cookies } from 'next/headers'
import { AuthButtonServer } from './auth-button-server.tsx'
import Image from 'next/image'

const Body = async () => {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get (name) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()
  const userId = session?.user.id

  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId) // Filter transactions by user_id

  if (!session) {
    return (
      <main className='bg-neutral-900 flex flex-col justify-center items-center text-center p-6'>
        <h1 className='text-4xl font-bold pt-6 pr-4 pl-4 pb-4'>
          Track your HBAR NFT investments.
        </h1>
        <h2 className= 'text-l pb-2 pl-6 pr-6'>
          Focus on making profits, not on calculating them
        </h2>
        <AuthButtonServer />
        <Image
            className='pt-6'
            src='/portflio.png'
            alt="Track your HBAR NFT performance"
            width={200}
            height={130.84}
          />
      </main>
    )
  } else if (!transactions || transactions.length === 0) {
    const totalValue = 0
    return (
      <>
      <div>
        <PortfolioValue totalValue={totalValue} />
      </div>
        <div>
          <p>
            Start tracking your HBAR NFT investments for FREE.
            <br />
            Focus on making profits, not on calculating them.
          </p>
          <Image
            src='/portflio.png'
            alt="Track your HBAR NFT performance"
            width={200}
            height={130.84}
          />
        </div>
      </>
    )
  }

  // Fetch floor prices for each collection only once
  const floorPrices = {}

  // Update floor prices
  const updateFloorPrices = async () => {
    for (const transaction of transactions) {
      const collectionName = transaction.collection
      if (!floorPrices[collectionName]) {
        const tokenId = collectionsData[0][collectionName]?.tokenId
        const floorPrice = await fetchFloorData(tokenId)
        floorPrices[collectionName] = floorPrice
      }
    }
  }

  // Initial update of floor prices
  await updateFloorPrices()

  // Set interval to update floor prices every 30 minutes
  setInterval(updateFloorPrices, 30 * 60 * 1000)

  // Fetch Hbar price
  let hbarPrice = 0

  const fetchPrice = async () => {
    hbarPrice = await fetchHbarPrice()
  }

  // Initial update of floor prices
  await fetchPrice()

  // Set interval to update floor prices every 30 minutes
  setInterval(fetchPrice, 30 * 60 * 1000)

  // Render JSX
  return (
    <>
      <TransactionTable transactions={transactions} floorPrices={floorPrices} hbarPrice={hbarPrice}/>
    </>
  )
}

export default Body
