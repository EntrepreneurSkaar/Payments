// app/dashboardPay/billing/page.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function BillingOverviewPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        {/* Hero */}
        <section className="rounded-2xl bg-zinc-100 p-6 md:p-8">
          <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-[11px] font-medium text-zinc-700 ">
            Billing
          </span>

          <h1 className="mt-4 text-3xl md:text-[40px] leading-[1.1] font-semibold text-zinc-900 max-w-4xl">
            Manage revenue, automate workflows, and accept payments
          </h1>

          <p className="mt-4 max-w-3xl text-[15px] text-zinc-700">
            Supports one-time, recurring, and usage-based pricing models. Learn
            more about{' '}
            <a
              href="/dashboardPay/subscriptions"
              className="text-violet-600 hover:text-violet-800"
            >
              Subscriptions
            </a>
            ,{' '}
            <a
              href="/dashboardPay/billing/usage-based"
              className="text-violet-600 hover:text-violet-800"
            >
              Usage-based billing
            </a>
            , and{' '}
            <a
              href="/dashboardPay/billing/invoices"
              className="text-violet-600 hover:text-violet-800"
            >
              Invoicing
            </a>
            .
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.push('/dashboardPay/subscriptions')}
              className="inline-flex items-center rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              Get started
            </button>
            <button
              onClick={() => router.push('/docs/billing/demo')}
              className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Watch demo
            </button>
          </div>

          <div className="mt-4 text-sm text-zinc-600">
            Pay as you go or pay monthly ·{' '}
            <a
              href="/docs/billing/pricing"
              className="text-violet-600 hover:text-violet-800 font-medium"
            >
              View plans
            </a>
          </div>
        </section>

        {/* Quick starts */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickStartCard
            title="Create payment links"
            body="Sell a product or subscription by sharing a link to a payment page."
            cta="Create a test payment link"
            onClick={() => router.push('/dashboardPay/payment-links/new')}
          />

          <QuickStartCard
            title="Create a custom subscription"
            body="Collect recurring revenue—from flat-rate plans to usage-based billing and sales-negotiated contracts."
            cta="Create a test subscription"
            onClick={() => router.push('/dashboardPay/subscriptions/new?mode=test')}
          />

          <QuickStartCard
            title="Invoice customers"
            body="Collect one-time payments from a specific customer while automating reconciliation."
            cta="Create a test invoice"
            onClick={() => router.push('/dashboardPay/invoicing/new')}
          />
        </section>
      </div>
    </main>
  )
}

/* ---------- UI bits ---------- */

function QuickStartCard({
  title,
  body,
  cta,
  onClick,
}: {
  title: string
  body: string
  cta: string
  onClick: () => void
}) {
  return (
    <div className="rounded-2xl bg-zinc-50 p-5">
      <h3 className="text-[15px] font-medium text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm text-zinc-600">{body}</p>
      <button
        onClick={onClick}
        className="mt-4 text-sm font-medium text-violet-600 hover:text-violet-800"
      >
        {cta}
      </button>
    </div>
  )
}
