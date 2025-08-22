'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function MagicCode() {
  const params = useSearchParams()
  const router = useRouter()
  const email = params.get('email') ?? 'robin@hotmail.no'

  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return
    const updated = [...code]
    updated[index] = value
    setCode(updated)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement | null
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.currentTarget
    if (e.key === 'Backspace' && !target.value && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`) as HTMLInputElement | null
      prev?.focus()
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`) as HTMLInputElement | null
      prev?.focus()
    }
    if (e.key === 'ArrowRight' && index < 5) {
      const next = document.getElementById(`code-${index + 1}`) as HTMLInputElement | null
      next?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!text) return
    e.preventDefault()
    const next = Array.from({ length: 6 }, (_, i) => text[i] ?? '')
    setCode(next)
    const focusIndex = Math.min(text.length - 1, 5)
    const el = document.getElementById(`code-${focusIndex}`) as HTMLInputElement | null
    el?.focus()
  }

  // Auto-redirect when code is full
  useEffect(() => {
    const codeStr = code.join('')
    if (codeStr.length === 6 && code.every((d) => d !== '')) {
      setLoading(true)
      const timeout = setTimeout(() => {
        router.push('/dashboard')
      }, 1200)
      return () => clearTimeout(timeout)
    }
  }, [code, router])

  return (
    <div className="min-h-screen bg-[#f0eee6] text-gray-900 flex flex-col items-center justify-center px-4 space-y-8">
      {/* Logo and header */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-black" />
        <h1 className="text-xl font-semibold">Check your email</h1>
      </div>

      {/* Code entry form */}
      <div
        onPaste={handlePaste}
        className="bg-white rounded-xl px-8 py-6 md:px-10 md:py-8 space-y-6 text-center"
      >
        <p className="text-sm text-gray-600">
          Enter the code sent to <span className="text-gray-900 font-semibold">{email}</span>
        </p>

        <div className="flex gap-2 md:gap-3 justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 md:w-14 md:h-16 text-center text-lg md:text-xl bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
            />
          ))}
        </div>

        {loading && (
          <p className="text-sm text-gray-600 mt-2 animate-pulse">Verifying code…</p>
        )}

        <p className="text-xs text-gray-500 mt-2">
          Can’t find the email? Check your spam folder.
        </p>
      </div>
    </div>
  )
}
