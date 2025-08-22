'use client'

import { useRouter } from 'next/navigation'

export default function DesignFirstSection() {
  const router = useRouter()

  return (
    <section className="bg-[#f0eee6] px-4 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 lg:gap-16">
        {/* Copy */}
        <div>
          <h2 className="text-4xl md:text-5xl tracking-tight text-gray-900">
            Beautiful checkout, built to convert
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Give your customers a payment experience they’ll trust and love — fast, responsive, and
            designed to look premium on any device. Customize it to match your brand, and start
            accepting payments in minutes.
          </p>

          <div className="mt-8">
            <button
              onClick={() => router.push('/products/checkout')}
              className="inline-flex items-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 transition"
            >
              Explore checkout
            </button>
          </div>
        </div>

        {/* Taller image card under the text */}
        <div
          className="w-full h-[320px] md:h-[420px] lg:h-[520px] rounded-3xl bg-[#FF9B50] shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          aria-label="Checkout preview placeholder"
        />
      </div>
    </section>
  )
}
