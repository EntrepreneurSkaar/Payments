// app/dashboardPay/connect/accounts/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'

export default function ConnectedAccountsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        {/* Hero */}
        <section className="rounded-2xl bg-zinc-50 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left copy */}
            <div>
              <span className="inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600">
                Connect
              </span>
              <h1 className="mt-3 text-[28px] md:text-[32px] leading-[1.15] font-semibold text-zinc-900">
                Connected accounts
              </h1>
              <p className="mt-3 text-sm text-zinc-700 max-w-xl">
                Your users will charge their customers using their connected accounts. You can
                configure accounts with different settings depending on how your business works.
              </p>

              <div className="mt-6">
                <button
                  onClick={() => router.push('/dashboardPay/connect/accounts/new?mode=test')}
                  className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                >
                  <Plus className="h-4 w-4" />
                  Create test account
                </button>
              </div>
            </div>

            {/* Right: lightweight illustration */}
            <div className="hidden md:block">
              <div className="mx-auto aspect-[4/3] w-full max-w-md rounded-2xl bg-white p-5">
                {/* nodes */}
                <div className="grid h-full grid-cols-3 grid-rows-3">
                  <div className="col-start-1 row-start-1">
                    <Node label="Customer" />
                  </div>
                  <div className="col-start-2 row-start-2 flex items-center justify-center">
                    <Node accent label="Connected account" />
                  </div>
                  <div className="col-start-3 row-start-3 ml-auto">
                    <Node label="New business…" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Helper tiles */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <HelperCard
            title="Onboard accounts"
            body="Choose from hosted, embedded, or API onboarding."
            cta="View docs"
            onClick={() => router.push('/docs/connect/onboarding')}
          />

          <HelperCard
            title="Manage accounts"
            body="Learn how to find and manage connected accounts in the Dashboard."
            cta="View docs"
            onClick={() => router.push("/docs/connect/manage")}
          />
        </section>
      </div>
    </main>
  )
}

/* ---------- UI bits ---------- */

function Node({ label, accent = false }: { label: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-lg px-3 py-2 text-center ${
        accent
          ? 'border-sky-200 bg-sky-50 text-sky-800'
          : 'border-zinc-200 bg-zinc-50 text-zinc-700'
      } text-[11px]`}
    >
      {label}
    </div>
  )
}

function HelperCard({
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
    <div className="rounded-2xl bg-zinc-50 p-5 flex flex-col h-full">
      <h4 className="text-[15px] font-medium text-zinc-900">{title}</h4>
      <p className="mt-1 text-sm text-zinc-600">{body}</p>

      {/* push link to the bottom */}
      <div className="mt-auto pt-6">
        <button
          onClick={onClick}
          className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-800"
        >
          {cta}
        </button>
      </div>
    </div>
  )
}
