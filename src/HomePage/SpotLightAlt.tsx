'use client'

import React, { useState, useEffect } from 'react'
import { Check, ArrowRight, Zap, Shield, Globe, CreditCard } from 'lucide-react'

export default function SpotlightFeatureAlt() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const steps = [
    {
      title: "Create Invoice",
      description: "Generate professional invoices in seconds",
      icon: <CreditCard className="w-6 h-6" />,
      status: "completed"
    },
    {
      title: "Customer Payment",
      description: "Secure payment with Vipps or card",
      icon: <Shield className="w-6 h-6" />,
      status: "completed"
    },
    {
      title: "Processing",
      description: "Real-time payment validation",
      icon: <Zap className="w-6 h-6" />,
      status: "active"
    },
    {
      title: "Payout",
      description: "Funds deposited to your account",
      icon: <Globe className="w-6 h-6" />,
      status: "pending"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)
    return () => clearInterval(timer)
  }, [steps.length])

  return (
    <section className="bg-white text-black py-24 px-6 font-sans w-full">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-5xl font-medium">
          Everything just works
        </h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          From your first invoice to your first payout, every part of the experience feels smooth, clear and reliable.
        </p>
      </div>

      <div className="mt-16 max-w-7xl mx-auto rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 h-[700px] flex items-center justify-center w-full relative">
        {/* Payment Flow Animation */}
        <div className="w-full max-w-4xl mx-auto p-8">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-16 w-32 h-0.5 bg-gray-300 z-0">
                    <div 
                      className={`h-full bg-black transition-all duration-1000 ${
                        index < currentStep ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
                
                {/* Step Circle */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-500 ${
                  index <= currentStep 
                    ? 'bg-black text-white' 
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}>
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : index === currentStep ? (
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  ) : (
                    step.icon
                  )}
                </div>
                
                {/* Step Info */}
                <div className="mt-4 text-center">
                  <div className={`text-sm font-medium transition-colors ${
                    index <= currentStep ? 'text-black' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 max-w-24">
                    {step.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current Step Details */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 text-center">
            <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                {steps[currentStep].icon}
                <div className="text-white">
                  {React.cloneElement(steps[currentStep].icon, { className: 'w-8 h-8 text-white' })}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-2">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-600 mb-6">
                {steps[currentStep].description}
              </p>
              
              {/* Dynamic Content Based on Step */}
              {currentStep === 0 && (
                <div className="space-y-3 text-left max-w-md mx-auto">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Invoice #1001</span>
                    <span className="font-medium">2,500 NOK</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Due date</span>
                    <span className="font-medium">30 days</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Payment methods</span>
                    <span className="font-medium">Vipps, Cards</span>
                  </div>
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="flex items-center justify-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <div className="w-8 h-8 bg-purple-600 rounded"></div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-200"></div>
                  </div>
                  <p className="text-sm text-gray-500">Validating payment...</p>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-green-700 font-medium">2,500 NOK deposited</div>
                  <div className="text-green-600 text-sm">Available in your account</div>
                </div>
              )}
            </div>
          </div>

          {/* Speed Indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Average processing time: 2.3 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}