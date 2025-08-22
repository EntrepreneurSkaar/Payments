'use client'

export default function OverviewSection() {
  // ---------- Dummy data ----------
  const payments = [
    { id: 'pm_001', desc: 'Subscription — Pro plan', amount: 24900, customer: 'Ola Nordmann' },
    { id: 'pm_002', desc: 'One-time — Onboarding call', amount: 99000, customer: 'North Labs' },
    { id: 'pm_003', desc: 'Invoice — ACME AS', amount: 1230000, customer: 'ACME AS' },
    { id: 'pm_004', desc: 'Refund — Order #1231', amount: -24900, customer: 'Ola Nordmann' },
  ]

  const failedPayments = [
    { id: 'fp_01', reason: 'Insufficient funds', amount: 99000, customer: 'North Labs' },
    { id: 'fp_02', reason: 'Authentication required', amount: 12900, customer: 'Ola Nordmann' },
  ]

  const topCustomers = [
    { name: 'ACME AS', amount: 1230000 },
    { name: 'North Labs', amount: 99000 },
    { name: 'Polar Retail', amount: 59000 },
    { name: 'Fjord Tech', amount: 39900 },
    { name: 'Bergen Media', amount: 29900 },
  ]

  const sparkA = [3, 6, 2, 8, 4, 7, 5]
  const sparkB = [2, 5, 1, 6, 3, 5, 4]
  const sparkCustomers = [1, 0, 2, 1, 3, 0, 1]

  // ---------- Helpers / computed ----------
  const nok = (v: number) =>
    new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(v / 100)

  const positive = payments.filter(p => p.amount > 0)
  const refunds = payments.filter(p => p.amount < 0)

  const grossVolume = positive.reduce((s, p) => s + p.amount, 0)
  const refundTotal = refunds.reduce((s, p) => s + Math.abs(p.amount), 0)

  // mock fees: 2.9% + 3 NOK per successful payment
  const feeTotal = positive.reduce((s, p) => s + Math.round(p.amount * 0.029) + 300, 0)

  const netVolume = grossVolume - feeTotal - refundTotal

  const newCustomers = 4
  const dateRange = 'Aug 6 — Aug 12'

  // tiny sparkline svg
  const Sparkline = ({ data, accent = '#7c3aed' }: { data: number[]; accent?: string }) => {
    const w = 520, h = 80, pad = 8
    const max = Math.max(1, ...data)
    const stepX = (w - pad * 2) / (data.length - 1 || 1)
    const pts = data
      .map((v, i) => {
        const x = pad + i * stepX
        const y = h - pad - (v / max) * (h - pad * 2)
        return `${x},${y}`
      })
      .join(' ')
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-20">
        <line x1="0" y1={h - 1} x2={w} y2={h - 1} stroke="#e5e7eb" />
        <polyline points={pts} fill="none" stroke={accent} strokeWidth="2" />
      </svg>
    )
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-8xl py-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Your overview</h2>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Payments list */}
          <Card className="lg:col-span-4">
            <Header title="Payments" />
            <div className="mt-3 divide-y divide-zinc-200">
              {payments.map(p => (
                <div key={p.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm text-zinc-900">{p.desc}</div>
                    <div className="text-xs text-zinc-500">{p.customer}</div>
                  </div>
                  <div className={`ml-4 text-sm tabular-nums ${p.amount < 0 ? 'text-rose-600' : 'text-zinc-900'}`}>
                    {p.amount < 0 ? `-${nok(Math.abs(p.amount))}` : nok(p.amount)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Gross volume */}
          <Card className="lg:col-span-4">
            <Header title="Gross volume" value={nok(grossVolume)} sub="NOK 0 previous period" />
            <div className="mt-3">
              <Sparkline data={sparkA} />
              <div className="mt-2 text-sm text-violet-600">{nok(grossVolume)}</div>
              <div className="mt-1 text-xs text-zinc-500">{dateRange}</div>
              <button className="mt-2 text-sm text-zinc-700 hover:underline">View more</button>
            </div>
          </Card>

          {/* Net volume from sales */}
          <Card className="lg:col-span-4">
            <Header title="Net volume from sales" value={nok(netVolume)} sub={`Fees ${nok(feeTotal)} · Refunds ${nok(refundTotal)}`} />
            <div className="mt-3">
              <Sparkline data={sparkB} />
              <div className="mt-2 text-sm text-violet-600">{nok(netVolume)}</div>
              <div className="mt-1 text-xs text-zinc-500">{dateRange}</div>
              <button className="mt-2 text-sm text-zinc-700 hover:underline">View more</button>
            </div>
          </Card>

          {/* Failed payments */}
          <Card className="lg:col-span-4">
            <Header title="Failed payments" value={`${failedPayments.length}`} sub={`${nok(failedPayments.reduce((s,f)=>s+f.amount,0))} total value`} />
            <div className="mt-4 space-y-3">
              {failedPayments.map(f => (
                <div key={f.id} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="truncate text-sm text-zinc-900">{f.reason}</div>
                    <div className="text-xs text-zinc-500">{f.customer}</div>
                  </div>
                  <div className="ml-4 text-sm tabular-nums text-rose-600">{nok(f.amount)}</div>
                </div>
              ))}
              {failedPayments.length === 0 && (
                <div className="rounded-lg h-24 flex items-center justify-center">
                  <span className="text-sm text-zinc-500">No failed payments</span>
                </div>
              )}
            </div>
          </Card>

          {/* New customers */}
          <Card className="lg:col-span-4">
            <Header title="New customers" value={`${newCustomers}`} sub="0 previous period" />
            <div className="mt-3">
              <Sparkline data={sparkCustomers} />
              <div className="mt-1 text-xs text-zinc-500">{dateRange}</div>
            </div>
          </Card>

          {/* Top customers by spend */}
          <Card className="lg:col-span-4">
            <div className="flex items-center justify-between">
              <Header title="Top customers by spend" />
              <span className="text-xs text-zinc-500">All time</span>
            </div>
            <div className="mt-3 space-y-3">
              {(() => {
                const max = Math.max(...topCustomers.map(t => t.amount))
                return topCustomers.map(c => {
                  const pct = Math.round((c.amount / max) * 100)
                  return (
                    <div key={c.name} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-zinc-900 truncate">{c.name}</div>
                        <div className="text-sm tabular-nums text-zinc-900">{nok(c.amount)}</div>
                      </div>
                      <div className="h-1.5 rounded bg-zinc-200 overflow-hidden">
                        <div className="h-full bg-violet-600" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl bg-gray-50 p-4 md:p-5 ${className}`}>{children}</div>
  )
}

function Header({ title, value, sub }: { title: string; value?: string; sub?: string }) {
  return (
    <div>
      <div className="text-sm text-zinc-700">{title}</div>
      {value && <div className="mt-1 text-2xl font-semibold text-zinc-900 tabular-nums">{value}</div>}
      {sub && <div className="text-xs text-zinc-500">{sub}</div>}
    </div>
  )
}
