'use client'

import React from 'react'

export default function FeaturedSection() {
  return (
    <div className="p-6 space-y-4">
      <div className="text-lg font-medium">Featured Products</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-100 text-black rounded-md h-28 flex items-center justify-center">
          Product 1
        </div>
        <div className="bg-zinc-100 text-black rounded-md h-28 flex items-center justify-center">
          Product 2
        </div>
      </div>
    </div>
  )
}
