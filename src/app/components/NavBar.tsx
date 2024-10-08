'use client'
import { usePathname } from 'next/navigation'
import HomeButton from './HomeButton'
import WalletChecker from '../wallet-tracker/components/WalletChecker'
import AddressTrackerButton from './AddressTrackerButton'
import MarketAggregatorButton from './MarketAggregatorButton'
import SurveyButton from './SurveyButton'
import LoginButton from './LoginButton'
import { WalletProvider } from '../context/WalletContext'

const NavBar = () => {
  const pathname = usePathname()

  return (
    <nav className='flex justify-between items-center sticky top-0 z-30 h-[75px] bg-black border-b-2 border-black px-4 lg:px-8 xl:px-16'>
      <div className='gap-1 items-center hidden lg:flex'>
        <HomeButton/>
        <AddressTrackerButton active={pathname === '/wallet-tracker'} isWalletCheckerHidden={false} />
        <MarketAggregatorButton active={pathname === '/collections'} />
        <SurveyButton/>
      </div>
      <div className='gap-1 items-center flex lg:hidden'>
        <HomeButton/>
      </div>
      <div className='flex items-center'>
        <div className='mr-1 hidden sm:block'>
          <WalletChecker showButton={false}/>
        </div>
        <div className='sm:hidden mr-1'>
          <AddressTrackerButton isWalletCheckerHidden={true} />
        </div>
        <WalletProvider>
          <LoginButton />
        </WalletProvider>
      </div>
    </nav>
  )
}

export default NavBar
