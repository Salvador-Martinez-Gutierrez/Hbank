import React from 'react'
import Image from 'next/image'
import SurveyButton from './SurveyButton'
const NavBar = () => {
  return (
    <nav className='flex justify-between items-center sticky top-0 z-30 h-[75px] bg-black border-b-2 border-black px-4 lg:px-8 xl:px-16'>
      <div>
        <Image
          src='/Logo.png'
          alt="logo"
          width={137}
          height={50}
        />
      </div>
      <SurveyButton/>
    </nav>
  )
}

export default NavBar
