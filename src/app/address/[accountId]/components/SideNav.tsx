'use client'
import DashboardButton from './DashboardButton'
import DefiAnalyticsButton from './DefiAnalyticsButton'
import FungibleButton from './FungibleButton'
import NftAnalyticsButton from './NftAnalyticsButton'
import { usePathname } from 'next/navigation'
import CopyableTokenId from '@/app/components/CopyableTokenId'

interface SideNavProps {
  accountId: string
}

const SideNav = ({ accountId }: SideNavProps) => {
  const pathname = usePathname()

  return (
    <nav className='w-full md:w-48 items-left bg-neutral-900 text-neutral-200'>
      <div className='flex flex-col sticky top-[75px]'>
        <CopyableTokenId tokenId={accountId} className='text-xl font-bold pt-9 px-4 lg:px-8 xl:px-16'/>
        <div className='flex flex-col pt-6 gap-6 px-4 lg:px-8 xl:px-16'>
          <DashboardButton accountId={accountId} isActive={pathname === `/address/${accountId}`} />
          <FungibleButton accountId={accountId} isActive={pathname === `/address/${accountId}/fungible-analytics`} />
          <NftAnalyticsButton accountId={accountId} isActive={pathname === `/address/${accountId}/nft-analytics`} />
          <DefiAnalyticsButton accountId={accountId} isActive={pathname === `/address/${accountId}/defi-analytics`} />
        </div>
      </div>
    </nav>
  )
}

export default SideNav
