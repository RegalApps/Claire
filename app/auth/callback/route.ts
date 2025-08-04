import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/'  
  // Use the request origin or fallback to localhost for local development
  const origin = request.headers.get('origin') || 'http://localhost:3000'
  
  console.log('Auth callback received:', { code: !!code, next })

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    )

    try {
      console.log('Exchanging code for session...')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      console.log('Exchange result:', { success: !error, error: error?.message })
      
      if (!error) {
        const redirectUrl = `${origin}${next}`
        console.log('Authentication successful, redirecting to:', redirectUrl)
        return NextResponse.redirect(redirectUrl)
      } else {
        console.error('Error exchanging code for session:', error)
      }
    } catch (err) {
      console.error('Exception in auth callback:', err)
    }
  }

  console.log('Authentication failed, redirecting to error page')
  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-error?error=callback_failed`)
}
