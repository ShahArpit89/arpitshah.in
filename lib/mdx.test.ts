import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn(),
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}))

import fs from 'node:fs'
import { getAllPostSlugs, getAllPosts, getPostBySlug } from './mdx'

function frontmatter(title: string, date: string, body: string): string {
  return `---\ntitle: ${title}\ndate: '${date}'\ntags: [a, b]\nexcerpt: excerpt for ${title}\n---\n${body}\n`
}

describe('getAllPostSlugs', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns [] when the blog directory does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    expect(getAllPostSlugs()).toEqual([])
  })

  it('returns slugs for .mdx files only, with the extension stripped', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue([
      'a.mdx',
      'b.mdx',
      'notes.txt',
      '.DS_Store',
    ] as never)
    expect(getAllPostSlugs()).toEqual(['a', 'b'])
  })
})

describe('getPostBySlug', () => {
  beforeEach(() => vi.clearAllMocks())

  it('parses frontmatter and content via gray-matter', () => {
    vi.mocked(fs.readFileSync).mockReturnValue(
      frontmatter('Hello', '2026-01-01', 'Body text') as never,
    )

    const post = getPostBySlug('hello')

    expect(post.slug).toBe('hello')
    expect(post.frontmatter.title).toBe('Hello')
    expect(post.frontmatter.tags).toEqual(['a', 'b'])
    expect(post.content.trim()).toBe('Body text')
  })
})

describe('getAllPosts', () => {
  beforeEach(() => vi.clearAllMocks())

  it('sorts posts descending by frontmatter.date', () => {
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readdirSync).mockReturnValue(['old.mdx', 'new.mdx'] as never)
    vi.mocked(fs.readFileSync).mockImplementation((filePath) => {
      const isOld = String(filePath).includes('old')
      return frontmatter(
        isOld ? 'Old' : 'New',
        isOld ? '2020-01-01' : '2026-01-01',
        'body',
      ) as never
    })

    const posts = getAllPosts()

    expect(posts.map((p) => p.slug)).toEqual(['new', 'old'])
  })
})
