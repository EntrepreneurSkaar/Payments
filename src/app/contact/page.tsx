"use client"

import React, { useState } from 'react'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import Footer from '@/HomePage/Footer'
import Navbar from '@/HomePage/navbar'

// Main Contact Sales Component
export default function ContactSalesPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    monthlyVolume: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  return (
    <div className="min-h-screen bg-white">
      {/* You can add your Navbar component here */}
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Form */}
          <div>
            <h1 className="text-4xl font-medium text-black mb-4">
              Let's talk payments
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ready to modernize your payment infrastructure? Our team will help you get started with a solution tailored to your Norwegian business.
            </p>

            <div onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Business email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Company name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Phone number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Monthly payment volume</label>
                <div className="relative">
                  <select
                    name="monthlyVolume"
                    value={formData.monthlyVolume}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition appearance-none bg-white cursor-pointer pr-10"
                  >
                    <option value="">Select your monthly volume</option>
                    <option value="0-50k">Under 50,000 NOK</option>
                    <option value="50k-250k">50,000 - 250,000 NOK</option>
                    <option value="250k-1m">250,000 - 1M NOK</option>
                    <option value="1m-5m">1M - 5M NOK</option>
                    <option value="5m+">Over 5M NOK</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">Tell us about your needs</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition resize-none"
                  placeholder="What payment challenges are you looking to solve?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition font-medium flex items-center justify-center gap-2"
              >
                Submit request
                <ArrowRight size={16} />
              </button>

              <p className="text-sm text-gray-500 text-center">
                We'll get back to you within 24 hours
              </p>
            </div>
          </div>

          {/* Right Side - Contact Info */}
          <div className="lg:pl-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-medium text-black mb-6">Get in touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Norway Office</h3>
                    <p className="text-gray-600 text-sm">
                      Universitetsgata 2<br />
                      0164 Oslo, Norway
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">+47 22 12 34 56</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">sales@nordpay.no</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="font-medium text-black mb-1">Business Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday<br />
                      9:00 - 17:00 CET
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-medium text-black mb-4">What happens next?</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    Our team reviews your request
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    We schedule a discovery call
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    Custom solution proposal
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    Implementation planning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* You can add your Footer component here */}
      <Footer />
    </div>
  )
}