'use client'

import Link from 'next/link'
import { X } from 'lucide-react'

export default function SignupHeader() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between border-b border-zinc-100">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 text-[#1F3D2B]">
        <div className="text-xl font-bold tracking-tight">NordPay</div>
      </Link>

      {/* Close Button */}
      <button
        onClick={() => window.history.back()}
        className="text-[#1F3D2B] hover:opacity-70 transition"
        aria-label="Close"
      >
        <X size={20} />
      </button>
    </header>
  )
}
