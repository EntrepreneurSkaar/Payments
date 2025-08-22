'use client'

export default function FeatureCardSplit() {
  return (
    <section className="relative bg-white text-gray-900 py-24 px-6 font-sans w-full overflow-hidden">
     

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Text card */}
        <div className="bg-zinc-900 text-white rounded-3xl p-8 flex flex-col justify-between h-full min-h-[700px]">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              The easiest way to start your online store
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Create a beautiful store, add your products, and start selling in minutes — no design skills, plugins, or developers needed. Whether you're selling digital goods, physical products, or services — our platform has you covered.
            </p>
          </div>
          <div className="mt-6">
          <a
                href="#"
                className="text-sm font-medium text-white px-3 py-2 rounded-md transition hover:bg-white/10"
                >
                See how it works →
                </a>

          </div>
        </div>

        {/* Right: Placeholder */}
        <div className="rounded-3xl h-[700px] bg-black flex items-center justify-center">
          <span className="text-white font-semibold">Video Placeholder</span>
        </div>
      </div>
    </section>
  )
}
