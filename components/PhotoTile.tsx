import Image from 'next/image'

interface PhotoTileProps {
  src?: string
  alt: string
  caption?: string
  camera?: string
  lens?: string
  focalLength?: string
  aperture?: string
  shutterSpeed?: string
  iso?: string
}

// frame-zoom hover-scale targets both <img> (real photos) and <svg>
// (placeholder) — see app/globals.css.
export default function PhotoTile({ src, alt }: PhotoTileProps) {
  return (
    <figure className="frame-zoom border-line aspect-square overflow-hidden rounded-md border">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="block h-full w-full object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 200 200"
          className="block h-full w-full"
          aria-label={alt}
        >
          <rect width="200" height="200" fill="var(--paper-raised)" />
          <circle cx="100" cy="100" r="46" fill="var(--line)" />
        </svg>
      )}
    </figure>
  )
}
