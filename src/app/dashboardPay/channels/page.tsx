'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Store,
  CreditCard,
  Share2,
  Globe,
  Code2,
  Sparkles,
} from 'lucide-react'

type Channel = {
  id: string
  name: string
  description: string
  icon: any
  status: 'connected' | 'disconnected' | 'coming_soon'
  href?: string
}

export default function ChannelsPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'connected' | 'disconnected'>('all')

  const channels: Channel[] = [
    {
      id: 'online-store',
      name: 'Online store',
      description: 'Themes, pages, and checkout on your domain.',
      icon: Store,
      status: 'connected',
      href: '/dashboard/themes',
    },
    {
      id: 'pos',
      name: 'Point of Sale',
      description: 'Sell in person with hardware and instant sync.',
      icon: CreditCard,
      status: 'disconnected',
      href: '/dashboard/channels/connect?target=pos',
    },
    {
      id: 'meta',
      name: 'Instagram & Facebook',
      description: 'Sync catalog, tag products, and sell in-app.',
      icon: Share2,
      status: 'disconnected',
      href: '/dashboard/channels/connect?target=meta',
    },
    {
      id: 'tiktok',
      name: 'TikTok Shop',
      description: 'Open your product catalog to TikTok shoppers.',
      icon: Sparkles,
      status: 'coming_soon',
    },
    {
      id: 'google',
      name: 'Google Shopping',
      description: 'Free listings and Shopping ads with live feed.',
      icon: Globe,
      status: 'disconnected',
      href: '/dashboard/channels/connect?target=google',
    },
    {
      id: 'headless',
      name: 'Custom storefront (API)',
      description: 'Headless via GraphQL/REST for apps or kiosks.',
      icon: Code2,
      status: 'disconnected',
      href: '/dashboard/channels/connect?target=headless',
    },
  ]

  const filtered = useMemo(() => {
    return channels.filter((c) => {
      const matchesQuery =
        !query ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      const matchesFilter =
        filter === 'all' ? true : filter === 'connected' ? c.status === 'connected' : c.status === 'disconnected'
      return matchesQuery && matchesFilter
    })
  }, [channels, query, filter])

  const anyConnected = channels.some((c) => c.status === 'connected')

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Channels</h1>
            <p className="text-sm text-gray-600 mt-1">Sell on your site, in-store, and across social and search.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/dashboard/feeds')}
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
            >
              Manage feeds
            </button>
            <button
              onClick={() => router.push('/dashboard/channels/connect')}
              className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
            >
              Add channel
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search channels"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full sm:flex-1 px-4 py-2.5 rounded-full border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
          />
          <div className="flex items-center gap-2">
            <FilterPill label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
            <FilterPill label="Connected" active={filter === 'connected'} onClick={() => setFilter('connected')} />
            <FilterPill label="Not connected" active={filter === 'disconnected'} onClick={() => setFilter('disconnected')} />
          </div>
        </div>

        {/* Empty banner if none connected */}
        {!anyConnected && (
          <div className="mt-6 rounded-3xl border-2 border-dashed border-gray-200 bg-white p-6 text-center">
            <p className="text-sm text-gray-700">
              No channels connected yet. Connect your first channel to start selling.
            </p>
          </div>
        )}

        {/* Channel cards */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <ChannelCard key={c.id} channel={c} onOpen={(href) => href && router.push(href)} />
          ))}
        </section>
      </div>
    </main>
  )
}

/* --- Pieces --- */

function ChannelCard({
  channel,
  onOpen,
}: {
  channel: Channel
  onOpen: (href?: string) => void
}) {
  const Icon = channel.icon
  const isConnected = channel.status === 'connected'
  const isComing = channel.status === 'coming_soon'

  return (
    <div className="rounded-3xl bg-white border border-black/10 p-5">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon className="h-5 w-5 text-gray-800" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">{channel.name}</h3>
            {isConnected && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Connected</span>
            )}
            {isComing && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">Coming soon</span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-600">{channel.description}</p>

          <div className="mt-4 flex items-center gap-2">
            {isConnected ? (
              <>
                <button
                  onClick={() => onOpen(channel.href)}
                  className="inline-flex items-center rounded-full bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-900 transition"
                >
                  Manage
                </button>
                <button
                  onClick={() => onOpen('/dashboard/feeds')}
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50 transition"
                >
                  View feed
                </button>
              </>
            ) : isComing ? (
              <button
                disabled
                className="inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-xs font-medium text-gray-600 cursor-not-allowed"
              >
                Not yet available
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpen(channel.href)}
                  className="inline-flex items-center rounded-full bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-900 transition"
                >
                  Connect
                </button>
                <button
                  onClick={() => onOpen('/dashboard/feeds')}
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 hover:bg-gray-50 transition"
                >
                  Learn more
                </button>
              </>
            )}
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
