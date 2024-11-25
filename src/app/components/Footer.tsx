import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-black h-[125px]'>
      <div className='flex justify-center items-center p-4 pt-8 gap-4'>
        <Link href="https://x.com/HbankApp" target="_blank" className="flex items-center">
          <svg
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="white"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>
        <Link href="https://www.plazas.social/es/plaza/0.0.1233480" target="_blank">
          <Image
            src='/plaza.png'
            alt="Discord"
            width={30}
            height={30}
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
