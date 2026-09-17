import PhotoTile from './PhotoTile'
import { urlFor, type Photo } from '@/lib/sanity'

const PLACEHOLDER_COUNT = 6

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) {
    return (
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <PhotoTile key={i} alt="Placeholder frame — real photos go here" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
      {photos.map((photo) => (
        <PhotoTile
          key={photo._id}
          src={urlFor(photo.image).width(400).height(400).url()}
          alt={photo.title}
        />
      ))}
    </div>
  )
}
