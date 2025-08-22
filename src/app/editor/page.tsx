'use client'

import { useState } from 'react'
import EditorTopbar from './components/EditorTopbar'
import FullscreenPreviewWrapper from './components/FullscreenPreviewWrapper'
import { motion, AnimatePresence } from 'framer-motion'
import MobilePreviewWrapper from './components/MobilePreviewWrapper'
import ThemePreview from './components/ThemePreview'

export default function EditorPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [device, setDevice] = useState<'desktop' | 'mobile' | 'full'>('desktop')

  const isFullscreen = device === 'full'
  const isMobile = device === 'mobile'

  return (
    <div className="flex flex-col h-screen w-screen bg-black text-white overflow-hidden">
      <EditorTopbar
        fullscreen={isFullscreen}
        onToggleFullscreen={(full) => setDevice(full ? 'full' : 'desktop')}
        setDevice={setDevice}
        device={device}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!isFullscreen && (
          <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
            <div className="px-4 py-4 border-b border-zinc-800 text-sm font-medium">
              Home page
            </div>

            <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2 text-sm">
              <div className="text-xs uppercase text-zinc-500 px-2">Header</div>
              <button onClick={() => setSelectedSection('announcement')} className="w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition">
                Announcement Bar
              </button>
              <button onClick={() => setSelectedSection('header')} className="w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition">
                Header
              </button>

              <div className="text-xs uppercase text-zinc-500 px-2 pt-4">Template</div>
              <button onClick={() => setSelectedSection('image-banner')} className="w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition">
                Image Banner
              </button>
              <button onClick={() => setSelectedSection('featured')} className="w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition">
                Featured Collection
              </button>

              <div className="text-xs uppercase text-zinc-500 px-2 pt-4">Footer</div>
              <button onClick={() => setSelectedSection('footer')} className="w-full text-left px-3 py-2 rounded hover:bg-zinc-800 transition">
                Footer
              </button>
            </div>
          </aside>
        )}

        {/* Main Preview */}
        <main className="flex-1 flex flex-col bg-zinc-900 overflow-hidden">
          <div className="flex-1 overflow-auto flex items-center justify-center">
            <FullscreenPreviewWrapper fullscreen={isFullscreen}>
              <AnimatePresence mode="wait">
                  <MobilePreviewWrapper active={isMobile}>
                      <ThemePreview device={device} />
                  </MobilePreviewWrapper>
              </AnimatePresence>
            </FullscreenPreviewWrapper>
          </div>
        </main>

        {/* Inspector */}
        {!isFullscreen && (
          <aside className="w-72 bg-zinc-950 border-l border-zinc-800 px-4 py-4">
            <div className="text-sm font-medium mb-2">Customize your template</div>
            <p className="text-xs text-zinc-500">
              {selectedSection
                ? `Editing "${selectedSection}" settings...`
                : 'Select a section from the left to begin customizing.'}
            </p>
          </aside>
        )}
      </div>
    </div>
  )
}
