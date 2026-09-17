'use client'

import { useEffect, useRef, useState } from 'react'

// Replaces the mockup's IIFE. Sections start visible at rest — they only get
// reveal-pending applied once we know client-side that they're off-screen, so
// nothing depends on JS running to become visible (design/DESIGN-SYSTEM.md).
export default function ScrollReveal({
  children,
}: {
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pending, setPending] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return

    if (el.getBoundingClientRect().top > window.innerHeight) {
      setPending(true)
    } else {
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true)
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={
        pending && !revealed ? 'reveal-pending' : revealed ? 'reveal-in' : ''
      }
    >
      {children}
    </div>
  )
}
