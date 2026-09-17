export default function Footer() {
  return (
    <footer className="border-line text-ink-soft flex flex-wrap justify-between gap-3 border-t py-8 font-mono text-xs">
      <span>© {new Date().getFullYear()} Arpit Shah</span>
      <span>arpitshah.in — GitHub · Instagram · Email</span>
    </footer>
  )
}
