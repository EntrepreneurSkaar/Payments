'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Puzzle, Store, Link2, Code2 } from 'lucide-react'

type AppItem = {
  id: string
  name: string
  description: string
  status: 'installed' | 'recommended' | 'coming_soon'
  href?: string
}

export default function AppsPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'installed' | 'recommended'>('all')

  // MVP: all apps are coming soon
  const apps: AppItem[] = [
    { id: 'meta', name: 'Meta Commerce', description: 'Sync catalog to Facebook & Instagram.', status: 'coming_soon' },
    { id: 'klarna', name: 'Klarna On-Site Messaging', description: 'Show Klarna financing widgets.', status: 'coming_soon' },
    { id: 'reviews', name: 'Product Reviews', description: 'Collect and display product reviews.', status: 'coming_soon' },
    { id: 'email', name: 'Email Marketing', description: 'Automations and newsletters.', status: 'coming_soon' },
  ]

  const anyInstalled = false

  const visible = useMemo(() => {
    return apps.filter((a) => {
      const q = query.trim().toLowerCase()
      const matchesQ = !q || a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      const matchesF =
        filter === 'all'
          ? true
          : filter === 'installed'
          ? false // none installed in MVP
          : true  // treat "recommended" as everything for now
      return matchesQ && matchesF
    })
  }, [apps, query, filter])

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Apps</h1>
            <p className="text-sm text-gray-600 mt-1">Extend your store with integrations and add-ons.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-full bg-gray-200 text-gray-600 px-5 py-2.5 text-sm font-medium cursor-not-allowed"
              title="Coming soon"
            >
              <Store className="h-4 w-4" />
              App store (coming soon)
            </button>
            <button
              disabled
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white text-gray-500 px-4 py-2 text-sm font-medium cursor-not-allowed"
              title="Coming soon"
            >
              <Link2 className="h-4 w-4" />
              Install from URL
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search apps"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:flex-1 px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
          />
          <div className="flex items-center gap-2">
            <FilterPill label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
            <FilterPill label="Installed" active={filter === 'installed'} onClick={() => setFilter('installed')} />
            <FilterPill label="Recommended" active={filter === 'recommended'} onClick={() => setFilter('recommended')} />
          </div>
        </div>

        {/* MVP banner */}
        {!anyInstalled && (
          <div className="mt-6 rounded-3xl border-2 border-dashed border-gray-200 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <Puzzle className="h-6 w-6 text-gray-700" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-gray-900">App store coming soon</h2>
            <p className="mt-2 text-sm text-gray-600">
              We’re launching apps and integrations shortly. Join the waitlist to get notified when it opens.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/waitlist"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
                Join waitlist
              </a>
              <a
                href="/developers/apps"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Build a custom app
              </a>
            </div>
          </div>
        )}

        {/* Cards (all coming soon) */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((a) => (
            <AppCard key={a.id} app={a} />
          ))}
        </section>
      </div>
    </main>
  )
}

/* -------- Pieces -------- */

function AppCard({ app }: { app: AppItem }) {
  const coming = app.status === 'coming_soon'
  return (
    <div className="rounded-3xl bg-white border border-black/10 shadow-sm p-5">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Puzzle className="h-5 w-5 text-gray-800" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">{app.name}</h3>
            {coming && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Coming soon</span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{app.description}</p>

          <div className="mt-4">
            <button
              disabled
              className="inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-xs font-medium text-gray-600 cursor-not-allowed"
            >
              Not yet available
            </button>
          </div>

          <div className="mt-3 text-xs text-gray-500">
            Developer? <a href="/developers/apps" className="underline hover:text-gray-700">See app SDK</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-sm transition border
        ${active ? 'bg-black text-white border-black' : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-50'}
      `}
    >
      {label}
    </button>
  )
}
