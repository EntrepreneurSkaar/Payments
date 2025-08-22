'use client'

import { FaApple, FaEnvelope } from 'react-icons/fa'
import { FcGoogle, } from 'react-icons/fc'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1a2c] to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Login Form */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-white">Velkommen tilbake</h2>
            <p className="text-sm text-gray-400 mt-1">
              Skriv inn telefonnummeret knyttet til kontoen din.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-[#1a1f2e] px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              🇳🇴 +47
            </div>
            <input
              type="tel"
              placeholder="Telefonnummer"
              className="flex-1 px-4 py-3 bg-[#1a1f2e] rounded-xl text-white placeholder-gray-500 outline-none"
            />
          </div>

          <a href="#" className="text-sm text-blue-400 hover:underline">
            Mistet tilgang til telefonnummeret mitt
          </a>

          <button className="w-full bg-gray-700 py-3 rounded-full text-white text-sm font-medium cursor-not-allowed">
            Fortsett
          </button>

          <div className="text-center text-gray-500 text-sm">eller fortsett med</div>

          <div className="flex justify-center gap-6">
  {[
    { icon: <FaEnvelope size={20} />, label: 'E-postadresse' },
    { icon: <FcGoogle size={20} />, label: 'Google' },
    { icon: <FaApple size={20} />, label: 'Apple' },
  ].map(({ icon, label }, i) => (
    <button
      key={i}
      className="flex flex-col items-center text-xs hover:opacity-80 transition"
    >
      <div className="w-12 h-12 rounded-full bg-[#1a1f2e] flex items-center justify-center mb-2">
        {icon}
      </div>
      <span className="text-sm text-white font-medium">{label}</span>
    </button>
  ))}
</div>

          <div className="text-center mt-6 text-sm text-gray-400">
            Har du ikke en konto?
          </div>
          <button className="w-full bg-white text-black py-3 rounded-full font-medium hover:opacity-90 transition">
            Opprett konto
          </button>
        </div>

        {/* QR Code Dummy Card */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-40 h-40 bg-gray-300 rounded-xl" />
          <p className="text-sm text-gray-300 mt-4 text-center max-w-xs">
            Skann denne koden med telefonkameraet ditt for å logge deg inn umiddelbart.
          </p>
        </div>
      </div>
    </div>
  )
}
