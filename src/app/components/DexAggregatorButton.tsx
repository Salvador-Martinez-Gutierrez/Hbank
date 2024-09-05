'use client'

import { Button } from '@/app/collections/components/ui/button'

export default function DexAggregatorButton () {
  const redirectToSwap = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSfa_cp8zmwZMu-Ubk-EfmC6PO29xX--JKheCrTF5b6OkT2VxQ/viewform?usp=sf_link',
      '_blank'
    )
  }

  return (
    <Button
      onClick={redirectToSwap}
      className='bg-black hover:bg-zinc-800 inline-flex cursor-pointer justify-start'>
        Survey
    </Button>
  )
}
