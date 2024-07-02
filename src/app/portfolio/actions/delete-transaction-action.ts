'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export const deleteTransaction = async (transactionId) => {
  if (!transactionId) return false

  const supabase = createServerActionClient({ cookies })

  // Ensure the user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  // Delete the transaction with the specified ID
  await supabase
    .from('transactions')
    .delete()
    .eq('id', transactionId)
    .eq('user_id', user.id)

  revalidatePath('/transactions')

  return true
}
