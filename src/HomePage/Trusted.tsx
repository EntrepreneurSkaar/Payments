'use client'

export default function TrustedBy() {
  const trustedCompanies = [
    { name: "TechStart AS", logo: "TS" },
    { name: "Nordic Solutions", logo: "NS" },
    { name: "Oslo Commerce", logo: "OC" },
    { name: "Bergen Tech", logo: "BT" },
    { name: "Stavanger SaaS", logo: "SS" },
    { name: "Trondheim Digital", logo: "TD" }
  ]

  return (
    <section className="relative bg-white text-black py-24 px-6 font-sans w-full overflow-hidden">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        {/* Trusted By Section */}
        <div className="mb-16">
          <p className="text-sm text-gray-600 mb-8 font-medium">
            Trusted by Norwegian businesses
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-center">
            {trustedCompanies.map((company, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm mb-2">
                    {company.logo}
                  </div>
                  <span className="text-xs text-gray-600 font-medium text-center">
                    {company.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl md:text-5xl font-medium leading-tight">
          You build the business.<br />
          We'll handle the payments.
        </h2>
        
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Accept payments, automate billing and manage Norwegian compliance with one modern platform designed to help your business scale.
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto pt-8">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-black mb-2">99.99%</div>
            <div className="text-sm text-gray-600">Uptime guaranteed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-black mb-2">24/7</div>
            <div className="text-sm text-gray-600">Norwegian support</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-black mb-2">1-day</div>
            <div className="text-sm text-gray-600">Integration setup</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.location.href = '/contact'}
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-full text-sm font-medium transition"
          >
            Talk to sales
          </button>
          <button
            onClick={() => window.location.href = '/docs'}
            className="border border-gray-300 hover:border-gray-400 text-gray-900 px-8 py-4 rounded-full text-sm font-medium transition hover:bg-gray-50"
          >
            View documentation
          </button>
        </div>

        {/* Bottom Note */}
        <div className="pt-8 text-sm text-gray-500">
          <p>No setup fees • Cancel anytime • Norwegian company</p>
        </div>
      </div>
    </section>
  )
}