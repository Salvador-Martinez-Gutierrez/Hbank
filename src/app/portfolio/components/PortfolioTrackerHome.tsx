'use client'
import LoginButton from '@/app/components/LoginButton'
import WalletChecker from './WalletChecker'
import { useAccountId } from '@buidlerlabs/hashgraph-react-wallets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const PortfolioTrackerHome = () => {
  const { data: accountId }: { data: string | null } = useAccountId()
  const router = useRouter()

  // Only render content if accountId is null
  if (accountId !== undefined) {
    router.push(`/address/${accountId}`)
    return null
  }

  return (
      <div className='flex flex-col justify-center items-center text-center pb-8 my-8'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-8 pb-4 md:px-4 lg:px-24 xl:px-28'>
          Easily track your Hedera Portfolio
        </h1>
        <h2 className='text-base px-4 sm:text-lg md:text-xl lg:text-2xl text-muted-foreground w-full max-w-[420px] md:max-w-[800px] md:px-4 lg:px-8 xl:px-16 mb-4'>
          Login and discover the value of all the assets you hold:
        </h2>
        <div className='relative w-64 md:w-80 lg:w-96 mb-4 mt-2'>
          <div className='bg-neutral-950 rounded-2xl p-4'>
            <div className='relative aspect-square w-full mb-4'>
              <Image
                src="/Meme.gif"
                alt="Portfolio tracker meme"
                fill
                className='object-contain'
              />
            </div>
            <LoginButton tittle='Connect Wallet'/>
          </div>
        </div>
        <span className='text-base px-4 sm:text-lg md:text-xl lg:text-2xl text-muted-foreground w-full max-w-[420px] md:max-w-[800px] md:px-4 lg:px-8 xl:px-16 mt-4 mb-2'>
          Or search for a valid Account ID:
        </span>
        <WalletChecker showButton={true} />
      </div>
  )
}

export default PortfolioTrackerHome
