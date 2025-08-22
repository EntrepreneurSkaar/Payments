'use client'

import { useRouter } from 'next/navigation'
import { UsersRound, Upload, UserPlus } from 'lucide-react'

export default function CustomersPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Customers</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your customer list and segments.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/customers/import')}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              <Upload className="h-4 w-4" />
              Import CSV
            </button>
            <button
              onClick={() => router.push('/dashboard/customers/new')}
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              <UserPlus className="h-4 w-4" />
              Add customer
            </button>
          </div>
        </div>

        {/* Filters (placeholder) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search name, email, or phone"
            className="w-full sm:flex-1 px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
          />
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              All
            </button>
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              New
            </button>
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              Returning
            </button>
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              High value
            </button>
          </div>
        </div>

        {/* Empty state */}
        <section className="mt-8">
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <UsersRound className="h-6 w-6 text-gray-700" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">No customers yet</h2>
            <p className="mt-2 text-sm text-gray-600">
              Add your first customer or import an existing list to get started.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.push('/dashboard/customers/new')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
                Add customer
              </button>
              <button
                onClick={() => router.push('/dashboard/customers/import')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Import CSV
              </button>
            </div>

            {/* Helper link */}
            <div className="mt-4 text-xs text-gray-500">
              <a href="/help/customers" className="underline hover:text-gray-700">
                Learn about customer imports
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
