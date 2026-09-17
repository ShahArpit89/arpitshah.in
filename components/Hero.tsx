import Button from './Button'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16">
      <div className="blob pointer-events-none absolute -top-10 -right-16 h-72 w-72 rounded-full" />

      <p className="text-gold font-mono text-xs tracking-[0.18em] uppercase">
        Bengaluru — Software Engineer
      </p>

      <h1
        className="font-display mt-3 max-w-3xl text-4xl leading-[1.08] italic sm:text-5xl md:text-6xl"
        style={{ textWrap: 'balance' }}
      >
        Hi, I&rsquo;m Arpit — I build{' '}
        <span className="text-flare">applied&#8209;AI</span> products, end to
        end.
      </h1>

      <p className="text-ink-soft mt-6 max-w-xl text-lg leading-relaxed">
        Want the details? Here&rsquo;s my{' '}
        <a className="underline-grow text-ink" href="/portfolio">
          full portfolio
        </a>
        , or jump straight into{' '}
        <a className="underline-grow text-ink" href="/projects">
          recent projects
        </a>
        . Most days that means model integration and the backend systems holding
        it together — lately, <strong className="text-ink">MacFileDedup</strong>
        , a macOS app for clearing out duplicate files, plus a run of internal
        tools that put LLMs to work on real, unglamorous problems.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/portfolio" variant="primary">
          View portfolio →
        </Button>
        <Button href="/projects" variant="secondary">
          See projects
        </Button>
      </div>
    </section>
  )
}
