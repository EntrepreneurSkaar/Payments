// components/SetupGuideCard.tsx
'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { X, ChevronDown, Lock, Minimize2, ChevronUp } from 'lucide-react'

type Props = {
  progress: number
  onClose: () => void
}

type Step = {
  label: string
  done?: boolean
  locked?: boolean
  subtasks?: Array<{
    label: string
    state?: 'todo' | 'active' | 'done'
    route?: string
  }>
}

const ANIM_MS = 200

export default function SetupGuideCard({ progress, onClose }: Props) {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)

  const [openIdx, setOpenIdx] = useState<number | null>(0)

  // UI states
  const [minimized, setMinimized] = useState(false)
  const [closing, setClosing] = useState(false)
  const [minimizing, setMinimizing] = useState(false)
  const [entering, setEntering] = useState(true)         // card enter animation
  const [pillEntering, setPillEntering] = useState(false) // pill enter animation
  const [pillHiding, setPillHiding] = useState(false)     // pill exit animation

  useEffect(() => {
    // Animate card on first mount
    const r = requestAnimationFrame(() => setEntering(false))
    return () => cancelAnimationFrame(r)
  }, [])

  const startClose = useCallback(() => {
    if (closing) return
    setClosing(true)
    setTimeout(() => onClose(), ANIM_MS)
  }, [closing, onClose])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') startClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [startClose])

  const handleMinimize = () => {
    if (minimizing || minimized) return
    setMinimizing(true)
    // Wait for card exit anim, then show pill with a subtle enter
    setTimeout(() => {
      setMinimized(true)
      setMinimizing(false)
      setPillEntering(true)
      requestAnimationFrame(() => setPillEntering(false))
    }, ANIM_MS)
  }

  const handleRestore = () => {
    // Animate pill out, then show card with enter anim
    setPillHiding(true)
    setTimeout(() => {
      setMinimized(false)
      setPillHiding(false)
      setEntering(true)
      requestAnimationFrame(() => setEntering(false))
    }, ANIM_MS)
  }

  const pct = Math.max(0, Math.min(100, progress))

  const steps: Step[] = [
    {
      label: 'Tell us about your business',
      subtasks: [{ label: 'Choose your business model', state: 'done', route: '/dashboardPay/setup/business-model' }],
    },
    {
      label: 'Set up invoices',
      subtasks: [
        { label: 'Add your branding', state: 'todo', route: '/dashboardPay/invoicing/settings/branding' },
        { label: 'Create a customer', state: 'active', route: '/dashboardPay/customers/new?mode=test' },
        { label: 'Create an invoice', state: 'todo', route: '/dashboardPay/invoicing/new' },
        { label: 'Setup reminders', state: 'todo', route: '/dashboardPay/invoicing/settings/reminders' },
      ],
    },
    {
      label: 'Test Connect',
      subtasks: [
        { label: 'Create a connected account', route: '/dashboardPay/connect/accounts/new' },
        { label: 'Send a test payout', route: '/dashboardPay/connect/payouts/new' },
      ],
    },
    {
      label: 'Verify your business',
      subtasks: [
        { label: 'Upload documents', route: '/dashboardPay/verification/documents' },
        { label: 'Confirm details', route: '/dashboardPay/verification/details' },
      ],
    },
    { label: 'Go live', locked: true },
  ]

  const toggle = (i: number, s: Step) => {
    if (s.locked) return
    setOpenIdx(prev => (prev === i ? null : i))
  }

  const rowClasses =
    'w-full flex items-center justify-between rounded-md py-2.5 px-1 text-left text-[16px]'

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      {/* Minimized pill */}
      {minimized ? (
        <button
          onClick={handleRestore}
          aria-label="Expand setup guide"
          className={`group flex items-center gap-3 rounded-full border border-zinc-200 bg-white/95 backdrop-blur px-3 py-2 hover:bg-white transition-all duration-200
            ${pillEntering ? 'opacity-0 translate-y-1 scale-[0.98]' : ''}
            ${pillHiding ? 'opacity-0 translate-y-1 scale-[0.98]' : 'opacity-100'}`}
        >
          <span className="text-[13px] font-medium text-zinc-900">Setup guide</span>
          <div className="w-24 h-1 rounded bg-zinc-200 overflow-hidden">
            <div className="h-full bg-violet-500" style={{ width: `${pct}%` }} />
          </div>
          <ChevronUp className="h-4 w-4 text-zinc-500" />
        </button>
      ) : (
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-label="Setup guide"
          className={`w-[360px] rounded-2xl border border-zinc-200 bg-white p-3 shadow-lg transition-all duration-200 ease-out will-change-transform
            ${entering ? 'opacity-0 translate-y-1 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'}
            ${minimizing || closing ? 'opacity-0 translate-y-1 scale-[0.98]' : ''}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold text-zinc-900">Setup guide</h3>
            <div className="flex items-center gap-1">
              <button
                onClick={handleMinimize}
                aria-label="Minimize setup guide"
                className="p-1.5 rounded-md text-zinc-500 hover:bg-zinc-100 transition-colors"
              >
                <Minimize2 className="h-4 w-4" />
              </button>
              <button
                onClick={startClose}
                aria-label="Close"
                className="p-1.5 rounded-md text-zinc-500 hover:bg-zinc-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-2 h-1 rounded bg-zinc-200 overflow-hidden">
            <div className="h-full bg-violet-500" style={{ width: `${pct}%` }} />
          </div>

          {/* Steps */}
          <ul className="mt-2 space-y-1.5">
            {steps.map((s, i) => {
              const hasSubs = !!s.subtasks?.length && !s.locked
              const isOpen = openIdx === i && hasSubs

              return (
                <li key={s.label}>
                  <button
                    type="button"
                    onClick={() => toggle(i, s)}
                    disabled={s.locked}
                    aria-expanded={!!isOpen}
                    className={`${rowClasses} ${
                      s.locked ? 'cursor-not-allowed text-zinc-400' : 'text-zinc-900'
                    }`}
                  >
                    <span className="truncate">{s.label}</span>
                    {s.locked ? (
                      <Lock className="h-4 w-4 text-zinc-400" />
                    ) : (
                      <ChevronDown
                        className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* Collapsible subtasks */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity,transform] duration-200 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 translate-y-0' : 'grid-rows-[0fr] opacity-0 -translate-y-1'
                    }`}
                  >
                    <div className="overflow-hidden">
                      {isOpen && (
                        <div className="mt-1 rounded-xl bg-zinc-50 p-3">
                          <ul className="space-y-1">
                            {(s.subtasks ?? []).map((t, idx) => (
                              <li key={`${t.label}-${idx}`}>
                                <button
                                  type="button"
                                  onClick={() => t.route && router.push(t.route)}
                                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-[12px] text-zinc-800 hover:bg-zinc-100"
                                >
                                  <Dot state={t.state} />
                                  <span className="truncate">{t.label}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {/* Click-away to close (optional): add a subtle fade/scale on card close */}
    </div>
  )
}

/* Small round indicator used in subtasks */
function Dot({ state = 'todo' as 'todo' | 'active' | 'done' }) {
  if (state === 'active') {
    return (
      <span className="relative inline-flex h-4 w-4 items-center justify-center">
        <span className="absolute inline-flex h-4 w-4 rounded-full bg-violet-200/70 animate-ping" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-600" />
      </span>
    )
  }
  if (state === 'done') {
    return <span className="inline-block h-3.5 w-3.5 rounded-full bg-violet-600" />
  }
  return <span className="inline-block h-3.5 w-3.5 rounded-full bg-zinc-300" />
}
