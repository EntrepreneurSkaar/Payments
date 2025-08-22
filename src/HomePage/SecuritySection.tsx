'use client'

export default function SecuritySection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text content */}
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-6">
            YOUR MONEY’S <br /> SAFE SPACE
          </h2>
          <p className="text-gray-700 text-base md:text-lg mb-8">
            With Revolut Secure, you’re entering a new era of money security —
            where our proactive, purpose-built defences and team of fraud
            specialists help protect every account, 24/7.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition">
            Learn more
          </button>
        </div>

        {/* Right side image (dummy for now) */}
        <div className="flex justify-center">
          <div className="w-52 h-64 bg-gray-300 rounded-2xl" />
          {/* Replace with: <Image src="/path/to/shield.png" alt="Shield" width={200} height={260} /> */}
        </div>
      </div>
    </section>
  )
}
