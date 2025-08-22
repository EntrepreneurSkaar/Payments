'use client'

import {
  Monitor,
  Smartphone,
  LogOut,
  Undo2,
  Redo2,
  Expand,
  MousePointer2,
  Sparkles,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import PageSelectorDropdown from './PageSelectorDropdown'
import ThemeDropdownMenu from './ThemeDropdownMenu'

interface EditorTopbarProps {
  fullscreen: boolean
  onToggleFullscreen: (value: boolean) => void
  device: 'desktop' | 'mobile' | 'full'
  setDevice: React.Dispatch<React.SetStateAction<'desktop' | 'mobile' | 'full'>>
}

export default function EditorTopbar({
  fullscreen,
  onToggleFullscreen,
  device,
  setDevice,
}: EditorTopbarProps) {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'mobile' | 'full'>('desktop')
  const router = useRouter()

  // Sync activeDevice with fullscreen state
  useEffect(() => {
    setActiveDevice(fullscreen ? 'full' : 'desktop')
  }, [fullscreen])

  return (
    <div className="bg-zinc-950 border-b border-zinc-800 px-6 py-3 text-sm flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button
          className="text-zinc-400 hover:text-white hover:bg-zinc-800 p-1 rounded transition"
          onClick={() => router.push('/dashboard')}
          title="Exit to Dashboard"
        >
          <LogOut className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-white font-medium">
          <span>Dawn</span>
          <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            Live
          </span>
        </div>

        <ThemeDropdownMenu />
      </div>

      {/* Center Section */}
      <PageSelectorDropdown />

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <button className="p-1 hover:bg-zinc-800 rounded transition" title="AI Assistant">
          <Sparkles className="w-4 h-4 text-white" />
        </button>

        <button className="p-1 hover:bg-zinc-800 rounded transition" title="Inspector">
          <MousePointer2 className="w-4 h-4 text-white" />
        </button>

        {/* Device View Switch */}
        <div className="flex items-center bg-zinc-900 rounded-md px-1 py-1">
          <button
            className={`p-1 rounded ${activeDevice === 'desktop' ? 'bg-white text-black shadow-sm' : 'hover:bg-zinc-800 text-white'}`}
            onClick={() => {
              onToggleFullscreen(false)
              setDevice('desktop')
            }}
            title="Desktop view"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            className={`p-1 rounded ${activeDevice === 'mobile' ? 'bg-white text-black shadow-sm' : 'hover:bg-zinc-800 text-white'}`}
            onClick={() => setDevice('mobile')}
            title="Mobile view"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            className={`p-1 rounded ${activeDevice === 'full' ? 'bg-white text-black shadow-sm' : 'hover:bg-zinc-800 text-white'}`}
            onClick={() => {
              onToggleFullscreen(true)
              setDevice('full')
            }}
            title="Fullscreen"
          >
            <Expand className="w-4 h-4" />
          </button>
        </div>

        {/* Undo / Redo */}
        <button className="p-1 rounded text-zinc-500 cursor-not-allowed">
          <Undo2 className="w-4 h-4" />
        </button>
        <button className="p-1 rounded text-zinc-500 cursor-not-allowed">
          <Redo2 className="w-4 h-4" />
        </button>

        <button className="bg-zinc-700 text-white text-sm font-medium px-4 py-1.5 rounded cursor-not-allowed opacity-60">
          Save
        </button>
      </div>
    </div>
  )
}
