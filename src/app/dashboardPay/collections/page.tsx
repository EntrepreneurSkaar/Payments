'use client'

import { useRouter } from 'next/navigation'
import { Layers, Wand2 } from 'lucide-react'

export default function CollectionsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Collections</h1>
            <p className="text-sm text-gray-600 mt-1">Group products into curated or automated collections.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/collections/new')}
              className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              Create collection
            </button>
            <button
              onClick={() => router.push('/dashboard/collections/new?type=automated')}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              <Wand2 className="h-4 w-4" />
              Automated rules
            </button>
          </div>
        </div>

        {/* Filters (placeholder) */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search collections"
            className="w-full sm:flex-1 px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
          />
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              All
            </button>
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              Automated
            </button>
            <button className="px-3 py-2 rounded-full text-sm text-gray-800 border border-gray-300 bg-white hover:bg-gray-50">
              Manual
            </button>
          </div>
        </div>

        {/* Empty state */}
        <section className="mt-8">
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Layers className="h-6 w-6 text-gray-700" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">No collections yet</h2>
            <p className="mt-2 text-sm text-gray-600">
              Create a manual collection and add products yourself, or build an automated collection with rules like tags and price.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.push('/dashboard/collections/new')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
                Create collection
              </button>
              <button
                onClick={() => router.push('/dashboard/collections/new?type=automated')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Create automated
              </button>
            </div>

            {/* Helper link */}
            <div className="mt-4 text-xs text-gray-500">
              <a href="/help/collections" className="underline hover:text-gray-700">
                Learn about automated rules
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
