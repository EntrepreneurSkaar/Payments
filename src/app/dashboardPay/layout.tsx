'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './components/sidebar2'
import Topbar from './components/Topbar'

const HIDE_TOPBAR_PREFIXES = [
  '/dashboardPay/profile',
  '/dashboardPay/payment-links/new', // ← hide Topbar on the create-payment-link page
  // '/dashboardPay/payments/new',    // (optional) uncomment to hide on manual charge
  // '/dashboardPay/invoicing/new',   // (optional) hide on invoice composer
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const shouldHideTopbar = HIDE_TOPBAR_PREFIXES.some(p => pathname.startsWith(p))

  return (
    <div className="flex h-screen overflow-hidden bg-white text-black">
      <Sidebar />
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-12">
        <main className="w-full max-w-8xl mx-auto py-4">
          {!shouldHideTopbar && <Topbar />}
          {children}
        </main>
      </div>
    </div>
  )
}
