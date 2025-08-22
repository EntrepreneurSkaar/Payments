'use client'

import { useRouter } from 'next/navigation'
import { Package, Upload } from 'lucide-react'

export default function ProductsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Products</h1>
            <p className="text-sm text-gray-600 mt-1">Create and manage the items you sell.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/products/import')}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              <Upload className="h-4 w-4" />
              Import CSV
            </button>
            <button
              onClick={() => router.push('/dashboard/products/new')}
              className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              Add product
            </button>
          </div>
        </div>

        {/* Empty state */}
        <section className="mt-8">
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Package className="h-6 w-6 text-gray-700" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">No products yet</h2>
            <p className="mt-2 text-sm text-gray-600">
              Create your first product, or import a CSV to get started fast.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.push('/dashboard/products/new')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
                Add product
              </button>
              <button
                onClick={() => router.push('/dashboard/products/import')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Import CSV
              </button>
            </div>

            {/* Helper links */}
            <div className="mt-4 text-xs text-gray-500">
              <a href="/help/products" className="underline hover:text-gray-700">How to structure your product CSV</a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
