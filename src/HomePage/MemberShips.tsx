'use client'

import { ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Start',
    price: '200 NOK / måned',
    description:
      'For enkeltpersonforetak som vil sende faktura og ha kontroll på regnskap og MVA. Inkluderer årsoppgjør.',
  },
  {
    name: 'Gründer',
    price: '490 NOK / måned',
    description:
      'Passer for nye selskaper og frilansere som ønsker automatisering, kvitteringsskanning og bankintegrasjon.',
  },
  {
    name: 'Bedrift',
    price: '1 290 NOK / måned',
    description:
      'Alt du trenger for å drive et AS — med lønn, rapportering, MVA og støtte for flere brukere.',
  },
  {
    name: 'Skaler',
    price: '5 900 NOK / måned',
    description:
      'For selskaper i vekst med flere avdelinger eller datterselskaper. Inkluderer avansert rapportering og full kontroll.',
  },
  {
    name: 'Enterprise',
    price: 'Skreddersydd',
    description:
      'For store selskaper eller regnskapsførere med spesifikke behov. Tilgang til API, egen kontaktperson og full fleksibilitet.',
  },
]

export default function PricingPlansSection() {
  return (
    <section className="bg-[#161618] text-white min-h-screen py-24 px-6 rounded-t-3xl rounded-b-3xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl mb-20">Velg din plan</h2>

        {/* First row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {plans.slice(0, 3).map((plan, index) => (
            <Card key={index} {...plan} />
          ))}
        </div>

        {/* Second row: 2 centered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {plans.slice(3).map((plan, index) => (
            <Card key={index} {...plan} />
          ))}
        </div>

        {/* More Info Button */}
        <button className="mt-16 text-sm font-medium text-white px-4 py-3 rounded-full transition bg-transparent hover:bg-white/10">
          Mer info om priser og funksjoner
        </button>

      </div>
    </section>
  )
}

function Card({
  name,
  price,
  description,
}: {
  name: string
  price: string
  description: string
}) {
  return (
    <div className="group bg-white text-black p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div className="text-left">
        <h3 className="text-2xl font-semibold mb-2">{name}</h3>
        <p className="text-base font-semibold mb-1">{price}</p>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
      <div className="flex justify-end mt-6">
        <div className="p-2 rounded-full bg-gray-100 transition-all duration-300 group-hover:bg-black">
          <ArrowRight className="w-5 h-5 text-black transition-all duration-300 group-hover:text-white" />
        </div>
      </div>
    </div>
  )
}
