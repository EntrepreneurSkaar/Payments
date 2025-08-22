'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Info, FileText, ArrowDownUp, CheckCircle2, Loader2, Shield, Banknote } from 'lucide-react'

type Activity = {
  id: string
  type: 'payout' | 'topup'
  date: string // ISO
  description: string
  amount: number // øre (positive number; we'll sign based on type)
  status: 'paid' | 'pending' | 'failed'
}

type Tab = 'payouts' | 'topups' | 'all'

export default function BalancesPage() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // ---- Dummy balances (øre) ----
  const incoming = 129_500 // 1 295.00 kr
  const _available = 98_700_00 // 9 870.00 kr
  const incomingAmt = incoming
  const availableAmt = _available
  const total = incomingAmt + availableAmt

  // ---- Dummy recent activity ----
  const [tab, setTab] = useState<Tab>('payouts')
  const activities: Activity[] = [
    { id: 'po_017', type: 'payout', date: '2025-07-31T14:05:00Z', description: 'Payout to DNB •••• 1234', amount: 5_200_00, status: 'paid' },
    { id: 'po_016', type: 'payout', date: '2025-07-28T10:22:00Z', description: 'Payout to DNB •••• 1234', amount: 3_450_00, status: 'paid' },
    { id: 'tu_009', type: 'topup',  date: '2025-07-26T08:40:00Z', description: 'Top-up from NordPay treasury', amount: 2_000_00, status: 'paid' },
    { id: 'po_015', type: 'payout', date: '2025-07-22T16:11:00Z', description: 'Payout to DNB •••• 1234', amount: 4_100_00, status: 'paid' },
    { id: 'tu_008', type: 'topup',  date: '2025-07-18T09:05:00Z', description: 'Top-up from NordPay treasury', amount: 1_250_00, status: 'paid' },
  ]
  const rows =
    tab === 'payouts' ? activities.filter(a => a.type === 'payout')
    : tab === 'topups' ? activities.filter(a => a.type === 'topup')
    : activities

  const nok = (v: number) =>
    new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK', minimumFractionDigits: 2 }).format(v / 100)

  // progress bar widths
  const totalAmt = incomingAmt + availableAmt
  const incomingPct = totalAmt === 0 ? 0 : Math.round((incomingAmt / totalAmt) * 100)
  const availablePct = 100 - incomingPct

  // Close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  // Close dropdown on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // --------- NEW: Add bank account modal control ----------
  const [showBankModal, setShowBankModal] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">
        {/* Header (buttons aligned right) */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-[28px] leading-8 font-semibold text-zinc-900">
            Balances <span className="text-zinc-500 text-[22px] align-middle">{nok(total)}</span>
          </h1>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Manage payouts dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(s => !s)}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50"
              >
                Manage payouts
                <svg className="h-4 w-4 text-zinc-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-zinc-200 bg-white p-1 shadow-sm z-20">
                  {['Pause payouts', 'Resume payouts', 'Pay out now'].map((item) => (
                    <button
                      key={item}
                      className="w-full text-left text-sm px-3 py-2 rounded-md hover:bg-zinc-100 text-zinc-800"
                      onClick={() => setOpen(false)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary action */}
            <button
              onClick={() => setShowBankModal(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 hover:bg-zinc-50"
            >
              <Plus className="h-4 w-4" />
              Add bank account
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="mt-6">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
            <Info className="h-4 w-4 text-zinc-500" />
            Add a bank account to pay out your NOK balance
          </div>
        </div>

        {/* Main content grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Balance summary & Activity */}
          <div className="lg:col-span-9 space-y-6">
            {/* Balance summary */}
            <div className="rounded-xl bg-white pt-5">
              <h3 className="text-sm font-medium text-zinc-800">Balance summary</h3>

              <div className="mt-4 space-y-4">
                {/* Stacked bar */}
                <div className="h-3 w-full rounded-full bg-zinc-200 overflow-hidden flex">
                  <div
                    className="h-full bg-zinc-300"
                    style={{ width: `${incomingPct}%` }}
                    title={`Incoming ${incomingPct}%`}
                  />
                  <div
                    className="h-full bg-violet-500/70"
                    style={{ width: `${availablePct}%` }}
                    title={`Available ${availablePct}%`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <LegendRow colorClass="bg-zinc-300" label="Incoming" value={nok(incomingAmt)} />
                  <LegendRow colorClass="bg-violet-500" label="Available" value={nok(availableAmt)} />
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="rounded-xl bg-white pt-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-800">Recent activity</h3>
                <button className="text-sm text-violet-600 hover:underline">View more ↗</button>
              </div>

              {/* Tabs */}
              <div className="mt-4 flex items-center gap-6 text-sm">
                <button
                  onClick={() => setTab('payouts')}
                  className={tab === 'payouts' ? 'text-violet-600 font-medium' : 'text-zinc-600 hover:text-zinc-800'}
                >
                  Payouts
                </button>
                <button
                  onClick={() => setTab('topups')}
                  className={tab === 'topups' ? 'text-violet-600 font-medium' : 'text-zinc-600 hover:text-zinc-800'}
                >
                  Top-ups
                </button>
                <button
                  onClick={() => setTab('all')}
                  className={tab === 'all' ? 'text-violet-600 font-medium' : 'text-zinc-600 hover:text-zinc-800'}
                >
                  All activity
                </button>
              </div>

              {/* List */}
              {rows.length === 0 ? (
                <div className="mt-4 h-40 rounded-lg border-dashed border border-zinc-200 flex items-center justify-center">
                  <span className="text-sm text-zinc-500">No recent activity</span>
                </div>
              ) : (
                <ul className="mt-4 divide-y divide-zinc-200 rounded-lg border border-zinc-200">
                  {rows.map((a) => (
                    <li key={a.id} className="flex items-center justify-between px-4 py-3 text-sm">
                      <div className="min-w-0">
                        <div className="text-zinc-900">
                          {a.type === 'payout' ? 'Payout' : 'Top-up'} · <span className="text-zinc-700">{a.description}</span>
                        </div>
                        <div className="text-xs text-zinc-500">
                          {new Date(a.date).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })} · {a.status}
                        </div>
                      </div>
                      <div className={`tabular-nums ${a.type === 'payout' ? 'text-zinc-900' : 'text-emerald-700'}`}>
                        {a.type === 'payout' ? `−${nok(a.amount)}` : `+${nok(a.amount)}`}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right: Reports */}
          <div className="lg:col-span-3">
            <div className="rounded-xl bg-white p-5">
              <h3 className="text-sm font-medium text-zinc-800">Reports</h3>

              <div className="mt-4 space-y-3">
                <ReportItem
                  icon={<FileText className="h-5 w-5 text-zinc-500" />}
                  title="Balance summary"
                  subtitle="Jul 2025"
                />
                <ReportItem
                  icon={<ArrowDownUp className="h-5 w-5 text-zinc-500" />}
                  title="Payout reconciliation"
                  subtitle="Jul 2025"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: Modal */}
      {showBankModal && (
        <AddBankAccountModal onClose={() => setShowBankModal(false)} />
      )}
    </main>
  )
}

/* --------------------------- New Modal Component --------------------------- */

function AddBankAccountModal({ onClose }: { onClose: () => void }) {
  const [holder, setHolder] = useState('NordPay AS')
  const [iban, setIban] = useState('NO43 8601 1117 947') // dummy-looking
  const [bic, setBic] = useState('DNBANOKK') // dummy BIC
  const [bank, setBank] = useState<string>('DNB Bank ASA')
  const [country, setCountry] = useState<string>('Norway')
  const [currency, setCurrency] = useState<string>('NOK')

  const [errors, setErrors] = useState<{ holder?: string; iban?: string; bic?: string }>({})
  const [step, setStep] = useState<'form' | 'verifying' | 'micro' | 'success' | 'failed'>('form')
  const [progress, setProgress] = useState(0)
  const [last4, setLast4] = useState('7947')

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Infer bank/country/currency from IBAN quickly
  useEffect(() => {
    const clean = iban.replace(/\s+/g, '').toUpperCase()
    const cc = clean.slice(0, 2)
    const m = mapCountry(cc)
    setCountry(m.country)
    setCurrency(m.currency)
    setBank(guessBank(clean))
    setLast4(clean.slice(-4))
  }, [iban])

  const validate = () => {
    const errs: typeof errors = {}
    if (!holder.trim()) errs.holder = 'Account holder is required'
    if (!isValidIBAN(iban)) errs.iban = 'Enter a valid IBAN'
    if (!/^[A-Z0-9]{8,11}$/.test(bic.trim().toUpperCase())) errs.bic = 'BIC should be 8–11 chars'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setStep('verifying')
    setProgress(0)

    // Simulate ownership/KYC check
    await tickTo(60, 700, 1200)
    // Simulate bank network response
    await tickTo(100, 500, 900)

    // 85% success chance
    const ok = Math.random() < 0.85
    if (!ok) {
      setStep('failed')
      return
    }

    // Micro-deposit phase
    setStep('micro')
    setProgress(0)
    await tickTo(100, 600, 1200)
    // Auto-confirm after a short delay to simulate “instant verification”
    setTimeout(() => setStep('success'), 500)
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div
        className="absolute left-1/2 top-1/2 w-[36rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Add bank account"
      >
        {step === 'form' && (
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900">Add bank account</h3>
              <button onClick={onClose} className="rounded-md px-2 py-1 text-zinc-500 hover:bg-zinc-100">Esc</button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <Field label="Account holder">
                <input
                  value={holder}
                  onChange={e => setHolder(e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm ${errors.holder ? 'border-rose-400' : 'border-zinc-300'}`}
                  placeholder="e.g., NordPay AS"
                />
                {errors.holder && <ErrorMsg>{errors.holder}</ErrorMsg>}
              </Field>

              <Field label="IBAN">
                <input
                  value={iban}
                  onChange={e => setIban(maskIban(e.target.value))}
                  className={`w-full rounded-md border px-3 py-2 text-sm tracking-wider ${errors.iban ? 'border-rose-400' : 'border-zinc-300'}`}
                  placeholder="NO43 8601 1117 947"
                />
                {errors.iban && <ErrorMsg>{errors.iban}</ErrorMsg>}
              </Field>

              <Field label="BIC / SWIFT">
                <input
                  value={bic}
                  onChange={e => setBic(e.target.value.toUpperCase())}
                  className={`w-full rounded-md border px-3 py-2 text-sm ${errors.bic ? 'border-rose-400' : 'border-zinc-300'}`}
                  placeholder="DNBANOKK"
                />
                {errors.bic && <ErrorMsg>{errors.bic}</ErrorMsg>}
              </Field>

              <div className="grid grid-cols-3 gap-3">
                <Field label="Bank">
                  <div className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">{bank}</div>
                </Field>
                <Field label="Country">
                  <div className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">{country}</div>
                </Field>
                <Field label="Currency">
                  <div className="w-full rounded-md border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">{currency}</div>
                </Field>
              </div>

              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                <Shield className="h-4 w-4" />
                Your details are encrypted and used to send payouts only.
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
                <button onClick={onClose} className="rounded-lg px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100">
                  Cancel
                </button>
                <button
                  onClick={submit}
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-1.5 text-sm text-white hover:bg-violet-700"
                >
                  <Banknote className="h-4 w-4" />
                  Add account
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'verifying' && (
          <StepPane
            title="Verifying account details"
            subtitle="Contacting bank and checking account ownership…"
            progress={progress}
            onMountProgress={(set) => simulateProgress(set, setProgress)}
            icon={<Loader2 className="h-5 w-5 animate-spin text-violet-600" />}
          />
        )}

        {step === 'micro' && (
          <StepPane
            title="Sending micro-deposits"
            subtitle="We’re sending two small deposits to confirm the account. Auto-verifying…"
            progress={progress}
            onMountProgress={(set) => simulateProgress(set, setProgress)}
            icon={<Loader2 className="h-5 w-5 animate-spin text-violet-600" />}
          />
        )}

        {step === 'success' && (
          <div className="p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">Bank account added</h3>
            <p className="mt-1 text-sm text-zinc-600">
              {bank} •••• {last4} · {country} ({currency})
            </p>
            <div className="mt-5">
              <button
                onClick={onClose}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {step === 'failed' && (
          <div className="p-6 text-center">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
              <svg className="h-6 w-6 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">Couldn’t verify account</h3>
            <p className="mt-1 text-sm text-zinc-600">Check IBAN/BIC and try again. Your bank may be temporarily unavailable.</p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button onClick={() => setStep('form')} className="rounded-lg border border-zinc-300 px-4 py-2 text-sm hover:bg-zinc-50">
                Back
              </button>
              <button onClick={submit} className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700">
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* --------------------------------- helpers -------------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-zinc-600">{label}</div>
      {children}
    </label>
  )
}
function ErrorMsg({ children }: { children: React.ReactNode }) {
  return <div className="mt-1 text-xs text-rose-600">{children}</div>
}

function LegendRow({ colorClass, label, value }: { colorClass: string; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-zinc-700">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${colorClass}`} />
        {label}
      </div>
      <div className="text-sm text-zinc-700 tabular-nums">{value}</div>
    </div>
  )
}

function ReportItem({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <button className="w-full flex items-center gap-3 rounded-lg p-3 hover:bg-zinc-50 text-left">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-100">{icon}</div>
      <div className="flex-1">
        <div className="text-sm text-zinc-800">{title}</div>
        <div className="text-xs text-zinc-500">{subtitle}</div>
      </div>
    </button>
  )
}

/* ----- modal step pane with progress simulation ----- */
function StepPane({
  title, subtitle, progress, onMountProgress, icon,
}: {
  title: string
  subtitle: string
  progress: number
  onMountProgress: (set: (n: number) => void) => void
  icon?: React.ReactNode
}) {
  const [p, setP] = useState(progress)
  useEffect(() => { onMountProgress(setP) }, [onMountProgress])
  return (
    <div className="p-6">
      <div className="flex items-start gap-2">
        {icon}
        <div>
          <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
          <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
        </div>
      </div>
      <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-zinc-200">
        <div className="h-full bg-violet-600 transition-all" style={{ width: `${p}%` }} />
      </div>
      <div className="mt-2 text-right text-xs text-zinc-500">{p}%</div>
    </div>
  )
}

function simulateProgress(setLocal: (n: number) => void, setOuter: (n: number) => void) {
  let n = 0
  const tick = () => {
    n = Math.min(100, n + Math.round(Math.random() * 20 + 8))
    setLocal(n); setOuter(n)
    if (n < 100) setTimeout(tick, 220 + Math.random() * 180)
  }
  tick()
}
async function tickTo(target: number, min = 400, max = 900) {
  const ms = Math.floor(min + Math.random() * (max - min))
  await new Promise(r => setTimeout(r, ms))
  return target
}

function maskIban(s: string) {
  const clean = s.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
  return clean.replace(/(.{4})/g, '$1 ').trim()
}
function isValidIBAN(iban: string) {
  const clean = iban.replace(/\s+/g, '').toUpperCase()
  // Basic shape check (country + 2 check digits + 11–30 chars)
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(clean)) return false
  // Lightweight mod-97 check (no need to be perfect for simulation)
  const rearranged = clean.slice(4) + clean.slice(0, 4)
  const converted = rearranged.replace(/[A-Z]/g, c => (c.charCodeAt(0) - 55).toString())
  let remainder = 0
  for (let i = 0; i < converted.length; i += 7) {
    remainder = parseInt(String(remainder) + converted.slice(i, i + 7), 10) % 97
  }
  return remainder === 1
}
function mapCountry(cc: string): { country: string; currency: string } {
  switch (cc) {
    case 'NO': return { country: 'Norway', currency: 'NOK' }
    case 'SE': return { country: 'Sweden', currency: 'SEK' }
    case 'DK': return { country: 'Denmark', currency: 'DKK' }
    case 'FI': return { country: 'Finland', currency: 'EUR' }
    case 'NL': return { country: 'Netherlands', currency: 'EUR' }
    default:   return { country: 'Unknown', currency: 'EUR' }
  }
}
function guessBank(cleanIban: string) {
  const cc = cleanIban.slice(0,2)
  const banksNO = ['DNB Bank ASA', 'SpareBank 1', 'Nordea Bank Norge', 'Sbanken']
  const banksSE = ['SEB', 'Swedbank', 'Handelsbanken', 'Nordea']
  const banksDK = ['Danske Bank', 'Jyske Bank', 'Nordea Danmark']
  const banksFI = ['OP Financial Group', 'Nordea Finland']
  const banksNL = ['ING', 'ABN AMRO', 'Rabobank']
  const pick = (arr: string[]) => arr[Number(cleanIban.slice(-1)) % arr.length]
  switch (cc) {
    case 'NO': return pick(banksNO)
    case 'SE': return pick(banksSE)
    case 'DK': return pick(banksDK)
    case 'FI': return pick(banksFI)
    case 'NL': return pick(banksNL)
    default:   return 'Your bank'
  }
}
