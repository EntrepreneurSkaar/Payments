'use client'

import { useRouter } from 'next/navigation'

export default function Hero() {
  const router = useRouter()

  const handleContactSales = () => router.push('/contact')
  const handleViewDocs = () => router.push('/docs')
  const handleGetStarted = () => router.push('/signup')

  return (
    <section className="bg-[#f0eee6] px-4 py-28 md:py-32 text-center font-sans">
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight text-black tracking-tight">
      The Shortest Path<br className="hidden md:block" />
        <span className="inline-block">from Idea to Income.</span>
      </h1>

      {/* Subhead */}
      <p className="mt-6 text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
        Give customers a seamless shopping experience from product page to paid.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center items-center">
        <button
          onClick={handleGetStarted}
          className="bg-black hover:bg-gray-900 text-white px-7 md:px-8 py-3.5 md:py-4 rounded-full text-sm md:text-[15px] font-medium transition"
        >
          Start selling free
        </button>
      </div>

      {/* Product preview */}
      <div className="mt-16 md:mt-20 max-w-6xl mx-auto">
        <div className="w-full h-[380px] md:h-[480px] lg:h-[560px] rounded-3xl bg-orange-400" />
      </div>
    </section>
  )
}
