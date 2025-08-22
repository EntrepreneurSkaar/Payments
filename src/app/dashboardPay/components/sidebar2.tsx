'use client'

import { useEffect, useState } from 'react'
import {
  Home, Wallet, ArrowLeftRight, UsersRound, Package, CreditCard, FileText,
  Layers, BarChart3, Code2, ChevronDown, Ellipsis, Clock4,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Child = { name: string; href: string; disabled?: boolean; badge?: string }
type Item = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  dropdown?: boolean
  children?: Child[]
  /** exact = true -> only highlight on exact path match (used for Home) */
  exact?: boolean
}

type GroupKey = 'connect' | 'payments' | 'billing' | 'reporting' | 'more' | null

const main: Item[] = [
  { name: 'Home', href: '/dashboardPay', icon: Home, exact: true }, // exact match
  { name: 'Balances', href: '/dashboardPay/balances2', icon: Wallet },
  { name: 'Transactions', href: '/dashboardPay/transactions2', icon: ArrowLeftRight },
  { name: 'Customers', href: '/dashboardPay/customers2', icon: UsersRound },
  { name: 'Product catalog', href: '/dashboardPay/ProductsCatalog', icon: Package },
]

const shortcuts: Item[] = [
  { name: 'Payments analytics', href: '/dashboardPay/PaymentAnalytics', icon: Clock4 },
  { name: 'Payment Links', href: '/dashboardPay/PaymentLinks', icon: Clock4 },
  { name: 'Terminal', href: '/dashboardPay/Terminal', icon: Clock4 },
  { name: 'Subscriptions', href: '/dashboardPay/Subscriptions', icon: Clock4 },
  { name: 'Connected accounts', href: '/dashboardPay/ConnectedAccounts', icon: Clock4 },
]

const products: Item[] = [
  {
    name: 'Connect',
    href: '/dashboardPay/connect',
    icon: Layers,
    dropdown: true,
    children: [
      { name: 'Overview', href: '/dashboardPay/connect' },
      { name: 'Connected accounts', href: '/dashboardPay/connect/accounts' },
      { name: 'Tax forms', href: '/dashboardPay/connect/tax-forms' },
      { name: 'Capital', href: '/dashboardPay/connect/capital' },
      { name: 'Support cases', href: '/dashboardPay/connect/support' },
    ],
  },
  {
    name: 'Payments',
    href: '/dashboardPay/payments',
    icon: CreditCard,
    dropdown: true,
    children: [
      { name: 'Analytics', href: '/dashboardPay/payments/analytics' },
      { name: 'Disputes', href: '/dashboardPay/payments/disputes' },
      { name: 'Radar', href: '/dashboardPay/payments/radar' },
      { name: 'Payment Links', href: '/dashboardPay/payment-links' },
      { name: 'Terminal', href: '/dashboardPay/terminal' },
    ],
  },
  {
    name: 'Billing',
    href: '/dashboardPay/billing',
    icon: FileText,
    dropdown: true,
    children: [
      { name: 'Overview', href: '/dashboardPay/billing' },
      { name: 'Subscriptions', href: '/dashboardPay/Subscriptions' },
      { name: 'Invoices', href: '/dashboardPay/invoicing' },
      { name: 'Usage-based', href: '/dashboardPay/billing/usage-based' },
      { name: 'Revenue recovery', href: '/dashboardPay/billing/revenue-recovery' },
    ],
  },
  {
    name: 'Reporting',
    href: '/dashboardPay/reporting',
    icon: BarChart3,
    dropdown: true,
    children: [
      { name: 'Reports', href: '/dashboardPay/reporting' },
      { name: 'Custom metrics', href: '/dashboardPay/reporting/custom-metrics', disabled: true },
      { name: 'Sigma', href: '/dashboardPay/reporting/sigma' },
      { name: 'Revenue Recognition', href: '/dashboardPay/reporting/revenue-recognition' },
      { name: 'Data management', href: '/dashboardPay/reporting/data-management' },
    ],
  },
  {
    name: 'More',
    href: '/dashboardPay/more',
    icon: Ellipsis,
    dropdown: true,
    children: [
      { name: 'Tax', href: '/dashboardPay/more/tax' },
      { name: 'Identity', href: '/dashboardPay/more/identity' },
      { name: 'Atlas', href: '/dashboardPay/more/atlas' },
      { name: 'Financial Connections', href: '/dashboardPay/more/financial-connections' },
      { name: 'Climate', href: '/dashboardPay/more/climate' },
      { name: 'Workflows', href: '/dashboardPay/more/workflows', badge: 'Preview' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  // exact-aware active matcher
  const isItemActive = (item: Item) => {
    if (item.exact) return pathname === item.href
    return pathname === item.href || pathname.startsWith(item.href + '/')
  }

  // ---- Hydration-safe accordion state ----
  const storageKey = 'np.sidebarOpenKey'
  const [openKey, setOpenKey] = useState<GroupKey>(null)

  // After mount or route change, prefer route-based group; else restore saved
  useEffect(() => {
    const routeKey: GroupKey =
      pathname.startsWith('/dashboardPay/connect') ? 'connect' :
      pathname.startsWith('/dashboardPay/payments') ||
      pathname.startsWith('/dashboardPay/terminal') ||
      pathname.startsWith('/dashboardPay/payment-links') ? 'payments' :
      pathname.startsWith('/dashboardPay/billing') ? 'billing' :
      pathname.startsWith('/dashboardPay/reporting') ? 'reporting' :
      pathname.startsWith('/dashboardPay/more') ? 'more' :
      null

    if (routeKey) {
      setOpenKey(routeKey)
    } else {
      try {
        const saved = localStorage.getItem(storageKey) as GroupKey | null
        if (saved) setOpenKey(saved)
        else setOpenKey(null)
      } catch {
        // ignore
      }
    }
  }, [pathname])

  // Persist user choice
  useEffect(() => {
    try {
      if (openKey) localStorage.setItem(storageKey, openKey)
      else localStorage.removeItem(storageKey)
    } catch {
      // ignore
    }
  }, [openKey])

  const toggle = (key: Exclude<GroupKey, null>) =>
    setOpenKey(prev => (prev === key ? null : key))

  const connectItem = products.find(p => p.name === 'Connect')!
  const paymentsItem = products.find(p => p.name === 'Payments')!
  const billingItem = products.find(p => p.name === 'Billing')!
  const reportingItem = products.find(p => p.name === 'Reporting')!
  const moreItem = products.find(p => p.name === 'More')!
  const otherProducts = products.filter(p => !['Connect','Payments','Billing','Reporting','More'].includes(p.name))

  return (
    <aside className="w-52 bg-white px-3 py-5 min-h-screen border-r border-zinc-200 flex flex-col">
      <div className="mb-5 text-[#1F3D2B] text-base font-semibold tracking-tight">NordPay</div>

      <nav className="space-y-1">
        {main.map(item => (
          <NavRow key={item.name} item={item} active={isItemActive(item)} />
        ))}
      </nav>

      <SectionTitle className="mt-5 mb-1">Shortcuts</SectionTitle>
      <nav className="space-y-1">
        {shortcuts.map(item => (
          <NavRow key={item.name} item={item} active={isItemActive(item)} />
        ))}
      </nav>

      <SectionTitle className="mt-5 mb-1">Products</SectionTitle>
      <nav className="space-y-1">
        <NavGroup
          id="grp-connect"
          item={connectItem}
          open={openKey === 'connect'}
          onToggle={() => toggle('connect')}
          active={isItemActive(connectItem)}
          currentPath={pathname}
        />
        <NavGroup
          id="grp-payments"
          item={paymentsItem}
          open={openKey === 'payments'}
          onToggle={() => toggle('payments')}
          active={isItemActive(paymentsItem)}
          currentPath={pathname}
        />
        <NavGroup
          id="grp-billing"
          item={billingItem}
          open={openKey === 'billing'}
          onToggle={() => toggle('billing')}
          active={isItemActive(billingItem)}
          currentPath={pathname}
        />
        <NavGroup
          id="grp-reporting"
          item={reportingItem}
          open={openKey === 'reporting'}
          onToggle={() => toggle('reporting')}
          active={isItemActive(reportingItem)}
          currentPath={pathname}
        />
        <NavGroup
          id="grp-more"
          item={moreItem}
          open={openKey === 'more'}
          onToggle={() => toggle('more')}
          active={isItemActive(moreItem)}
          currentPath={pathname}
        />
        {otherProducts.map(item => (
          <NavRow key={item.name} item={item} active={isItemActive(item)} showChevron={!!item.dropdown} />
        ))}
      </nav>

      <div className="mt-auto pt-5">
        <Link
          href="/dashboardPay/developers"
          className="inline-flex items-center gap-2 rounded-md w-full px-2.5 py-1.5 text-[12px] text-zinc-700 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          <Code2 className="w-4 h-4" />
          Developers
        </Link>
      </div>
    </aside>
  )
}

/* UI bits */
function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`px-2 text-[11px] font-medium text-zinc-500 ${className}`}>{children}</div>
}

function NavRow({
  item,
  active,
  showChevron = false,
}: {
  item: Item
  active: boolean
  showChevron?: boolean
}) {
  const Icon = item.icon
  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center justify-between rounded-md px-2.5 py-1.5 text-[12.5px] transition-colors ${
        active ? 'text-violet-600 font-medium' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300`}
    >
      <span className="flex items-center gap-2">
        <Icon className={`w-4 h-4 transition-colors ${active ? 'text-violet-600' : ''}`} />
        <span className="truncate">{item.name}</span>
      </span>
      {(item.dropdown || showChevron) && (
        <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform" aria-hidden="true" />
      )}
    </Link>
  )
}

function NavGroup({
  id,
  item,
  open,
  onToggle,
  active,
  currentPath,
}: {
  id: string
  item: Item
  open: boolean
  onToggle: () => void
  active: boolean
  currentPath: string
}) {
  const Icon = item.icon
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className={`w-full flex items-center justify-between rounded-md px-2.5 py-1.5 text-left text-[12.5px] transition-colors ${
          active ? 'text-violet-600 font-medium' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300`}
      >
        <span className="flex items-center gap-2">
          <Icon className={`w-4 h-4 transition-colors ${active ? 'text-violet-600' : ''}`} />
          <span className="truncate">{item.name}</span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`${id}-panel`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div
          aria-hidden={!open}
          className={`overflow-hidden transition-all duration-300 ${
            open ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-1 invisible pointer-events-none'
          }`}
        >
          {item.children && (
            <div className="mt-1 space-y-0.5 pl-6">
              {item.children.map(sub => {
                const subActive = currentPath === sub.href || currentPath.startsWith(sub.href + '/')
                if (sub.disabled) {
                  return (
                    <span
                      key={sub.href}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12.5px] text-zinc-400 cursor-not-allowed"
                    >
                      {sub.name}
                    </span>
                  )
                }
                return (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    aria-current={subActive ? 'page' : undefined}
                    className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[12.5px] transition-colors ${
                      subActive
                        ? 'text-violet-600 font-medium bg-zinc-50'
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300`}
                  >
                    <span>{sub.name}</span>
                    {'badge' in sub && sub.badge && (
                      <span className="ml-3 rounded-md border border-zinc-300 px-2 py-0.5 text-[10px] text-zinc-600">
                        {sub.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
