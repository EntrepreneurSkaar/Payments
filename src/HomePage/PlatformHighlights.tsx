'use client'

export default function PlatformHighlights() {

  return (
    <section className="relative bg-white text-gray-900 py-24 px-6 font-sans w-full overflow-hidden">
      {/* Header row with left-aligned text and right CTA */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
        <div className="text-left space-y-3">
          <h2 className="text-3xl md:text-5xl">
            Powerful, simple, and scalable
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-xl">
            Everything you need to start and grow your online business — no plugins or technical setup.
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <button className="bg-black text-white px-6 py-3 cursor-pointer rounded-full text-sm font-medium hover:opacity-90 transition">
            Join waitlist
          </button>
        </div>
      </div>

      

      {/* Reverse wavy border */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 100"
          className="w-full h-[100px] rotate-180 text-gray-100"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,90.7C672,107,768,117,864,106.7C960,96,1056,64,1152,58.7C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>
    </section>
  )
}
