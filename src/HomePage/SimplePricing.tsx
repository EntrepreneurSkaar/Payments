'use client'

import { ArrowUpRight } from 'lucide-react'

export default function SimplePricing() {
  return (
    <section className="bg-[#f0eee6] py-24 px-6 text-center">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <p className="text-gray-500 text-xs  tracking-wider uppercase">
            Early access pricing
          </p>
          <h2 className="text-4xl sm:text-6xl text-gray-900 leading-tight">
            4% + 40¢ per successful transaction
          </h2>
        </div>

        <div className="pt-4">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 group bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
          >
            Learn more 
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  )
}