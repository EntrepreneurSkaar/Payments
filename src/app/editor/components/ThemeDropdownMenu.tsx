'use client'

import { useState, useRef, useEffect } from 'react'
import {
  MoreHorizontal,
  Code2,
  Globe,
  Eye,
  BookOpen,
  Keyboard,
  HelpCircle,
} from 'lucide-react'

export default function ThemeDropdownMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="p-1 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {menuOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-zinc-950 border border-zinc-800 rounded-xl shadow-xl z-50">
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-white text-sm font-semibold">
              Dawn <span className="text-zinc-400">15.4.0</span>
            </p>
            <p className="text-zinc-500 text-xs">Design and support by Shopify</p>
          </div>

          <div className="py-2 text-sm text-white space-y-1">
            {[
              { label: 'Edit code', icon: <Code2 className="w-4 h-4 text-zinc-400" /> },
              { label: 'Edit default theme content', icon: <Globe className="w-4 h-4 text-zinc-400" /> },
              { label: 'View', icon: <Eye className="w-4 h-4 text-zinc-400" /> },
              { label: 'View documentation', icon: <BookOpen className="w-4 h-4 text-zinc-400" /> },
              { label: 'Keyboard shortcuts', icon: <Keyboard className="w-4 h-4 text-zinc-400" /> },
              { label: 'Get support', icon: <HelpCircle className="w-4 h-4 text-zinc-400" /> },
            ].map((item, i) => (
              <button
                key={i}
                className="flex items-center gap-2 px-3 py-2 w-[calc(100%-16px)] mx-2 rounded-md hover:bg-zinc-800 transition text-left"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
