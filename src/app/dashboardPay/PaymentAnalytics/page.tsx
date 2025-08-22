'use client'

import React, { useEffect, useRef, useState, forwardRef } from 'react'
import {
  MessageSquareMore,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  ShieldAlert,
  CreditCard as CardIcon,
} from 'lucide-react'

type TabKey = 'acceptance' | 'authentication' | 'disputes' | 'methods'

export default function PaymentsAnalyticsPage() {
  const [tab, setTab] = useState<TabKey>('acceptance')

  // Sliding underline refs/state
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tabRefs: Record<TabKey, React.RefObject<HTMLButtonElement>> = {
    acceptance: useRef<HTMLButtonElement>(null),
    authentication: useRef<HTMLButtonElement>(null),
    disputes: useRef<HTMLButtonElement>(null),
    methods: useRef<HTMLButtonElement>(null),
  }
  const [bar, setBar] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const updateIndicator = () => {
    const el = tabRefs[tab].current
    const container = containerRef.current
    if (!el || !container) return
    const c = container.getBoundingClientRect()
    const r = el.getBoundingClientRect()
    setBar({ left: r.left - c.left, width: r.width, opacity: 1 })
  }

  useEffect(() => { updateIndicator() }, [tab])
  useEffect(() => {
    const onResize = () => updateIndicator()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-8 font-semibold text-zinc-900">Payments analytics</h1>

          <button
            className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3.5 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            onClick={() =>
              window?.open(
                'mailto:feedback@nordpay.no?subject=Payments%20analytics%20feedback',
                '_blank'
              )
            }
          >
            <MessageSquareMore className="h-4 w-4" />
            Share feedback
          </button>
        </div>

        {/* Tabs with sliding underline */}
        <div className="mt-6 border-b border-zinc-200">
          <div ref={containerRef} className="relative">
            <nav className="-mb-px flex flex-wrap gap-6 text-sm">
              <Tab ref={tabRefs.acceptance} active={tab === 'acceptance'} onClick={() => setTab('acceptance')}>
                Acceptance
              </Tab>
              <Tab
                ref={tabRefs.authentication}
                active={tab === 'authentication'}
                onClick={() => setTab('authentication')}
              >
                Authentication
              </Tab>
              <Tab ref={tabRefs.disputes} active={tab === 'disputes'} onClick={() => setTab('disputes')}>
                Disputes
              </Tab>
              <Tab ref={tabRefs.methods} active={tab === 'methods'} onClick={() => setTab('methods')}>
                Payment methods
              </Tab>
            </nav>

            {/* moving indicator */}
            <span
              className="pointer-events-none absolute h-[2px] rounded bg-violet-600 transition-all duration-300"
              style={{ left: bar.left, width: bar.width, opacity: bar.opacity, bottom: -1 }}
            />
          </div>
        </div>

        {/* Content */}
        <section className="mt-10">
          {tab === 'acceptance' && (
            <EmptyPanel
              icon={AlertTriangle}
              title="This report is only available for live data."
              message="Switch to live mode and process payments to unlock acceptance insights and benchmarks."
            />
          )}

          {tab === 'authentication' && (
            <EmptyPanel
              icon={ShieldCheck}
              title="Authentication overview"
              message="No authentication events in test mode yet."
            >
              <HelpLinks />
            </EmptyPanel>
          )}

          {tab === 'disputes' && (
            <EmptyPanel
              icon={ShieldAlert}
              title="Dispute performance"
              message="No disputes in test mode yet."
            >
              <HelpLinks />
            </EmptyPanel>
          )}

          {tab === 'methods' && (
            <EmptyPanel
              icon={CardIcon}
              title="Payment methods"
              message="You’ll see method-level conversion once you process live payments."
            >
              <HelpLinks />
            </EmptyPanel>
          )}
        </section>
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

const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
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

type IconType = React.ComponentType<{ className?: string }>

function EmptyPanel({
  icon: Icon,
  title,
  message,
  children,
}: {
  icon: IconType
  title: string
  message: string
  children?: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-white p-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-50">
        <Icon className="h-6 w-6 text-zinc-500" />
      </div>
      <h3 className="mt-4 text-[15px] font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{message}</p>
      {children && <div className="mt-6 flex items-center justify-center gap-2">{children}</div>}
    </div>
  )
}

function HelpLinks() {
  return (
    <>
      <GhostLink href="/docs/analytics">Docs</GhostLink>
      <GhostLink href="/docs/best-practices/payments">Best practices</GhostLink>
      <GhostLink href="/support">Contact support</GhostLink>
    </>
  )
}

function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </a>
  )
}
