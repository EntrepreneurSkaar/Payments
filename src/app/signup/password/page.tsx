'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { HiOutlineMail, HiOutlineEye, HiOutlineEyeOff, HiChevronLeft } from 'react-icons/hi'

export default function SignUpPassword() {
  const params = useSearchParams()
  const router = useRouter()

  // Accept both snake_case and camelCase from the previous step
  const email = params.get('email') ?? ''
  const firstName = params.get('first_name') ?? params.get('firstName') ?? ''
  const lastName = params.get('last_name') ?? params.get('lastName') ?? ''

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()

    // NOTE: For demo only. Don't store passwords in localStorage in production.
    localStorage.setItem('userFirstName', firstName)
    localStorage.setItem('userLastName', lastName)
    localStorage.setItem('userEmail', email)
    localStorage.setItem('userPassword', password)

    router.push(`/signup/magic-code?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen bg-[#f0eee6] text-gray-900 flex flex-col items-center justify-center px-4 space-y-8">
      {/* Logo and title */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-black" />
        <h1 className="text-xl font-semibold">Create a password</h1>
      </div>

      <form
        onSubmit={handleContinue}
        className="bg-white w-full max-w-md rounded-xl p-8 md:p-10 space-y-6"
      >
        {/* Email display */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-800">Email</label>
          <div className="text-sm text-gray-600">{email}</div>
        </div>

        {/* Password input with show/hide toggle */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg bg-white text-gray-900 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-900"
              tabIndex={-1}
            >
              {showPassword ? (
                <HiOutlineEyeOff className="w-5 h-5" />
              ) : (
                <HiOutlineEye className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500">Use at least 8 characters.</p>
        </div>

        {/* Continue button (disabled if password < 8) */}
        <button
          type="submit"
          disabled={password.length < 8}
          className={`w-full py-3 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-black/30 ${
            password.length < 8
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-gray-900'
          }`}
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

        {/* Email code alternative */}
        <button
          type="button"
          onClick={() => router.push(`/signup/magic-code?email=${encodeURIComponent(email)}`)}
          className="w-full py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-black/20"
        >
          <HiOutlineMail className="w-5 h-5" />
          Continue with email code
        </button>
      </form>

      {/* Go back link */}
      <div className="text-sm text-gray-600 mt-4">
        <a href="/signup" className="inline-flex items-center gap-1 hover:underline">
          <HiChevronLeft className="w-4 h-4" />
          Go back
        </a>
      </div>
    </div>
  )
}
