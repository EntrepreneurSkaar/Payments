'use client'

import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

export default function PaymentLinksPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-8 font-semibold text-zinc-900">Payment Links</h1>

          <button
            onClick={() => router.push('/dashboardPay/payment-links/new')}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" />
            New
            <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px]">
              N
            </span>
          </button>
        </div>

        {/* Hero illustration */}
        <section className="mt-10">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl bg-zinc-50 p-0 overflow-hidden">
              <div className="relative h-[260px] sm:h-[300px]">
                {/* background */}
                <div className="absolute inset-0 bg-white" />

                {/* mock device/card */}
                <div className="absolute left-1/2 top-1/2 w-[84%] -translate-x-1/2 -translate-y-1/2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-white p-4">
                      <div className="h-24 rounded-md bg-[#0BA19A]/90" />
                      <div className="mt-3 h-3 w-24 rounded bg-zinc-200" />
                      <div className="mt-2 h-3 w-32 rounded bg-zinc-100" />
                    </div>
                    <div className="rounded-xl bg-white p-4">
                      <div className="h-6 w-28 rounded bg-zinc-100" />
                      <div className="mt-2 h-3 w-36 rounded bg-zinc-200" />
                      <div className="mt-4 h-9 rounded-md bg-violet-100" />
                      <div className="mt-2 h-9 rounded-md bg-zinc-100" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy + CTA */}
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h2 className="text-2xl md:text-[26px] font-semibold tracking-tight text-zinc-900">
              Create a checkout page in a few clicks
            </h2>
            <p className="mt-2 text-zinc-600">
              Sell products, offer subscriptions, or accept donations with a link—no code required.
            </p>

            <div className="mt-6">
              <button
                onClick={() => router.push('/dashboardPay/payment-links/new?mode=test')}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-700"
              >
                <Plus className="h-4 w-4" />
                Create test payment link
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
