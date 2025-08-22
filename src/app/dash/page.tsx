export default function DashboardPage() {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Topbar placeholder (optional) */}
          <header className="mb-10">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500">All your commerce at a glance.</p>
          </header>
  
          {/* Content */}
          <section className="rounded-2xl border border-gray-200 p-12 text-center">
            <h2 className="text-3xl font-medium text-gray-900">Coming soon</h2>
            <p className="mt-2 text-gray-500">
              We’re building something great. Check back shortly.
            </p>
          </section>
        </div>
      </main>
    )
  }
  