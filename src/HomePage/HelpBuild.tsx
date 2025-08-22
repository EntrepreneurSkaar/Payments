'use client'

import { useRouter } from 'next/navigation'

export default function HelpBuildSection() {
  const router = useRouter()

  return (
    <section className="bg-[#f0eee6] px-4 py-28 md:py-36">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl leading-[1.08] tracking-tight text-gray-900">
          Launch your store today
        </h2>
        <p className="mt-5 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          From first product to full brand growth, NordSell gives you storefronts, checkout, subscriptions, and analytics in one place.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => router.push('/signup')}
            className="px-7 md:px-8 py-3.5 md:py-4 rounded-full bg-black cursor-pointer text-white text-sm md:text-base font-medium transition hover:bg-gray-900"
          >
            Start selling
          </button>

          <button
            onClick={() => router.push('/pricing')}
            className="px-7 md:px-8 py-3.5 md:py-4 rounded-full cursor-pointer text-gray-900 text-sm md:text-base font-medium transition hover:bg-black/5"
          >
            See pricing
          </button>
        </div>
      </div>
    </section>
  )
}
