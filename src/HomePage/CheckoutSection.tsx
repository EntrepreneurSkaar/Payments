'use client'

import { useRouter } from 'next/navigation'

export default function PlatformSection() {
  const router = useRouter()

  return (
    <section className="bg-[#f0eee6] px-4 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Visual placeholder */}
        <div
          className="w-full h-[280px] md:h-[360px] lg:h-[420px] rounded-3xl bg-[#FF9B50] shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
          aria-label="NordSell platform preview"
        />

        {/* Copy */}
        <div>
          <h2 className="text-4xl md:text-5xl tracking-tight text-gray-900">
            The platform to build, run, and grow your store
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Storefronts, checkout, products, orders, and analytics in one calm dashboard.
            VAT MVA and EHF KID are built in so you can focus on brand and growth.
          </p>

          {/* Feature pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              'Premium themes',
              'One page checkout',
              'Subscriptions and memberships',
              'Real time analytics',
            ].map((f) => (
              <span
                key={f}
                className="text-sm text-gray-900 bg-black/5 rounded-full px-3 py-1"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/platform')}
              className="inline-flex items-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 transition"
            >
              Explore the platform
            </button>
            <button
              onClick={() => router.push('/docs')}
              className="inline-flex items-center rounded-full text-gray-900 px-6 py-3 text-sm font-medium hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 transition"
            >
              View docs
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
