import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const requestedNext = searchParams.get('next')
  const next = requestedNext?.startsWith('/') && !requestedNext.startsWith('//')
    ? requestedNext
    : '/feed'

  // Behind a proxy or custom domain, request.url carries the *internal* origin
  // (e.g. the container host), so redirecting to it would bounce the user off the
  // public domain. Trust the forwarded headers in production only.
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https'
  const isDev = process.env.NODE_ENV === 'development'
  const base = !isDev && forwardedHost ? `${forwardedProto}://${forwardedHost}` : origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${base}${next}`)
    }
    console.error('[auth/callback] code exchange failed:', error.message)
  }

  return NextResponse.redirect(`${base}/login?error=auth-callback-failed`)
}
