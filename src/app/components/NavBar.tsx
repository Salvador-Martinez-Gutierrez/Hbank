'use client'
import { usePathname } from 'next/navigation'
import HomeButton from './HomeButton'
import AddressTrackerButton from './AddressTrackerButton'
import MarketAggregatorButton from './MarketAggregatorButton'
import DexAggregatorButton from './DexAggregatorButton'
import SurveyButton from './SurveyButton'
import LoginButton from './LoginButton'
import { WalletProvider } from '../context/WalletContext'
import { SearchBarPage } from './SearchBarPage'

const NavBar = () => {
  const pathname = usePathname()

  return (
    <nav className='flex justify-between items-center sticky top-0 z-30 h-[75px] bg-black border-b-2 border-black px-4 lg:px-8 xl:px-16'>
      <div className='gap-1 items-center hidden lg:flex'>
        <HomeButton/>
        <AddressTrackerButton active={pathname === '/portfolio'} isWalletCheckerHidden={false} />
        <DexAggregatorButton active={pathname === '/tokens'}/>
        <MarketAggregatorButton active={pathname === '/collections'} />
        <SurveyButton/>
      </div>
      <div className='gap-1 items-center flex lg:hidden'>
        <HomeButton/>
      </div>
      <div className='flex items-center'>
        <div className='sm:mr-4 block'>
          <SearchBarPage />
        </div>
        <WalletProvider>
          <LoginButton tittle='Login' />
        </WalletProvider>
      </div>
    </nav>
  )
}

export default NavBar
