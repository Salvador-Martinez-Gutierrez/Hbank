'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export const addTransaction = async (formData) => {
  const transactionType = formData.get('transactionType')
  const collection = formData.get('collection')
  const price = formData.get('price')
  const units = formData.get('units')
  let buyPriceInHbar
  let sellPriceInHbar

  if (transactionType === 'buy') {
    buyPriceInHbar = price
  } else {
    sellPriceInHbar = price
  }

  if (transactionType === null || collection === null || price === null || units === null) return false

  const supabase = createServerActionClient({ cookies })
  // revisar si el usuario realmente está autenticado
  const { data: { user } } = await supabase.auth.getUser()
  if (user === null) return

  await supabase.from('transactions').insert({ collection, transactionType, units, buyPriceInHbar, sellPriceInHbar, user_id: user.id })

  revalidatePath('/')

  return true
}
