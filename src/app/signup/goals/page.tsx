'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

const options = [
  { value: 'new', label: 'Ny virksomhet eller idé', description: '' },
  { value: 'existing', label: 'Eksisterende virksomhet', description: '' },
]

export default function SignupBusinessType() {
  const [selected, setSelected] = useState<string | null>('new')
  const router = useRouter()

  const handleNext = () => {
    if (selected) {
      localStorage.setItem('businessType', selected)
    }
  
    if (selected === 'existing') {
      router.push('/signup/business-size') // <-- New route
    } else {
      router.push('/signup/product-setup')
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#111] flex items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <div className="h-6 w-6 rounded bg-white" /> {/* Replace with your logo */}
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl p-12 w-full max-w-2xl shadow-xl space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Er denne butikken for en ny eller eksisterende bedrift?
          </h1>
          <p className="text-sm text-gray-500">
            Dette hjelper oss med å foreslå riktig introduksjon
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.map((opt) => {
            const isSelected = selected === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className={`relative text-left p-4 rounded-2xl transition duration-200
                  ${isSelected ? 'bg-zinc-800 border-zinc-800 text-white' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
              >
                <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {opt.label}
                </span>
                {opt.description && (
                  <p className={`text-sm mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                    {opt.description}
                  </p>
                )}
                {isSelected && (
                  <div className="absolute top-4 right-4 text-white">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-black transition"
          >
            ← Tilbake
          </button>
          <button
            onClick={handleNext}
            className="text-sm font-medium text-white bg-black px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Neste →
          </button>
        </div>
      </div>
    </div>
  )
}
