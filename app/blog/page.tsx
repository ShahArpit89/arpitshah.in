import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/mdx'

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <section className="py-14">
      <h1 className="font-display text-3xl italic">Blog</h1>
      <ul className="mt-8 flex flex-col">
        {posts.map((post, i) => (
          <PostCard
            key={post.slug}
            post={post}
            isLast={i === posts.length - 1}
          />
        ))}
      </ul>
    </section>
  )
}
