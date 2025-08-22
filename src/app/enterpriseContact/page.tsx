'use client'

import { useState } from 'react'
import Footer from "@/HomePage/Footer"
import Navbar from "@/HomePage/navbar"

export default function ContactSalesPage() {
  const onOpenModal = () => {
    console.log('Open modal')
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    companyName: '',
    numberOfSeats: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const isFormValid = Object.values(form).slice(0, 6).every(value => value.trim() !== '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar onOpenModal={onOpenModal} />

      <main className="flex-grow flex items-center justify-center px-4 py-20">
      {submitted ? (
        <div className="flex items-center justify-center bg-white text-black">
            <div className="max-w-xl text-center px-6 py-10 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">Thank you! 🎉</h2>
            <p>We&apos;ve received your request. Our sales team will get in touch with you shortly.</p>
            </div>
        </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-3xl border border-zinc-200 rounded-2xl p-10 pb-16 space-y-6 bg-white relative"
          >
            <h1 className="text-3xl font-semibold text-center">Contact our sales team</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['firstName', 'lastName', 'email', 'jobTitle', 'companyName', 'numberOfSeats'].map((field) => (
                <div key={field}>
                  <label className="block text-sm mb-1">
                    {field === 'email' ? 'Work Email' :
                      field === 'numberOfSeats' ? 'Number of Seats' :
                      field === 'jobTitle' ? 'Job Title' :
                      field === 'companyName' ? 'Company Name' :
                      field === 'firstName' ? 'First Name' : 'Last Name'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : field === 'numberOfSeats' ? 'number' : 'text'}
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    className="w-full bg-white border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm mb-1">
                How can we help get your team started? <span className="text-zinc-500 text-xs">(Optional)</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full resize-none bg-white border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Any comments or questions"
              />
            </div>

            <div className="absolute bottom-6">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className="px-6 py-2 rounded-lg bg-black text-white hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  )
}
