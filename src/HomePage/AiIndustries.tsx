'use client'

export default function FintechUseCases() {
  const segments = [
    'Individuals',
    'Freelancers',
    'Startups',
    'Small Businesses',
    'Investors',
    'Creators',
  ]

  return (
    <div className="w-full px-4 sm:px-6 lg:px-16 mt-32 text-center">
      <h2 className="text-2xl md:text-4xl mb-8 text-black">
        Built for how you earn, spend, and grow
      </h2>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {segments.map((segment, index) => (
          <a
            key={index}
            href="#"
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium hover:bg-gray-200 transition"
          >
            {segment}
          </a>
        ))}
      </div>
    </div>
  )
}
