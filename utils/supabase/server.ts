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
  const isHttps = process.env.NODE_ENV === 'production' || !!process.env.APP_URL?.startsWith('https')

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        sameSite: isHttps ? 'none' : 'lax',
        secure: isHttps,
        path: '/',
      },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(keysToSet) {
          try {
            keysToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, {
                ...options,
                sameSite: isHttps ? 'none' : (options?.sameSite ?? 'lax'),
                secure: isHttps ? true : (options?.secure ?? false),
                path: '/',
              })
            })
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  )
}
