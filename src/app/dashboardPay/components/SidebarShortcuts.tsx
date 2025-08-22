// components/SidebarShortcuts.tsx
'use client'

import { useRouter } from 'next/navigation'
import { Clock3 } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

type Item = { label: string; href: string }

const items: Item[] = [
  { label: 'Invoices', href: '/dashboardPay/invoicing' },
  { label: 'Subscriptions', href: '/dashboardPay/subscriptions' },
  { label: 'Billing overview', href: '/dashboardPay/billing' },
  { label: 'Terminal', href: '/dashboardPay/terminal' },
  { label: 'Payments analytics', href: '/dashboardPay/analytics/payments' },
]

export default function SidebarShortcuts() {
  const router = useRouter()
  const [open, setOpen] = useState(false) // used for touch/click; hover is CSS-based

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Sidebar icon button */}
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)} // allows tap-to-open on touch
        className="mx-2 my-1 flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <Clock3 className="h-5 w-5" />
      </button>

      {/* Hover / focus dropdown */}
      <div
        role="menu"
        className={`
          pointer-events-none absolute left-12 top-1/2 z-50 w-64 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-3 shadow-xl
          opacity-0 scale-95 transition-all duration-150 ease-out
          group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto
          ${open ? 'opacity-100 scale-100 pointer-events-auto' : ''}
        `}
      >
        <div className="px-2 pb-2 text-xs font-medium text-zinc-500">Shortcuts</div>
        <ul className="space-y-1">
          {items.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                role="menuitem"
                className="block rounded-lg px-3 py-2 text-[14px] text-zinc-900 hover:bg-zinc-100"
                onClick={e => {
                  e.preventDefault()
                  router.push(item.href)
                  setOpen(false)
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
