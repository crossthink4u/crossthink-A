import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(url && key && !url.includes('placeholder') && !url.includes('example.com'))
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  if (!isSupabaseConfigured()) {
    return supabaseResponse
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  try {
    const isHttps = process.env.NODE_ENV === 'production' || !!process.env.APP_URL?.startsWith('https')
    const supabase = createServerClient(
      url,
      key,
      {
        cookieOptions: {
          sameSite: isHttps ? 'none' : 'lax',
          secure: isHttps,
          path: '/',
        },
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(keysToSet) {
            keysToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            keysToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, {
                ...options,
                sameSite: isHttps ? 'none' : (options?.sameSite ?? 'lax'),
                secure: isHttps ? true : (options?.secure ?? false),
                path: '/',
              })
            )
          },
        },
      }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    // Safety net: an OAuth/magic-link code can land on any path when Supabase falls
    // back to its configured Site URL instead of our redirectTo. Route it to the
    // handler that actually exchanges it, so the user still ends up signed in.
    if (pathname !== '/auth/callback' && request.nextUrl.searchParams.has('code')) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/callback'
      if (pathname !== '/') redirectUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect logged-in users away from auth pages to the feed
    if (user) {
      if (
        pathname === '/login' ||
        pathname.startsWith('/register')
      ) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/feed'
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Protect authenticated-only routes
    const protectedRoutes = ['/feed', '/profile', '/dashboard', '/workspace']
    const isProtected = protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + '/')
    )

    if (!user && isProtected) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/login'
      redirectUrl.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(redirectUrl)
    }
  } catch (error) {
    console.warn('Supabase middleware auth check failed:', error)
  }

  return supabaseResponse
}
