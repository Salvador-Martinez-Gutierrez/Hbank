import ConnectWalletButton from './ConnectWalletButton'
import HomeButton from './HomeButton'
import WalletChecker from '../wallet-tracker/components/WalletChecker'
import AddressTrackerButton from './AddressTrackerButton'
import MarketAggregatorButton from './MarketAggregatorButton'
import DexAggregatorButton from './DexAggregatorButton'

const NavBar = () => {
  return (
    <nav className='flex justify-between items-center sticky top-0 z-30 h-[75px] bg-black border-b-2 border-black px-4 lg:px-8 xl:px-16'>
      <div className='gap-1 items-center hidden lg:flex'>
        <HomeButton/>
        <AddressTrackerButton/>
        <MarketAggregatorButton/>
        <DexAggregatorButton/>
      </div>
      <div className='gap-1 items-center flex lg:hidden'>
        <HomeButton/>
      </div>
      <div className='flex'>
        <div className='mr-1 hidden sm:block'>
          <WalletChecker showButton={false}/>
        </div>
      <ConnectWalletButton />
      </div>
    </nav>
  )
}

export default NavBar
