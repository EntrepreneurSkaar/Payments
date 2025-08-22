'use client'

export default function CallToActionSection() {
  return (
    <section className="w-full bg-[#f0eee6] py-28 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl text-black leading-tight font-medium mb-6">
            Ready to transform your<br />
            payment infrastructure?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join Norwegian businesses who chose NordPay for reliable, compliant, and developer-friendly payment processing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => window.location.href = '/contact'}
            className="bg-black hover:bg-gray-800 text-white text-base px-8 py-4 rounded-full transition font-medium"
          >
            Talk to sales
          </button>
          <button
            onClick={() => window.location.href = '/docs'}
            className="border border-gray-300 hover:border-gray-400 text-gray-900 text-base px-8 py-4 rounded-full transition hover:bg-gray-50"
          >
            View documentation
          </button>
        </div>
      </div>
    </section>
  )
}