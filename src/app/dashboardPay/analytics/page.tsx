'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ChartNoAxesColumn,
  TrendingUp,
  ShoppingCart,
  BadgePercent,
  UsersRound,
  Globe,
  Package,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'

type RangeKey = '7d' | '30d' | '90d'

type RangeData = {
  grossSales: number
  netRevenue: number
  orders: number
  conversion: number // %
  returning: number // %
  topProducts: { name: string; units: number; sales: number }[]
  topSources: { source: string; sessions: number; orders: number; conv: number }[]
  topCountries: { country: string; orders: number; revenue: number }[]
  prev: {
    grossSales: number
    netRevenue: number
    orders: number
    conversion: number
    returning: number
  }
}

// ---- Dummy datasets (NOK) ----
const DATA: Record<RangeKey, RangeData> = {
  '7d': {
    grossSales: 124_900,
    netRevenue: 110_450,
    orders: 208,
    conversion: 2.4,
    returning: 26.0,
    topProducts: [
      { name: 'Merino Beanie', units: 56, sales: 16_800 },
      { name: 'Everyday Hoodie', units: 34, sales: 27_200 },
      { name: 'Trail Runner Tee', units: 48, sales: 19_200 },
      { name: 'Wool Socks (3-pack)', units: 62, sales: 12_400 },
      { name: 'Windbreaker', units: 8, sales: 8_800 },
    ],
    topSources: [
      { source: 'Direct / none', sessions: 2_100, orders: 78, conv: 3.7 },
      { source: 'Google / cpc', sessions: 3_400, orders: 72, conv: 2.1 },
      { source: 'Instagram / social', sessions: 1_600, orders: 36, conv: 2.3 },
      { source: 'Email / campaign', sessions: 690, orders: 18, conv: 2.6 },
      { source: 'Referral / blog', sessions: 520, orders: 4, conv: 0.8 },
    ],
    topCountries: [
      { country: 'Norway', orders: 162, revenue: 91_300 },
      { country: 'Sweden', orders: 22, revenue: 8_900 },
      { country: 'Denmark', orders: 14, revenue: 6_200 },
      { country: 'Germany', orders: 6, revenue: 2_800 },
      { country: 'Netherlands', orders: 4, revenue: 1_250 },
    ],
    prev: {
      grossSales: 112_300,
      netRevenue: 101_100,
      orders: 191,
      conversion: 2.2,
      returning: 24.3,
    },
  },
  '30d': {
    grossSales: 498_200,
    netRevenue: 441_500,
    orders: 861,
    conversion: 2.2,
    returning: 25.1,
    topProducts: [
      { name: 'Everyday Hoodie', units: 146, sales: 116_800 },
      { name: 'Merino Beanie', units: 182, sales: 54_600 },
      { name: 'Trail Runner Tee', units: 204, sales: 81_600 },
      { name: 'Wool Socks (3-pack)', units: 226, sales: 45_200 },
      { name: 'Windbreaker', units: 53, sales: 58_300 },
    ],
    topSources: [
      { source: 'Direct / none', sessions: 8_900, orders: 324, conv: 3.6 },
      { source: 'Google / cpc', sessions: 12_400, orders: 298, conv: 2.4 },
      { source: 'Instagram / social', sessions: 6_500, orders: 142, conv: 2.2 },
      { source: 'Email / campaign', sessions: 2_900, orders: 71, conv: 2.4 },
      { source: 'Referral / blog', sessions: 2_300, orders: 26, conv: 1.1 },
    ],
    topCountries: [
      { country: 'Norway', orders: 656, revenue: 360_400 },
      { country: 'Sweden', orders: 98, revenue: 39_200 },
      { country: 'Denmark', orders: 62, revenue: 27_700 },
      { country: 'Germany', orders: 28, revenue: 13_100 },
      { country: 'Netherlands', orders: 17, revenue: 7_400 },
    ],
    prev: {
      grossSales: 456_900,
      netRevenue: 409_200,
      orders: 803,
      conversion: 2.0,
      returning: 23.7,
    },
  },
  '90d': {
    grossSales: 1_412_600,
    netRevenue: 1_249_800,
    orders: 2_460,
    conversion: 2.1,
    returning: 24.3,
    topProducts: [
      { name: 'Everyday Hoodie', units: 412, sales: 329_600 },
      { name: 'Merino Beanie', units: 598, sales: 179_400 },
      { name: 'Trail Runner Tee', units: 622, sales: 248_800 },
      { name: 'Wool Socks (3-pack)', units: 668, sales: 133_600 },
      { name: 'Windbreaker', units: 156, sales: 171_600 },
    ],
    topSources: [
      { source: 'Direct / none', sessions: 26_800, orders: 896, conv: 3.3 },
      { source: 'Google / cpc', sessions: 35_200, orders: 866, conv: 2.5 },
      { source: 'Instagram / social', sessions: 18_100, orders: 402, conv: 2.2 },
      { source: 'Email / campaign', sessions: 8_300, orders: 190, conv: 2.3 },
      { source: 'Referral / blog', sessions: 6_400, orders: 74, conv: 1.2 },
    ],
    topCountries: [
      { country: 'Norway', orders: 1_862, revenue: 1_004_100 },
      { country: 'Sweden', orders: 288, revenue: 113_300 },
      { country: 'Denmark', orders: 192, revenue: 85_900 },
      { country: 'Germany', orders: 76, revenue: 36_600 },
      { country: 'Netherlands', orders: 42, revenue: 18_900 },
    ],
    prev: {
      grossSales: 1_331_400,
      netRevenue: 1_178_200,
      orders: 2_302,
      conversion: 2.0,
      returning: 23.2,
    },
  },
}

// Format helpers
const NOK = new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 })
const fmtNum = (n: number) => new Intl.NumberFormat('en-US').format(n)
const pct = (n: number) => `${n.toFixed(1)}%`
const deltaPct = (curr: number, prev: number) => (prev === 0 ? 0 : ((curr - prev) / prev) * 100)

export default function AnalyticsPage() {
  const [range, setRange] = useState<RangeKey>('30d')
  const data = DATA[range]

  // Derived
  const aov = useMemo(() => (data.orders ? data.netRevenue / data.orders : 0), [data])
  const deltas = useMemo(
    () => ({
      gross: deltaPct(data.grossSales, data.prev.grossSales),
      net: deltaPct(data.netRevenue, data.prev.netRevenue),
      orders: deltaPct(data.orders, data.prev.orders),
      conv: deltaPct(data.conversion, data.prev.conversion),
      ret: deltaPct(data.returning, data.prev.returning),
    }),
    [data]
  )

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-600 mt-1">Revenue, orders, and traffic — at a glance.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <RangePills range={range} onChange={setRange} />
          </div>
        </div>

        {/* KPI Cards (with deltas) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <KPI label="Gross sales" value={NOK.format(data.grossSales)} delta={deltas.gross} icon={TrendingUp} />
          <KPI label="Net revenue" value={NOK.format(data.netRevenue)} delta={deltas.net} icon={ChartNoAxesColumn} />
          <KPI label="Orders" value={fmtNum(data.orders)} delta={deltas.orders} icon={ShoppingCart} />
          <KPI label="AOV" value={NOK.format(aov)} delta={0} icon={Package} />
          <KPI label="Conversion" value={pct(data.conversion)} delta={deltas.conv} icon={BadgePercent} />
          <KPI label="Returning customers" value={pct(data.returning)} delta={deltas.ret} icon={UsersRound} />
        </section>

        {/* Chart placeholder */}
        <Card>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Revenue over time</h3>
            <span className="text-xs text-gray-500">Charts coming soon</span>
          </div>
          <div className="mt-4 h-48 rounded-2xl border-2 border-dashed border-gray-200 bg-white" />
        </Card>

        {/* Tables */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Top products</h3>
              <Link href="/dashboard/products" className="text-sm text-gray-700 hover:underline">View products</Link>
            </div>
            <SimpleTable
              headers={['Product', 'Units', 'Revenue']}
              rows={data.topProducts.map(p => [p.name, fmtNum(p.units), NOK.format(p.sales)])}
            />
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Top sources</h3>
              <span className="text-xs text-gray-500">UTM + referrers</span>
            </div>
            <SimpleTable
              headers={['Source', 'Sessions', 'Orders', 'Conv.']}
              rows={data.topSources.map(s => [s.source, fmtNum(s.sessions), fmtNum(s.orders), pct(s.conv)])}
            />
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Top countries</h3>
              <span className="text-xs text-gray-500">Geo breakdown</span>
            </div>
            <SimpleTable
              headers={['Country', 'Orders', 'Revenue']}
              rows={data.topCountries.map(c => [c.country, fmtNum(c.orders), NOK.format(c.revenue)])}
            />
          </Card>
        </section>
      </div>
    </main>
  )
}

/* ----------- UI pieces ----------- */

function RangePills({
  range,
  onChange,
}: {
  range: RangeKey
  onChange: (r: RangeKey) => void
}) {
  const opts: RangeKey[] = ['7d', '30d', '90d']
  return (
    <div className="flex items-center bg-white border border-black/10 rounded-full p-1">
      {opts.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`px-3 py-1.5 text-xs rounded-full transition ${
            range === r ? 'bg-black text-white' : 'text-gray-800 hover:bg-black/5'
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  )
}

function KPI({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string
  value: string
  delta: number
  icon: any
}) {
  const positive = delta > 0
  const negative = delta < 0
  const DeltaIcon = positive ? ArrowUpRight : negative ? ArrowDownRight : null
  const deltaStr = `${Math.abs(delta).toFixed(1)}%`

  return (
    <div className="rounded-2xl bg-white border border-black/10 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">{label}</div>
        <Icon className="h-4 w-4 text-gray-500" />
      </div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
      <div className="mt-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
            positive
              ? 'bg-emerald-50 text-emerald-700'
              : negative
              ? 'bg-rose-50 text-rose-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {DeltaIcon && <DeltaIcon className="h-3.5 w-3.5" />}
          {delta === 0 ? '—' : deltaStr}
        </span>
        <span className="ml-2 text-xs text-gray-500">vs previous period</span>
      </div>
    </div>
  )
}

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`rounded-3xl bg-white border border-black/10 shadow-sm p-5 ${className}`}>
      {children}
    </div>
  )
}

function SimpleTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: (string | number)[][]
}) {
  if (!rows.length) {
    return <EmptyList note="No data yet." />
  }
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left font-medium text-gray-700 px-4 py-2">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={i} className="hover:bg-gray-50/60">
              {r.map((cell, j) => (
                <td key={j} className="px-4 py-2 text-gray-800">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function EmptyList({
  note,
  icon: Icon = Package,
}: {
  note: string
  icon?: any
}) {
  return (
    <div className="mt-4">
      <div className="rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Icon className="h-5 w-5 text-gray-700" />
        </div>
        <p className="mt-3 text-sm text-gray-600">{note}</p>
      </div>
    </div>
  )
}
