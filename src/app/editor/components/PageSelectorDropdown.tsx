'use client'

import { useState, useRef, useEffect } from 'react'
import {
  ChevronDown,
  Search,
  Home,
  Tag,
  ShoppingCart,
  Lock,
  FileText,
  List,
} from 'lucide-react'

const sections = [
  {
    title: '',
    items: [
      { name: 'Home page', icon: Home },
      { name: 'Products', icon: Tag },
      { name: 'Collections', icon: List },
      { name: 'Collections list', icon: List },
      { name: 'Gift card', icon: FileText },
    ],
  },
  {
    title: '',
    items: [
      { name: 'Cart', icon: ShoppingCart },
      { name: 'Checkout', icon: ShoppingCart },
    ],
  },
  {
    title: '',
    items: [
      { name: 'Pages', icon: FileText },
      { name: 'Blogs', icon: FileText },
      { name: 'Blog posts', icon: FileText },
    ],
  },
  {
    title: '',
    items: [
      { name: 'Search', icon: Search },
      { name: 'Password', icon: Lock },
      { name: '404 page', icon: FileText },
    ],
  },
]

export default function PageSelectorDropdown() {
  const [open, setOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState('Home page')
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative z-50" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800 text-white text-sm"
      >
        {(() => {
          const Icon =
            sections
              .flatMap((section) => section.items)
              .find((item) => item.name === selectedPage)?.icon || Home
          return <Icon className="w-4 h-4 text-white" />
        })()}

        <span>{selectedPage}</span>
        <ChevronDown className="w-4 h-4 text-zinc-400" />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-[360px] bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl">
          {/* Search Bar */}
          <div className="p-3 border-b border-zinc-800">
            <div className="flex items-center gap-2 bg-zinc-900 px-3 py-2 rounded-md">
              <Search className="w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search online store"
                className="bg-transparent outline-none text-white placeholder-zinc-500 w-full text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Sectioned List */}
          <div className="max-h-[400px] overflow-auto py-2">
            {sections.map((section, i) => {
              const filtered = section.items.filter((p) =>
                p.name.toLowerCase().includes(query.toLowerCase())
              )
              if (filtered.length === 0) return null
              return (
                <div key={i}>
                  {i !== 0 && <div className="border-t border-zinc-800 my-2" />}
                  {filtered.map((page) => (
                    <button
                      key={page.name}
                      onClick={() => {
                        setSelectedPage(page.name)
                        setOpen(false)
                      }}
                      className={`flex items-center gap-3 px-4 py-2 mx-2 rounded-md w-[calc(100%-16px)] my-2 text-left text-white text-sm hover:bg-zinc-800 transition ${
                        selectedPage === page.name ? 'bg-zinc-800' : ''
                      }`}
                    >
                      <page.icon className="w-4 h-4 text-zinc-400" />
                      {page.name}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
