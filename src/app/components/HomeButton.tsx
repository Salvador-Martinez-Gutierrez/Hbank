'use client'
import Image from 'next/image'

export default function PortfolioTrackerButton () {
  const redirectToHome = () => {
    window.location.href = '/'
  }

  return (
    <button
      onClick={redirectToHome}
    >
      <Image
          src='/Logo.png'
          alt="logo"
          width={137}
          height={50}
        />
    </button>
  )
}
