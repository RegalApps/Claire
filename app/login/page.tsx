"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialLogin } from "@/components/auth/social-login"
import { Phone } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px] border-gray-200">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Phone className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Claire AI Voice Agent</CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SocialLogin />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-center text-sm text-gray-500">
              By continuing, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-gray-900">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-gray-900">
                Privacy Policy
              </a>
              .
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
