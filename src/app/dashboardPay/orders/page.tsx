'use client'

import { useRouter } from 'next/navigation'
import { ShoppingCart, Upload } from 'lucide-react'

export default function OrdersPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Orders</h1>
            <p className="text-sm text-gray-600 mt-1">Manage orders, refunds, and fulfillment.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/orders/import')}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              <Upload className="h-4 w-4" />
              Import CSV
            </button>
            <button
              onClick={() => router.push('/dashboard/orders/new')}
              className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              Create order
            </button>
          </div>
        </div>

        {/* Filters (non-functional placeholders for now) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search orders, customers, or #"
            className="w-full sm:flex-1 px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
          />
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              All
            </button>
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              Unfulfilled
            </button>
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              Unpaid
            </button>
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              Refunded
            </button>
          </div>
        </div>

        {/* Empty state */}
        <section className="mt-8">
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">No orders yet</h2>
            <p className="mt-2 text-sm text-gray-600">
              Orders will appear here as soon as your store starts selling.
              You can also create a draft order or import historical data.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.push('/dashboard/orders/new')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
                Create order
              </button>
              <button
                onClick={() => router.push('/dashboard/orders/import')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Import CSV
              </button>
            </div>

            {/* Helper link */}
            <div className="mt-4 text-xs text-gray-500">
              <a href="/help/orders" className="underline hover:text-gray-700">
                How draft orders work
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
