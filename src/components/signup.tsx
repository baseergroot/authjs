import React from 'react'
import { Input } from './ui/input'
import Link from 'next/link'
import { Button } from './ui/button'
import { FcGoogle } from 'react-icons/fc'
import { ConnectDB } from '@/database/connectDB'
import { auth, signIn } from '@/auth'
import bcrypt from 'bcryptjs'
import User from '@/database/models/User'
import { redirect } from 'next/navigation'

const Signup = async () => {
  const session = await auth()
    if (session) redirect("/")
  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header Section */}
        <div className="px-6 py-8 sm:px-8 sm:py-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              Create Account
            </h1>
            <p className="text-sm text-slate-600">
              Get started with your free account today
            </p>
          </div>

          {/* Google Signup Form */}
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
              <span className="font-medium">Sign up with Google</span>
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
              await ConnectDB()
              const userExist = await User.findOne({ email: formData.get('email') })
              if (userExist) {
                console.log("user already exist")
              }
              const hashPw = await bcrypt.hash(formData.get('password') as string, 10)
              await User.create({ 
                name: formData.get('name'), 
                email: formData.get('email'), 
                password: hashPw 
              })
              await signIn("credentials", formData)
            }}
          >
            {/* Full Name Input */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="h-11 px-3 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                required
              />
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                className="h-11 px-3 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="h-11 px-3 border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 text-blue-500 border-slate-300 rounded focus:ring-2 focus:ring-blue-500/20 mt-0.5"
                required
              />
              <label htmlFor="terms" className="text-sm text-slate-600 leading-5">
                I agree to the{' '}
                <Link 
                  href="/terms" 
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link 
                  href="/privacy" 
                  className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium mt-6 transition-all duration-200"
            >
              Create Account
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-6 pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link 
                href="/signin" 
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup