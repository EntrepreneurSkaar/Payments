// app/dashboardPay/transactions/page.tsx
'use client'

import React, { useEffect, useRef, useState, forwardRef } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, FileText, Link as LinkIcon, Repeat, CreditCard } from 'lucide-react'

type TabKey = 'payments' | 'payouts' | 'topups' | 'fees' | 'transfers' | 'all'

export default function TransactionsPage() {
  const router = useRouter()

  // active tab
  const [tab, setTab] = useState<TabKey>('payments')

  // underline refs/state
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tabRefs: Record<TabKey, React.RefObject<HTMLButtonElement>> = {
    payments: useRef<HTMLButtonElement>(null),
    payouts: useRef<HTMLButtonElement>(null),
    topups: useRef<HTMLButtonElement>(null),
    fees: useRef<HTMLButtonElement>(null),
    transfers: useRef<HTMLButtonElement>(null),
    all: useRef<HTMLButtonElement>(null),
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

  // --- Create payment popover ---
  const [openCreate, setOpenCreate] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenCreate(false)
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (openCreate && menuRef.current && !menuRef.current.contains(t) && btnRef.current && !btnRef.current.contains(t)) {
        setOpenCreate(false)
      }
    }
    document.addEventListener('keydown', onDown)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onDown)
      document.removeEventListener('mousedown', onClick)
    }
  }, [openCreate])

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-8 font-semibold text-zinc-900">Transactions</h1>

          {/* Button + anchored popover */}
          <div className="relative">
            <button
              ref={btnRef}
              onClick={() => setOpenCreate(s => !s)}
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
              aria-haspopup="dialog"
              aria-expanded={openCreate}
            >
              <Plus className="h-4 w-4" />
              Create payment
            </button>

            {openCreate && (
              <CreatePaymentMenu
                ref={menuRef}
                onClose={() => setOpenCreate(false)}
                onGo={(href) => { setOpenCreate(false); router.push(href) }}
              />
            )}
          </div>
        </div>

        {/* Tabs with sliding underline */}
        <div className="mt-6 border-b border-zinc-200">
          <div ref={containerRef} className="relative">
            <nav className="-mb-px flex flex-wrap gap-6 text-sm">
              <Tab ref={tabRefs.payments} active={tab === 'payments'} onClick={() => setTab('payments')}>Payments</Tab>
              <Tab ref={tabRefs.payouts} active={tab === 'payouts'} onClick={() => setTab('payouts')}>Payouts</Tab>
              <Tab ref={tabRefs.topups} active={tab === 'topups'} onClick={() => setTab('topups')}>Top-ups</Tab>
              <Tab ref={tabRefs.fees} active={tab === 'fees'} onClick={() => setTab('fees')}>Collected fees</Tab>
              <Tab ref={tabRefs.transfers} active={tab === 'transfers'} onClick={() => setTab('transfers')}>Transfers</Tab>
              <Tab ref={tabRefs.all} active={tab === 'all'} onClick={() => setTab('all')}>All activity</Tab>
            </nav>

            {/* moving indicator */}
            <span
              className="pointer-events-none absolute h-[2px] rounded bg-violet-600 transition-all duration-300"
              style={{ left: bar.left, width: bar.width, opacity: bar.opacity, bottom: -1 }}
            />
          </div>
        </div>

        {/* Intro / chooser */}
        <section className="mt-12 text-center">
          <h2 className="text-[28px] md:text-[32px] leading-[1.15] font-semibold text-zinc-800">
            Choose how to start collecting payments
          </h2>
          <p className="mt-3 text-zinc-600 max-w-2xl mx-auto">
            Get started fast with a no-code option or explore customizable UIs that integrate with our APIs.
          </p>
        </section>

        {/* Cards */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1) Invoice a customer */}
          <OptionCard
            title="Invoice a customer"
            description="Collect one-time or recurring payments from a specific customer while automating reconciliation."
            badges={[
              { label: 'Set up in 1 minute', tone: 'success' },
              { label: 'No code required', tone: 'info' },
            ]}
            primaryCta="Create an invoice"
            onPrimary={() => router.push('/dashboardPay/invoicing/new')}
          >
            <div
              className="h-56 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden"
              aria-label="Invoice mock"
            >
              <div className="absolute right-5 top-6 w-44 rounded-xl bg-white/80 backdrop-blur p-3">
                <div className="h-3 w-20 rounded bg-zinc-200" />
                <div className="mt-2 h-2.5 w-28 rounded bg-zinc-100" />
                <div className="mt-3 h-8 w-full rounded-md bg-zinc-100" />
              </div>
            </div>
          </OptionCard>

          {/* 2) Payment link */}
          <OptionCard
            title="Share a link to a checkout page"
            description="Sell a product or subscription—or accept a donation—by sharing a link to a payment page."
            badges={[
              { label: 'Set up in 1 minute', tone: 'success' },
              { label: 'No code required', tone: 'info' },
            ]}
            primaryCta="Create a payment link"
            onPrimary={() => router.push('/dashboardPay/payment-links/new')}
          >
            <div
              className="h-56 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden"
              aria-label="Payment link mock"
            >
              <div className="absolute left-6 top-6 w-48 rounded-xl bg-white/80 backdrop-blur p-3">
                <div className="h-10 rounded-md bg-zinc-100" />
                <div className="mt-3 h-2.5 w-32 rounded bg-zinc-200" />
                <div className="mt-2 h-2.5 w-24 rounded bg-zinc-100" />
              </div>
              <div className="absolute right-6 bottom-6 w-40 rounded-xl bg-white/90 backdrop-blur p-2">
                <div className="h-2.5 w-28 rounded bg-zinc-200" />
                <div className="mt-2 h-7 w-full rounded-md bg-zinc-100" />
              </div>
            </div>
          </OptionCard>

          {/* 3) Build a custom payment UI */}
          <OptionCard
            title="Build a custom payment UI"
            description="Accept payments on your website and mobile app by integrating our modular UI components with CSS-level styling."
            badges={[{ label: 'Code required', tone: 'neutral' }]}
            secondaryLinkText="Learn more about Elements →"
            onSecondary={() => router.push('/docs/elements')}
          >
            <div
              className="h-56 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden"
              aria-label="Custom UI mock"
            >
              <div className="absolute left-6 top-8 w-60 rounded-xl bg-white/85 backdrop-blur p-4">
                <div className="h-4 w-28 rounded bg-zinc-200" />
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="h-9 rounded-md bg-zinc-100" />
                  <div className="h-9 rounded-md bg-zinc-100" />
                </div>
                <div className="mt-3 h-9 rounded-md bg-zinc-100" />
              </div>
              <div className="absolute right-6 bottom-6 w-28 h-16 rounded-lg bg-white/80" />
            </div>
          </OptionCard>

          {/* 4) Use a prebuilt payment form */}
          <OptionCard
            title="Use a prebuilt payment form"
            description="Embed a conversion-optimized checkout form directly in your site or redirect to a hosted page."
            badges={[{ label: 'Low code', tone: 'info' }]}
            secondaryLinkText="Learn more about Checkout →"
            onSecondary={() => router.push('/products/checkout')}
          >
            <div
              className="h-56 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden"
              aria-label="Prebuilt checkout mock"
            >
              <div className="absolute right-6 top-6 w-40 rounded-xl bg-white/85 backdrop-blur p-3">
                <div className="h-3 w-24 rounded bg-zinc-200" />
                <div className="mt-2 h-2.5 w-28 rounded bg-zinc-100" />
                <div className="mt-2 h-8 rounded-md bg-zinc-100" />
              </div>
              <div className="absolute left-6 bottom-6 w-24 h-40 rounded-2xl bg-white/80" />
            </div>
          </OptionCard>

          {/* 5) Charge customers in person */}
          <OptionCard
            title="Charge customers in person"
            description="Integrate our card readers to accept in-person payments and extend NordPay to your point of sale."
            badges={[{ label: 'Code required', tone: 'neutral' }]}
            secondaryLinkText="Learn more about Terminal →"
            onSecondary={() => router.push('/products/terminal')}
          >
            <div
              className="h-56 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden"
              aria-label="Terminal mock"
            >
              <div className="absolute left-8 top-8 w-24 h-36 rounded-xl bg-zinc-200" />
              <div className="absolute left-[88px] top-14 w-48 rounded-xl bg-white/85 backdrop-blur p-3">
                <div className="h-3 w-24 rounded bg-zinc-200" />
                <div className="mt-2 h-2.5 w-28 rounded bg-zinc-100" />
                <div className="mt-3 h-7 rounded-md bg-zinc-100" />
              </div>
            </div>
          </OptionCard>

          {/* 6) Manually charge a customer */}
          <OptionCard
            title="Manually charge a customer"
            description="Create a payment from the Dashboard by manually entering a customer’s card information."
            badges={[
              { label: 'Set up in 1 minute', tone: 'success' },
              { label: 'No code required', tone: 'info' },
            ]}
            primaryCta="Create a payment"
            onPrimary={() => router.push('/dashboardPay/payments/new')}
          >
            <div
              className="h-56 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-100 relative overflow-hidden"
              aria-label="Manual charge mock"
            >
              <div className="absolute left-6 top-6 right-6 h-24 rounded-xl bg-white/85 backdrop-blur p-4" />
              <div className="absolute right-8 bottom-8 w-44 rounded-xl bg-white p-3">
                <div className="h-2.5 w-28 rounded bg-zinc-200" />
                <div className="mt-2 h-8 rounded-md bg-zinc-100" />
              </div>
            </div>
          </OptionCard>
        </section>
      </div>
    </main>
  )
}

/* ------------------------- Create payment popover ------------------------- */

const CreatePaymentMenu = forwardRef<HTMLDivElement, {
  onClose: () => void
  onGo: (href: string) => void
}>(({ onClose, onGo }, ref) => {
  // key chord: press "c" then one of i/l/s/p within a short window
  const awaitingSecond = useRef(false)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (!awaitingSecond.current) {
        if (k === 'c') {
          awaitingSecond.current = true
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
          timeoutRef.current = window.setTimeout(() => { awaitingSecond.current = false }, 900)
        } else if (k === 'escape') {
          onClose()
        }
        return
      }

      // second key
      awaitingSecond.current = false
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)

      const map: Record<string, string> = {
        i: '/dashboardPay/invoicing/new',
        l: '/dashboardPay/payment-links/new',
        s: '/dashboardPay/subscriptions/new?mode=test',
        p: '/dashboardPay/payments/new',
      }
      if (map[k]) {
        e.preventDefault()
        onGo(map[k])
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onGo, onClose])

  const Item = ({
    icon, title, desc, keys, href,
  }: {
    icon: React.ReactNode
    title: string
    desc: string
    keys: [string, string]
    href: string
  }) => (
    <button
      onClick={() => onGo(href)}
      className="w-full flex items-start justify-between rounded-xl px-3.5 py-3 hover:bg-zinc-50 text-left"
      role="menuitem"
    >
      <span className="inline-flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center text-zinc-600">{icon}</span>
        <span>
          <div className="text-sm font-medium text-zinc-900">{title}</div>
          <div className="mt-0.5 text-sm text-zinc-600">{desc}</div>
        </span>
      </span>
      <span className="inline-flex items-center gap-1 self-start">
        {keys.map((k, i) => (
          <kbd
            key={i}
            className="inline-flex min-w-[0.95rem] items-center justify-center rounded-md bg-zinc-100 px-1 py-0.5 text-[10px] text-zinc-600"
          >
            {k}
          </kbd>
        ))}
      </span>
    </button>
  )

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      className="absolute right-0 mt-2 w-[420px] max-w-[92vw] rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-lg
                 origin-top-right animate-[fadeIn_.12s_ease-out] ring-1 ring-black/5 z-50 translate-y-[1px]"
      style={{ transformOrigin: 'top right' }}
    >
      <Item
        icon={<FileText className="w-4 h-4" />}
        title="Invoice"
        desc="Collect a one-time payment from a specific customer."
        keys={['c', 'i']}
        href="/dashboardPay/invoicing/new"
      />
      <Item
        icon={<LinkIcon className="w-4 h-4" />}
        title="Payment link"
        desc="Create a link to accept one-time or recurring payments from anyone."
        keys={['c', 'l']}
        href="/dashboardPay/payment-links/new"
      />
      <Item
        icon={<Repeat className="w-4 h-4" />}
        title="Subscription"
        desc="Create a recurring payment for a specific customer."
        keys={['c', 's']}
        href="/dashboardPay/subscriptions/new?mode=test"
      />
      <Item
        icon={<CreditCard className="w-4 h-4" />}
        title="Manual payment"
        desc="Enter card details for a specific customer."
        keys={['c', 'p']}
        href="/dashboardPay/payments/new"
      />
    </div>
  )
})
CreatePaymentMenu.displayName = 'CreatePaymentMenu'

/* ------------------------------- UI bits ------------------------------- */

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

function OptionCard({
  title,
  description,
  badges = [],
  primaryCta,
  onPrimary,
  secondaryLinkText,
  onSecondary,
  children,
}: {
  title: string
  description: string
  badges?: { label: string; tone?: 'success' | 'info' | 'neutral' }[]
  primaryCta?: string
  onPrimary?: () => void
  secondaryLinkText?: string
  onSecondary?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="rounded-2xl bg-white p-5 md:p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      {children}
      <div className="mt-5">
        <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
        <p className="mt-2 text-sm text-zinc-600">{description}</p>

        {badges.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {badges.map((b, i) => (
              <Badge key={i} tone={b.tone || 'neutral'}>
                {b.label}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-4">
          {primaryCta && onPrimary && (
            <button
              onClick={onPrimary}
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3.5 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              {primaryCta}
            </button>
          )}
          {secondaryLinkText && onSecondary && (
            <button onClick={onSecondary} className="text-sm text-sky-700 hover:underline">
              {secondaryLinkText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode
  tone?: 'success' | 'info' | 'neutral'
}) {
  const tones = {
    success: 'text-emerald-700 bg-emerald-100',
    info: 'text-sky-700 bg-sky-100',
    neutral: 'text-zinc-700 bg-zinc-100',
  } as const
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs ${tones[tone]}`}>
      {children}
    </span>
  )
}
