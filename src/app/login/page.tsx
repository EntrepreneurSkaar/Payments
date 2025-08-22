'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

export default function Login() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Redirect to magic code login screen
    router.push(`/login/magic-link-login?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 space-y-8">
      {/* Logo and title */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-white" />
        <h1 className="text-xl font-semibold">Sign in</h1>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#111] w-full max-w-md rounded-xl p-12 space-y-8 shadow-2xl"
      >
        {/* Email input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg bg-zinc-900 text-white border border-zinc-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
        >
          Continue
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-sm text-zinc-500">
            <span className="bg-[#111] px-2">or</span>
          </div>
        </div>

        {/* OAuth buttons */}
        <div className="space-y-3">
          <button className="w-full py-3 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition flex items-center justify-center gap-2">
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full py-3 rounded-lg border border-zinc-700 hover:bg-zinc-800 transition flex items-center justify-center gap-2">
            <FaApple className="w-5 h-5" />
            Continue with Apple
          </button>
        </div>

        <p className="text-center text-sm text-zinc-500">
          Don’t have an account?{' '}
          <a href="/signup" className="text-white hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  )
}
