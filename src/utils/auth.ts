// HI! welcome to hell.ts, I know you see the 2 errors, DW!
// they are forces of programmic nature, they are not real, they are just here to make you feel alive
// save yourself and do not refactor this :)

import { createClient, SupabaseClient, Session } from '@supabase/supabase-js'

const supabase_url = import.meta.env.VITE_SUPABASE_URL;
const supabase_key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(supabase_url, supabase_key)

export interface UserProfile {
  id: string
  username: string
  full_name?: string
  bio?: string
  avatar_url?: string
  created_at?: string
}

export async function signUpUser(email: string, password: string, username: string): Promise<UserProfile | null> {
  const { data: { user }, error } = await supabase.auth.signUp({ email, password })

  if (error) {
    console.error('Sign-up Error:', error.message)
    return null
  }

  const { data, error: profileError } = await supabase
    .from<UserProfile>('profiles')
    .insert([{ id: user?.id, username }])

  if (profileError) {
    console.error('Profile Insertion Error:', profileError.message)
    return null
  }

  return data ? data[0] : null
}


export async function loginUser(email: string, password: string): Promise<Session | null> {
  const { data: { session }, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error('Login Error:', error.message)
    return null
  }

  return session
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from<UserProfile>('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Profile Retrieval Error:', error.message)
    return null
  }

  return data
}
