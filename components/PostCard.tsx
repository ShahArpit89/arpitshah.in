import Link from 'next/link'
import type { Post } from '@/lib/mdx'

const categoryColor: Record<string, string> = {
  engineering: 'text-flare',
  photography: 'text-gold',
}

function formatMonthYear(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default function PostCard({
  post,
  isLast = false,
}: {
  post: Post
  isLast?: boolean
}) {
  const primaryTag = post.frontmatter.tags[0] ?? 'engineering'

  return (
    <li
      className={`group border-line grid grid-cols-[90px_1fr_auto] items-baseline gap-4 border-t py-5 sm:grid-cols-[110px_1fr_auto] ${isLast ? 'border-b' : ''}`}
    >
      <time className="text-ink-soft font-mono text-xs">
        {formatMonthYear(post.frontmatter.date)}
      </time>
      <div>
        <div
          className={`mb-1 font-mono text-[10px] tracking-wider uppercase ${categoryColor[primaryTag] ?? 'text-flare'}`}
        >
          {primaryTag}
        </div>
        <h3 className="text-lg font-semibold transition group-hover:opacity-70">
          {post.frontmatter.title}
        </h3>
      </div>
      <Link
        href={`/blog/${post.slug}`}
        className="text-ink-soft hidden self-center font-mono text-xs sm:block"
      >
        Read →
      </Link>
    </li>
  )
}
