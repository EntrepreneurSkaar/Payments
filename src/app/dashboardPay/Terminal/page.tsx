// app/dashboardPay/terminal/page.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function TerminalPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        <section className="rounded-2xl bg-zinc-100 px-6 py-8 md:px-10 md:py-10">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-medium text-zinc-700">
            Terminal
          </span>

          {/* Title & copy */}
          <h1 className="mt-4 text-3xl md:text-[34px] leading-[1.1] font-semibold text-zinc-900">
            Build your perfect point of sale
          </h1>
          <p className="mt-3 max-w-3xl text-[15px] text-zinc-700">
            Integrate your own in-person checkout using flexible developer tools, pre-certified
            card readers, and cloud-based hardware management.
          </p>
          <p className="mt-2 max-w-3xl text-sm text-zinc-600">
            You must build an integration with your point of sale system to process in-person
            payments with NordPay Terminal.
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.push('/dashboardPay/terminal/get-started')}
              className="inline-flex items-center rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              Get started
            </button>
            <button
              onClick={() => router.push('/docs/terminal')}
              className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Learn more
            </button>
          </div>

          {/* Pricing note */}
          <p className="mt-4 text-xs text-zinc-500">
            Pricing starts at 1.4% + NOK 1.00 per successful transaction. Other fees may apply.
          </p>
        </section>
      </div>
    </main>
  )
}
