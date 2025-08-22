'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

const options = [
  { value: 'small', label: 'Liten', description: 'Mindre enn $250k årlig' },
  { value: 'medium', label: 'Middels', description: '$250k–$1 mill. årlig' },
  { value: 'large', label: 'Stor', description: 'Mer enn $1 mill. årlig' },
]

export default function SignupBusinessSize() {
  const [selected, setSelected] = useState<string | null>(null)
  const router = useRouter()

  const handleNext = () => {
    if (selected) {
      localStorage.setItem('businessSize', selected)
    }
    router.push('/signup/platform')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#111] flex items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <div className="h-6 w-6 rounded bg-white" /> {/* Replace with real logo */}
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl p-12 w-full max-w-3xl space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Hva er størrelsen på virksomheten din?
          </h1>
          <p className="text-sm text-gray-500">
            Velg en for å få tilpasset kundestøtte. Vi deler ikke dette med noen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((opt) => {
            const isSelected = selected === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setSelected(opt.value)}
                className={`relative text-left p-5 rounded-2xl transition duration-200
                  ${isSelected ? 'bg-zinc-800 border-zinc-800 text-white' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
              >
                <h3 className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {opt.label}
                </h3>
                <p className={`text-sm mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                  {opt.description}
                </p>
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
