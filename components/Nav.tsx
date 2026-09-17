import Link from 'next/link'
import IstClock from './IstClock'

const links = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/photography', label: 'Photography' },
]

// Plain Tailwind utilities directly on elements, no hand-rolled scoped CSS
// class for the header — sidesteps the .masthead-nav double-border
// regression documented in design/DESIGN-SYSTEM.md watch-item #1 structurally
// rather than by remembering one selector name.
export default function Nav() {
  return (
    <header
      className="bg-paper/80 sticky z-20 flex flex-wrap items-center justify-between gap-4 py-5 backdrop-blur"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="flex items-baseline gap-3">
        <Link href="/" className="text-ink font-mono text-sm tracking-wide">
          arpitshah.in
        </Link>
        <IstClock />
      </div>
      <nav className="text-ink-soft flex gap-6 font-mono text-xs tracking-wider uppercase">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="underline-grow hover:text-flare"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}
