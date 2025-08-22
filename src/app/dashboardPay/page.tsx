'use client'

import OverviewSection from "./components/OverviewSection"
import TodaySection from "./components/TodaysSection"



export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Page container */}
      <div className="pb-20">
        {/* Today section */}
        <TodaySection />
        <OverviewSection />
      </div>
    </main>
  )
}
