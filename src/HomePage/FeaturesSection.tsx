'use client'

export default function Features() {
  const features = [
    {
      title: 'Sell Anything',
      description: 'From digital products to clothing and services — launch your store with no limits.',
      color: 'bg-gray-100',
    },
    {
      title: 'No Code. No Hassle.',
      description: 'Launch your brand in minutes. No plugins or technical skills required.',
      color: 'bg-gray-200',
    },
    {
      title: 'Global Payments',
      description: 'Accept cards, Apple Pay, Klarna, and more with built-in tax compliance.',
      color: 'bg-gray-300',
    },
  ]

  return (
    <div className="py-20 px-6 space-y-16 font-sans max-w-6xl mx-auto">
      {features.map((feature, index) => (
        <div key={index} className="space-y-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
            <p className="text-base text-gray-600 mt-1 max-w-3xl">{feature.description}</p>
          </div>
          <div
            className={`w-full h-72 rounded-xl ${feature.color} flex items-center justify-center`}
          >
            <span className="text-sm text-gray-400">Screenshot coming soon</span>
          </div>
        </div>
      ))}
    </div>
  )
}
