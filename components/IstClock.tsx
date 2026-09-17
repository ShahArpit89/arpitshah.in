'use client'

import { useEffect, useState } from 'react'

function formatIst(date: Date): string {
  const ist = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
  )
  const hh = String(ist.getHours()).padStart(2, '0')
  const mm = String(ist.getMinutes()).padStart(2, '0')
  const ss = String(ist.getSeconds()).padStart(2, '0')
  return `IST ${hh}:${mm}:${ss}`
}

// Decorative authentic detail, not an announcement — screen readers should
// skip the per-second churn (see docs/DESIGN-SYSTEM.md, Hero accessibility).
export default function IstClock() {
  const [text, setText] = useState<string | null>(null)

  useEffect(() => {
    // Initial sync from an external clock (not derived from props/state), so
    // the synchronous setState here is the correct pattern despite the lint
    // rule's usual preference against it.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setText(formatIst(new Date()))
    const id = setInterval(() => setText(formatIst(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className="text-ink-soft font-mono text-xs tabular-nums"
      aria-hidden="true"
    >
      {text ?? 'IST —:—:—'}
    </span>
  )
}
