'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

const mockAssets = [
  { name: 'Apple', symbol: 'AAPL', price: 189.45, change: 1.2, type: 'stock' },
  { name: 'Tesla', symbol: 'TSLA', price: 256.78, change: -2.5, type: 'stock' },
  { name: 'Bitcoin', symbol: 'BTC', price: 43950.25, change: 0.9, type: 'crypto' },
  { name: 'Ethereum', symbol: 'ETH', price: 2750.50, change: -1.1, type: 'crypto' },
]

export default function MarketsPage() {
  const [search, setSearch] = useState('')
  const [watchlist, setWatchlist] = useState<string[]>([])

  const filteredAssets = mockAssets.filter(asset =>
    asset.name.toLowerCase().includes(search.toLowerCase()) ||
    asset.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(prev =>
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    )
  }

  return (
    <main className="min-h-screen bg-[#101418] text-white px-6 py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8">Markets</h1>

        <input
          type="text"
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-[#1F3D2B] text-white placeholder-gray-400 px-4 py-3 rounded-lg mb-10 border border-[#2B4A38] focus:outline-none"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.symbol}
              className="bg-[#1F3D2B] p-6 rounded-xl flex flex-col justify-between hover:bg-[#183023] transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{asset.name}</h2>
                  <p className="text-gray-400 text-sm">{asset.symbol}</p>
                </div>
                <button
                  onClick={() => toggleWatchlist(asset.symbol)}
                  className="text-gray-400 hover:text-yellow-400"
                >
                  <Star
                    size={20}
                    fill={watchlist.includes(asset.symbol) ? 'yellow' : 'none'}
                  />
                </button>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-mono">
                  ${asset.price.toLocaleString()}
                </p>
                <p
                  className={`text-sm font-medium ${
                    asset.change >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {asset.change >= 0 ? '+' : ''}
                  {asset.change}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
