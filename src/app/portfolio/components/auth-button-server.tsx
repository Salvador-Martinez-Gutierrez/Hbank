import React from 'react'
import { AuthButton } from './auth-button-client'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function AuthButtonServer () {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get (name) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  return <AuthButton session={ session }/>
}
