'use client'

import React from 'react'
import clsx from 'clsx'



import HeaderSection from '../ThemeComponents/HeaderSection'
import AnnouncementBar from '../ThemeComponents/AnnouncementBar'
import HeroSection from '../ThemeComponents/HeroSection'
import FeaturedSection from '../ThemeComponents/FeaturedSection'
import Footer from '../ThemeComponents/FooterSection'

interface ThemePreviewProps {
  device: 'desktop' | 'mobile' | 'full'
}

export default function ThemePreview({ device }: ThemePreviewProps) {
  return (
    <div
      className={clsx(
        'overflow-hidden transition-all duration-300 ease-in-out bg-white shadow',
        {
          'w-full h-full rounded-none': device === 'desktop' || device === 'full',
          'w-[390px] h-[844px] rounded-xl border border-zinc-300': device === 'mobile',
        }
      )}
    >
      <HeaderSection />
      <AnnouncementBar />
      <HeroSection />
      <FeaturedSection />
      <Footer />
    </div>
  )
}
