'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

export default function ConversionCTASection() {
  return (
    <section className="bg-white py-32 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-normal text-gray-900 leading-tight">
          Increase conversions today with fast and 
          frictionless payments
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Contact our sales team to find out how we can help you 
          reach your goals and improve the payment experience.
        </p>
        
        <div className="pt-6">
          <button className="inline-flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white text-lg font-medium px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105">
            Get started
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}