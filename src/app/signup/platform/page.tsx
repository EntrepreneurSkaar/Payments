'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'

const platforms = [
  { value: 'none', label: 'Nei, jeg bruker ikke noen annen plattform' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook Marketplace' },
  { value: 'etsy', label: 'Etsy' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'ebay', label: 'eBay' },
  { value: 'wix', label: 'Wix' },
  { value: 'square', label: 'Square' },
]

export default function SignupSellingPlatforms() {
  const [selected, setSelected] = useState<string[]>([])
  const router = useRouter()

  const toggle = (val: string) => {
    if (val === 'none') {
      setSelected(['none'])
    } else {
      setSelected((prev) =>
        prev.includes(val)
          ? prev.filter((v) => v !== val)
          : [...prev.filter((v) => v !== 'none'), val]
      )
    }
  }

  const handleNext = () => {
    localStorage.setItem('sellingPlatforms', JSON.stringify(selected))
    router.push('/signup/product-setup') // Next step
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#111] flex items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <div className="h-6 w-6 rounded bg-white" /> {/* Replace with real logo */}
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl p-12 w-full max-w-3xl shadow-xl space-y-10">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">
            Selger du på andre plattformer nå?
          </h1>
          <p className="text-sm text-gray-500">
            Vi gjør det enkelt å migrere til plattformen vår.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((platform) => {
            const isSelected = selected.includes(platform.value)
            return (
            <button
                key={platform.value}
                onClick={() => toggle(platform.value)}
                className={`relative text-left p-5 rounded-2xl transition duration-200
                ${isSelected ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
            >
                <span className={`font-medium text-sm ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {platform.label}
                </span>
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
