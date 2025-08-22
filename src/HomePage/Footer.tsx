'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#101418] text-sm text-gray-400 border-t border-white/10">
      {/* Upper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-4xl md:text-5xl text-white font-semibold leading-none">N</div>
            <p className="mt-6 max-w-xs text-gray-500">
              Sell online with storefronts, checkout, payments, and tax built in.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-gray-300 uppercase tracking-wider text-[11px] mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><a href="/products/storefronts" className="hover:text-white transition">Storefronts</a></li>
              <li><a href="/products/checkout" className="hover:text-white transition">Checkout</a></li>
              <li><a href="/products/products" className="hover:text-white transition">Products</a></li>
              <li><a href="/products/orders" className="hover:text-white transition">Orders</a></li>
              <li><a href="/products/customers" className="hover:text-white transition">Customers</a></li>
              <li><a href="/products/analytics" className="hover:text-white transition">Analytics</a></li>
            </ul>
          </div>

          {/* Selling */}
          <div>
            <h4 className="text-gray-300 uppercase tracking-wider text-[11px] mb-4">Selling</h4>
            <ul className="space-y-3">
              <li><a href="/products/payments" className="hover:text-white transition">Payments</a></li>
              <li><a href="/products/subscriptions" className="hover:text-white transition">Subscriptions</a></li>
              <li><a href="/products/discounts" className="hover:text-white transition">Discounts</a></li>
              <li><a href="/products/shipping" className="hover:text-white transition">Shipping</a></li>
              <li><a href="/products/tax" className="hover:text-white transition">Taxes and Invoicing</a></li>
              <li><a href="/products/markets" className="hover:text-white transition">Markets</a></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-gray-300 uppercase tracking-wider text-[11px] mb-4">Developers</h4>
            <ul className="space-y-3">
              <li><a href="/docs" className="hover:text-white transition">Docs</a></li>
              <li><a href="/docs/api" className="hover:text-white transition">API Reference</a></li>
              <li><a href="/docs/webhooks" className="hover:text-white transition">Webhooks</a></li>
              <li><a href="/docs/sdks" className="hover:text-white transition">SDKs</a></li>
              <li><a href="/apps" className="hover:text-white transition">Apps</a></li>
              <li><a href="/changelog" className="hover:text-white transition">Changelog</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-gray-300 uppercase tracking-wider text-[11px] mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="/customers" className="hover:text-white transition">Customers</a></li>
              <li><a href="/about" className="hover:text-white transition">About</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lower */}
      <div>
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-16 py-6 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            © {year} NordSell. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a href="/status" className="hover:text-white transition">Status</a>
            <a href="/help" className="hover:text-white transition">Help</a>
            <a href="/legal" className="hover:text-white transition">Legal</a>
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
