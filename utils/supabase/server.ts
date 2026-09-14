import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createMockSupabaseClient } from './mockClient'

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url && key && !url.includes('placeholder') && !url.includes('example.com'))
}

export async function createClient() {
  if (!isSupabaseConfigured()) {
    return createMockSupabaseClient() as unknown as ReturnType<typeof createServerClient>
  }

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(keysToSet) {
          try {
            keysToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

