'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

const options = [
  { value: 'online', title: 'En nettbutikk', description: 'Opprett et fullt tilpasningsbart nettsted' },
  { value: 'retail', title: 'Fysisk fra en detaljhandel', description: 'Fysiske butikker' },
  { value: 'events', title: 'Fysisk på arrangementer', description: 'Markeder, messer og popup-butikker' },
  { value: 'blog', title: 'Et eksisterende nettsted eller en blogg', description: 'Legg til en Kjøp-knapp på nettstedet' },
  { value: 'social', title: 'Sosiale medier', description: 'Nå ut til kunder gjennom Facebook, Instagram, TikTok med mer' },
  { value: 'marketplaces', title: 'Markedsplasser på nett', description: 'Oppfør produkter på Etsy, Amazon og mer' },
]

export default function SignupSellingPlaces() {
  const [selected, setSelected] = useState<string[]>([])
  const router = useRouter()

  const toggleSelect = (value: string) => {
    setSelected(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  const handleNext = () => {
    if (selected.length > 0) {
      localStorage.setItem('sellingPlaces', JSON.stringify(selected))
    }
    router.push('/signup/goals')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#202020] flex items-center justify-center px-6 py-12">
      {/* Logo top-left */}
      <div className="absolute top-6 left-6">
        <div className="h-6 w-6 rounded bg-white" /> {/* Replace with real logo */}
      </div>

      {/* Card wrapper */}
      <div className="bg-white rounded-3xl p-12 w-full max-w-6xl shadow-xl space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Hvor vil du selge?</h1>
          <p className="text-sm text-gray-500">Vi sørger for at du er klar til å selge på disse stedene</p>
        </div>

        {/* Options – 2 columns, 3 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {options.map(opt => {
            const isSelected = selected.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleSelect(opt.value)}
                className={`relative text-left p-5 rounded-2xl transition duration-200  min-h-[100px]
                  ${isSelected ? 'bg-zinc-800 border-zinc-800 text-white' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
              >
                <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {opt.title}
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

        {/* CTA */}
        <div className="flex justify-between items-center">

        <button
            onClick={() => router.push('/signup/goals')}
            className="text-sm text-gray-500 hover:text-black transition"
          >
            Hopp over dette trinnet
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
