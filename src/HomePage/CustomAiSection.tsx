'use client'

export default function CustomFintechSection() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-16 py-24 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div>
          <h2 className="text-3xl md:text-5xl text-black mb-10 leading-tight">
            Built to adapt to how you earn, spend, and grow
          </h2>

          <ul className="space-y-6 text-gray-700 text-base max-w-sm leading-relaxed">
            <li>
              <strong>Tailored for you:</strong> Whether you&apos;re a freelancer, creator, or small business — choose tools that fit your needs.
            </li>
            <li>
              <strong>Plug-and-play features:</strong> Easily turn on budgeting, investing, or invoicing. No complexity — just what you need.
            </li>
            <li>
              <strong>Local-first by design:</strong> BankID, Norwegian IBAN, EHF/KID invoicing, and VAT-ready from day one.
            </li>
            <li>
              <strong>Privacy and control:</strong> We prioritize security, local compliance, and full data transparency — always.
            </li>
          </ul>

          <button className="mt-10 text-base underline font-medium hover:text-black transition">
            Learn more
          </button>
        </div>

        {/* Right: Placeholder for future media */}
        <div className="w-full h-[40rem] rounded-3xl bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400">Media Placeholder</span>
        </div>
      </div>
    </section>
  )
}
