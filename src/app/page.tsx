import Link from "next/link";
import { SignOut } from "./components/sign-out";
import { auth } from "@/auth";
import { ConnectDB } from "@/database/connectDB";
import User from "@/database/models/User";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()
  if (!session) {
    redirect("/signin")
  }
  await ConnectDB()
  
  console.log(session)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🔐</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900">AuthJS Template</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Authenticated</span>
              </div>
              <SignOut />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-6">
            <span>🚀</span>
            AuthJS Template Ready
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Authentication
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            A complete authentication template built with Next.js, AuthJS, MongoDB, and Tailwind CSS. 
            Ready to use for your next project.
          </p>
        </div>

        {/* User Info Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Welcome, {session.user?.name || "User"}!
                </h2>
                <p className="text-slate-600">You are successfully authenticated</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-500 mb-1">Email</h3>
                <p className="text-slate-900 font-medium">
                  {session.user?.email || "Not provided"}
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-500 mb-1">Provider</h3>
                <p className="text-slate-900 font-medium capitalize">
                  {session.user?.provider || "Credentials"}
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-500 mb-1">Session ID</h3>
                <p className="text-slate-900 font-mono text-xs">
                  {session.user?.id?.slice(0, 8) || "N/A"}...
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-500 mb-1">Status</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-700 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure Authentication</h3>
            <p className="text-slate-600 text-sm">
              Built-in security with session management, CSRF protection, and secure cookies.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Multiple Providers</h3>
            <p className="text-slate-600 text-sm">
              Supports Google OAuth, Magic Links, and traditional email/password authentication.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💾</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">MongoDB Ready</h3>
            <p className="text-slate-600 text-sm">
              Pre-configured with MongoDB for user data storage and session management.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Beautiful UI</h3>
            <p className="text-slate-600 text-sm">
              Responsive design with Tailwind CSS and modern authentication forms.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Next.js 15</h3>
            <p className="text-slate-600 text-sm">
              Built on the latest Next.js with App Router and Server Components.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🔧</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Easy Setup</h3>
            <p className="text-slate-600 text-sm">
              Clone, configure environment variables, and you're ready to go!
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready for Your Next Project?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              This template includes everything you need to get started with authentication 
              in your Next.js applications. Copy, customize, and deploy!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/your-repo/authjs-template"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>📦</span>
                View on GitHub
              </a>
              <Link
                href="/signup"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-flex items-center justify-center gap-2"
              >
                <span>👤</span>
                Test Signup Flow
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">
              Built with ❤️ using Next.js, AuthJS, MongoDB, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}