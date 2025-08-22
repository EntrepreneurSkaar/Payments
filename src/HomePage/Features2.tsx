export default function PaymentFeaturesGrid() {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Usage Based Billing */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl text-black mb-4">
                Recurring Billing
              </h3>
              <p className="text-gray-600 mb-6">
                Robust subscription management that enables precise recurring billing with flexible pricing models and automated invoicing.
              </p>
              
              {/* Code Example */}
              <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 font-mono mb-6">
                <div className="text-blue-400">const</div>
                <span className="text-white"> subscription = </span>
                <span className="text-yellow-400">nordpay</span>
                <span className="text-white">.subscriptions.</span>
                <span className="text-green-400">create</span>
                <span className="text-white">({'{'}</span>
                <div className="ml-4">
                  <span className="text-blue-400">customerId:</span>
                  <span className="text-orange-400"> "cust_123"</span>
                  <span className="text-white">,</span>
                </div>
                <div className="ml-4">
                  <span className="text-blue-400">plan:</span>
                  <span className="text-orange-400"> "monthly-pro"</span>
                </div>
                <span className="text-white">{'});'}</span>
              </div>
  
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Flexible Billing Cycles</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Automated Dunning Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Proration & Upgrades</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Usage-Based Billing</span>
                </div>
              </div>
            </div>
  
            {/* Digital Products & SaaS Billing */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-2xl text-black mb-4">
                Nordic Payment Methods
              </h3>
              <p className="text-gray-600 mb-6">
                Accept payments with popular Nordic methods and seamless integration with local banking systems.
              </p>
  
              {/* User Profile Mock */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Erik Nielsen</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Vipps Payment</span>
                    <span className="text-green-600">€127.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bank Transfer (SEPA)</span>
                    <span className="text-green-600">€89.99</span>
                  </div>
                </div>
              </div>
  
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Vipps & MobilePay Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">BankID Authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">SEPA Direct Debit</span>
                </div>
              </div>
            </div>
          </div>
  
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Fraud Protection */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl text-black mb-4">
                Fraud Protection
              </h3>
              <p className="text-gray-600 mb-6">
                Advanced machine learning algorithms that automatically detect and prevent fraudulent transactions.
              </p>
  
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Risk Score</span>
                  <span className="text-sm font-medium text-green-600">Low Risk</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">3D Secure</span>
                  <span className="text-sm font-medium text-blue-600">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ML Detection</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
  
            {/* Analytics Dashboard */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl text-black mb-4">
                Revenue Analytics
              </h3>
              <p className="text-gray-600 mb-6">
                Real-time insights into your payment performance with detailed analytics and reporting.
              </p>
  
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">JD</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">John Doe</div>
                    <div className="text-sm text-gray-500">Growth Plan • Monthly</div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Compliance */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <h3 className="text-xl text-black mb-4">
                European Compliance
              </h3>
              <p className="text-gray-600 mb-6">
                Stay compliant with European regulations while we handle all the tax and legal requirements.
              </p>
  
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-sm font-medium text-gray-900 mb-2">Tax Report 2024</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">VAT (EU)</span>
                    <span className="text-gray-900">€2,450.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sales Tax (NO)</span>
                    <span className="text-gray-900">€1,120.00</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Submitted
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }