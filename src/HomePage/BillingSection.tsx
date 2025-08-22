'use client'

import { useRouter } from 'next/navigation'

export default function BillingSection() {
  const router = useRouter()

  return (
    <section className="bg-[#f0eee6] px-4 py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Visual left */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="relative">
            <div
              className="w-full h-[320px] md:h-[420px] lg:h-[520px] rounded-3xl bg-[#FF9B50] shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
              aria-label="Billing preview placeholder"
            />
          </div>
        </div>

        {/* Copy (sticky on desktop) */}
        <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24">
          <h2 className="text-4xl md:text-5xl tracking-tight text-gray-900">
            Billing that runs your store
          </h2>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Send tax compliant invoices, run subscriptions and memberships, and collect payments automatically.
            VAT MVA and EHF KID are built in so your books stay clean and your team stays focused on growth.
          </p>

          {/* Feature list */}
          <ul className="mt-6 space-y-3 text-gray-800">
            {[
              'Create branded invoices in seconds with EHF and KID references',
              'Subscriptions with proration, trials, and automatic retries',
              'Smart reminders and dunning that recover failed payments',
              'Payout and order reconciliation that matches to the cent',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900 shrink-0" />
                <span className="text-base">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => router.push('/products/billing')}
              className="inline-flex items-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 transition"
            >
              Set up billing
            </button>
            <button
              onClick={() => router.push('/docs/billing')}
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
