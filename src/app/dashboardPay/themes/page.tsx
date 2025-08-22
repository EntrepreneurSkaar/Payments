'use client'

import { useRouter } from 'next/navigation'
import { Palette, Upload } from 'lucide-react'

export default function ThemesPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Themes</h1>
            <p className="text-sm text-gray-600 mt-1">
              Customize your online store with premium themes and a live editor.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/themes/explore')}
              className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              Explore themes
            </button>
            <button
              onClick={() => router.push('/dashboard/themes/upload')}
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              <Upload className="h-4 w-4" />
              Upload theme
            </button>
          </div>
        </div>

        {/* Empty state */}
        <section className="mt-8">
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Palette className="h-6 w-6 text-gray-700" />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-gray-900">No themes yet</h2>
            <p className="mt-2 text-sm text-gray-600">
              Choose a starter theme or upload your own to begin customizing your store.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.push('/dashboard/themes/explore')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
                Explore themes
              </button>
              <button
                onClick={() => router.push('/dashboard/themes/upload')}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Upload theme
              </button>
            </div>

            {/* Helper link */}
            <div className="mt-4 text-xs text-gray-500">
              <a href="/help/themes" className="underline hover:text-gray-700">
                Learn about theme uploads and customization
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
