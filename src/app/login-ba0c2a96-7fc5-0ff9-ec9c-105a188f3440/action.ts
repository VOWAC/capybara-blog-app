'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  redirect('/')
}

// ログアウト機能の追加
export async function logout() {
  const supabase = createClient()

  // ログアウト処理
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error') // ログアウトエラーの場合、エラーページにリダイレクト
  }

  // ログアウト成功後、ホームページにリダイレクト
  redirect('/')
}
