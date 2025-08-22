'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobilePreviewWrapperProps {
  children: ReactNode
  mobile: boolean
}

export default function MobilePreviewWrapper({ children, mobile }: MobilePreviewWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mobile ? 'mobile' : 'desktop'}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className={
          mobile
            ? 'w-[390px] h-[844px] rounded-xl border border-zinc-800 shadow-lg bg-black overflow-hidden'
            : 'w-full h-full'
        }
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
