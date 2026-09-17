import Link from 'next/link'
import Hero from '@/components/Hero'
import SectionDivider from '@/components/SectionDivider'
import ScrollReveal from '@/components/ScrollReveal'
import PostCard from '@/components/PostCard'
import PhotoGrid from '@/components/PhotoGrid'
import { getAllPosts } from '@/lib/mdx'
import { getPhotos, sanityConfigured } from '@/lib/sanity'

export default async function Home() {
  const posts = getAllPosts().slice(0, 3)
  const photos = sanityConfigured ? await getPhotos() : []

  return (
    <>
      <Hero />
      <SectionDivider />

      <ScrollReveal>
        <section className="py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl italic">From the blog</h2>
            <Link
              href="/blog"
              className="underline-grow text-flare font-mono text-xs uppercase"
            >
              All posts →
            </Link>
          </div>
          <ul className="flex flex-col">
            {posts.map((post, i) => (
              <PostCard
                key={post.slug}
                post={post}
                isLast={i === posts.length - 1}
              />
            ))}
          </ul>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-14 pb-20">
          <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-gold font-mono text-xs tracking-[0.14em] uppercase">
                Also
              </p>
              <h2 className="font-display mt-1 text-3xl italic">
                Frames from the field
              </h2>
            </div>
            <Link
              href="/photography"
              className="underline-grow text-gold font-mono text-xs uppercase"
            >
              Open the gallery →
            </Link>
          </div>
          <p className="text-ink-soft mt-2 mb-8 max-w-md">
            Birds, big cats, and whatever shows up before the light does — shot
            between projects.
          </p>
          <PhotoGrid photos={photos} />
        </section>
      </ScrollReveal>
    </>
  )
}
