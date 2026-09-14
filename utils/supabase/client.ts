import { createBrowserClient } from '@supabase/ssr'
import { createMockSupabaseClient } from './mockClient'

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url && key && !url.includes('placeholder') && !url.includes('example.com'))
}

export function createClient() {
  if (isSupabaseConfigured()) {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return createMockSupabaseClient() as unknown as ReturnType<typeof createBrowserClient>
}

