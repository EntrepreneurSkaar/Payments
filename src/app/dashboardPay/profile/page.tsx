'use client'

import { useRouter } from 'next/navigation'
import {
  Building2,
  Camera,
  User,
  Bell,
  Tag,
  HelpCircle,
  FileText,
  Shield,
  Link2,
  CreditCard,
  ChevronRight,
  Plus,
  RotateCcw,
  CircleUser,
  Languages,
  Users,
  Info,
  XCircle,
  ArrowLeft,
} from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      {/* Back Button */}
      <button
        onClick={() => router.push('/dashboardPay')}
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-black transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Profile Card */}
      <div className="bg-zinc-100 rounded-3xl p-6 flex flex-col items-center text-center relative">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600">
            <User className="w-6 h-6" />
          </div>
          <div className="absolute bottom-1 right-1 bg-lime-400 rounded-full p-1">
            <Camera className="w-3 h-3 text-black" />
          </div>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight text-black">ROBIN AVEDAL SKAAR</h1>
        <p className="text-sm text-zinc-600 mt-1">Your personal account</p>
        <div className="mt-3 inline-flex items-center gap-2 bg-zinc-200 px-3 py-1 rounded-full text-sm font-medium text-[#1F3D2B]">
          <Building2 className="w-3 h-3" />
          @robina826
        </div>
      </div>

      {/* Open Business Account */}
      <div className="border border-dashed border-zinc-300 rounded-xl p-4 flex items-center justify-between transition cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="bg-zinc-100 rounded-full w-10 h-10 flex items-center justify-center relative">
            <Building2 className="w-5 h-5 text-black" />
            <div className="absolute bottom-0 right-0 bg-lime-400 rounded-full p-[2px]">
              <Plus className="w-3 h-3 text-black" />
            </div>
          </div>
          <span className="text-base font-semibold text-black">Open a business account</span>
        </div>
        <ChevronRight className="w-5 h-5 text-zinc-500" />
      </div>

      {/* Membership */}
      <div className="text-center">
        <p className="text-sm text-zinc-600">
          Membership number: <span className="font-medium text-black">P92362237</span>
        </p>
        <button className="mt-4 bg-zinc-200 text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-zinc-300 transition">
          Log out
        </button>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        <Section title="Your account" items={[
          { name: 'Inbox', icon: Bell },
          { name: 'Pricing and discounts', icon: Tag },
          { name: 'Help', icon: HelpCircle },
          { name: 'Statements and reports', icon: FileText },
        ]} />

        <Section title="Settings" items={[
          { name: 'Security and privacy', desc: 'Change your security and privacy settings.', icon: Shield },
          { name: 'Notifications', desc: 'Customise how you get updates.', icon: Bell },
          { name: 'Integrations and tools', desc: 'Connect your account to third-party software.', icon: Link2 },
          { name: 'Payment methods', desc: 'Manage saved cards and bank accounts.', icon: CreditCard },
          { name: 'Limits', desc: 'Manage your transfer and card limits.', icon: RotateCcw },
          { name: 'Language and appearance', desc: 'Customise language settings and theme.', icon: Languages },
          { name: 'Personal details', desc: 'Update your personal information.', icon: CircleUser },
        ]} />

        <Section title="Actions and agreements" items={[
          { name: 'Referrals and rewards', desc: 'Send and track referrals and manage your rewards', icon: Users },
          { name: 'Our agreements', desc: 'Read and manage your legal agreements.', icon: Info },
          { name: 'Close account', desc: 'Close your personal account.', icon: XCircle },
        ]} />

        <div className="text-center pt-6 text-sm text-zinc-500">
          We’ve made some changes to this area of the app.
          <div>
            <button className="mt-2 text-sm font-medium text-[#1F3D2B] underline underline-offset-2 hover:text-black">
              Give us feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  items,
}: {
  title: string
  items: { name: string; desc?: string; icon: React.ElementType }[]
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-black">{title}</h2>
      <div className="space-y-2">
        {items.map(({ name, desc, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-zinc-200 cursor-pointer transition"
          >
            <div className="flex items-center gap-3">
              <div className="bg-zinc-100 p-2 rounded-full">
                <Icon className="w-4 h-4 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-black">{name}</p>
                {desc && <p className="text-xs text-zinc-500">{desc}</p>}
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </div>
        ))}
      </div>
    </div>
  )
}
