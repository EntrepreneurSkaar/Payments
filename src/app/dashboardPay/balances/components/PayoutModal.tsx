'use client'

import { X, Banknote, ArrowDownToLine } from 'lucide-react'

interface PayoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PayoutModal({ isOpen, onClose }: PayoutModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-zinc-200 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-lime-100 text-lime-600 rounded-full flex items-center justify-center">
            <ArrowDownToLine className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold text-zinc-900">Initiate payout</h2>
        </div>

        {/* Payout Form */}
        <form className="space-y-5" onSubmit={(e) => {
          e.preventDefault()
          onClose()
        }}>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Amount</label>
            <input
              type="number"
              placeholder="e.g. 500"
              className="w-full border border-zinc-300 bg-zinc-50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Payout account</label>
            <select className="w-full border border-zinc-300 bg-zinc-50 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-lime-400">
              <option>Select an account</option>
              <option>•••• 1234 — Sparebank 1</option>
              <option>•••• 9876 — DNB</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-lime-400 hover:bg-lime-500 text-black font-medium px-4 py-2 rounded-md transition"
          >
            <Banknote className="w-4 h-4" />
            Confirm payout
          </button>
        </form>
      </div>
    </div>
  )
}
