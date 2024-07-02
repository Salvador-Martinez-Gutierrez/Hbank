import React from 'react'
import Image from 'next/image'

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
      {/*<div className='mr-2'>
        <button className="flex items-center bg-blue-500 text-white p-1 rounded">
          <svg
            className="mr-1"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.85001 7.50043C1.85001 4.37975 4.37963 1.85001 7.50001 1.85001C10.6204 1.85001 13.15 4.37975 13.15 7.50043C13.15 10.6211 10.6204 13.1509 7.50001 13.1509C4.37963 13.1509 1.85001 10.6211 1.85001 7.50043ZM7.50001 0.850006C3.82728 0.850006 0.850006 3.82753 0.850006 7.50043C0.850006 11.1733 3.82728 14.1509 7.50001 14.1509C11.1727 14.1509 14.15 11.1733 14.15 7.50043C14.15 3.82753 11.1727 0.850006 7.50001 0.850006ZM7.00001 8.00001V3.12811C7.16411 3.10954 7.33094 3.10001 7.50001 3.10001C9.93006 3.10001 11.9 5.07014 11.9 7.50043C11.9 7.66935 11.8905 7.83604 11.872 8.00001H7.00001Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
          Portfolio
        </button>
      </div>*/}
    </nav>
  )
}

export default NavBar
