import React from 'react'
import { Input } from './ui/input'
import Link from 'next/link'
import { Button } from './ui/button'
import { FcGoogle } from 'react-icons/fc'
import { auth, signIn } from '@/auth'
import { redirect } from 'next/navigation'

const Signin = async () => {
  const session = await auth()
  if (session) redirect("/")

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-600">
              Sign in to your account to continue
            </p>
          </div>

          {/* Google Signin Form */}
          <form
            className="mb-6"
            action={async () => {
              "use server"
              await signIn("google", {redirectTo: "/"})
            }}
          >
            <Button 
              type="submit"
              variant="outline"
              className="w-full h-11 flex items-center justify-center gap-3 border-slate-300 hover:bg-slate-50 transition-all duration-200"
            >
              <FcGoogle size={20} />
              <span className="font-medium">Sign in with Google</span>
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="px-4 text-sm text-slate-500">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Credentials Form */}
          <form
            className="space-y-4"
            action={async formData => {
              'use server'
              await signIn("credentials", formData)
            }}
          >
            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="h-11 px-3 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="h-11 px-3 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                required
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="w-4 h-4 text-blue-500 border-slate-300 rounded focus:ring-2 focus:ring-blue-500/20"
              />
              <label htmlFor="remember" className="text-sm text-slate-600">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium mt-6 transition-all duration-200"
            >
              Sign In
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin