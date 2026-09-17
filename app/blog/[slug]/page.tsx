import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPostSlugs, getPostBySlug } from '@/lib/mdx'

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const slugs = getAllPostSlugs()
  if (!slugs.includes(slug)) notFound()

  const post = getPostBySlug(slug)

  return (
    <article className="py-14">
      <time className="text-ink-soft font-mono text-xs">
        {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })}
      </time>
      <h1 className="font-display mt-2 text-4xl italic">
        {post.frontmatter.title}
      </h1>
      <div className="text-ink [&_a]:underline-grow [&_h2]:font-display mt-8 max-w-2xl leading-relaxed [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:italic [&_p]:mt-4">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}
