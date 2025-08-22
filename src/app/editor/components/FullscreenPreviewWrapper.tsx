'use client'

import { ReactNode } from 'react'
import clsx from 'clsx'

interface FullscreenPreviewWrapperProps {
  children: ReactNode
  isFullscreen: boolean
}

export default function FullscreenPreviewWrapper({
  children,
  isFullscreen,
}: FullscreenPreviewWrapperProps) {
  return (
    <div
      className={clsx(
        'flex-1 overflow-auto transition-all duration-300 bg-zinc-900',
        isFullscreen ? 'p-0' : 'flex items-center justify-center p-6'
      )}
    >
      <div
        className={clsx(
          'transition-all duration-300 overflow-hidden bg-white rounded-md shadow',
          isFullscreen
            ? 'w-full h-full rounded-none'
            : 'w-full max-w-[1600px] mx-auto'
        )}
      >
        {children}
      </div>
    </div>
  )
}
