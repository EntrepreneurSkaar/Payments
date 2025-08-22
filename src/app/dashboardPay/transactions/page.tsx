'use client'

import { useState } from 'react'
import {
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCcw,
  X,
} from 'lucide-react'

const mockTransactions = [
  {
    id: 'txn_001',
    type: 'Payout',
    amount: -3200,
    currency: 'NOK',
    status: 'Completed',
    date: 'Aug 2, 2025',
    icon: ArrowUpRight,
    customer: 'Supersaas AS',
    paymentMethod: 'Bank Account ••••2345',
  },
  {
    id: 'txn_002',
    type: 'Payment',
    amount: 12900,
    currency: 'NOK',
    status: 'Processing',
    date: 'Aug 2, 2025',
    icon: ArrowDownLeft,
    customer: 'Fjordkraft',
    paymentMethod: 'Visa ••••4521',
  },
  {
    id: 'txn_003',
    type: 'Refund',
    amount: -2500,
    currency: 'NOK',
    status: 'Failed',
    date: 'Aug 1, 2025',
    icon: RefreshCcw,
    customer: 'Fiken',
    paymentMethod: 'Mastercard ••••0099',
  },
]

export default function TransactionsPage() {
  const [selectedTxn, setSelectedTxn] = useState<any | null>(null)

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by customer or ID"
            className="pl-10 pr-4 py-2 text-sm border border-zinc-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>
      </div>

      {/* Transaction List */}
      <div className="grid grid-cols-1 gap-4">
        {mockTransactions.map((txn) => (
          <div
            key={txn.id}
            className="flex items-center justify-between p-4 cursor-pointer bg-white border border-zinc-200 rounded-xl transition hover:bg-zinc-50"
            onClick={() => setSelectedTxn(txn)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                <txn.icon className="w-5 h-5 text-zinc-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-black">{txn.customer}</p>
                <p className="text-xs text-zinc-500">
                  {txn.type} • {txn.date}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${txn.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                {txn.amount < 0 ? '-' : '+'}
                {Math.abs(txn.amount).toLocaleString()} {txn.currency}
              </p>
              <p className="text-xs text-zinc-500">{txn.status}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl relative">
            <button
              onClick={() => setSelectedTxn(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold text-black mb-1">
              {selectedTxn.customer}
            </h2>
            <p className="text-sm text-zinc-500 mb-6">{selectedTxn.type} • {selectedTxn.date}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="text-zinc-500">Transaction ID</p>
                <p className="font-medium text-black">{selectedTxn.id}</p>
              </div>

              <div className="space-y-1">
                <p className="text-zinc-500">Status</p>
                <p className="font-medium text-black">{selectedTxn.status}</p>
              </div>

              <div className="space-y-1">
                <p className="text-zinc-500">Amount</p>
                <p className={`font-medium ${selectedTxn.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                  {selectedTxn.amount < 0 ? '-' : '+'}
                  {Math.abs(selectedTxn.amount).toLocaleString()} {selectedTxn.currency}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-zinc-500">Payment Method</p>
                <p className="font-medium text-black">{selectedTxn.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
