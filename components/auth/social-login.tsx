"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase"
import { Mail, Lock, UserPlus, LogIn } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SocialLogin() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const supabase = createClient()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    
    try {
      setIsLoading(true)
      // Note: signInWithPassword doesn't support redirectTo in the same way as OAuth
      // We'll handle redirection after successful login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      // If login is successful, redirect manually
      if (!error) {
        window.location.href = '/'
      }
      
      if (error) {
        setErrorMessage(error.message)
      }
    } catch (error: any) {
      console.error('Error signing in with email:', error)
      setErrorMessage(error.message || 'An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: 'http://localhost:3000/auth/callback'
        }
      })
      
      if (error) {
        setErrorMessage(error.message)
      } else {
        // Show success message instead of redirecting, as email verification may be required
        setErrorMessage('Signup successful! Please check your email for verification.')
      }
    } catch (error: any) {
      console.error('Error signing up with email:', error)
      setErrorMessage(error.message || 'An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      console.log('=== GOOGLE LOGIN DEBUGGING ===');
      console.log('1. Starting Google OAuth login process...');
      
      // Log environment variables (without exposing full keys)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 5) + '...';
      console.log('2. Environment check:');
      console.log('   - Supabase URL available:', !!supabaseUrl, supabaseUrl ? `(${supabaseUrl})` : '');
      console.log('   - Supabase Key available:', !!supabaseKey, supabaseKey ? `(starts with: ${supabaseKey})` : '');
      
      // Log OAuth parameters
      const clientId = '646025173975-ni0vueco1cvdt8taa8rld230838qpo8b.apps.googleusercontent.com';
      const redirectUri = 'http://localhost:3000/auth/callback';
      console.log('3. OAuth configuration:');
      console.log('   - Client ID:', clientId);
      console.log('   - Redirect URI:', redirectUri);
      
      console.log('4. Calling Supabase auth.signInWithOAuth...');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
            client_id: clientId
          }
        }
      })
      
      console.log('5. OAuth response received:');
      console.log('   - Success:', !error);
      console.log('   - Data:', data);
      
      if (error) {
        console.error('6. ERROR during Google OAuth:', error);
        console.error('   - Error code:', error.code);
        console.error('   - Error message:', error.message);
        setErrorMessage(error.message);
      } else {
        console.log('6. OAuth successful, redirect URL:', data?.url);
        console.log('   - Redirecting now...');
      }
      
      // The page will redirect automatically if successful
      
    } catch (error: any) {
      console.error('EXCEPTION during Google sign in:', error);
      console.error('Stack trace:', error.stack);
      setErrorMessage(error.message || 'An error occurred during Google sign in')
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Sign Up
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleEmailLogin} className="space-y-4 mt-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                {errorMessage}
              </div>
            )}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Signing in..." : "Sign in with Email"}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleEmailSignup} className="space-y-4 mt-4">
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                {errorMessage}
              </div>
            )}
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Signing up..." : "Sign up with Email"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex items-center justify-center w-full"
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </Button>
    </div>
  )
}
