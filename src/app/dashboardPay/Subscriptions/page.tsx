// app/dashboardPay/subscriptions/page.tsx
'use client'

import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Download,
  BarChart3,
  Settings2,
  CalendarClock,
  ArrowRight,
} from 'lucide-react'

type TopTab = 'all' | 'clocks' | 'migrations'

export default function SubscriptionsPage() {
  const router = useRouter()
  const [tab, setTab] = useState<TopTab>('all')

  // sliding underline refs/state
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tabRefs: Record<TopTab, React.RefObject<HTMLButtonElement>> = {
    all: useRef<HTMLButtonElement>(null),
    clocks: useRef<HTMLButtonElement>(null),
    migrations: useRef<HTMLButtonElement>(null),
  }
  const [bar, setBar] = useState({ left: 0, width: 0, opacity: 0 })

  const updateBar = () => {
    const el = tabRefs[tab].current
    const container = containerRef.current
    if (!el || !container) return
    const cr = container.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setBar({ left: r.left - cr.left, width: r.width, opacity: 1 })
  }

  useEffect(() => {
    updateBar()
  }, [tab])

  useEffect(() => {
    const onResize = () => updateBar()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-8 font-semibold text-zinc-900">Subscriptions</h1>
          <button
            onClick={() => router.push('/dashboardPay/subscriptions/new?mode=test')}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" />
            Create test subscription
            <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px]">
              N
            </span>
          </button>
        </div>

        {/* Top tabs with moving underline */}
        <div className="mt-6 border-b border-zinc-200">
          <div ref={containerRef} className="relative">
            <nav className="-mb-px flex flex-wrap gap-6 text-sm">
              <TopTabBtn ref={tabRefs.all} active={tab === 'all'} onClick={() => setTab('all')}>
                All subscriptions
              </TopTabBtn>
              <TopTabBtn ref={tabRefs.clocks} active={tab === 'clocks'} onClick={() => setTab('clocks')}>
                Test clocks
              </TopTabBtn>
              <TopTabBtn
                ref={tabRefs.migrations}
                active={tab === 'migrations'}
                onClick={() => setTab('migrations')}
              >
                Migrations
              </TopTabBtn>
            </nav>

            <span
              className="pointer-events-none absolute bottom-0 h-[2px] rounded bg-violet-600 transition-all duration-300"
              style={{ left: bar.left, width: bar.width, opacity: bar.opacity, bottom: -1 }}
            />
          </div>
        </div>

        {/* ====== ALL SUBSCRIPTIONS ====== */}
        {tab === 'all' && (
          <>
            {/* Segment-like filters (equal widths) */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
              <BigFilter active>Active</BigFilter>
              <BigFilter>Scheduled</BigFilter>
              <BigFilter>Canceled</BigFilter>
              <BigFilter>Simulated</BigFilter>
              <BigFilter>All</BigFilter>

              {/* Chips + Actions on the same row */}
              <div className="md:col-span-5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <FilterChip>Price</FilterChip>
                  <FilterChip>Simulated</FilterChip>
                  <FilterChip>Created date</FilterChip>
                  <FilterChip>Status · Active</FilterChip>
                  <FilterChip>Customer ID</FilterChip>
                  <FilterChip>More filters</FilterChip>
                  <button className="text-sm text-sky-700 hover:underline">Clear filters</button>
                </div>
                <div className="flex items-center gap-2">
                  <PillBtn>
                    <Download className="h-4 w-4" />
                    Export
                  </PillBtn>
                  <PillBtn>
                    <BarChart3 className="h-4 w-4" />
                    Analyze
                  </PillBtn>
                  <PillBtn>
                    <Settings2 className="h-4 w-4" />
                    Edit columns
                  </PillBtn>
                </div>
              </div>
            </div>

            {/* Empty state */}
            <section className="mt-12">
              <div className="rounded-2xl bg-white p-14 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50">
                  <CalendarClock className="h-6 w-6 text-zinc-500" />
                </div>
                <h3 className="mt-4 text-[15px] font-medium text-zinc-900">No test subscriptions found</h3>
                <p className="mt-2 text-sm text-zinc-600">There aren&apos;t any results for this filter.</p>
              </div>
            </section>

            {/* Helper tiles */}
            <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <HelperCard
                title="Migrate existing subscriptions"
                body="Import existing subscriptions from your business into NordPay."
                cta="Start migration"
                onClick={() => router.push('/dashboardPay/subscriptions/migrate')}
              />
              <HelperCard
                title="Check subscription status"
                body="Keep track of status changes and other details for your products and services."
                cta="View options"
                onClick={() => router.push('/dashboardPay/subscriptions/status')}
              />
              <HelperCard
                title="Set up a self-serve customer portal"
                body="Let customers manage subscriptions, invoices, and billing details."
                cta="Set up portal"
                onClick={() => router.push('/dashboardPay/portal')}
              />
            </section>
          </>
        )}

        {/* ====== TEST CLOCKS ====== */}
        {tab === 'clocks' && (
          <section className="mt-10">
            <div className="rounded-2xl bg-white p-10 md:p-14 text-center">
              <div className="inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600">
                Test clocks
              </div>
              <h2 className="mt-4 text-[26px] md:text-[30px] font-semibold text-zinc-900">
                Simulate billing scenarios through time
              </h2>
              <p className="mt-2 text-sm text-zinc-600 max-w-2xl mx-auto">
                Simplify testing and check that your integration will work exactly as you expected.
              </p>

              {/* Three steps */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <StepCard
                  num={1}
                  title="Create a simulation to set the test clock"
                  body="Then set up your scenario to test."
                >
                  <div className="mx-auto h-36 w-52 rounded-xl bg-zinc-50 border border-zinc-200 p-3">
                    <div className="h-4 w-28 rounded bg-zinc-200" />
                    <div className="mt-3 h-9 rounded-md bg-white border border-zinc-200" />
                    <div className="mt-2 h-9 rounded-md bg-white border border-zinc-200" />
                    <div className="mt-3 mx-auto h-6 w-20 rounded bg-violet-600/90" />
                  </div>
                </StepCard>

                <StepCard
                  num={2}
                  title="Advance the test clock"
                  body="This will simulate events through time."
                >
                  <div className="mx-auto h-36 w-52 rounded-xl bg-zinc-50 border border-zinc-200 p-3">
                    <div className="h-4 w-32 rounded bg-zinc-200" />
                    <div className="mt-3 flex gap-2">
                      <div className="h-7 flex-1 rounded-md bg-white border border-zinc-200" />
                      <div className="h-7 w-16 rounded-md bg-white border border-zinc-200" />
                    </div>
                    <div className="mt-3 mx-auto h-6 w-24 rounded bg-violet-600/90" />
                  </div>
                </StepCard>

                <StepCard
                  num={3}
                  title="Review test objects and events"
                  body="You can make changes and advance the clock again."
                >
                  <div className="mx-auto h-36 w-52 rounded-xl bg-zinc-50 border border-zinc-200 p-3">
                    <div className="h-4 w-20 rounded bg-zinc-200" />
                    <div className="mt-2 space-y-2">
                      <div className="h-3 rounded bg-zinc-100" />
                      <div className="h-3 rounded bg-zinc-100" />
                      <div className="h-3 rounded bg-zinc-100" />
                    </div>
                    <div className="mt-3 ml-auto h-5 w-5 rounded-full bg-emerald-500" />
                  </div>
                </StepCard>
              </div>

              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  onClick={() => router.push('/dashboardPay/subscriptions/test-clocks/new')}
                  className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                >
                  + New simulation
                </button>
                <a
                  href="/docs/billing/test-clocks"
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-700 hover:underline"
                >
                  Learn about test clocks
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* ====== MIGRATIONS ====== */}
        {tab === 'migrations' && (
          <section className="mt-10">
            <div className="rounded-2xl  bg-white p-10 md:p-14 text-center">
              <h2 className="text-[22px] md:text-[24px] font-semibold text-zinc-900">
                Migrate subscriptions to NordPay
              </h2>
              <p className="mt-2 text-sm text-zinc-600 max-w-xl mx-auto">
                Import subscriptions from your existing system and keep your billing running smoothly.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/dashboardPay/subscriptions/migrate')}
                  className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
                >
                  Start migration
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

/* ---------- UI bits ---------- */

type TabProps = {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

const TopTabBtn = forwardRef<HTMLButtonElement, TabProps>(function TopTabBtn(
  { children, active = false, onClick },
  ref
) {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`relative inline-flex items-center rounded-full px-3 py-1.5 mb-2 text-sm transition-colors
        ${active ? 'text-violet-600 font-medium' : 'text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100'}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300`}
    >
      {children}
    </button>
  )
})

function BigFilter({
  children,
  active = false,
}: {
  children: React.ReactNode
  active?: boolean
}) {
  return (
    <div
      className={`rounded-md px-4 py-3 bg-white border text-[15px] ${
        active ? 'border-1 border-violet-500/80 font-medium' : 'border-zinc-300 text-zinc-700'
      }`}
    >
      {children}
    </div>
  )
}

function PillBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3.5 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50">
      {children}
    </button>
  )
}

function FilterChip({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-dashed border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-300 text-[11px] text-zinc-500">
        +
      </span>
      {children}
    </button>
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

      {/* push link to bottom */}
      <div className="mt-auto pt-6">
        <button
          onClick={onClick}
          className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-800 cursor-pointer self-start"
        >
          {cta}
        </button>
      </div>
    </div>
  )
}

function StepCard({
  num,
  title,
  body,
  children,
}: {
  num: number
  title: string
  body: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-white text-xs font-medium">
          {num}
        </div>
        <h4 className="text-[15px] font-medium text-zinc-900">{title}</h4>
      </div>
      <p className="mt-1 text-sm text-zinc-600">{body}</p>
      <div className="mt-4">{children}</div>
    </div>
  )
}
