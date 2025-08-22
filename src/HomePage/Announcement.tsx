'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AnnouncementSection() {
  return (
    <section className="bg-[#f0eee6] px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Outer card */}
        <div className="rounded-[32px] bg-[#e3dacc] p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-3 lg:items-center">
            {/* Left: title + copy + CTA */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                Big update: Storefront Editor and Checkout v2
              </h2>
              <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Build faster with a live, section-based editor and a conversion-tested checkout.
                Local payments and MVA stay on autopilot while you scale.
              </p>

              <div className="mt-8">
                <Link
                  href="/blog/announcing-storefront-editor-checkout-v2"
                  className="inline-flex items-center rounded-full border px-5 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
                >
                  Read announcement
                </Link>
              </div>
            </div>

            {/* Right: two compact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                href="/product/storefront-editor"
                className="group rounded-[28px] bg-gray-50 p-6 sm:p-8 transition hover:bg-gray-100"
              >
                <p className="text-sm text-gray-600">Feature details</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">Storefront Editor</p>
                <ArrowRight
                  className="mt-8 h-5 w-5 text-gray-900 opacity-70 group-hover:translate-x-1 transition"
                />
              </Link>

              <Link
                href="/product/checkout"
                className="group rounded-[28px] bg-gray-50 p-6 sm:p-8 transition hover:bg-gray-100"
              >
                <p className="text-sm text-gray-600">Feature details</p>
                <p className="mt-2 text-2xl font-medium text-gray-900">Checkout v2</p>
                <ArrowRight
                  className="mt-8 h-5 w-5 text-gray-900 opacity-70 group-hover:translate-x-1 transition"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
