'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaApple, FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { X } from 'lucide-react'

export default function SignupEmailPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleNext = () => {
    if (!email) return
    router.push('/signup/business-info')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-8">
      {/* Header */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-16">
        <div className="text-[#1F3D2B] text-xl font-semibold tracking-tight">NordPay</div>
        <button
          onClick={() => router.back()}
          aria-label="Close"
          className="text-[#1F3D2B] hover:opacity-70 transition"
        >
          <X size={20} />
        </button>
      </header>

      {/* Signup Box */}
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-2xl text-gray-900">Create your NordPay Business account</h1>
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#1F3D2B] underline font-medium">Log in</a>
        </p>

        {/* Email Input */}
        <div className="space-y-2 text-left">
          <label htmlFor="email" className="text-sm text-gray-700">
            First, enter your work email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F3D2B] text-sm"
          />
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-[#1F3D2B] text-white rounded-full py-3 text-sm font-medium hover:opacity-90 transition"
        >
          Next
        </button>

        <div className="text-xs text-gray-500 mt-2">or sign up with</div>

        {/* Social Signups */}
        <div className="flex justify-center gap-4 mt-1">
          <button className="border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition">
            <FcGoogle className="text-xl" />
          </button>
          <button className="border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition">
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
          <button className="border border-gray-300 p-3 rounded-full hover:bg-gray-50 transition">
            <FaApple className="text-black text-xl" />
          </button>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 mt-6">
          By registering, you accept our{' '}
          <a href="/terms" className="underline hover:text-black">Terms of use</a>{' '}
          and{' '}
          <a href="/privacy" className="underline hover:text-black">Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}
