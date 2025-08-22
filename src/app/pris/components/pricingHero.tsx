'use client'

export default function PricingHero() {
  return (
    <section className="bg-white min-h-screen text-black px-6 py-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">

        {/* Tekstinnhold */}
        <div className="text-center md:text-left space-y-6 max-w-xl">
          <h1 className="text-7xl md:text-8xl tracking-tight">209,-</h1>
          <p className="text-xl md:text-2xl text-zinc-700">Per måned, ingen bindingstid</p>
          <button className="mt-6 bg-[#5E41E2] hover:bg-[#4f34c4] text-white text-sm font-medium px-6 py-3 rounded-full transition">
            Prøv gratis i 30 dager
          </button>
          <p className="mt-8 text-base text-zinc-500">
            Inkluderer det du trenger for å gjøre regnskapet selv — og gratis kundestøtte <span className="text-green-500">💚</span>
          </p>
        </div>
      </div>
    </section>
  )
}
