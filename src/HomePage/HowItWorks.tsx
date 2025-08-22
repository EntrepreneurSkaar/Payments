'use client'

export default function HowItWorks() {
  const steps = [
    {
      title: 'Create your store',
      description: 'Pick a store name, color theme, and custom URL. Launch instantly — no setup delay.',
    },
    {
      title: 'Add your products',
      description: 'Upload digital files or list physical items. Set pricing, descriptions, and images.',
    },
    {
      title: 'Start selling',
      description: 'Share your store link, accept payments globally, and manage orders in one place.',
    },
  ]

  return (
    <div className="px-6 py-24 font-sans max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Steps */}
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Launch your store in 3 simple steps
          </h2>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <button
            className="mt-8 bg-black text-white px-6 py-4 rounded-full text-sm font-medium hover:opacity-90 transition"
          >
            Start your store for free
          </button>
        </div>

        {/* Visual Card (placeholder for now) */}
        <div className="w-full h-[400px] bg-gray-100 rounded-2xl flex items-center justify-center">
          <span className="text-gray-400 text-sm">Screenshot or mockup coming soon</span>
        </div>
      </div>
    </div>
  )
}
