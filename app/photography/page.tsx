import PhotoGrid from '@/components/PhotoGrid'
import { getPhotos, sanityConfigured } from '@/lib/sanity'

export default async function PhotographyPage() {
  const photos = sanityConfigured ? await getPhotos() : []

  return (
    <section className="py-14">
      <h1 className="font-display text-3xl italic">Photography</h1>
      <p className="text-ink-soft mt-2 mb-8 max-w-md">
        Birds, big cats, and whatever shows up before the light does.
      </p>
      <PhotoGrid photos={photos} />
      {!sanityConfigured && (
        <p className="text-ink-soft mt-3 font-mono text-[11px]">
          placeholder frames — Sanity isn&rsquo;t configured yet, see
          .claude/skills/sanity-cms
        </p>
      )}
    </section>
  )
}
