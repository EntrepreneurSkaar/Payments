'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  X, Image as ImageIcon, Upload, Wand2, Info, ChevronDown,
} from 'lucide-react'

type Interval = 'day' | 'week' | 'month' | 'year'
type Currency = 'NOK' | 'EUR' | 'USD'

type CreatedProduct = {
  id: string
  name: string
  description?: string
  imageDataUrl?: string
  pricing: {
    mode: 'recurring' | 'oneoff'
    unitAmountMinor: number
    currency: Currency
    interval?: Interval
  }
  tax?: { collect: boolean; ratePct?: number }
  createdAt: string
}

/* ───────────────── trigger button ───────────────── */

export function CreateProductButton({
  onCreate,
  label = 'Add product',
  className = '',
}: {
  onCreate?: (p: CreatedProduct) => void
  label?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 ${className}`}
      >
        <Upload className="h-4 w-4 rotate-180" />
        {label}
      </button>
      <CreateProductDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={(p) => {
          onCreate?.(p)
          setOpen(false)
        }}
      />
    </>
  )
}

/* ───────────────── dialog ───────────────── */

export default function CreateProductDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean
  onClose: () => void
  onCreate: (p: CreatedProduct) => void
}) {
  const nameRef = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const [imageErr, setImageErr] = useState<string | null>(null)

  const [mode, setMode] = useState<'recurring' | 'oneoff'>('recurring')
  const [currency, setCurrency] = useState<Currency>('NOK')
  const [interval, setInterval] = useState<Interval>('month')

  const [amountStr, setAmountStr] = useState('0,00') // locale-friendly
  const [qtyStr, setQtyStr] = useState('1')

  const [collectTax, setCollectTax] = useState(false)
  const [taxRate, setTaxRate] = useState(25) // % (NO VAT default)

  const [showMore, setShowMore] = useState(false)
  const [showMorePricing, setShowMorePricing] = useState(false)

  // focus + ESC + body lock
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

  // parse helpers
  const parseAmountMinor = (s: string) => {
    // accept "1.234,56" or "1234.56"
    const normalized = s.replace(/\s/g, '').replace(',', '.')
    const n = Number(normalized)
    if (!isFinite(n)) return 0
    return Math.round(n * 100)
  }
  const unitAmountMinor = parseAmountMinor(amountStr)
  const qty = Math.max(1, Math.floor(Number(qtyStr) || 1))

  const fmt = (vMinor: number) =>
    new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(vMinor / 100)

  // preview math
  const lineSubtotal = unitAmountMinor * qty
  const taxMinor = collectTax ? Math.round(lineSubtotal * (taxRate / 100)) : 0
  const totalMinor = lineSubtotal + taxMinor
  const perLabel = mode === 'recurring'
    ? interval === 'month'
      ? 'per month'
      : interval === 'year'
      ? 'per year'
      : interval === 'week'
      ? 'per week'
      : 'per day'
    : ''

  const nameValid = name.trim().length > 0
  const amountValid = unitAmountMinor > 0
  const canSubmit = nameValid && amountValid

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    const id = 'prod_test_' + Math.random().toString(36).slice(2, 10)
    onCreate({
      id,
      name: name.trim(),
      description: desc.trim() || undefined,
      imageDataUrl: imageUrl,
      pricing: {
        mode,
        unitAmountMinor,
        currency,
        interval: mode === 'recurring' ? interval : undefined,
      },
      tax: { collect: collectTax, ratePct: collectTax ? taxRate : undefined },
      createdAt: new Date().toISOString(),
    })
  }

  const fillDummy = () => {
    setName('Pro Plan')
    setDesc('All premium features with priority support.')
    setAmountStr('199,00')
    setMode('recurring')
    setInterval('month')
    setCollectTax(true)
    setTaxRate(25)
  }

  // image handling
  const onPickImage = (file: File) => {
    setImageErr(null)
    if (!/image\/(png|jpeg|webp)/.test(file.type)) {
      setImageErr('Use JPEG, PNG, or WEBP.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageErr('Image must be under 2MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => setImageUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="create-product-title"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-5xl rounded-xl bg-white shadow-xl border border-zinc-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200">
          <h2 id="create-product-title" className="text-base font-semibold text-zinc-900">
            Add a product
          </h2>
          <button onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-5 py-5">
          {/* Left: form */}
          <div className="lg:col-span-7 space-y-4">
            <Field label="Name" required error={!nameValid ? 'Name is required.' : undefined}>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300 ${
                  !nameValid ? 'border-red-400' : 'border-zinc-300'
                }`}
                placeholder="e.g., Pro Plan"
              />
            </Field>

            <Field label="Description">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                placeholder="Appears at checkout and in the customer portal."
              />
            </Field>

            {/* Image upload */}
            <div>
              <div className="text-sm text-zinc-700">Image</div>
              <div className="mt-1 flex items-center gap-3">
                <label className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Upload
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) onPickImage(f)
                    }}
                  />
                </label>
                <span className="text-xs text-zinc-500">JPEG, PNG, or WEBP under 2MB.</span>
              </div>
              {imageErr && <p className="mt-1 text-xs text-red-600">{imageErr}</p>}
              {imageUrl && (
                <div className="mt-2 relative w-28 h-28 rounded-md overflow-hidden border border-zinc-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageUrl} alt="Product preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImageUrl(undefined)}
                    className="absolute top-1 right-1 rounded bg-white/80 px-1 text-[11px] text-zinc-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* More options (placeholder fields) */}
            <button
              type="button"
              onClick={() => setShowMore(s => !s)}
              className="text-sm text-sky-700 hover:underline inline-flex items-center gap-1"
            >
              More options {showMore ? '▲' : '▼'}
            </button>
            {showMore && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Statement descriptor (optional)">
                  <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300" />
                </Field>
                <Field label="Metadata (key=value)">
                  <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300" placeholder="tier=premium" />
                </Field>
              </div>
            )}

            <div className="h-px bg-zinc-200" />

            {/* Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mode switch */}
              <div className="rounded-md border border-zinc-300 p-1 inline-flex">
                <SegmentButton active={mode === 'recurring'} onClick={() => setMode('recurring')}>
                  Recurring
                </SegmentButton>
                <SegmentButton active={mode === 'oneoff'} onClick={() => setMode('oneoff')}>
                  One-off
                </SegmentButton>
              </div>

              {/* currency */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-700">Currency</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="ml-auto rounded-md border border-zinc-300 bg-white px-2 py-1.5 text-sm"
                >
                  <option value="NOK">NOK</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            <Field label="Amount" required error={!amountValid ? 'Enter an amount greater than 0.' : undefined}>
              <div className="flex">
                <div className="flex-1">
                  <input
                    value={amountStr}
                    onChange={(e) => setAmountStr(e.target.value)}
                    inputMode="decimal"
                    className={`w-full rounded-l-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300 ${
                      !amountValid ? 'border-red-400' : 'border-zinc-300'
                    }`}
                    placeholder="0,00"
                  />
                </div>
                <span className="inline-flex items-center rounded-r-md border border-l-0 border-zinc-300 bg-zinc-50 px-3 text-sm text-zinc-700">
                  {currency}
                </span>
              </div>
            </Field>

            {mode === 'recurring' && (
              <Field label="Billing period">
                <select
                  value={interval}
                  onChange={(e) => setInterval(e.target.value as Interval)}
                  className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                >
                  <option value="day">Daily</option>
                  <option value="week">Weekly</option>
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </Field>
            )}

            <button
              type="button"
              onClick={() => setShowMorePricing(s => !s)}
              className="text-sm text-sky-700 hover:underline inline-flex items-center gap-1"
            >
              More pricing options {showMorePricing ? '▲' : '▼'}
            </button>
            {showMorePricing && (
              <div className="rounded-md border border-dashed border-zinc-300 p-3 text-xs text-zinc-600">
                Placeholder for trials, setup fees, tiers, and metered billing (wire later).
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={fillDummy}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50"
              >
                <Wand2 className="w-4 h-4" />
                Fill dummy data
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
                    canSubmit ? 'bg-[#1F3D2B] hover:bg-[#183023]' : 'bg-zinc-300 cursor-not-allowed'
                  }`}
                >
                  Add product
                </button>
              </div>
            </div>
          </div>

          {/* Right: preview */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-zinc-200">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200">
                <div className="text-sm font-medium text-zinc-800">Preview</div>
              </div>

              <div className="p-4 space-y-4">
                {/* Mini product hero */}
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-md bg-zinc-100 flex items-center justify-center overflow-hidden">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-zinc-400" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-zinc-900">{name || 'Product name'}</div>
                    <div className="text-xs text-zinc-500">
                      {mode === 'recurring' ? `Billed ${interval}` : 'One-off'}
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-xs text-zinc-600">Unit quantity</label>
                  <input
                    value={qtyStr}
                    onChange={(e) => setQtyStr(e.target.value.replace(/[^\d]/g, ''))}
                    className="mt-1 w-24 rounded-md border border-zinc-300 px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                  />
                </div>

                {/* Line */}
                <div className="text-sm text-zinc-800">
                  {qty} × {fmt(unitAmountMinor)} = <span className="font-medium">{fmt(lineSubtotal)}</span>
                </div>

                <div className="h-px bg-zinc-200" />

                <KeyVal label="Subtotal" value={fmt(lineSubtotal)} />
                <div className="flex items-center justify-between text-sm">
                  <div className="text-zinc-600">
                    Tax
                    {!collectTax && (
                      <>
                        {' '}
                        <button
                          type="button"
                          onClick={() => setCollectTax(true)}
                          className="text-sky-700 hover:underline"
                        >
                          Start collecting tax
                        </button>
                      </>
                    )}
                  </div>
                  <div className="text-zinc-900 tabular-nums">
                    {collectTax ? fmt(taxMinor) : fmt(0)}
                  </div>
                </div>

                {collectTax && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-600">Rate</span>
                    <input
                      value={String(taxRate)}
                      onChange={(e) => setTaxRate(Math.max(0, Math.min(99, Number(e.target.value) || 0)))}
                      className="w-16 rounded-md border border-zinc-300 px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                    />
                    <span className="text-xs text-zinc-500">%</span>
                  </div>
                )}

                <div className="h-px bg-zinc-200" />

                <KeyVal
                  label={mode === 'recurring' ? `Total ${perLabel}` : 'Total'}
                  value={fmt(totalMinor)}
                  bold
                />
                {mode === 'recurring' && (
                  <div className="text-xs text-zinc-500">Billed at the start of the period</div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ───────────────── helpers ───────────────── */

function Field({
  label,
  required,
  children,
  error,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
  error?: string
}) {
  return (
    <label className="block text-sm">
      <span className="text-zinc-700">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  )
}

function SegmentButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-md ${
        active ? 'bg-violet-600 text-white' : 'text-zinc-700 hover:bg-zinc-50'
      }`}
    >
      {children}
    </button>
  )
}

function KeyVal({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="text-zinc-600">{label}</div>
      <div className={`tabular-nums ${bold ? 'font-semibold text-zinc-900' : 'text-zinc-900'}`}>{value}</div>
    </div>
  )
}
