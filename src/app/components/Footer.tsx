import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-black min-h-[650]'>
      <div className='flex justify-center p-4'>
      <Link target="_blank" href={'https://twitter.com/300SMG'}>
        <Image
          src='/twitter.png'
          alt="Twitter"
          width={50}
          height={50}
        />
      </Link>
      <Link target="_blank" href={'https://discord.gg/ETAsvAvT3R'}>
        <Image
          src='/discord.png'
          alt="Discord"
          width={50}
          height={50}
        />
      </Link>
      </div>

      <div className='text-white text-sm flex justify-center pb-4 gap-3'>
        <Link target="_blank" href={'/terms'}>
          <button className='underline'>Terms of Use</button>
        </Link>
        <Link target="_blank" href={'/privacy'}>
          <button className='underline'>Privacy Policy</button>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
