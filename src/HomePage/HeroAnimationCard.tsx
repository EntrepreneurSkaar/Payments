'use client'

import React from 'react'
import { ArrowRight, Code, Zap } from 'lucide-react'

export default function PaymentIntegrationSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-gray-900">
            Fast and simple setup
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            There are better ways to integrate Trustly into checkout, tailored to your 
            goals and your business.
          </p>
          
          <button className="inline-flex items-center gap-2 mt-6 bg-white hover:bg-gray-50 text-gray-900 text-sm font-medium px-6 py-3 rounded-full border border-gray-300 transition-all duration-200">
            Visit developer portal <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Direct Integration Card */}
          <div className="bg-gray-900 text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-medium">Direct integration</h3>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Get access to our complete product suite across 35+ markets 
                with a simple integration via our JSON-RPC-based 
                API. This gives you full control, flexible customization and 
                dedicated customer support, plus access to our 
                developer toolkit and comprehensive documentation.
              </p>
            </div>

            {/* Abstract geometric visualization */}
            <div className="absolute bottom-0 right-0 w-96 h-96 opacity-20">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Curved lines */}
                <path
                  d="M 100 350 Q 200 250 350 300"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-green-400"
                />
                <path
                  d="M 50 300 Q 150 200 300 250"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-green-400"
                />
                <path
                  d="M 150 400 Q 250 300 400 350"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-green-400"
                />
                
                {/* Connection points */}
                <circle cx="120" cy="320" r="4" className="fill-green-400" />
                <circle cx="280" cy="270" r="6" className="fill-green-400" />
                <circle cx="180" cy="380" r="3" className="fill-green-400" />
                <circle cx="340" cy="310" r="5" className="fill-green-400" />
                
                {/* Larger circles */}
                <circle cx="200" cy="300" r="20" className="fill-green-500/30" />
                <circle cx="320" cy="350" r="35" className="fill-gray-600/40" />
              </svg>
            </div>
          </div>

          {/* Plug-and-Play Card */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-2xl font-medium text-gray-900">Plug-and-play with PSPs</h3>
              </div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Get started quickly by activating Trustly through all leading 
                payment service providers, with support from our Trustly 
                experts every step of the way.
              </p>
            </div>

            {/* Abstract orbital visualization */}
            <div className="absolute bottom-0 right-0 w-80 h-80 opacity-30">
              <svg viewBox="0 0 320 320" className="w-full h-full">
                {/* Orbital rings */}
                <circle
                  cx="160"
                  cy="160"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-300"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="120"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  className="text-gray-200"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-gray-400"
                />
                
                {/* Center hub */}
                <circle cx="160" cy="160" r="12" className="fill-gray-900" />
                
                {/* Orbital points */}
                <circle cx="240" cy="160" r="4" className="fill-green-400" />
                <circle cx="120" cy="100" r="3" className="fill-gray-400" />
                <circle cx="200" cy="80" r="3" className="fill-gray-500" />
                <circle cx="80" cy="200" r="2" className="fill-gray-300" />
                
                {/* Larger background circle */}
                <circle cx="200" cy="240" r="60" className="fill-gray-100/60" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}