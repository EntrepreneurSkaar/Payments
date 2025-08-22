'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Store,
  CreditCard,
  Truck,
  Percent,   // safe replacement for ReceiptPercent
  Lock,
  Bell,
  Users,     // safe replacement for UsersRound
  Wallet,
  Wrench,
} from 'lucide-react'

export default function SettingsPage() {
  // Demo state (front-end only)
  const [storeName, setStoreName] = useState('My Store')
  const [subdomain, setSubdomain] = useState('mystore')
  const [currency, setCurrency] = useState('NOK')
  const [timezone, setTimezone] = useState('Europe/Oslo')
  const [vatAuto, setVatAuto] = useState(true)
  const [priceIncludesTax, setPriceIncludesTax] = useState(false)
  const [guestCheckout, setGuestCheckout] = useState(true)
  const [orderNotes, setOrderNotes] = useState(false)
  const [notifyOrder, setNotifyOrder] = useState(true)
  const [notifyShipping, setNotifyShipping] = useState(true)

  const save = (section: string) => {
    console.log('[demo] saved', section, {
      storeName, subdomain, currency, timezone,
      vatAuto, priceIncludesTax, guestCheckout, orderNotes,
      notifyOrder, notifyShipping,
    })
    alert('Saved (demo). Backend coming soon.')
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">Settings</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your store, checkout, taxes, and more.</p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
          >
            Back to dashboard
          </Link>
        </div>

        {/* General */}
        <Card>
          <Header icon={Store} title="General" desc="Store name, domain, currency, and timezone." />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Store name">
              <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </Field>

            <Field label="Store subdomain">
              <div className="flex">
                <span className="inline-flex items-center rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">https://</span>
                <input
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black text-gray-900"
                />
                <span className="inline-flex items-center rounded-r-xl border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">.storeflow.app</span>
              </div>
            </Field>

            <Field label="Currency">
              <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="NOK">NOK — Norwegian Krone</option>
                <option value="SEK">SEK — Swedish Krona</option>
                <option value="DKK">DKK — Danish Krone</option>
                <option value="EUR">EUR — Euro</option>
              </Select>
            </Field>

            <Field label="Timezone">
              <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option value="Europe/Oslo">Europe/Oslo (GMT+1/+2)</option>
                <option value="Europe/Stockholm">Europe/Stockholm</option>
                <option value="Europe/Copenhagen">Europe/Copenhagen</option>
                <option value="UTC">UTC</option>
              </Select>
            </Field>
          </div>
          <Footer onSave={() => save('general')} />
        </Card>

        {/* Payments */}
        <Card>
          <Header icon={Wallet} title="Payments" desc="Connect providers and manage payouts." />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <ProviderPill name="Vipps" status="Coming soon" icon={CreditCard} />
            <ProviderPill name="Klarna" status="Coming soon" icon={CreditCard} />
            <ProviderPill name="Cards (Stripe)" status="Coming soon" icon={CreditCard} />
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Payout account: <span className="text-gray-900 font-medium">Not connected</span>
          </div>
          <div className="mt-3">
            <button
              disabled
              className="inline-flex items-center rounded-full bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 cursor-not-allowed"
            >
              Connect payments (coming soon)
            </button>
          </div>
        </Card>

        {/* Shipping */}
        <Card>
          <Header icon={Truck} title="Shipping" desc="Origin address and basic rates." />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Shipping origin">
              <Input placeholder="Street, City, Country" />
            </Field>
            <Field label="Default handling time">
              <Select defaultValue="1-2 business days">
                <option>Same day</option>
                <option>1-2 business days</option>
                <option>3-5 business days</option>
              </Select>
            </Field>
          </div>
          <div className="mt-3">
            <button
              disabled
              className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 cursor-not-allowed"
              title="Coming soon"
            >
              Manage rates (coming soon)
            </button>
          </div>
          <Footer onSave={() => save('shipping')} />
        </Card>

        {/* Taxes */}
        <Card>
          <Header icon={Percent} title="Taxes" desc="VAT calculation and display settings." />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleRow
              label="Calculate VAT automatically"
              desc="We’ll apply MVA/EU VAT rules at checkout."
              checked={vatAuto}
              onChange={setVatAuto}
            />
            <ToggleRow
              label="Prices include tax"
              desc="Show tax-inclusive prices in your storefront."
              checked={priceIncludesTax}
              onChange={setPriceIncludesTax}
            />
          </div>
          <Footer onSave={() => save('taxes')} />
        </Card>

        {/* Checkout */}
        <Card>
          <Header icon={Lock} title="Checkout" desc="Customer experience and conversion tweaks." />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleRow
              label="Allow guest checkout"
              desc="Let customers purchase without creating an account."
              checked={guestCheckout}
              onChange={setGuestCheckout}
            />
            <ToggleRow
              label="Enable order notes"
              desc="Customers can leave special instructions."
              checked={orderNotes}
              onChange={setOrderNotes}
            />
          </div>
          <div className="mt-3">
            <button
              disabled
              className="inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-xs font-medium text-gray-600 cursor-not-allowed"
            >
              Abandoned checkout emails (coming soon)
            </button>
          </div>
          <Footer onSave={() => save('checkout')} />
        </Card>

        {/* Notifications */}
        <Card>
          <Header icon={Bell} title="Notifications" desc="Transactional emails to keep customers in the loop." />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ToggleRow
              label="Order confirmation"
              desc="Email sent when an order is placed."
              checked={notifyOrder}
              onChange={setNotifyOrder}
            />
            <ToggleRow
              label="Shipping confirmation"
              desc="Email sent when an order ships."
              checked={notifyShipping}
              onChange={setNotifyShipping}
            />
          </div>
          <Footer onSave={() => save('notifications')} />
        </Card>

        {/* Team & billing & dev */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <Header icon={Users} title="Team & permissions" desc="Invite staff to help run your store." />
            <Field label="Invite by email">
              <Input placeholder="teammate@company.com" />
            </Field>
            <div className="mt-3">
              <Select defaultValue="Staff">
                <option>Admin</option>
                <option>Staff</option>
                <option>Viewer</option>
              </Select>
            </div>
            <div className="mt-4">
              <button
                disabled
                className="inline-flex items-center rounded-full bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 cursor-not-allowed"
              >
                Send invite (coming soon)
              </button>
            </div>
          </Card>

          <Card>
            <Header icon={CreditCard} title="Billing" desc="Your plan and payment method." />
            <div className="text-sm text-gray-600">Plan: <span className="text-gray-900 font-medium">MVP (free)</span></div>
            <div className="mt-2 text-sm text-gray-600">Payment method: <span className="text-gray-900 font-medium">None</span></div>
            <div className="mt-4 flex gap-3">
              <button
                disabled
                className="inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 cursor-not-allowed"
              >
                Add card (coming soon)
              </button>
              <Link
                href="/dashboard/analytics"
                className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                View invoices
              </Link>
            </div>
          </Card>

          <Card>
            <Header icon={Wrench} title="Developers" desc="API keys and webhooks." />
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-600">API keys and webhooks are coming soon.</p>
              <Link
                href="/developers"
                className="inline-flex items-center mt-3 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition"
              >
                Read docs
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}

/* ---------- UI bits (no external deps beyond lucide) ---------- */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white border border-black/10 p-5">{children}</div>
  )
}

function Header({
  icon: Icon = Wrench,
  title,
  desc,
}: {
  icon?: any
  title: string
  desc: string
}) {
  // Runtime fallback in case an icon import is undefined
  const SafeIcon = typeof Icon === 'function' ? Icon : Wrench
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
        <SafeIcon className="h-5 w-5 text-gray-800" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-800 mb-1">{label}</div>
      {children}
    </label>
  )
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${props.className || ''}`}
    />
  )
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black ${props.className || ''}`}
    />
  )
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string
  desc?: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-black/10 p-4">
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        {desc && <div className="text-xs text-gray-600">{desc}</div>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`h-6 w-11 rounded-full transition relative ${checked ? 'bg-black' : 'bg-gray-300'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? 'left-6' : 'left-0.5'}`} />
    </button>
  )
}

function Footer({ onSave }: { onSave: () => void }) {
  return (
    <div className="mt-5">
      <button
        onClick={onSave}
        className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition"
      >
        Save changes
      </button>
    </div>
  )
}

function ProviderPill({
  name,
  status,
  icon: Icon = CreditCard,
}: {
  name: string
  status: string
  icon?: any
}) {
  const SafeIcon = typeof Icon === 'function' ? Icon : CreditCard
  return (
    <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
          <SafeIcon className="h-5 w-5 text-gray-800" />
        </div>
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </div>
      <span className="inline-flex items-center h-5 px-2 rounded-full bg-gray-100 text-gray-700 text-[10px] font-medium align-middle relative -top-px">
        {status}
      </span>
    </div>
  )
}
