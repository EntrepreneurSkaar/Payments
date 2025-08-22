'use client'

import { useEffect, useRef, useState } from 'react'
import { X, UserPlus, Wand2 } from 'lucide-react'

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

export default function AddTestCustomerButton({
  onCreate,
}: {
  onCreate?: (c: TestCustomer) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-[#1F3D2B] hover:bg-[#183023] text-white px-3 py-2 text-sm"
      >
        <UserPlus className="w-4 h-4" />
        Add test customer
      </button>
      <AddTestCustomerDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(c) => {
          onCreate?.(c)
          setOpen(false)
        }}
      />
    </>
  )
}

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
  const panelRef = useRef<HTMLDivElement>(null)

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

  // close on overlay click
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
      <div
        ref={panelRef}
        className="w-full max-w-lg rounded-xl bg-white shadow-xl border border-zinc-200"
      >
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
                disabled={!canSubmit}
                className={`rounded-md px-3 py-2 text-sm text-white ${
                  canSubmit
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
function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block text-sm">
      <span className="text-zinc-700">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
