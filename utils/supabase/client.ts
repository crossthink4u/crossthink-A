import { createBrowserClient } from '@supabase/ssr'
import { createMockSupabaseClient } from './mockClient'

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url && key && !url.includes('placeholder') && !url.includes('example.com'))
}

export function createClient() {
  if (isSupabaseConfigured()) {
    const isHttps = typeof window !== 'undefined' ? window.location.protocol === 'https:' : true
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookieOptions: {
          sameSite: isHttps ? 'none' : 'lax',
          secure: isHttps,
          path: '/',
        },
      }
    )
  }
  return createMockSupabaseClient() as unknown as ReturnType<typeof createBrowserClient>
}
