'use client'

import { useMemo } from 'react'

type Props = {
  /** Transaction amounts in øre (cents). Negative values are refunds. */
  txs?: number[]
  /** Percentage fee on successful payments, e.g. 0.029 = 2.9% */
  feePct?: number
  /** Fixed fee in øre per successful payment, e.g. 300 = NOK 3.00 */
  fixedFee?: number
}

const formatNOK = (v: number) =>
  new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    maximumFractionDigits: 0,
  }).format(v / 100)

export default function TodaySection({
  txs = [24900, 19900, 5900, 12900, 9900, 39900, 14900, 29900, 5900, -24900],
  feePct = 0.029,
  fixedFee = 300,
}: Props) {
  const now = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date()),
    []
  )

  const {
    grossToday,
    refundTotal,
    feeToday,
    netToday,
    paymentsCount,
  } = useMemo(() => {
    const successes = txs.filter(v => v > 0)
    const refunds = txs.filter(v => v < 0).map(Math.abs)

    const gross = successes.reduce((s, v) => s + v, 0)
    const refund = refunds.reduce((s, v) => s + v, 0)
    const fee = Math.round(gross * feePct) + successes.length * fixedFee
    const net = gross - refund - fee

    return {
      grossToday: gross,
      refundTotal: refund,
      feeToday: fee,
      netToday: net,
      paymentsCount: successes.length,
    }
  }, [txs, feePct, fixedFee])

  const items = [
    { label: 'Gross volume', value: formatNOK(grossToday) },
    { label: 'Net volume', value: formatNOK(netToday) },
    { label: 'Refunds', value: formatNOK(refundTotal) },
    { label: 'Payments', value: String(paymentsCount) },
  ] as const

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-8xl py-10">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Today</h2>
        <div className="mt-4 h-px bg-zinc-200" />

        {txs.length === 0 ? (
          <div className="mt-8 rounded-lg border border-dashed border-zinc-200 p-8 text-center">
            <div className="text-sm text-zinc-600">No activity yet today</div>
            <div className="mt-1 text-xs text-zinc-500">{now}</div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {items.map(i => (
              <MetricCard key={i.label} label={i.label} value={i.value} time={now} />
            ))}
          </div>
        )}

        {/* Optional: show fees breakdown under the grid */}
        {txs.length > 0 && (
          <div className="mt-6 text-xs text-zinc-500">
            Fees today: <span className="tabular-nums text-zinc-700">{formatNOK(feeToday)}</span>
          </div>
        )}
      </div>
    </section>
  )
}

function MetricCard({ label, value, time }: { label: string; value: string; time: string }) {
  return (
    <div
      className="rounded-lg bg-gray-50 p-4 md:p-5"
      role="group"
      aria-label={label}
    >
      <div className="text-sm text-zinc-600">{label}</div>
      <div className="mt-1 text-3xl font-semibold text-zinc-900 tabular-nums">{value}</div>
      <div className="text-xs text-zinc-500">{time}</div>
    </div>
  )
}
