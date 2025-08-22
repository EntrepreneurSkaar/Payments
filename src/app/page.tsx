'use client'

import { useState } from 'react'
import Hero from "@/HomePage/hero"
import Footer from "@/HomePage/Footer"
import Navbar from "@/HomePage/navbar"
import HelpBuildSection from '@/HomePage/HelpBuild'
import DesignFirstSection from '@/HomePage/DesignFirst'
import CheckoutSection from '@/HomePage/CheckoutSection'
import MotivationSection from '@/HomePage/MotivationSection'


export default function HomePage() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="min-h-screen bg-[#f0eee6] text-black">
      <Navbar onOpenModal={() => setShowModal(true)} />
      {showModal && <SignupModal onClose={() => setShowModal(false)} />}
      <Hero />
      <MotivationSection />
      <CheckoutSection />
      <DesignFirstSection />     
      <HelpBuildSection />
      <Footer />
    </div>
  )
}
