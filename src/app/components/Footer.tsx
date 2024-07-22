import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-black h-[125px]'>
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
          <button>Terms of Use</button>
        </Link>
        <Link target="_blank" href={'/privacy'}>
          <button>Privacy Policy</button>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
