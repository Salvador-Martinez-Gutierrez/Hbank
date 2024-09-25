'use client'

import { useState } from 'react'
import SideNav from './SideNav'

interface BurgerMenuProps {
  accountId: string
}

const BurgerMenu = ({ accountId }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className='mr-4 text-2xl md:hidden'
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={toggleMenu}>
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-neutral-900" onClick={(e) => { e.stopPropagation() }}>
            <button
              className="absolute top-9 right-4 text-white text-xl z-30"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
            <SideNav accountId={accountId} />
          </div>
        </div>
      )}
    </>
  )
}

export default BurgerMenu
