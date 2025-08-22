// components/Topbar.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search, HelpCircle, Bell, Settings, Plus, FileText, MessageSquare, Link as LinkIcon, CreditCard,
} from 'lucide-react'
import SetupGuideCard from './SetupGuideCard' // ← adjust path if needed

/* ---------------------- Fake data & search simulation ---------------------- */

type EntityType = 'payment' | 'invoice' | 'customer' | 'doc' | 'link'
type Entity = {
  id: string
  type: EntityType
  title: string
  subtitle?: string
  href?: string
}

const FAKE_DB: Entity[] = [
  { id: 'pm_001', type: 'payment', title: 'Payment #pm_001 — NOK 249', subtitle: 'Ola Nordmann', href: '/dashboardPay/payments/pm_001' },
  { id: 'pm_002', type: 'payment', title: 'Payment #pm_002 — NOK 990', subtitle: 'North Labs', href: '/dashboardPay/payments/pm_002' },
  { id: 'inv_341', type: 'invoice', title: 'Invoice #341 — ACME AS', subtitle: 'Due Aug 31', href: '/dashboardPay/invoicing/inv_341' },
  { id: 'inv_342', type: 'invoice', title: 'Invoice #342 — Fjord Tech', subtitle: 'Paid', href: '/dashboardPay/invoicing/inv_342' },
  { id: 'cus_ola', type: 'customer', title: 'Ola Nordmann', subtitle: 'ola@example.com', href: '/dashboardPay/customers/cus_ola' },
  { id: 'cus_nlabs', type: 'customer', title: 'North Labs', subtitle: 'billing@northlabs.io', href: '/dashboardPay/customers/cus_nlabs' },
  { id: 'doc_fees', type: 'doc', title: 'How fees are calculated', subtitle: 'Docs • Billing & fees', href: '/docs/fees' },
  { id: 'doc_refunds', type: 'doc', title: 'Handle refunds & disputes', subtitle: 'Docs • Payments', href: '/docs/refunds' },
  { id: 'link_new_inv', type: 'link', title: 'Create invoice', subtitle: 'Shortcut', href: '/dashboardPay/invoicing/new' },
  { id: 'link_new_sub', type: 'link', title: 'Create subscription', subtitle: 'Shortcut', href: '/dashboardPay/subscriptions/new' },
]

function simulateSearch(query: string): Promise<Entity[]> {
  // pretend to be a network call with 200–450ms jitter
  const delay = 200 + Math.floor(Math.random() * 250)
  const q = query.trim().toLowerCase()
  return new Promise(resolve => {
    setTimeout(() => {
      if (!q) return resolve([])
      // naive scoring: contains → rank by start index + type preference
      const typeWeight: Record<EntityType, number> = { payment: 0, invoice: 1, customer: 2, doc: 3, link: 4 }
      const results = FAKE_DB
        .map(e => {
          const hay = (e.title + ' ' + (e.subtitle ?? '')).toLowerCase()
          const idx = hay.indexOf(q)
          return idx === -1 ? null : { e, score: idx + typeWeight[e.type] * 10 }
        })
        .filter(Boolean)
        .sort((a: any, b: any) => a.score - b.score)
        .slice(0, 10)
        .map(r => (r as any).e as Entity)
      resolve(results)
    }, delay)
  })
}

/* -------------------------------- Component -------------------------------- */

export default function Topbar() {
  const router = useRouter()
  const [openNewMenu, setOpenNewMenu] = useState(false)
  const newMenuRef = useRef<HTMLDivElement>(null)

  const [showSetupGuide, setShowSetupGuide] = useState(false)
  const setupProgress = 40

  // Search state
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Entity[]>([])
  const [openSearch, setOpenSearch] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [recent, setRecent] = useState<string[]>(['invoice 341', 'refunds', 'North Labs'])

  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Close handlers
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenNewMenu(false)
        setShowSetupGuide(false)
        setOpenSearch(false)
      }
      // Global focus search with ⌘/Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
        setOpenSearch(true)
      }
    }
    const onClick = (e: MouseEvent) => {
      if (newMenuRef.current && !newMenuRef.current.contains(e.target as Node)) setOpenNewMenu(false)
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpenSearch(false)
      }
    }
    document.addEventListener('keydown', onDown)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onDown)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!q.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    debounceRef.current = setTimeout(async () => {
      const r = await simulateSearch(q)
      setResults(r)
      setActiveIdx(0)
      setLoading(false)
    }, 220)
  }, [q])

  const grouped = useMemo(() => {
    const g: Record<string, Entity[]> = {}
    for (const r of results) {
      const k =
        r.type === 'payment' ? 'Payments' :
        r.type === 'invoice' ? 'Invoices' :
        r.type === 'customer' ? 'Customers' :
        r.type === 'doc' ? 'Docs' : 'Shortcuts'
      ;(g[k] ||= []).push(r)
    }
    return g
  }, [results])

  const fmtTime = useMemo(
    () => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(new Date()),
    []
  )

  // Navigate on enter
  const go = (e: Entity) => {
    if (e.href) router.push(e.href)
    setOpenSearch(false)
    setResults([])
    if (q.trim()) {
      setRecent(rs => [q.trim(), ...rs.filter(x => x !== q.trim())].slice(0, 6))
      setQ('')
    }
  }

  return (
    <>
      <header className="w-full bg-white py-1.5 flex items-center justify-between relative">
        {/* Left: Search */}
        <div className="flex items-center w-full max-w-sm relative">
          <div className="flex items-center gap-2 bg-zinc-100 rounded-md px-2.5 py-1.5 w-full">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search payments, invoices, customers…  (⌘/Ctrl+K)"
              value={q}
              onChange={e => { setQ(e.target.value); setOpenSearch(true) }}
              onFocus={() => setOpenSearch(true)}
              onKeyDown={e => {
                if (!openSearch) return
                const flat = results
                if (e.key === 'ArrowDown') {
                  e.preventDefault()
                  setActiveIdx(i => Math.min(i + 1, flat.length - 1))
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault()
                  setActiveIdx(i => Math.max(i - 1, 0))
                } else if (e.key === 'Enter') {
                  e.preventDefault()
                  const item = flat[activeIdx]
                  if (item) go(item)
                }
              }}
              className="bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none w-full"
            />
          </div>

          {/* Search popover */}
          {openSearch && (
            <div
              ref={popoverRef}
              className="absolute top-[110%] left-0 w-[36rem] max-w-[90vw] rounded-2xl border border-zinc-200 bg-white p-1 z-50"
            >
              {q.trim().length === 0 ? (
                <div className="p-3">
                  <div className="text-[11px] uppercase tracking-wide text-zinc-400 mb-1">Recent</div>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => { setQ(r); inputRef.current?.focus() }}
                        className="rounded-full bg-zinc-100 hover:bg-zinc-200 px-2.5 py-1 text-xs text-zinc-700"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-zinc-500">{fmtTime}</div>
                </div>
              ) : loading ? (
                <div className="p-4 text-sm text-zinc-600">Searching…</div>
              ) : results.length === 0 ? (
                <div className="p-4 text-sm text-zinc-600">No results for “{q}”.</div>
              ) : (
                <div className="max-h-[22rem] overflow-auto">
                  {Object.entries(grouped).map(([group, items]) => (
                    <div key={group} className="py-1">
                      <div className="px-3 py-1 text-[11px] uppercase tracking-wide text-zinc-400">{group}</div>
                      {items.map((item, i) => {
                        const flatIndex = results.findIndex(r => r.id === item.id)
                        const active = flatIndex === activeIdx
                        return (
                          <button
                            key={item.id}
                            onMouseEnter={() => setActiveIdx(flatIndex)}
                            onClick={() => go(item)}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between
                              ${active ? 'bg-zinc-100' : 'hover:bg-zinc-50'}`}
                          >
                            <div>
                              <div className="text-sm text-zinc-900">
                                <Mark text={item.title} q={q} />
                              </div>
                              {item.subtitle && (
                                <div className="text-xs text-zinc-500">
                                  <Mark text={item.subtitle} q={q} />
                                </div>
                              )}
                            </div>
                            <span className="text-[11px] rounded-md bg-zinc-100 px-1.5 py-0.5 text-zinc-600">
                              {item.type}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Icons + Buttons */}
        <div className="flex items-center gap-2.5 ml-auto">
          <IconBtn><HelpCircle className="w-4 h-4 text-zinc-600" /></IconBtn>
          <IconBtn><Bell className="w-4 h-4 text-zinc-600" /></IconBtn>
          <IconBtn><Settings className="w-4 h-4 text-zinc-600" /></IconBtn>

          <div className="relative" ref={newMenuRef}>
            <button
              onClick={() => setOpenNewMenu(s => !s)}
              aria-haspopup="menu"
              aria-expanded={openNewMenu}
              className="w-7 h-7 rounded-full bg-violet-500 hover:bg-violet-600 flex items-center justify-center"
            >
              <Plus className="w-3.5 h-3.5 text-white" />
            </button>

            {openNewMenu && (
              <div
                role="menu"
                className="absolute right-0 mt-1.5 w-56 rounded-2xl border border-zinc-200 bg-white p-1.5 z-50
                           origin-top-right animate-[fadeIn_.12s_ease-out]"
              >
                <MenuItem
                  icon={<FileText className="w-4 h-4" />}
                  label="Invoice"
                  shortcut={['c', 'i']}
                  onClick={() => { setOpenNewMenu(false); router.push('/dashboardPay/invoicing/new') }}
                />
                <MenuItem
                  icon={<MessageSquare className="w-4 h-4" />}
                  label="Subscription"
                  shortcut={['c', 's']}
                  onClick={() => { setOpenNewMenu(false); router.push('/dashboardPay/subscriptions/new?mode=test') }}
                />
                <MenuItem
                  icon={<LinkIcon className="w-4 h-4" />}
                  label="Payment link"
                  shortcut={['c', 'l']}
                  onClick={() => { setOpenNewMenu(false); router.push('/dashboardPay/payment-links/new') }}
                />
                <MenuItem
                  icon={<CreditCard className="w-4 h-4" />}
                  label="Payment"
                  shortcut={['c', 'p']}
                  onClick={() => { setOpenNewMenu(false); router.push('/dashboardPay/payments/new') }}
                />
              </div>
            )}
          </div>

          {!showSetupGuide && (
            <button
              onClick={() => setShowSetupGuide(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-[13px] text-zinc-700"
              aria-label={`Open setup guide, ${Math.round(setupProgress)}% complete`}
            >
              Setup guide
              <ProgressRing value={setupProgress} size={18} stroke={3} />
            </button>
          )}
        </div>
      </header>

      {/* Bottom-right setup guide card */}
      {showSetupGuide && (
        <SetupGuideCard
          progress={setupProgress}
          onClose={() => setShowSetupGuide(false)}
          onExpand={() => window?.open('/dashboardPay/setup', '_blank')}
        />
      )}
    </>
  )
}

/* ------------------------------ UI helpers ------------------------------ */

function IconBtn({ children }: { children: React.ReactNode }) {
  return <button className="p-2 rounded-full hover:bg-zinc-100">{children}</button>
}

function MenuItem({
  icon, label, shortcut, onClick,
}: {
  icon: React.ReactNode
  label: string
  shortcut: [string, string]
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 hover:bg-zinc-50 text-left">
      <span className="inline-flex items-center gap-2 text-sm cursor-pointer text-violet-700">
        <span className="inline-flex h-6 w-6 items-center justify-center text-zinc-600">{icon}</span>
        {label}
      </span>
      <span className="inline-flex items-center gap-1">
        {shortcut.map((k, i) => (
          <kbd key={i} className="inline-flex min-w-[0.95rem] items-center justify-center rounded-md bg-zinc-100 px-1 py-0.5 text-[10px] text-zinc-600">
            {k}
          </kbd>
        ))}
      </span>
    </button>
  )
}

function ProgressRing({ value = 0, size = 18, stroke = 3 }: { value?: number; size?: number; stroke?: number }) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped / 100)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="block">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#E5E7EB" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#6D28D9"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: 'stroke-dashoffset 450ms ease' }}
      />
    </svg>
  )
}

/* Highlight matches */
function Mark({ text, q }: { text: string; q: string }) {
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i === -1 || !q) return <>{text}</>
  const before = text.slice(0, i)
  const match = text.slice(i, i + q.length)
  const after = text.slice(i + q.length)
  return (
    <>
      {before}
      <mark className="bg-yellow-100 text-inherit rounded px-0.5">{match}</mark>
      {after}
    </>
  )
}
