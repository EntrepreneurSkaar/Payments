'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MagicLinkLogin() {
  const params = useSearchParams()
  const router = useRouter()
  const email = params.get('email') ?? 'your@email.com'

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return
    const updated = [...code]
    updated[index] = value
    setCode(updated)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  useEffect(() => {
    const codeStr = code.join('')
    if (codeStr.length === 6 && code.every((d) => d !== '')) {
      setLoading(true)

      // Simulate API + redirect
      const timeout = setTimeout(() => {
        router.push('/dashboard')
      }, 1500)

      return () => clearTimeout(timeout)
    }
  }, [code, router])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 space-y-8">
      {/* Logo and header */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-white" />
        <h1 className="text-xl font-semibold">Check your email</h1>
      </div>

      {/* Code entry box */}
      <div className="bg-[#111] rounded-xl px-8 py-6 space-y-6 shadow-2xl text-center">
        <p className="text-sm text-gray-400">
          Enter the 6-digit code sent to <span className="text-white font-semibold">{email}</span>
        </p>

        <div className="flex gap-2 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-10 h-12 text-center text-lg bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          ))}
        </div>

        {loading && (
          <p className="text-sm text-zinc-500 mt-2 animate-pulse">
            Verifying code...
          </p>
        )}

        <p className="text-xs text-zinc-500 mt-2">
          Didn’t receive it? Check your spam folder or try again.
        </p>
      </div>
    </div>
  )
}
