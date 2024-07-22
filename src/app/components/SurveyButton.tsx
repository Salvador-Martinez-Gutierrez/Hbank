'use client'

import { Button } from '@/app/collections/components/ui/button'

export default function SurveyButton () {
  const redirectToUrl = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfa_cp8zmwZMu-Ubk-EfmC6PO29xX--JKheCrTF5b6OkT2VxQ/viewform?usp=sf_link', '_blank')
  }

  return (
    <Button
      onClick={redirectToUrl}
      className='bg-blue-500 hover:bg-blue-400'>
        Feedback Form 👀
    </Button>
  )
}
