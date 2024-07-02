'use client'
import React from 'react'
import PropTypes from 'prop-types' // Import PropTypes
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export function AuthButton ({ session }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const router = useRouter()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <div className='pt-4'>
      {session === null
        ? (
        <button 
          onClick={handleSignIn}
          className="bg-blue-500 text-white p-1 rounded">
          Sign In
        </button>
          )
        : (
        <button onClick={handleSignOut}>
          Sign Out
        </button>
          )}
    </div>
  )
}

// Define prop types for the AuthButton component
AuthButton.propTypes = {
  session: PropTypes.object // Define the session prop type
}
