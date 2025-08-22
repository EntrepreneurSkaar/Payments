'use client'

import { useState } from 'react'
import {
  Wallet,
  Banknote,
  ArrowDownToLine,
  Euro,
  DollarSign,
  PlusCircle,
} from 'lucide-react'
import PayoutModal from './components/PayoutModal'

const balances = [
  {
    currency: 'NOK',
    amount: '24 900',
    available: '22 300',
    icon: Banknote,
  },
  {
    currency: 'EUR',
    amount: '1 200',
    available: '1 000',
    icon: Euro,
  },
  {
    currency: 'USD',
    amount: '560',
    available: '560',
    icon: DollarSign,
  },
]

export default function BalancesPage() {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Payout Modal */}
      <PayoutModal isOpen={openModal} onClose={() => setOpenModal(false)} />

      {/* Add Bank Account Banner */}
      <div className="flex items-center justify-between bg-zinc-50 border border-dashed border-zinc-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center">
            <PlusCircle className="w-5 h-5 text-lime-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-black">Add a bank account</p>
            <p className="text-xs text-zinc-500">
              Set up a payout destination to withdraw your funds.
            </p>
          </div>
        </div>
        <button className="text-sm font-medium bg-lime-400 hover:bg-lime-500 text-black px-4 py-2 rounded-md transition">
          Add account
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Balances</h1>

      {/* Summary Card */}
      <div className="mb-8 p-6 bg-white border border-zinc-200 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-zinc-700">
            <Wallet className="w-5 h-5" />
            <span className="font-medium text-sm">Total balance</span>
          </div>
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black text-sm font-medium px-4 py-2 rounded-md transition"
          >
            <ArrowDownToLine className="w-4 h-4" />
            Payout
          </button>
        </div>
        <div className="text-3xl font-semibold text-black">275 660 NOK</div>
        <div className="text-sm text-zinc-500 mt-1">Across all currencies</div>
      </div>

      {/* Currency Wallets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {balances.map(({ currency, amount, available, icon: Icon }) => (
          <div
            key={currency}
            className="flex items-center justify-between bg-white border border-zinc-200 rounded-xl p-4 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center">
                <Icon className="w-5 h-5 text-zinc-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-black">{currency} Wallet</p>
                <p className="text-xs text-zinc-500">Available: {available} {currency}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-black">{amount} {currency}</p>
              <p className="text-xs text-zinc-500">Balance</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
