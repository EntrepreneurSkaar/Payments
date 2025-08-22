// app/dashboardPay/reporting/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import {
  Wallet,
  ArrowDownUp,
  ReceiptText,
  BarChart3,
  Code2,
  ShieldCheck,
  Scale,
  LineChart,
  CreditCard,
  Shield,
  Cable,
} from 'lucide-react'

export default function ReportsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        {/* Header */}
        <h1 className="text-[28px] leading-8 font-semibold text-zinc-900">Reports</h1>

        {/* Track money movement */}
        <Section
          title="Track money movement"
          subtitle="Understand the activity in your account, focused on how activity, fees, and payouts affect your balance."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ReportTile
              icon={<Wallet className="h-5 w-5 text-zinc-600" />}
              title="Balance summary"
              onClick={() => router.push('/dashboardPay/reporting')}
            />
            <ReportTile
              icon={<ArrowDownUp className="h-5 w-5 text-zinc-600" />}
              title="Payout reconciliation"
              onClick={() => router.push('/dashboardPay/reporting/payout-reconciliation')}
            />
          </div>
        </Section>

        {/* Automate accounting */}
        <Section
          title="Automate accounting"
          subtitle="Interactive revenue reports to help you understand performance, recognize revenue, and close the month."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ReportTile
              icon={<ReceiptText className="h-5 w-5 text-zinc-600" />}
              title="Revenue recognition"
              onClick={() => router.push('/dashboardPay/reporting/revenue-recognition')}
            />
          </div>
        </Section>

        {/* Custom reports */}
        <Section
          title="Custom reports"
          subtitle="Build your own reports using templates, SQL, or the Sigma assistant."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ReportTile
              icon={<Code2 className="h-5 w-5 text-zinc-600" />}
              title="Sigma custom reports"
              onClick={() => router.push('/dashboardPay/reporting/sigma')}
            />
          </div>
        </Section>

        {/* Payments analytics */}
        <Section
          title="Payments analytics"
          subtitle="Analyze key metrics and reports about your payments performance."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <ReportTile
              icon={<BarChart3 className="h-5 w-5 text-zinc-600" />}
              title="Acceptance analytics"
              onClick={() => router.push('/dashboardPay/payments/analytics?tab=acceptance')}
            />
            <ReportTile
              icon={<ShieldCheck className="h-5 w-5 text-zinc-600" />}
              title="Authentication analytics"
              onClick={() => router.push('/dashboardPay/payments/analytics?tab=authentication')}
            />
            <ReportTile
              icon={<Scale className="h-5 w-5 text-zinc-600" />}
              title="Disputes analytics"
              onClick={() => router.push('/dashboardPay/payments/analytics?tab=disputes')}
            />
            <ReportTile
              icon={<LineChart className="h-5 w-5 text-zinc-600" />}
              title="Payment methods analytics"
              onClick={() => router.push('/dashboardPay/payments/analytics?tab=methods')}
            />
            {/* Optional extras; remove if not needed */}
            <ReportTile
              icon={<BarChart3 className="h-5 w-5 text-zinc-600" />}
              title="Transfers overview"
              onClick={() => router.push('/dashboardPay/reporting/transfers')}
            />
            <ReportTile
              icon={<CreditCard className="h-5 w-5 text-zinc-600" />}
              title="Fees & adjustments"
              onClick={() => router.push('/dashboardPay/reporting/fees')}
            />
          </div>
        </Section>

        {/* Operational reports (NEW) */}
        <Section
          title="Operational reports"
          subtitle="Analyze the operational effectiveness of your Stripe integration, across payments, fraud, and more."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <ReportTile
              icon={<LineChart className="h-5 w-5 text-zinc-600" />}
              title="Billing analytics"
              onClick={() => router.push('/dashboardPay/billing/analytics')}
            />
            <ReportTile
              icon={<Shield className="h-5 w-5 text-zinc-600" />}
              title="Radar analytics"
              onClick={() => router.push('/dashboardPay/payments/radar')}
            />
            <ReportTile
              icon={<Cable className="h-5 w-5 text-zinc-600" />}
              title="Connect analytics"
              onClick={() => router.push('/dashboardPay/connect/analytics')}
            />
            <ReportTile
              icon={<CreditCard className="h-5 w-5 text-zinc-600" />}
              title="Card monitoring programs"
              onClick={() => router.push('/dashboardPay/reporting/card-monitoring')}
              className="lg:col-span-1"
            />
          </div>
        </Section>
      </div>
    </main>
  )
}

/* ---------- UI bits ---------- */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-8">
      <h2 className="text-[20px] font-semibold text-zinc-900">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-zinc-600 max-w-3xl">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

function ReportTile({
  icon,
  title,
  onClick,
  className = '',
}: {
  icon: React.ReactNode
  title: string
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-left hover:bg-zinc-50 transition-colors ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100">
          {icon}
        </div>
        <div className="text-[15px] text-zinc-900">{title}</div>
      </div>
    </button>
  )
}
