import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const requestedNext = searchParams.get('next')
  const next = requestedNext?.startsWith('/') && !requestedNext.startsWith('//')
    ? requestedNext
    : '/feed'

  // Behind a reverse proxy (e.g. Google Cloud Run / AI Studio preview), request.url
  // carries the container's internal bind address (0.0.0.0:3000). Always trust
  // x-forwarded headers or APP_URL so redirects return to the browser-accessible public domain.
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'
  let base = origin
  if (forwardedHost) {
    base = `${forwardedProto}://${forwardedHost}`
  } else if (process.env.APP_URL) {
    base = process.env.APP_URL.replace(/\/$/, '')
  } else if (base.includes('0.0.0.0')) {
    base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  }

  // Check if OAuth provider returned an error
  const incomingError = searchParams.get('error_description') || searchParams.get('error')
  if (incomingError) {
    console.error('[auth/callback] OAuth provider error:', incomingError)
    const errParam = encodeURIComponent(incomingError)
    return NextResponse.redirect(`${base}/login?error=auth-callback-failed&error_description=${errParam}`)
  }

  if (code) {
    try {
      const cookieStore = await cookies()
      const supabase = await createClient()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) {
        const response = NextResponse.redirect(`${base}${next}`)
        cookieStore.getAll().forEach((c) => {
          response.cookies.set(c.name, c.value)
        })
        return response
      }
      console.error('[auth/callback] code exchange failed:', error.message)
      const errParam = encodeURIComponent(error.message)
      return NextResponse.redirect(`${base}/login?error=auth-callback-failed&error_description=${errParam}`)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Authentication session exchange failed'
      console.error('[auth/callback] exception during exchange:', msg)
      const errParam = encodeURIComponent(msg)
      return NextResponse.redirect(`${base}/login?error=auth-callback-failed&error_description=${errParam}`)
    }
  }

  return NextResponse.redirect(`${base}/login?error=auth-callback-failed&error_description=${encodeURIComponent('No authorization code received from provider')}`)
}
