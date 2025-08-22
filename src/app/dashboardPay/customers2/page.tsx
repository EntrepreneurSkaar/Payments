// app/dashboardPay/customers/page.tsx
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus, Copy, Download, BarChart3, Settings2, UserRound, Info, X, Wand2,
} from 'lucide-react'

type Tab = 'all' | 'remaining'

type TestCustomer = {
  id: string
  name: string
  email?: string
  phone?: string
  country?: string
  city?: string
  postal_code?: string
  createdAt: string
}

const LS_KEY = 'np.customers'

export default function CustomersPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('all')

  // --- customers state (persisted in localStorage) ---
  const [customers, setCustomers] = useState<TestCustomer[]>([])
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) {
        const parsed: TestCustomer[] = JSON.parse(raw)
        // sort newest first
        parsed.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        setCustomers(parsed)
      }
    } catch {}
  }, [])
  const saveCustomers = (list: TestCustomer[]) => {
    setCustomers(list)
    try { localStorage.setItem(LS_KEY, JSON.stringify(list)) } catch {}
  }

  // modal + success banner
  const [openAdd, setOpenAdd] = useState(false)
  const [justCreated, setJustCreated] = useState<TestCustomer | null>(null)

  const addCustomer = (c: TestCustomer) => {
    const next = [c, ...customers]
    saveCustomers(next)
    setJustCreated(c)
  }

  // table data (filtering hooks live here later)
  const rows = useMemo(() => customers, [customers])

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-8xl py-8">

        {/* Success banner */}
        {justCreated && (
          <div className="mb-4 flex items-center justify-between rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2">
            <div className="text-sm text-emerald-900">
              Test customer <span className="font-medium">{justCreated.name}</span> created
              <span className="ml-2 text-emerald-800/80">({justCreated.id})</span>
            </div>
            <button
              onClick={() => setJustCreated(null)}
              className="rounded p-1.5 text-emerald-800 hover:bg-emerald-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] leading-8 font-semibold text-zinc-900">Customers</h1>

          <button
            onClick={() => setOpenAdd(true)}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" />
            Add customer
            <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px]">
              N
            </span>
          </button>
        </div>

        {/* Top controls */}
        <div className="mt-6 space-y-3">
          {/* Row 1: two equal-width tabs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab('all')}
              className={`flex h-11 flex-1 items-center justify-between rounded-md px-4 text-[15px] transition
                ${tab === 'all'
                  ? 'border border-violet-500/80 bg-white text-violet-600 font-medium'
                  : 'border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50'}`}
              aria-pressed={tab === 'all'}
            >
              <span>All</span>
            </button>

            <button
              onClick={() => setTab('remaining')}
              className={`flex h-11 flex-1 items-center justify-between rounded-md px-4 text-[15px] transition
                ${tab === 'remaining'
                  ? 'border border-violet-500/80 bg-white text-violet-600 font-medium'
                  : 'border border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50'}`}
              aria-pressed={tab === 'remaining'}
            >
              <span>Remaining balances</span>
            </button>
          </div>

          {/* Row 2: filters (left) + actions (right) */}
          <div className="flex flex-wrap items-center gap-2">
            {tab === 'all' && (
              <div className="flex flex-wrap items-center gap-2">
                <FilterChip>Email</FilterChip>
                <FilterChip>Card</FilterChip>
                <FilterChip>Created date</FilterChip>
                <FilterChip>Type</FilterChip>
                <FilterChip>More filters</FilterChip>
              </div>
            )}

            <div className="flex-1" />

            <div className="flex items-center gap-2">
              <PillBtn icon={<Copy className="h-4 w-4" />}>Copy</PillBtn>
              <PillBtn icon={<Download className="h-4 w-4" />}>Export</PillBtn>
              <PillBtn icon={<BarChart3 className="h-4 w-4" />}>Analyze</PillBtn>
              <PillBtn icon={<Settings2 className="h-4 w-4" />}>Edit columns</PillBtn>
            </div>
          </div>
        </div>

        {/* Content */}
        {tab === 'all' ? (
          rows.length === 0 ? (
            <EmptyState onAdd={() => setOpenAdd(true)} router={router} />
          ) : (
            <CustomersTable rows={rows} />
          )
        ) : (
          <RemainingBalancesEmpty />
        )}

        {/* Footer: results + pager */}
        <div className="mt-10 flex items-center justify-between text-sm">
          <span className="text-zinc-500">{rows.length} result{rows.length === 1 ? '' : 's'}</span>
          <div className="flex items-center gap-2">
            <button disabled className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-zinc-400">
              Previous
            </button>
            <button disabled className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-zinc-400">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AddTestCustomerDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreate={(c) => {
          addCustomer(c)
          setOpenAdd(false)
        }}
      />
    </main>
  )
}

/* ——— Pieces ——— */

function CustomersTable({ rows }: { rows: TestCustomer[] }) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit',
  })

  return (
    <section className="mt-8 overflow-hidden rounded-md">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50/50 text-zinc-600">
          <tr className="[&>th]:px-4 [&>th]:py-2 text-left">
            <th>Customer</th>
            <th>Email</th>
            <th>City</th>
            <th>Country</th>
            <th className="text-right">Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200">
          {rows.map((c) => (
            <tr key={c.id} className="hover:bg-zinc-50">
              <td className="px-4 py-2">
                <div className="font-medium text-zinc-900">{c.name}</div>
                <div className="text-xs text-zinc-500">{c.id}</div>
              </td>
              <td className="px-4 py-2 text-zinc-700">{c.email ?? '—'}</td>
              <td className="px-4 py-2 text-zinc-700">{c.city ?? '—'}</td>
              <td className="px-4 py-2 text-zinc-700">{c.country ?? '—'}</td>
              <td className="px-4 py-2 text-right tabular-nums text-zinc-700">
                {fmt.format(new Date(c.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function EmptyState({ onAdd, router }: { onAdd: () => void; router: ReturnType<typeof useRouter> }) {
  return (
    <section className="mt-16 flex justify-center">
      <div className="max-w-md text-left">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
          <UserRound className="h-6 w-6 text-zinc-500" />
        </div>
        <h2 className="text-lg font-semibold text-zinc-900">Add your first test customer</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Bill customers with one-off or recurring invoices, or subscriptions.
        </p>
        <button
          onClick={() => router.push('/docs/customers')}
          className="mt-3 text-sm text-sky-700 hover:underline"
        >
          Learn more →
        </button>

        <div className="mt-5">
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" />
            Add a test customer
          </button>
        </div>
      </div>
    </section>
  )
}

function RemainingBalancesEmpty() {
  return (
    <section className="mt-16 flex justify-center">
      <div className="max-w-xl text-left">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
          <Info className="h-5 w-5 text-zinc-500" />
        </div>
        <h2 className="text-[17px] font-semibold text-zinc-900">
          No remaining customer cash balances
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Remaining balances are bank transfers payments that remain unreconciled.
        </p>
        <button className="mt-4 text-sm font-medium text-violet-600 hover:text-violet-800">
          Learn more →
        </button>
      </div>
    </section>
  )
}

function PillBtn({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3.5 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50">
      {icon}
      {children}
    </button>
  )
}

function FilterChip({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full border border-dashed border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50">
      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-300 text-[11px] text-zinc-500">
        +
      </span>
      {children}
    </button>
  )
}

/* ——— Modal (same as before) ——— */

function AddTestCustomerDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean
  onClose: () => void
  onCreate: (c: TestCustomer) => void
}) {
  const nameRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('NO')
  const [city, setCity] = useState('')
  const [postal, setPostal] = useState('')

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => nameRef.current?.focus(), 10)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canSubmit = name.trim().length > 0 && emailValid

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    const id = 'cus_test_' + Math.random().toString(36).slice(2, 10)
    onCreate({
      id,
      name: name.trim(),
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      country,
      city: city.trim() || undefined,
      postal_code: postal.trim() || undefined,
      createdAt: new Date().toISOString(),
    })
  }

  const fillDummy = () => {
    const names = ['Ola Nordmann', 'Kari Nordmann', 'North Labs AS', 'ACME AS', 'Fjord Tech']
    const pick = names[Math.floor(Math.random() * names.length)]
    const slug = pick.toLowerCase().replace(/[^a-z0-9]+/g, '')
    setName(pick)
    setEmail(`test+${slug}@example.com`)
    setPhone('+47 40123456')
    setCity('Oslo')
    setPostal('0150')
    setCountry('NO')
  }

  const overlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      onMouseDown={overlayClick}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="add-test-customer-title"
    >
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl border border-zinc-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <div>
            <h2 id="add-test-customer-title" className="text-base font-semibold text-zinc-900">
              Add a test customer
            </h2>
            <p className="text-sm text-zinc-600">
              Create a dummy customer to simulate payments, invoices, or subscriptions.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body / Form */}
        <form onSubmit={submit} className="px-5 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Name" required>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                placeholder="Ola Nordmann"
              />
            </Field>

            <Field label="Email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300 ${
                  email && !emailValid ? 'border-red-400' : 'border-zinc-300'
                }`}
                placeholder="test@example.com"
                type="email"
              />
              {email && !emailValid && (
                <p className="mt-1 text-xs text-red-600">Enter a valid email.</p>
              )}
            </Field>

            <Field label="Phone">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                placeholder="+47 40123456"
              />
            </Field>

            <Field label="Country">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300 bg-white"
              >
                <option value="NO">Norway</option>
                <option value="SE">Sweden</option>
                <option value="DK">Denmark</option>
                <option value="FI">Finland</option>
                <option value="IS">Iceland</option>
                <option value="OTHER">Other</option>
              </select>
            </Field>

            <Field label="City">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                placeholder="Oslo"
              />
            </Field>

            <Field label="Postal code">
              <input
                value={postal}
                onChange={(e) => setPostal(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                placeholder="0150"
              />
            </Field>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={fillDummy}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
            >
              <Wand2 className="w-4 h-4" />
              Fill with dummy data
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim() || !(!email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
                className={`rounded-md px-3 py-2 text-sm text-white ${
                  name.trim() && (!email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                    ? 'bg-[#1F3D2B] hover:bg-[#183023]'
                    : 'bg-zinc-300 cursor-not-allowed'
                }`}
              >
                Create test customer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

/* Small form helper */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="text-zinc-700">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
