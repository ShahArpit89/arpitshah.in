import Link from 'next/link'

interface ButtonProps {
  href: string
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

// Hover treatment (opacity-90, transition-opacity) was undefined in the
// mockup — decided here per design/DESIGN-SYSTEM.md's flagged gap; that doc
// has been updated to record this as the resolved decision.
export default function Button({
  href,
  variant = 'primary',
  children,
}: ButtonProps) {
  const base =
    'px-6 py-3 text-sm font-mono uppercase tracking-wide rounded-full transition-opacity hover:opacity-90'
  const variants = {
    primary: 'bg-ink text-paper',
    secondary: 'border border-ink text-ink',
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  )
}
