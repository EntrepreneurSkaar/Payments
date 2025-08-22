'use client'

import { Server, ShieldCheck, Zap } from 'lucide-react'

export default function FeatureGrid() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-16 mt-40 text-center mb-50">
      <h2 className="text-4xl md:text-5xl text-black mb-20">
        Banking that puts you in control
      </h2>

      {/* Centered grid wrapper */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
          {/* Local & Compliant */}
          <div className="flex flex-col items-start bg-white p-6 rounded-2xl min-h-[260px]">
            <Server className="h-7 w-7 text-black mb-5" />
            <h3 className="text-xl font-semibold text-black mb-3">Built for Norway</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Norwegian IBAN, BankID login, KID/EHF support, and tax-ready reports — built with local compliance in mind from day one.
            </p>
          </div>

          {/* Fast & Intuitive */}
          <div className="flex flex-col items-start bg-white p-6 rounded-2xl min-h-[260px]">
            <Zap className="h-7 w-7 text-black mb-5" />
            <h3 className="text-xl font-semibold text-black mb-3">Fast & Simple</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Open an account in minutes. Send, spend, and invest with a smooth, intuitive experience built for speed and clarity.
            </p>
          </div>

          {/* Private & Secure */}
          <div className="flex flex-col items-start bg-white p-6 rounded-2xl min-h-[260px]">
            <ShieldCheck className="h-7 w-7 text-black mb-5" />
            <h3 className="text-xl font-semibold text-black mb-3">Private & Secure</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Your data stays safe. End-to-end encryption, European servers, and full control over privacy — with no shady tracking or upselling.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
