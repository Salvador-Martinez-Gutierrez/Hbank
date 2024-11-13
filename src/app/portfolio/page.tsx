import { WalletProvider } from '../context/WalletContext'
import PortfolioTrackerHome from './components/PortfolioTrackerHome'

const WalletTrackerHome = () => {
  return (
    <main className='bg-neutral-900 text-neutral-200 min-h-[calc(100vh-200px)] flex flex-col justify-center items-center'>
      <WalletProvider>
        <PortfolioTrackerHome />
      </WalletProvider>
    </main>
  )
}

export default WalletTrackerHome
