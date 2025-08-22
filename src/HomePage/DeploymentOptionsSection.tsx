'use client'

export default function AccessOptionsSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-16 py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        {/* Left: Headline & bullets */}
        <div>
          <h2 className="text-3xl md:text-5xl text-black mb-10 leading-tight">
            Flexible access for every kind of user
          </h2>

          <ul className="space-y-6 text-gray-700 text-base leading-relaxed">
            <li>
              <strong>Mobile-first experience:</strong> Open your account, send money, and track spending — all from our sleek mobile app.
            </li>
            <li>
              <strong>Web dashboard:</strong> Manage your finances on desktop with a full-featured UI for business and personal users.
            </li>
            <li>
              <strong>Business access:</strong> Invite team members, automate payments, and connect tools like Fiken or Tripletex.
            </li>
            <li>
              <strong>API & developer tools:</strong> Build custom integrations and automate workflows using our secure, open APIs.
            </li>
          </ul>

          <button className="mt-10 text-base underline font-medium hover:text-black transition">
            Learn more
          </button>
        </div>

        {/* Right: Platform Icons / Placeholder Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {['iOS', 'Android', 'Web', 'Fiken', 'Tripletex', 'API'].map((platform, index) => (
            <div
              key={index}
              className="bg-gray-100 h-28 rounded-xl flex items-center justify-center text-gray-500 text-lg font-semibold"
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
