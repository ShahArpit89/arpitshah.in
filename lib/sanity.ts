import { createClient, type SanityClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

// Sanity project doesn't exist yet (PRD.md §7 item 3) — every consumer of this
// module must handle `client` being null so the app builds and runs with zero
// Sanity env vars set. See .claude/skills/sanity-cms/SKILL.md.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const sanityConfigured = Boolean(projectId)

export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2026-01-01',
      useCdn: true,
    })
  : null

const builder = client ? imageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error('urlFor() called without a configured Sanity client')
  }
  return builder.image(source)
}

// Mirrors the `photo` document schema in PRD.md §3.
export interface Photo {
  _id: string
  image: SanityImageSource
  title: string
  caption?: string
  location?: string
  tags?: string[]
  camera?: string
  lens?: string
  focalLength?: string
  aperture?: string
  shutterSpeed?: string
  iso?: string
  takenAt?: string
  featured?: boolean
}

export const allPhotosQuery = `*[_type == "photo"] | order(takenAt desc)`
export const featuredPhotosQuery = `*[_type == "photo" && featured == true] | order(takenAt desc)`

export async function getPhotos(query = allPhotosQuery): Promise<Photo[]> {
  if (!client) return []
  return client.fetch<Photo[]>(query)
}
