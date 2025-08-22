'use client'

import { useMemo } from 'react'
import {
  ChevronDown, CalendarDays, Clock, Download, Printer,
  Settings2,
} from 'lucide-react'
import Link from 'next/link'

type ActivityRow = { label: string; count: number; amount: number }

export default function BalanceSummaryPage() {
  // ---- Dummy period data (NOK in øre) ----
  const txs = [24900, 19900, 5900, 12900, 9900, 39900, 14900, 29900, 5900, -24900]
  const successes = txs.filter(v => v > 0)
  const refunds = txs.filter(v => v < 0).map(v => Math.abs(v))
  const gross = successes.reduce((s, v) => s + v, 0)
  const refundTotal = refunds.reduce((s, v) => s + v, 0)
  const fees = Math.round(gross * 0.029) + successes.length * 300
  const netChangeFromActivity = gross - refundTotal - fees

  const startingBalance = 0
  const payouts = 0
  const endingBalance = startingBalance + netChangeFromActivity - payouts

  const activityRows: ActivityRow[] = useMemo(() => ([
    { label: 'Charges',    count: successes.length, amount: gross },
    { label: 'Refunds',    count: refunds.length,   amount: -refundTotal },
    { label: 'Fees',       count: successes.length, amount: -fees },
    { label: 'Transfers',  count: 0,                amount: 0 },
    { label: 'Adjustments',count: 0,                amount: 0 },
    { label: 'Disputes',   count: 0,                amount: 0 },
  ]), [gross, refundTotal, fees, successes.length, refunds.length])

  const nok = (v: number) =>
    new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 })
      .format(v / 100)

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-8xl mx-auto py-8 space-y-8">

        {/* Breadcrumb */}
        <div className="text-sm text-zinc-500">
          <Link href="/dashboardPay/reporting" className="hover:text-zinc-700">Reports</Link>
          <span className="mx-1.5">›</span>
          <span className="text-zinc-700">Balance summary</span>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Balance summary</h1>

          {/* Controls row */}
          <div className="flex flex-wrap items-center gap-2">
            <SelectChip iconLeft className="bg-white">New business sandbox</SelectChip>
            <SelectChip iconLeft className="bg-white">Last month</SelectChip>
            <Pill icon={<CalendarDays className="w-4 h-4" />}>Jul 1–Jul 31</Pill>
            <Pill icon={<Clock className="w-4 h-4" />}>UTC</Pill>

            <div className="mx-2 h-6 w-px bg-zinc-200" />

            <GhostButton disabled>Schedule…</GhostButton>
            <GhostButton icon={<Printer className="w-4 h-4" />}>Print</GhostButton>
          </div>
        </div>

        {/* Card: Balance summary — Platform */}
        <section className="rounded-xl overflow-hidden">
          <div className="flex items-start justify-between p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/50">
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Balance summary — Platform</h2>
              <p className="mt-1 text-sm text-zinc-600 max-w-3xl">
                Shows starting and ending balance in your platform account. Changes come from activity
                (payments, refunds, fees, transfers) and from payouts to your bank.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GhostButton icon={<Download className="w-4 h-4" />}>Download</GhostButton>
              <GhostButton icon={<Settings2 className="w-4 h-4" />}>Explore</GhostButton>
            </div>
          </div>

          <div className="divide-y divide-zinc-200">
            <SummaryRow label="Starting balance — Jul 1 UTC" value={nok(startingBalance)} />
            <SummaryRow label="Net balance change from activity" value={nok(netChangeFromActivity)} />
            <SummaryRow label="Total payouts" value={nok(payouts)} />
            <SummaryRow label="Ending balance — Jul 31 UTC" value={nok(endingBalance)} strong />
          </div>
        </section>

        {/* Card: Balance change from activity */}
        <section className="rounded-xl overflow-hidden">
          <div className="flex items-start justify-between p-4 sm:p-5 border-b border-zinc-200 bg-zinc-50/50">
            <div>
              <h2 className="text-base font-semibold text-zinc-900">Balance change from activity</h2>
              <p className="mt-1 text-sm text-zinc-600 max-w-3xl">
                Detailed breakdown of the “Net balance change from activity” above. Amounts exclude payouts.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GhostButton icon={<Download className="w-4 h-4" />}>Download</GhostButton>
              <GhostButton icon={<Settings2 className="w-4 h-4" />}>Explore</GhostButton>
            </div>
          </div>

          {/* Table header */}
          <div className="grid grid-cols-12 px-4 sm:px-5 py-2 text-xs font-medium text-zinc-500">
            <div className="col-span-6">Activity</div>
            <div className="col-span-3 text-right">Count</div>
            <div className="col-span-3 text-right">Gross amount</div>
          </div>
          <div className="divide-y divide-zinc-200">
            {activityRows.map((r) => (
              <div key={r.label} className="grid grid-cols-12 px-4 sm:px-5 py-3 text-sm">
                <div className="col-span-6 text-zinc-700">{r.label}</div>
                <div className="col-span-3 text-right tabular-nums text-zinc-700">{r.count}</div>
                <div className={`col-span-3 text-right tabular-nums ${r.amount < 0 ? 'text-red-600' : 'text-zinc-900'}`}>
                  {nok(r.amount)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

/* ---------- Small UI primitives ---------- */

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-5 py-3">
      <div className="text-sm text-zinc-700">{label}</div>
      <div className={`tabular-nums ${strong ? 'font-semibold text-zinc-900' : 'text-zinc-800'}`}>{value}</div>
    </div>
  )
}

function Pill({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700">
      {icon}
      {children}
    </span>
  )
}

function SelectChip({ children, iconLeft = false, className = '' }: { children: React.ReactNode; iconLeft?: boolean; className?: string }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 ${className}`}
    >
      {iconLeft && <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden />}
      {children}
      <ChevronDown className="w-4 h-4 text-zinc-400" />
    </button>
  )
}

function GhostButton({ children, icon, disabled = false }: { children: React.ReactNode; icon?: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-1.5 text-sm
        ${disabled ? 'text-zinc-400 bg-white cursor-not-allowed' : 'text-zinc-700 hover:bg-zinc-50'}`}
    >
      {icon}
      {children}
    </button>
  )
}
