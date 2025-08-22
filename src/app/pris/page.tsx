'use client'

import Navbar from "@/HomePage/navbar"
import PricingHero from "./components/pricingHero"
import Footer from "@/HomePage/Footer"



export default function PricingPage() {
  return (
    <main className="bg-white text-black">
       <Navbar onOpenModal={() => setShowModal(true)} />

      <PricingHero />

      {/* Du kan legge til flere seksjoner her, som funksjonsliste eller FAQ */}

      <Footer />
    </main>
  )
}
