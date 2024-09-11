import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-black h-[125px]'>
      <div className='flex justify-center p-4 gap-4'>
        <Link href="https://twitter.com/300SMG" target="_blank">
            <Image
              src='/twitter.png'
              alt="Twitter"
              width={50}
              height={50}
              priority
            />
        </Link>
        <Link href="https://discord.gg/ETAsvAvT3R" target="_blank">
            <Image
              src='/discord.png'
              alt="Discord"
              width={50}
              height={50}
              priority
            />
        </Link>
      </div>

      <div className='text-white text-sm flex justify-center pb-4 gap-3'>
        <Link href="/terms" passHref>
          Terms of Use
        </Link>
        <Link href="/privacy" passHref>
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}

export default Footer
