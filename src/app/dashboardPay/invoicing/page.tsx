// app/dashboardPay/invoicing/page.tsx  (or /billing/invoices/page.tsx if you prefer)
'use client'

import { useRouter } from 'next/navigation'

export default function InvoicesPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        {/* Hero */}
        <section className="rounded-2xl bg-zinc-100 p-6 md:p-8">
          <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-[11px] font-medium text-zinc-700">
            Invoicing
          </span>

          <h1 className="mt-4 text-3xl md:text-[40px] leading-[1.1] font-semibold text-zinc-900 max-w-4xl">
            Get paid fast with Invoicing
          </h1>

          <p className="mt-4 max-w-3xl text-[15px] text-zinc-700">
            Send invoices with a link to pay online. Accept cards, bank transfers, and more.
            Automatically send overdue reminders and give your customers a place to pay and
            download their invoices.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.push('/dashboardPay/invoicing/new')}
              className="inline-flex items-center rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
            >
              Create a test invoice
            </button>
            <button
              onClick={() => router.push('/docs/invoicing/demo')}
              className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Watch demo
            </button>
          </div>

          <div className="mt-4 text-sm text-zinc-600">
            Pay as you go –{' '}
            <a href="/docs/billing/pricing" className="text-violet-600 hover:text-violet-800 font-medium">
              View plans
            </a>
          </div>
        </section>

        {/* Quick actions */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfoCard
            title="Brand and customize your invoices"
            body="Manage branding, add payment methods, set reminders, and more."
            cta="Invoice settings"
            onClick={() => router.push('/dashboardPay/invoicing/settings')}
          />
          <InfoCard
            title="Set up your customer portal"
            body="Set up a Stripe-hosted portal that allows your customers to pay invoices, check statuses, download PDFs, and update billing details."
            cta="Set up your portal"
            onClick={() => router.push('/dashboardPay/portal')}
          />
          <InfoCard
            title="Grow your business with Billing"
            body="Manage customers, collect revenue, close your books, and automate tax collection."
            cta="Go to Billing"
            onClick={() => router.push('/dashboardPay/billing')}
          />
        </section>
      </div>
    </main>
  )
}

/* ---------- UI bits ---------- */

function InfoCard({
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
