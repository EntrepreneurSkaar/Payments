'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

export default function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !firstName || !lastName) return

    const query = new URLSearchParams({
      first_name: firstName,
      last_name: lastName,
      email,
    }).toString()

    router.push(`/signup/password?${query}`)
  }

  return (
    <div className="min-h-screen bg-[#f0eee6] text-gray-900 flex flex-col items-center justify-center px-4 space-y-8">
      {/* Logo and title above card */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-black" />
        <h1 className="text-xl font-semibold">Sign up</h1>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl p-8 md:p-12 space-y-8"
      >
        {/* Name inputs with labels */}
        <div className="flex gap-4">
          <div className="w-1/2 space-y-2">
            <label className="block text-sm font-medium text-gray-800">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
              required
            />
          </div>
          <div className="w-1/2 space-y-2">
            <label className="block text-sm font-medium text-gray-800">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Your last name"
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
              required
            />
          </div>
        </div>

        {/* Email input with label */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
            required
          />
        </div>

        {/* Continue button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-900 transition focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          Continue
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm text-gray-500">
            <span className="bg-white px-2">or</span>
          </div>
        </div>

        {/* OAuth options */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
          <button
            type="button"
            className="w-full py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            <FaApple className="w-5 h-5 text-black" />
            Continue with Apple
          </button>
        </div>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-gray-900 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  )
}
