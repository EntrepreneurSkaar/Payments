// app/dashboardPay/payment-links/new/page.tsx
'use client'

import { useId, useMemo, useState, useEffect } from 'react'
import { Check, ExternalLink, Globe, Link as LinkIcon, Monitor, Smartphone, X } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type Currency = 'NOK' | 'SEK' | 'DKK' | 'EUR'
type ChargeType = 'one_time' | 'subscription'
type Interval = 'month' | 'year'
type TabKey = 'payment' | 'after'

type Product = {
  id: string
  name: string
  priceMinor: number
  currency: Currency
}

const RECOMMENDED: Product[] = [
  { id: 'p_basic',  name: 'Basic plan',  priceMinor: 9900,  currency: 'NOK' },
  { id: 'p_pro',    name: 'Pro plan',    priceMinor: 24900, currency: 'NOK' },
  { id: 'p_setup',  name: 'Onboarding session', priceMinor: 14900, currency: 'NOK' },
  { id: 'p_donate', name: 'Donation',    priceMinor: 5000,  currency: 'NOK' },
]

export default function NewPaymentLinkPage() {
  const [tab, setTab] = useState<TabKey>('payment')

  // Product / pricing
  const [chargeType, setChargeType] = useState<ChargeType>('one_time')
  const [interval, setInterval] = useState<Interval>('month')
  const [currency, setCurrency] = useState<Currency>('NOK')
  const [productName, setProductName] = useState<string>('Product name')
  const [amountInput, setAmountInput] = useState<string>('0,00')

  // Options
  const [collectTax, setCollectTax] = useState(false)
  const [collectAddress, setCollectAddress] = useState(false)
  const [requirePhone, setRequirePhone] = useState(false)
  const [limitPayments, setLimitPayments] = useState(false)
  const [limitQty, setLimitQty] = useState<number>(1)

  // After-payment
  const [afterBehavior, setAfterBehavior] = useState<'confirm' | 'redirect'>('confirm')
  const [successUrl, setSuccessUrl] = useState('https://example.com/thanks')

  // Preview controls
  const [useCustomDomain, setUseCustomDomain] = useState(false)
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop')

  // Derived
  const amountMinor = useMemo(() => toMinor(amountInput), [amountInput])
  const displayAmount = useMemo(() => fmt(amountMinor, currency), [amountMinor, currency])
  const taxNote = collectTax ? 'Taxes calculated at checkout' : undefined

  // Create link (simulate)
  const [creating, setCreating] = useState(false)
  const [createdUrl, setCreatedUrl] = useState<string | null>(null)

  const onPickProduct = (p: Product) => {
    setProductName(p.name)
    setAmountInput(fromMinorToInput(p.priceMinor))
    setCurrency(p.currency)
  }

  const onCreate = async () => {
    setCreating(true)
    await wait(600 + Math.floor(Math.random() * 600))
    const id = Math.random().toString(36).slice(2, 9)
    setCreatedUrl(`https://pay.nordpay.co/lnk/${id}`)
    setCreating(false)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Page header (no global Topbar here) */}
      <div className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="text-sm font-medium text-zinc-800">Create a payment link</div>
          <button
            onClick={onCreate}
            disabled={creating || amountMinor <= 0 || !productName.trim()}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 disabled:opacity-60"
          >
            {creating ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z" />
              </svg>
            ) : <Check className="h-4 w-4" />}
            Create link
          </button>
        </div>
      </div>

      {/* Editor + Preview */}
      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-5 space-y-8">
          {/* Select type */}
          <section>
            <h3 className="text-sm font-medium text-zinc-800">Select type</h3>
            <div className="mt-2 inline-flex rounded-lg border border-zinc-200 p-1">
              <Seg value={chargeType} me="one_time" onChange={setChargeType}>Products or subscriptions</Seg>
              <Seg value={chargeType} me="subscription" onChange={setChargeType}>Subscriptions</Seg>
            </div>
          </section>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={() => setTab('payment')}
              className={`transition-colors ${tab === 'payment' ? 'text-violet-600 font-medium' : 'text-zinc-600 hover:text-zinc-800'}`}
            >
              Payment page
            </button>
            <button
              onClick={() => setTab('after')}
              className={`transition-colors ${tab === 'after' ? 'text-violet-600 font-medium' : 'text-zinc-600 hover:text-zinc-800'}`}
            >
              After payment
            </button>
          </div>

          {/* Tab body (simple fade-in) */}
          <div key={tab} className="transition-opacity duration-200 opacity-100">
            {tab === 'payment' && (
              <>
                {/* Product */}
                <section>
                  <h4 className="text-sm font-medium text-zinc-800">Product</h4>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <input
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                        placeholder="Find or add a test product…"
                      />
                    </div>
                    <div>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                        className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                      >
                        <option value="NOK">NOK</option>
                        <option value="SEK">SEK</option>
                        <option value="DKK">DKK</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-zinc-600">Amount</label>
                      <input
                        inputMode="decimal"
                        value={amountInput}
                        onChange={(e) => setAmountInput(normalizeAmount(e.target.value))}
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm tabular-nums outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                        placeholder="0,00"
                      />
                    </div>

                    {chargeType === 'subscription' && (
                      <div className="col-span-2">
                        <label className="mb-1 block text-xs font-medium text-zinc-600">Interval</label>
                        <div className="inline-flex rounded-lg border border-zinc-200 p-1">
                          <SegSmall value={interval} me="month" onChange={setInterval}>Monthly</SegSmall>
                          <SegSmall value={interval} me="year" onChange={setInterval}>Yearly</SegSmall>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recommended products */}
                  <button
                    onClick={() => {
                      const idx = Math.floor(Math.random() * RECOMMENDED.length)
                      onPickProduct(RECOMMENDED[idx])
                    }}
                    className="mt-3 inline-flex items-center gap-1 text-sm text-violet-700 transition-colors hover:underline"
                  >
                    + Add recommended products
                  </button>
                </section>

                {/* Options (shadcn checkboxes) */}
                <section className="pt-4">
                  <h4 className="text-sm font-medium text-zinc-800">Options</h4>

                  <div className="mt-2 space-y-1.5">
                    <CheckRow label="Collect tax automatically" checked={collectTax} onChange={setCollectTax} />
                    <CheckRow label="Collect customers' addresses" checked={collectAddress} onChange={setCollectAddress} />
                    <CheckRow label="Require customers to provide a phone number" checked={requirePhone} onChange={setRequirePhone} />
                    <CheckRow
                      label="Limit the number of payments"
                      checked={limitPayments}
                      onChange={setLimitPayments}
                      extra={
                        <input
                          type="number"
                          min={1}
                          value={limitQty}
                          onChange={(e) => setLimitQty(clampInt(e.target.value, 1, 9999))}
                          className="ml-3 w-20 rounded-md border border-zinc-300 px-2 py-1 text-xs disabled:bg-zinc-50 outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                          disabled={!limitPayments}
                        />
                      }
                    />
                  </div>
                </section>

                {/* Advanced (placeholder) */}
                <details className="pt-2">
                  <summary className="cursor-pointer text-sm text-zinc-700">Advanced options</summary>
                  <div className="mt-2 rounded-lg border border-dashed border-zinc-200 p-3 text-xs text-zinc-500">
                    For demo purposes, advanced options are not implemented. Hook your own fields here.
                  </div>
                </details>
              </>
            )}

            {tab === 'after' && (
              <section>
                <h4 className="text-sm font-medium text-zinc-800">After payment</h4>
                <div className="mt-3 space-y-3">
                  <RadioRow
                    name="after"
                    label="Show a confirmation page"
                    description="Customers will see a hosted confirmation screen."
                    checked={afterBehavior === 'confirm'}
                    onChange={() => setAfterBehavior('confirm')}
                  />
                  <RadioRow
                    name="after"
                    label="Redirect to your website"
                    description="Send customers to a custom success URL after payment."
                    checked={afterBehavior === 'redirect'}
                    onChange={() => setAfterBehavior('redirect')}
                    extra={
                      <input
                        value={successUrl}
                        onChange={(e) => setSuccessUrl(e.target.value)}
                        className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow"
                        placeholder="https://example.com/thanks"
                      />
                    }
                  />
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Right: Preview */}
        <div className="lg:col-span-7">
          <div className="mb-3 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-xs text-zinc-600">
              <span className="inline-flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                {useCustomDomain ? 'your-domain.com' : 'buy.nordpay.com'}
              </span>
              <button
                className="rounded-full border border-zinc-200 px-2 py-1 text-[11px] transition-colors hover:bg-zinc-50"
                onClick={() => setUseCustomDomain(v => !v)}
              >
                {useCustomDomain ? 'Use hosted domain' : 'Use your domain'}
              </button>
            </div>

            <div className="inline-flex rounded-lg border border-zinc-200 p-1">
              <IconSeg value={device} me="desktop" onChange={setDevice} icon={<Monitor className="h-4 w-4" />} />
              <IconSeg value={device} me="mobile" onChange={setDevice} icon={<Smartphone className="h-4 w-4" />} />
            </div>
          </div>

          <CheckoutPreview
            device={device}
            brand="nordpay sandbox"
            productName={productName.trim() || 'Product name'}
            displayAmount={displayAmount}
            showAddress={collectAddress}
            showPhone={requirePhone}
            taxNote={taxNote}
            chargeType={chargeType}
            interval={interval}
            currency={currency}
          />
          <div className="mt-3 text-xs text-zinc-500">
            You can enable more payment methods and change how this page looks in your account settings.
          </div>
        </div>
      </div>

      {/* Success modal */}
      {createdUrl && <Modal onClose={() => setCreatedUrl(null)}>{/* content below */ }
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50">
            <Check className="h-6 w-6 text-emerald-600" />
          </div>
          <div className="text-lg font-semibold text-zinc-900">Payment link created</div>
          <div className="mt-1 text-sm text-zinc-600">{createdUrl}</div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => copy(createdUrl)}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-800 transition-colors hover:bg-zinc-50"
            >
              <LinkIcon className="h-4 w-4" /> Copy link
            </button>
            <a
              href={createdUrl}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-violet-700"
            >
              <ExternalLink className="h-4 w-4" /> Open
            </a>
          </div>
        </div>
      </Modal>}
    </main>
  )
}

/* -------------------------------- Preview -------------------------------- */

function CheckoutPreview({
  device, brand, productName, displayAmount, showAddress, showPhone, taxNote, chargeType, interval,
}: {
  device: 'desktop' | 'mobile'
  brand: string
  productName: string
  displayAmount: string
  showAddress: boolean
  showPhone: boolean
  taxNote?: string
  chargeType: ChargeType
  interval: Interval
}) {
  const width = device === 'mobile' ? 360 : 740
  const recurring = chargeType === 'subscription'
  const intervalLabel = interval === 'month' ? 'per month' : 'per year'
  return (
    <div className="rounded-2xl bg-zinc-100 p-6">
      <div
        className="mx-auto rounded-xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden transition-[width] duration-300 ease-out"
        style={{ width }}
      >
        {/* fake browser chrome */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 bg-zinc-50">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
          </div>
          <div className="text-[11px] text-zinc-500">buy.nordpay.com</div>
          <div className="text-[11px] text-zinc-500">Use your domain</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left summary */}
          <div className="hidden md:block p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] text-zinc-600">
              {brand} <span className="rounded bg-zinc-200 px-1 ml-1">Sandbox</span>
            </div>
            <div className="mt-6 text-sm text-zinc-600">Product</div>
            <div className="mt-1 text-2xl font-semibold text-zinc-900">{productName}</div>
            <div className="mt-2 text-xl font-semibold text-zinc-900">
              {displayAmount}
              {recurring && <span className="text-sm font-normal text-zinc-600"> · {intervalLabel}</span>}
            </div>
            {taxNote && <div className="mt-1 text-xs text-zinc-500">{taxNote}</div>}
          </div>

          {/* Right form */}
          <div className="p-6">
            <div className="text-sm text-zinc-700">Pay with card</div>

            <div className="mt-3 space-y-3">
              <Field label="Email">
                <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow" placeholder="email@example.com" />
              </Field>

              <Field label="Card information">
                <div className="grid grid-cols-3 gap-2">
                  <input className="col-span-3 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow" placeholder="1234 1234 1234 1234" />
                  <input className="col-span-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow" placeholder="MM / YY" />
                  <input className="col-span-1 rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow" placeholder="CVC" />
                </div>
              </Field>

              <Field label="Cardholder name">
                <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow" placeholder="Full name" />
              </Field>

              {showAddress && (
                <>
                  <Field label="Country or region">
                    <select className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow">
                      <option>Norway</option>
                      <option>Sweden</option>
                      <option>Denmark</option>
                      <option>Finland</option>
                      <option>Germany</option>
                    </select>
                  </Field>
                  <Field label="Postal code">
                    <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow" placeholder="Postnummer" />
                  </Field>
                </>
              )}

              {showPhone && (
                <Field label="Phone">
                  <input className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-200 transition-shadow" placeholder="+47 400 00 000" />
                </Field>
              )}

              <button className="mt-2 w-full rounded-md bg-violet-600 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700">
                Pay {displayAmount}{recurring ? ` / ${interval === 'month' ? 'mo' : 'yr'}` : ''}
              </button>

              <div className="text-[11px] text-zinc-500 text-center">Powered by nordpay • Terms • Privacy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------- UI bits ------------------------------- */

function Seg({ value, me, onChange, children }:{
  value: string; me: string; onChange: (v: any) => void; children: React.ReactNode
}) {
  const active = value === me
  return (
    <button
      onClick={() => onChange(me)}
      className={`rounded-md px-3 py-1.5 text-sm transition-all
        ${active ? 'bg-violet-600 text-white shadow-sm' : 'text-zinc-700 hover:bg-zinc-100'}`}
    >
      {children}
    </button>
  )
}

function SegSmall({ value, me, onChange, children }:{
  value: string; me: string; onChange: (v: any) => void; children: React.ReactNode
}) {
  const active = value === me
  return (
    <button
      onClick={() => onChange(me)}
      className={`rounded-md px-2.5 py-1 text-xs transition-all
        ${active ? 'bg-violet-600 text-white shadow-sm' : 'text-zinc-700 hover:bg-zinc-100'}`}
    >
      {children}
    </button>
  )
}

function IconSeg({ value, me, onChange, icon }:{
  value: string; me: string; onChange: (v: any) => void; icon: React.ReactNode
}) {
  const active = value === me
  return (
    <button
      onClick={() => onChange(me)}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm transition-all
        ${active ? 'bg-violet-600 text-white shadow-sm' : 'text-zinc-700 hover:bg-zinc-100'}`}
      aria-pressed={active}
    >
      {icon}
    </button>
  )
}

function CheckRow({
  label, checked, onChange, extra,
}: { label: string; checked: boolean; onChange: (v: boolean) => void; extra?: React.ReactNode }) {
  const id = useId()
  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-50">
      <div className="flex items-center gap-2">
        <Checkbox id={id} checked={checked} onCheckedChange={(v) => onChange(Boolean(v))} />
        <Label htmlFor={id} className="text-sm text-zinc-700 cursor-pointer">{label}</Label>
      </div>
      {extra}
    </div>
  )
}

function RadioRow({
  name, label, description, checked, onChange, extra,
}: {
  name: string; label: string; description?: string; checked: boolean; onChange: () => void; extra?: React.ReactNode
}) {
  return (
    <label className={`block rounded-lg border p-3 transition-colors ${checked ? 'border-violet-300 bg-violet-50/40' : 'border-zinc-200 hover:bg-zinc-50'}`}>
      <div className="flex items-start gap-3">
        <input type="radio" name={name} checked={checked} onChange={onChange} className="mt-[3px]" />
        <div>
          <div className="text-sm text-zinc-800">{label}</div>
          {description && <div className="text-xs text-zinc-500">{description}</div>}
          {extra}
        </div>
      </div>
    </label>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-medium text-zinc-600">{label}</div>
      {children}
    </label>
  )
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true); return () => setMounted(false) }, [])
  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-black/30 transition-opacity duration-200 ${mounted ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* dialog */}
      <div
        className={`absolute left-1/2 top-1/2 w-[28rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl
                    transform transition-all duration-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      >
        <div className="absolute right-2 top-2">
          <button onClick={onClose} className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-100">
            <X className="h-4 w-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* --------------------------------- utils --------------------------------- */

function toMinor(v: string) {
  const n = parseFloat(v.replace(/[^\d,.-]/g, '').replace(',', '.'))
  if (!isFinite(n)) return 0
  return Math.max(0, Math.round(n * 100))
}
function fromMinorToInput(minor: number) {
  return (minor / 100).toFixed(2).replace('.', ',')
}
function normalizeAmount(s: string) {
  return s.replace(/[^\d,.-]/g, '').replace(/,{2,}/g, ',').replace(/\.{2,}/g, '.')
}
function fmt(minor: number, currency: Currency) {
  const locale =
    currency === 'NOK' ? 'nb-NO' :
    currency === 'SEK' ? 'sv-SE' :
    currency === 'DKK' ? 'da-DK' : 'de-DE'
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(minor / 100)
}
async function wait(ms: number) { return new Promise(r => setTimeout(r, ms)) }
function copy(text: string) { if (navigator?.clipboard?.writeText) navigator.clipboard.writeText(text) }
function clampInt(v: string, min: number, max: number) {
  const n = Math.max(min, Math.min(max, parseInt(v || '0', 10)))
  return Number.isFinite(n) ? n : min
}
