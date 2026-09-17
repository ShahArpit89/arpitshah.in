import Link from 'next/link'

export default function PortfolioPage() {
  return (
    <section className="py-14">
      <h1 className="font-display text-3xl italic">Portfolio</h1>
      <p className="text-ink-soft mt-4 max-w-xl">
        Role, experience, skills, and case studies — coming soon. See{' '}
        <Link href="/" className="underline-grow text-ink">
          the home page
        </Link>{' '}
        for the short version in the meantime.
      </p>
    </section>
  )
}
