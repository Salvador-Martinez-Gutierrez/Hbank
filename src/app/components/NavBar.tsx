import React from 'react'
import SurveyButton from './SurveyButton'
import HomeButton from './HomeButton'
import WalletChecker from '../wallet-tracker/components/WalletChecker'

const NavBar = () => {
  return (
    <nav className='flex justify-between items-center sticky top-0 z-30 h-[75px] bg-black border-b-2 border-black px-4 lg:px-8 xl:px-16'>
      <HomeButton/>
      <div className='flex'>
        <div className='mr-1 hidden sm:block'>
          <WalletChecker showButton={false}/>
        </div>
        <SurveyButton/>
      </div>
    </nav>
  )
}

export default NavBar
