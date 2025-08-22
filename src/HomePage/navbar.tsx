'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

type MenuType = 'products' | 'developers' | 'company' | null

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuType>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navButton = (label: string, menu: MenuType) => (
    <button
      onClick={() => setOpenMenu(openMenu === menu ? null : menu)}
      aria-expanded={openMenu === menu}
      aria-haspopup="menu"
      className={`flex items-center gap-1 px-4 py-2 rounded-full transition
        ${openMenu === menu ? 'bg-black/5' : 'hover:bg-black/5'}
        text-sm text-gray-900`}
    >
      {label}
      <ChevronDown
        size={16}
        className={`transition-transform ${openMenu === menu ? 'rotate-180' : ''}`}
      />
    </button>
  )

  return (
    <header className="bg-[#f0eee6] relative z-50" ref={menuRef}>
      {/* Positioning context for absolute-centered nav links */}
      <nav className="relative w-full flex items-center justify-between px-6 py-4">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="h-5 w-5 bg-black rounded-full" />
          <span className="text-lg font-semibold tracking-tight text-gray-900">NordSell</span>
        </Link>

        {/* Center Nav — stays centered */}
        <div className="hidden md:flex gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navButton('Products', 'products')}
          <Link
            href="/pricing"
            className="px-4 py-2 rounded-full hover:bg-black/5 transition text-sm text-gray-900"
          >
            Pricing
          </Link>
          {navButton('Developers', 'developers')}
          {navButton('Company', 'company')}
        </div>

        {/* CTA - Right */}
        <div className="flex items-center gap-3 text-sm shrink-0">
          <button
            onClick={() => router.push('/login')}
            className="px-5 py-2.5 text-gray-800 hover:bg-black/5 rounded-full transition"
          >
            Log in
          </button>
          <button
            onClick={() => router.push('/signup')}
            className="bg-black text-white px-5 py-2.5 rounded-full transition font-medium hover:bg-gray-900"
          >
            Start free trial
          </button>
        </div>
      </nav>

      {/* Dropdown Menus */}
      {openMenu === 'products' && (
        <DropdownMenu
          columns={2}
          onAnyLinkClick={() => setOpenMenu(null)}
          sections={[
            {
              title: 'Storefront & Checkout',
              links: [
                { label: 'Storefronts & Themes', href: '/products/storefronts' },
                { label: 'Checkout', href: '/products/checkout' },
                { label: 'Subscriptions & Memberships', href: '/products/subscriptions' },
                { label: 'Digital Products & Downloads', href: '/products/digital' },
              ],
            },
            {
              title: 'Back-office',
              links: [
                { label: 'Orders & Inventory', href: '/products/orders' },
                { label: 'Customers & CRM', href: '/products/customers' },
                { label: 'Analytics & Reporting', href: '/products/analytics' },
                { label: 'VAT/MVA & EHF (KID)', href: '/products/tax' },
              ],
            },
          ]}
        />
      )}

      {openMenu === 'developers' && (
        <DropdownMenu
          columns={2}
          onAnyLinkClick={() => setOpenMenu(null)}
          sections={[
            {
              title: 'Docs & APIs',
              links: [
                { label: 'API Reference', href: '/docs/api' },
                { label: 'Storefront API (GraphQL)', href: '/docs/storefront-api' },
                { label: 'Admin API', href: '/docs/admin-api' },
                { label: 'Webhooks', href: '/docs/webhooks' },
              ],
            },
            {
              title: 'Tools',
              links: [
                { label: 'Next.js SDK', href: '/docs/sdks/nextjs' },
                { label: 'CLI', href: '/docs/cli' },
                { label: 'Theme Kit', href: '/docs/theme-kit' },
                { label: 'Changelog', href: '/changelog' },
              ],
            },
          ]}
        />
      )}

      {openMenu === 'company' && (
        <DropdownMenu
          columns={2}
          onAnyLinkClick={() => setOpenMenu(null)}
          sections={[
            {
              title: 'Learn & Support',
              links: [
                { label: 'Help Center', href: '/help' },
                { label: 'Docs Home', href: '/docs' },
                { label: 'Blog / Updates', href: '/blog' },
                { label: 'Customer Stories', href: '/customers' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Contact Sales', href: '/contact' },
                { label: 'Security & Compliance', href: '/security' },
              ],
            },
          ]}
        />
      )}
    </header>
  )
}

function DropdownMenu({
  sections,
  columns = 2,
  onAnyLinkClick,
}: {
  sections: { title: string; links: { label: string; href: string }[] }[]
  columns?: 1 | 2 | 3
  onAnyLinkClick?: () => void
}) {
  const gridCols =
    columns === 3 ? 'md:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1'

  return (
    <div className="absolute left-0 top-full w-full bg-[#f0eee6] py-8 px-6 sm:px-10 lg:px-20 z-40">
      <div className={`max-w-7xl mx-auto grid grid-cols-1 ${gridCols} gap-8`}>
        {sections.map((section, index) => (
          <div key={index}>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">{section.title}</h4>
            <ul className="space-y-1">
              {section.links.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    onClick={onAnyLinkClick}
                    className="inline-block text-left text-sm py-2 px-4 rounded-full hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 text-gray-800 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
